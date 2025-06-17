import jimp from 'jimp';

let handler = async (m, { conn, text }) => {
    try {
        let who = m.mentionedJid?.[0] || m.quoted?.sender || m.sender;
        let avatarUrl = await conn.profilePictureUrl(who, 'image').catch(() => null);

        // Verifica se l'utente ha una foto profilo
        if (!avatarUrl) {
            return conn.reply(m.chat, '⚠️ 𝑞𝑢𝑒𝑠𝑡𝑜 𝑐𝑜𝑚𝑎𝑛𝑑𝑜 𝑛𝑜𝑛 𝑓𝑢𝑛𝑧𝑖𝑜𝑛𝑎 𝑠𝑢𝑙𝑙𝑒 𝑝𝑒𝑟𝑠𝑜𝑛𝑒 𝑠𝑒𝑛𝑧𝑎 𝑓𝑜𝑡𝑜 𝑝𝑟𝑜𝑓𝑖𝑙𝑜 𝑒 𝑎𝑛𝑐ℎ𝑒 𝑠𝑢𝑖 𝑔𝑎𝑦.', m);
        }

        let img = await jimp.read('https://i.imgur.com/nav6WWX.png');
        let avatar = await jimp.read(avatarUrl);

        let bonk = await img.composite(avatar.resize(128, 128), 120, 90, {
            mode: 'dstOver',
            opacitySource: 1,
            opacityDest: 1
        }).getBufferAsync('image/png');

        conn.sendMessage(m.chat, { image: bonk }, { quoted: m });

    } catch (error) {
        console.error(error);
        conn.reply(m.chat, '❌ 𝑠𝑖 𝑒 𝑣𝑒𝑟𝑖𝑓𝑖𝑐𝑎𝑡𝑜 𝑢𝑛 𝑒𝑟𝑟𝑜𝑟𝑒 𝑑𝑢𝑟𝑎𝑛𝑡𝑒 𝑖𝑙 𝑐𝑜𝑚𝑎𝑛𝑑𝑜.', m);
    }
};

handler.command = /^(bonk)$/i;

export default handler;