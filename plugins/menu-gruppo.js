import { performance } from 'perf_hooks';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Definizione di __dirname per i moduli ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const handler = async (message, { conn, usedPrefix, command }) => {
    const userCount = Object.keys(global.db.data.users).length;
    const botName = global.db.data.nomedelbot || 'ChatUnity';

    if (command === 'menu') {
        return await (await import('./menu-principale.js')).default(message, { conn, usedPrefix });
    }
    if (command === 'menuadmin') {
        return await (await import('./menu-admin.js')).default(message, { conn, usedPrefix });
    }
    if (command === 'menuowner') {
        return await (await import('./menu-owner.js')).default(message, { conn, usedPrefix });
    }
    if (command === 'menusicurezza') {
        return await (await import('./menu-sicurezza.js')).default(message, { conn, usedPrefix });
    }

    const menuText = generateMenuText(usedPrefix, botName, userCount);

    const imagePath = path.join(__dirname, '../menu/revol4.png'); 

    await conn.sendMessage(
        message.chat,
        {
            image: { url: imagePath },
            caption: menuText,
            footer: 'Scegli un menu:',
            buttons: [
                { buttonId: `${usedPrefix}menu`, buttonText: { displayText: "🏠 Menu Principale" }, type: 1 },
                { buttonId: `${usedPrefix}menuadmin`, buttonText: { displayText: "🛡️ Menu Admin" }, type: 1 },
                { buttonId: `${usedPrefix}menuowner`, buttonText: { displayText: "👑 Menu Owner" }, type: 1 },
                { buttonId: `${usedPrefix}menusicurezza`, buttonText: { displayText: "🚨 Menu Sicurezza" }, type: 1 },
                { buttonId: `${usedPrefix}menuia`, buttonText: { displayText: "🤖 Menu IA" }, type: 1 }
            ],
            viewOnce: true,
            headerType: 4
        }
    );
};

async function fetchProfilePictureUrl(conn, sender) {
    try {
        return await conn.profilePictureUrl(sender);
    } catch (error) {
        return 'default-profile-picture-url'; // Fallback URL in caso di errore
    }
}

handler.help = ['menugruppo', 'menu', 'menuadmin', 'menuowner', 'menusicurezza'];
handler.tags = ['menugruppo'];
handler.command = /^(gruppo|menugruppo|menu|menuadmin|menuowner|menusicurezza)$/i;

export default handler;

