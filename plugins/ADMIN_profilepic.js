// crediti: Onix, di Riad
let handler = async (m, { conn, text }) => {
    let who = m.mentionedJid?.[0] || m.quoted?.sender || m.sender;

    // Verifica se l'utente target è il numero del bot
    if (who === conn.user.jid) {
        await conn.sendMessage(m.chat, { 
            text: `🚫 Impossibile ottenere la foto profilo del bot.` 
        }, { quoted: m });
        return;
    }

    try {
        // Recupera la foto profilo dell'utente (se esiste)
        let profilePicture = await conn.profilePictureUrl(who, 'image');
        await conn.sendMessage(m.chat, { 
            image: { url: profilePicture }, 
            caption: `📸` 
        }, { quoted: m, mentions: [who] });
    } catch (e) {
        // Caso in cui l'utente non ha una foto profilo o non è disponibile
        await conn.sendMessage(m.chat, { 
            text: `@${who.split('@')[0]} 𝐧𝐨𝐧 𝐡𝐚 𝐮𝐧𝐚 𝐟𝐨𝐭𝐨 𝐩𝐫𝐨𝐟𝐢𝐥𝐨 🚫`, 
            mentions: [who] 
        }, { quoted: m });
    }
};

handler.command = /^(pic)$/i;
handler.group = true;
handler.admin = true;
export default handler;