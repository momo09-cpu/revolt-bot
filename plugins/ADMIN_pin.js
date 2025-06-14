let handler = async (m, { conn, command }) => {
    if (!m.quoted) return m.reply(`⚠️ Rispondi a un messaggio per ${command === 'pin' ? 'fissarlo' : 'rimuoverlo dai fissati'}.`);
    try {
        let messageKey = {
            remoteJid: m.chat,
            fromMe: m.quoted.fromMe,
            id: m.quoted.id,
            participant: m.quoted.sender
        };

        if (command === 'pin') {
            await conn.sendMessage(m.chat, { pin: messageKey, type: 1, time: 604800 });
            
            m.react("✅️");
        }

        if (command === 'unpin') {
            await conn.sendMessage(m.chat, { pin: messageKey, type: 2, time: 86400 });
            
            m.react("✅️");
        }

        if (command === 'destacar') {
            conn.sendMessage(m.chat, { keep: messageKey, type: 1, time: 15552000 });
            m.react("✅️");
        }

        if (command === 'desmarcar') {
            conn.sendMessage(m.chat, { keep: messageKey, type: 2, time: 86400 });
            m.react("✅️");
        }
    } catch (error) {
        console.error(error);
    }
};

handler.help = ['pin'];
handler.tags = ['gruppo'];
handler.command = ['pin', 'unpin', 'destacar', 'desmarcar'];
handler.admin = true;
handler.group = true;
handler.botAdmin = true;


export default handler;