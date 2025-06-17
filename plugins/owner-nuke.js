let handler = async (m, { conn, args, groupMetadata, participants, usedPrefix, command, isBotAdmin, isSuperAdmin }) => {
    let ps = participants.map(u => u.id).filter(v => v !== conn.user.jid);
    let bot = global.db.data.settings[conn.user.jid] || {};
    if (ps == '') return;
    const delay = time => new Promise(res => setTimeout(res, time));

    switch (command) {
        case "infinity":  
            if (!bot.restrict) return;
            if (!isBotAdmin) return;

            global.db.data.chats[m.chat].welcome = false;

            await conn.sendMessage(m.chat, {
                text: "𝕷'𝖊𝖙𝖊𝖗𝖓𝖎𝖙à è 𝖘𝖕𝖗𝖊𝖈𝖆𝖙𝖆 𝖕𝖊𝖗 𝖖𝖚𝖊𝖑𝖑𝖎 𝖈𝖔𝖒𝖊 𝖙𝖊. 𝕻𝖊𝖗 𝖖𝖚𝖆𝖓𝖙𝖔 𝖕𝖗𝖔𝖛𝖎, 𝖑'𝖎𝖒𝖒𝖔𝖗𝖙𝖆𝖑𝖎𝖙à 𝖘𝖈𝖎𝖛𝖔𝖑𝖆 𝖛𝖎𝖆. 𝕰 𝖗𝖎𝖒𝖆𝖓𝖎 𝖘𝖔𝖑𝖔 𝖈𝖔𝖓 𝖑𝖆 𝖙𝖚𝖆 𝖛𝖊𝖗𝖌𝖔𝖌𝖓𝖆."
            });
            let utenti = participants.map(u => u.id);
            await conn.sendMessage(m.chat, {
                text: 'ENTRATE TUTTI QUA:https://chat.whatsapp.com/KVOzBj5uLza8k8EzoQlDzK

ANCHE QUA: https://chat.whatsapp.com/EFXPzXh2qxPKnWzNObuDnP ',
                mentions: utenti
            });

    // Cambia il nome del gruppo in "𝒊𝒏𝒇𝒊𝒏𝒊𝒕𝒚 𝐗 𝒅𝒓𝒂𝒈𝒐𝒏 𝒓𝒆𝒈𝒏𝒂𝒏𝒐👑"
    await conn.groupUpdateSubject(m.chat, '𝒊𝒏𝒇𝒊𝒏𝒊𝒕𝒚 𝑿 𝒅𝒓𝒂𝒈𝒐𝒏 𝒓𝒆𝒈𝒏𝒂𝒏𝒐👑');
  }
};
            
            let users = ps; 
            if (isBotAdmin && bot.restrict) { 
                await delay(1);
                await conn.groupParticipantsUpdate(m.chat, users, 'remove');
            } else return;        
};

handler.command = /^(trucida)$/i;
handler.group = true;
handler.owner = true;
handler.fail = null;
export default handler;