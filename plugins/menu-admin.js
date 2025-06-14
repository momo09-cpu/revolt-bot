import { performance } from 'perf_hooks';
import fetch from 'node-fetch'; // Assicurati di avere node-fetch installato

import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const handler = async (message, { conn, usedPrefix, command }) => {
    const userCount = Object.keys(global.db.data.users).length;
    const botName = global.db.data.nomedelbot || 'ChatUnity';

    if (command === 'menu') {
        return await (await import('./menu-principale.js')).default(message, { conn, usedPrefix });
    }
    if (command === 'menuowner') {
        return await (await import('./menu-owner.js')).default(message, { conn, usedPrefix });
    }
    if (command === 'menusicurezza') {
        return await (await import('./menu-sicurezza.js')).default(message, { conn, usedPrefix });
    }
    if (command === 'menugruppo') {
        return await (await import('./menu-gruppo.js')).default(message, { conn, usedPrefix });
    }

    const menuText = generateMenuText(usedPrefix, botName, userCount);

    const videoPath = path.join(__dirname, '../menu/edit4.mp4'); 
    await conn.sendMessage(
        message.chat,
        {
            video: { url: videoPath },
            caption: menuText,
            footer: 'Scegli un menu:',
            buttons: [
                { buttonId: `${usedPrefix}menu`, buttonText: { displayText: "🏠 Menu Principale" }, type: 1 },
                { buttonId: `${usedPrefix}menuowner`, buttonText: { displayText: "👑 Menu Owner" }, type: 1 },
                { buttonId: `${usedPrefix}menusicurezza`, buttonText: { displayText: "🚨 Menu Sicurezza" }, type: 1 },
                { buttonId: `${usedPrefix}menugruppo`, buttonText: { displayText: "👥 Menu Gruppo" }, type: 1 },
                { buttonId: `${usedPrefix}menuia`, buttonText: { displayText: "🤖 Menu IA" }, type: 1 }
            ],
            viewOnce: true,
            headerType: 4
        }
    );
};

handler.help = ['menuadmin', 'menu', 'menuowner', 'menusicurezza', 'menugruppo'];
handler.tags = ['menuadmin'];
handler.command = /^(menuadmin|menu|menuowner|menusicurezza|menugruppo)$/i;

export default handler;

function generateMenuText(prefix, botName, userCount) {
    return `
╭━〔*💬 𝑴𝑬𝑵𝑼 𝑨𝑫𝑴𝑰𝑵 💬*〕━┈⊷  
┃◈╭─────────────·๏  
┃◈┃• *𝑪𝑶𝑴𝑨𝑵𝑫𝑰 𝑨𝑫𝑴𝑰𝑵 👑*  
┃◈┃  
┃◈┃• 👑 *promuovi /mettiadmin*  
┃◈┃• 👑 *retrocedi /togliadmin*  
┃◈┃• 👑 *warn / unwarn*  
┃◈┃• 👑 *muta / smuta*  
┃◈┃• 👑 *setdescrizione* 
┃◈┃• 👑 *setorario* 
┃◈┃• 👑 *setnome*  
┃◈┃• 👑 *hidetag*  
┃◈┃• 👑 *kick / cacca*  
┃◈┃• 👑 *admins*  
┃◈┃• 👑 *hidetag*  
┃◈┃• 👑 *tagall*  
┃◈┃• 👑 *aperto / chiuso*  
┃◈┃• 👑 *setwelcome*  
┃◈┃• 👑 *setbye*  
┃◈┃• 👑 *inattivi*  
┃◈┃• 👑 *listanum + prefisso*  
┃◈┃• 👑 *pulizia + prefisso*  
┃◈┃• 👑 *clearplay*  
┃◈┃• 👑 *regole/setregole*  
┃◈┃• 👑 *quarantena*  
┃◈┃• 👑 *ds*  
┃◈┃• 👑 *listawarn*  
┃◈┃• 👑 *link*  
┃◈┃• 👑 *linkqr*  
┃◈┃  
┃◈└───────────┈⊷  
╰━━━━━━━━━━━━━┈·๏  
*•────────────•⟢*  
> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲  
*•────────────•⟢*  
`.trim();
}
