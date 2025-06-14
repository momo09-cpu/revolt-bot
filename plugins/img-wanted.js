// img-wanted.js
import commandModule from '../command.js';
const { cmd } = commandModule;

import axios from 'axios';
import FormData from 'form-data';
import { promises as fs } from 'fs';
import os from 'os';
import path from 'path';

cmd({
    pattern: "wanted",
    alias: ["wantededit"],
    react: '📸',
    desc: "Create wanted poster from images",
    category: "image",
    use: "<reply to image>",
    filename: import.meta.url
}, async (message, conn) => {
    try {
        const quoted = message.quoted || message;
        const mime = quoted.mimetype || '';

        if (!mime.startsWith('image/')) {
            return await message.reply("❌ Please reply to an image (JPEG/PNG)");
        }

        const buffer = await quoted.download();
        const ext = mime.includes('jpeg') ? '.jpg' : '.png';
        const tempPath = path.join(os.tmpdir(), `wanted_${Date.now()}${ext}`);

        await fs.writeFile(tempPath, buffer);

        const form = new FormData();
        form.append('fileToUpload', fs.createReadStream(tempPath));
        form.append('reqtype', 'fileupload');

        const { data: imageUrl } = await axios.post(
            "https://catbox.moe/user/api.php", 
            form, 
            { headers: form.getHeaders() }
        );

        await fs.unlink(tempPath);

        if (!imageUrl) throw new Error("Image upload failed");

        const { data } = await axios.get(
            `https://api.popcat.xyz/v2/wanted?image=${encodeURIComponent(imageUrl)}`,
            { responseType: 'arraybuffer' }
        );

        await conn.sendMessage(message.chat, {
            image: Buffer.from(data),
            caption: "🖼️ *Wanted Poster Created*"
        });

    } catch (error) {
        console.error('Wanted Error:', error);
        await message.reply(`❌ Error: ${error.message}`);
    }
});