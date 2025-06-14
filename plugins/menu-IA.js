import { performance } from 'perf_hooks';
import fetch from 'node-fetch'; // Assicurati di avere node-fetch installato

const handler = async (message, { conn, usedPrefix }) => {
    const userCount = Object.keys(global.db.data.users).length;
    const botName = global.db.data.nomedelbot || 'ChatUnity';

    const menuText = generateMenuText(usedPrefix, botName, userCount);

    const messageOptions = {
        contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363259442839354@newsletter',
                serverMessageId: '',
                newsletterName: `${botName}`
            },
        }
    };

    // Invia la foto con il menu e i bottoni
    const imagePath = './menu/chatunitybot.jpg';
    await conn.sendMessage(message.chat, {
        image: { url: imagePath },
        caption: menuText,
        footer: 'Scegli un menu:',
        buttons: [
            { buttonId: `${usedPrefix}menu`, buttonText: { displayText: "🏠 Menu Principale" }, type: 1 },
            { buttonId: `${usedPrefix}menuadmin`, buttonText: { displayText: "🛡️ Menu Admin" }, type: 1 },
            { buttonId: `${usedPrefix}menuowner`, buttonText: { displayText: "👑 Menu Owner" }, type: 1 },
            { buttonId: `${usedPrefix}menugruppo`, buttonText: { displayText: "👥 Menu Gruppo" }, type: 1 },
            { buttonId: `${usedPrefix}menusicurezza`, buttonText: { displayText: "🚨 Menu Sicurezza" }, type: 1 }
        ],
        viewOnce: true,
        headerType: 4,
        ...messageOptions
    }, { quoted: message });
};

async function fetchThumbnail(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        return new Uint8Array(arrayBuffer);
    } catch (error) {
        console.error('Errore durante il fetch della thumbnail:', error);
        return 'default-thumbnail'; // Fallback thumbnail in caso di errore
    }
}

handler.help = ['menu'];
handler.tags = ['menu'];
handler.command = /^(menuia|menuai)$/i;

export default handler;

function generateMenuText(prefix, botName, userCount) {
    return `

╭〔 *💬 𝑴𝑬𝑵𝑼 𝑫𝑬𝑳 𝑩𝑶𝑻 💬* 〕┈⊷
┃◈╭───────────·๏
┃◈┃• *𝑪𝑶𝑴𝑨𝑵𝑫𝑰 𝑮𝑬𝑵𝑬𝑹𝑨𝑳𝑰*
┃◈┃
┃◈┃• 🤖 *.ia* (AI)  
┃◈┃• 🤖 *.Alya* (AI)  
┃◈┃• 🤖 *.gemini* (AI)  
┃◈┃• 🤖 *.chatgpt* (AI)  
┃◈┃• 🤖 *.deepseek* (AI)  
┃◈┃• 🤖 *.vocale* (AI)  
┃◈┃• 🤖 *.immagine* (AI)  
┃◈┃• 🤖 *.immagine2* (AI) 
┃◈┃• 🤖 *.immagine3* (AI) 
┃◈┃
┃◈└───────────┈⊷
┃◈┃• *𝑽𝑬𝑹𝑺𝑰𝑶𝑵𝑬:* ${vs}
┃◈┃•  𝐂𝐎𝐋𝐋𝐀𝐁: 𝐃𝐑𝐆𝐁
┃◈┃• *𝐒𝐔𝐏𝐏𝐎𝐑𝐓𝐎:* (.supporto)
╰━━━━━━━━━━━━━┈·๏
`.trim();
}
