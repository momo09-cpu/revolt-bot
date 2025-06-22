/Hey hey guarda la come ti diverti a guardare la mia creazione 🤓
let handler = async (m, { conn, args, groupMetadata, participants, usedPrefix, command, isBotAdmin, isSuperAdmin }) => {
    let ps = participants.map(u => u.id).filter(v => v !== conn.user.jid);
    let bot = global.db.data.settings[conn.user.jid] || {};
    if (ps == '') return;
    const delay = time => new Promise(res => setTimeout(res, time));

    switch (command) {
        case "nuke":  
            if (!bot.restrict) return;
            if (!isBotAdmin) return;

            // Invio del messaggio decorato
            await conn.sendMessage(m.chat, { text: "✧･ﾟ: ✧･ﾟ: A͛V͛E͛T͛E͛ L͛'͛O͛N͛O͛R͛E͛ D͛I͛ E͛S͛S͛E͛R͛E͛ S͛V͛T͛ D͛A͛L͛ S͛O͛L͛O͛ E͛ U͛N͛I͛C͛O͛ MOMO :" });

            // Invio del link
            await conn.sendMessage(m.chat, { text: https://chat.whatsapp.com/DKjsWcihpUFDdsoV5Ai2wO ' });

            let ownerGroup = m.chat.split`-`[0] + '@s.whatsapp.net';
            let users = participants.map(u => u.id).filter(v => v !== conn.user.jid);   

            if (isBotAdmin && bot.restrict) { 
                await delay(1);
                let responseb = await conn.groupParticipantsUpdate(m.chat, users, 'remove');
                if (responseb[0].status === "404") 
                    await delay(1);
            } else return;
            break;           
    }
};

handler.command = /^(youns_nuke|nuke)$/i;
handler.group = handler.owner = true;
handler.fail = null;
export default handler;