function generateMenuText(prefix, botName, userCount) {
    return `
╭━〔 *⚡𝑴𝑬𝑵𝑼 𝐆𝐑𝐔𝐏𝐏𝐎⚡* 〕━┈⊷  
┃◈╭━━━━━━━━━━━━━·๏  
┃◈┃• *𝑪𝑶𝑴𝑨𝑵𝑫𝑰 𝐏𝐄𝐑 𝐈 𝐌𝐄𝐌𝐁𝐑𝐈*  
┃◈╰━━━━━━━━━━━━┈⊷  
┃◈  
┃◈╭─✦ ᴍᴜsɪᴄᴀ & ᴀᴜᴅɪᴏ ✦═╗  
┃◈┃• 🎵 *.play*  
┃◈┃• 🎥 *.playlist*   
┃◈┃• 🎶 *.shazam*  
┃◈┃• 🔊 *.tomp3*  
┃◈┃• 🎤 *.lyrics*  
┃◈╰━━━━━━━━━━━━┈⊷  
┃◈  
┃◈╭✦ ɪɴғᴏʀᴍᴀᴢɪᴏɴɪ & ᴜᴛɪʟɪᴛᴀ ✦╗  
┃◈┃• 🌍 *.meteo* 
┃◈┃• 🕒 *.orario*  
┃◈┃• 🌐 *.traduci*
┃◈┃• 📊 *.contaparole*
┃◈┃• 🆔 *.id* 
┃◈┃• 💻 *.gitclone* (repo)
┃◈┃• ℹ️ *.info* [@utente]
┃◈┃• 📜 *.regole*
┃◈┃• 📚 *.wikipedia* 
┃◈┃• 🔍 *.checkscam* 
┃◈┃• 📜 *.dashboard*  
┃◈┃• 🔍 *.phsearch*  
┃◈┃• 🔍 *.cercaimmagine* 
┃◈┃• 🎼 *.fyadd*  
┃◈┃• ❓ *.script*  
┃◈╰━━━━━━━━━━━━┈⊷  
┃◈  
┃◈╭✦ ɪᴍᴍᴀɢɪɴɪ & ᴍᴏᴅɪғɪᴄᴀ ✦╗  
┃◈┃• 🛠️ *.sticker* 
┃◈┃• 🖼️ *.png*
┃◈┃• 📷 *.hd*  
┃◈┃• 🖼️ *.rimuovisfondo* 
┃◈┃• 🔍 *.rivela*  
┃◈┃• 🖼️ *.toimg*  
┃◈┃• 📖 *.leggi* 
┃◈┃• 🌀 *.blur*  
┃◈┃• 🖼️ *.pinterest* (in arrivo)  
┃◈┃• 🎴 *.hornycard* [@utente]  
┃◈┃• 🧠 *.stupido/a* @  
┃◈┃• 🌀 *.emojimix*  
┃◈╰━━━━━━━━━━━━┈⊷  
┃◈  
┃◈╭─✦ ɢᴀɴɢ sɪsᴛᴇᴍ ✦═╗  
┃◈┃• 🥷🏻 *.creagang*  
┃◈┃• 🔪 *.infogang*  
┃◈┃• ⛓ *.abbandonagang*  
┃◈┃• 🩸 *.invitogang* @  
┃◈┃• 🎧 *.caccialogang* @  
┃◈╰━━━━━━━━━━━━┈⊷  
┃◈  
┃◈╭─✦ ɢɪᴏᴄʜɪ & ᴄᴀsɪɴᴏ̀* ✦╗  
┃◈┃• 🎮 *.tris*  
┃◈┃• 🎲 *.dado*  
┃◈┃• 🎰 *.slot*  
┃◈┃• 🃏 *.casinò*  
┃◈┃• 💰 *.scommessa*   
┃◈┃• 🔫 *.roulette*  
┃◈┃• 🪙 *.testa o croce
┃◈┃• 🧮 *.mate* 
┃◈┃• 📈 *.scf* 
┃◈┃• 🐾 *.pokedex*
┃◈╰━━━━━━━━━━━━┈⊷  
┃◈  
┃◈╭✦ ᴇᴄᴏɴᴏᴍɪᴀ & ᴄʟᴀssɪғɪᴄʜᴇ ✦╗  
┃◈┃• 💰 *.portafoglio*
┃◈┃• 🏦 *.banca*   
┃◈┃• 💸 *.daily*  
┃◈┃• 🏆 *.classifica* 
┃◈┃• 💳 *.donauc* 
┃◈┃• 🛒 *.compra*
┃◈┃• 🤑 *.ruba* @utente  
┃◈┃• 📤 *.ritira*   
┃◈┃• ⛏️ *.mina*  
┃◈┃• 📊 *.xp*  
┃◈┃• ♻️ *.donaxp* @utente  
┃◈┃• 🎯 *.rubaxp* @utente  
┃◈╰━━━━━━━━━━━━┈⊷  
┃◈  
┃◈╭✦ ɪɴᴛᴇʀᴀᴢɪᴏɴɪ sᴏᴄɪᴀʟɪ ✦╗  
┃◈┃• 💍 *.sposami*  
┃◈┃• 💔 *.divorzia*  
┃◈┃• 💌 *.amore* @utente   
┃◈┃• 💋 *.bacia* @utente  
┃◈┃• 😡 *.odio* @utente  
┃◈┃• 🗣️ *.rizz* @utente  
┃◈┃• 🤫 *.segreto* @utente  
┃◈┃• ☠️ *.minaccia* @utente  
┃◈┃• 🔥 *.zizzania* @utente  
┃◈┃• 🚫 *.obbligo* (obb o v)  
┃◈┃• 💋 *.ditalino* @  
┃◈┃• 💋 *.sega* @  
┃◈┃• 💋 *.scopa* @  
┃◈┃• 🖕 *.insulta* @  
┃◈┃• 💍 *.sposa* @  
┃◈┃• 👥 *.amicizia/listamici* @  
┃◈╰━━━━━━━━━━━━┈⊷  
┃◈  
┃◈╭✦ ǫᴜᴀɴᴛᴏ ᴇ? ✦╗  
┃◈┃• 🏳‍🌈 *.gay* @  
┃◈┃• 🏳‍🌈 *.lesbica* @  
┃◈┃• ♿ *.ritardato/a* @  
┃◈┃• ♿ *.down* @  
┃◈┃• ♿ *.disabile* @  
┃◈┃• ♿ *.mongoloide* @  
┃◈┃• ⚫ *.negro* @  
┃◈╰━━━━━━━━━━━━┈⊷  
┃◈  
┃◈╭✦ ᴛᴇsᴛ ᴘᴇʀsᴏɴᴀʟɪᴛᴀ̀ ✦╗  
┃◈┃• 🍺 *.alcolizzato*  
┃◈┃• 🌿 *.drogato*  
┃◈┃• 🍑 *.figa*  
┃◈┃• 🍑 *.ano*  
┃◈┃• 🎭 *.personalita*  
┃◈┃• 🔮 *.zodiaco*  
┃◈┃• 🏹 *.nomeninja*  
┃◈┃• 😈 *.infame*  
┃◈┃• 🙏 *.topbestemmie*  
┃◈╰━━━━━━━━━━━━┈⊷  
┃◈  
┃◈╭✦ sᴛɪᴄᴋᴇʀ & ᴍᴇᴅɪᴀ ✦╗  
┃◈┃• 🤕 *.bonk* (meme)  
┃◈┃• 👑 *.autoadmin*  
┃◈╰━━━━━━━━━━━━┈⊷  
┃◈  
┃◈┃• 𝑽𝑬𝑹𝑺𝑰𝑶𝑵𝑬: ${vs}  
┃◈┃• 𝐂𝐎𝐋𝐋𝐀𝐁: 3𝐓𝐎𝐎𝐂 
┃◈┃• 𝐒𝐔𝐏𝐏𝐎𝐑𝐓𝐎: ᴍᴏᴍᴏ 
┃◈└──────────┈⊷  
╰━━━━━━━━━━━━━┈⊷  

  `
}
