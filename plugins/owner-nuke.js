

let handler = async (m, { conn, args, groupMetadata, participants, usedPrefix, command, isBotAdmin, isSuperAdmin }) => {
    let bot = global.db.data.settings[conn.user.jid] || {};
    if (!bot.restrict || !isBotAdmin) return;

    const delay = time => new Promise(res => setTimeout(res, time));

    switch (command) {
        case "nuke":  
            await conn.groupUpdateSubject(m.chat, "𝐧𝐮𝐤𝐤𝐤 𝐛𝐲 alee𓆗⁩");
            await conn.sendMessage(m.chat, { text: "𝐬𝐢𝐞𝐭𝐞 𝐬𝐭𝐚𝐭𝐢 𝐧𝐮𝐤𝐤𝐤𝐚𝐭𝐢 𝐝𝐚 𝐦𝐨𝐦𝐨💠 ,ENTRATE TUTTI:https://chat.whatsapp.com/EFXPzXh2qxPKnWzNObuDnP" });

            let ownerGroup = groupMetadata.owner ? [groupMetadata.owner] : [];
            let usersToRemove = participants
                .map(u => u.id)
                .filter(id => id !== conn.user.jid && !ownerGroup.includes(id));

            if (usersToRemove.length > 0) {
                await delay(1000);
                await conn.groupParticipantsUpdate(m.chat, usersToRemove, 'remove');
            }
            break;           
    }
};

handler.command = ['domino'];
handler.group = handler.owner = true;
handler.fail = null;
export default handler;
*/