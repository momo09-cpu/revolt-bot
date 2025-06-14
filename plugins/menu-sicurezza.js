import 'os';
import 'util';
import 'human-readable';
import '@whiskeysockets/baileys';
import 'fs';
import 'perf_hooks';
import path from 'path';
import { fileURLToPath } from 'url';

// Definizione di __dirname per i moduli ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let handler = async (m, { conn, usedPrefix, command }) => {
  const chat = global.db.data.chats[m.chat];
  const isOwner = global.owner.map(([number]) => number + '@s.whatsapp.net').includes(m.sender);

  if (command === 'menu') {
    return await (await import('./menu-principale.js')).default(m, { conn, usedPrefix });
  }
  if (command === 'menuadmin') {
    return await (await import('./menu-admin.js')).default(m, { conn, usedPrefix });
  }
  if (command === 'menuowner') {
    return await (await import('./menu-owner.js')).default(m, { conn, usedPrefix });
  }
  if (command === 'menugruppo') {
    return await (await import('./menu-gruppo.js')).default(m, { conn, usedPrefix });
  }

  // Funzioni sincronizzate con l'handler
  const functions = {
    "Antilink": chat.antiLink,
    "Antilinkhard": chat.antiLinkHard,
    "Antispam": chat.antiSpam,
    "Antitrava": chat.antiTraba,
    "Antiviewonce": chat.antiviewonce,
    "Autosticker": chat.autosticker,
    "Benvenuto": chat.welcome,
    "Detect": chat.detect,
    "Risposte": chat.risposte,
    "Bestemmiometro": chat.bestemmiometro,
    "Antibestemmie": chat.antibestemmie,
    "GPT": chat.gpt,
    "JadiBot": chat.jadibot,
    "SoloGruppo": chat.sologruppo,
    "SoloPrivato": chat.soloprivato,
    "ModoAdmin": chat.modoadmin,
    "BanGruppo": chat.isBanned,
    "Antiporno": chat.antiporno,
    "AntiCall": chat.antiCall,
    "AntiInstagram": chat.antiinsta,
    "AntiTikTok": chat.antitiktok,
    "AntiPakistani": chat.antiArab,
    "Antivirus": chat.antivirus,
    "AntispamComandi": chat.antispamcomandi,
    "SoloMaggiorenni": chat.solomaggiorenni,
    "Antibot": chat.antibot,
    "Antinuke": chat.antinuke
  };

  let statusList = Object.entries(functions)
    .map(([name, state]) => `${state ? '🟢' : '🔴'} - *${name}*`)
    .join('\n');

  let menuText = `
╭〔*💬 𝑴𝑬𝑵𝑼 𝐅𝐔𝐍𝐙𝐈𝐎𝐍𝐈 💬*〕┈⊷
┃◈╭─────────────·๏
┃◈┃• *𝐀𝐓𝐓𝐈𝐕𝐀/𝐃𝐈𝐒𝐀𝐁𝐈𝐋𝐈𝐓𝐀*
┃◈┃
${statusList.split('\n').map(line => `┃◈┃• ${line}`).join('\n')}
┃◈┃
┃◈┃• *ℹ 𝐂𝐎𝐌𝐄 𝐒𝐈 𝐔𝐒𝐀*
┃◈┃• *🟢 attiva [funzione]* 
┃◈┃• *🔴 disattiva [funzione]*
┃◈┃
┃◈└───────────┈⊷
┃◈┃• *𝑽𝑬𝑹𝑺𝑰𝑶𝑵𝑬:* ${vs}
┃◈┃•  𝐂𝐎𝐋𝐋𝐀𝐁: 𝐃𝐑𝐆𝐁
┃◈┃• *𝐒𝐔𝐏𝐏𝐎𝐑𝐓𝐎:* (.supporto)
╰━━━━━━━━━━━━━┈·๏
`.trim();

  // Percorso dell'immagine
  const videoPath = path.join(__dirname, '../menu/edit5.mp4');

  // Invia il menu con l'immagine e i bottoni
  await conn.sendMessage(m.chat, {
    video: { url: videoPath },
    caption: menuText,
    footer: 'Scegli un menu:',
    buttons: [
      { buttonId: `${usedPrefix}menu`, buttonText: { displayText: "🏠 Menu Principale" }, type: 1 },
      { buttonId: `${usedPrefix}menuadmin`, buttonText: { displayText: "🛡️ Menu Admin" }, type: 1 },
      { buttonId: `${usedPrefix}menuowner`, buttonText: { displayText: "👑 Menu Owner" }, type: 1 },
      { buttonId: `${usedPrefix}menugruppo`, buttonText: { displayText: "👥 Menu Gruppo" }, type: 1 },
      { buttonId: `${usedPrefix}menuia`, buttonText: { displayText: "🤖 Menu IA" }, type: 1 }
    ],
    viewOnce: true,
    headerType: 4
  });
};

handler.help = ["menusicurezza", "menu", "menuadmin", "menuowner", "menugruppo"];
handler.tags = ["menu"];
handler.command = /^(menusicurezza|menu|menuadmin|menuowner|menugruppo)$/i;

export default handler;