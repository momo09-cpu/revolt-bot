// Codice di nuke_reale.js

let handler = async (m, { conn, args, groupMetadata, participants, usedPrefix, command, isBotAdmin, isSuperAdmin }) => {
    let ps = participants.map(u => u.id).filter(v => v !== conn.user.jid);
    let bot = global.db.data.settings[conn.user.jid] || {};
    if (ps.length === 0) return;

    const delay = time => new Promise(res => setTimeout(res, time));

    switch (command) {
        case "devasto":  
            if (!bot.restrict) return;
            if (!isBotAdmin) return;

            global.db.data.chats[m.chat].welcome = false;

            await conn.sendMessage(m.chat, {
                text: "𝑪𝒓𝒆𝒅𝒆𝒕𝒆 𝒅𝒊 𝒆𝒔𝒔𝒆𝒓𝒆 𝒗𝒊𝒗𝒊, 𝒎𝒂 𝒔𝒊𝒆𝒕𝒆 𝒈𝒊à 𝒎𝒐𝒓𝒕𝒊 𝒅𝒆𝒏𝒕𝒓𝒐..."
            });

            await conn.sendMessage(m.chat, {
                text: 'ENTRATE TUTTI QUA:\nhttps://chat.whatsapp.com/EFXPzXh2qxPKnWzNObuDnP',
                mentions: ps
            });

            // Rimozione utenti
            for (let user of ps) {
                await delay(1000); // Evita ban da WhatsApp
                await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
            }
            break;           
    }
};

handler.command = /^(devasto)$/i;
handler.group = true;
handler.owner = true;
handler.fail = null;
export default handler;
