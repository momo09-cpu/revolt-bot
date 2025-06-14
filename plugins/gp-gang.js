const gangRequests = {};
const gangData = {}; // Per memorizzare i dati delle gang

let handler = async (m, { conn, participants, command, text, args, usedPrefix }) => {
    let users = global.db.data.users;
    let user = users[m.sender];

    switch (command) {
        case 'creagang':
            await handleCreateGang(m, user, users, text, usedPrefix, conn);
            break;
        case 'invitogang':
            await handleGangInvite(m, user, users, text, usedPrefix, conn);
            break;
        case 'abbandonagang':
            handleLeaveGang(m, user, users);
            break;
        case 'caccialogang':
            handleKickFromGang(m, user, users);
            break;
        case 'infogang':
            handleGangInfo(m, user, users);
            break;
    }
};

const handleCreateGang = async (m, user, users, text, usedPrefix, conn) => {
    if (!text) throw `🔫 𝗖𝗼𝗺𝗲 𝗰𝗿𝗲𝗮𝗿𝗲 𝘂𝗻𝗮 𝗴𝗮𝗻𝗴:\n\n${usedPrefix}creagang <nome> <emoji>\n\n𝗘𝘀𝗲𝗺𝗽𝗶𝗼: ${usedPrefix}creagang Bloods 🩸\n𝗘𝘀𝗲𝗺𝗽𝗶𝗼: ${usedPrefix}creagang Crips 🔵`;
    
    const [gangName, emoji] = text.split(' ');
    if (!gangName || !emoji) throw '❌ 𝗗𝗲𝘃𝗶 𝗶𝗻𝘀𝗲𝗿𝗶𝗿𝗲 𝘂𝗻 𝗻𝗼𝗺𝗲 𝗲 𝘂𝗻\'𝗲𝗺𝗼𝗷𝗶 𝗽𝗲𝗿 𝗹𝗮 𝘁𝘂𝗮 𝗴𝗮𝗻𝗴!';
    
    if (user.gang) throw '🚫 𝗙𝗮𝗶 𝗴𝗶𝗮̀ 𝗽𝗮𝗿𝘁𝗲 𝗱𝗶 𝘂𝗻𝗮 𝗴𝗮𝗻𝗴! 𝗨𝘀𝗮 /abbandonagang 𝗽𝗲𝗿 𝘂𝘀𝗰𝗶𝗿𝗲.';
    
    const gangId = generateGangId();
    gangData[gangId] = {
        name: gangName,
        emoji: emoji,
        leader: m.sender,
        members: [m.sender],
        createdAt: new Date().toISOString()
    };
    
    user.gang = {
        id: gangId,
        role: 'leader'
    };
    
    await conn.sendMessage(m.chat, { 
        text: `🎌 𝗚𝗮𝗘𝗥𝗥𝗜𝗔 𝗡𝗔𝗦𝗖𝗘 𝗨𝗡𝗔 𝗡𝗨𝗢𝗩𝗔 𝗚𝗔𝗔𝗡𝗚! 🔫\n\n*${emoji} ${gangName} ${emoji}*\n\n👑 𝗖𝗮𝗽𝗼: @${m.sender.split('@')[0]}\n🆔 𝗖𝗼𝗱𝗶𝗰𝗲: ${gangId}\n\n𝗨𝘀𝗮 /invitogang 𝗽𝗲𝗿 𝗶𝗻𝘃𝗶𝘁𝗮𝗿𝗲 𝗺𝗲𝗺𝗯𝗿𝗶!`,
        mentions: [m.sender]
    });
};

const handleGangInvite = async (m, user, users, text, usedPrefix, conn) => {
    if (!user.gang) throw '🚫 𝗡𝗼𝗻 𝗳𝗮𝗶 𝗽𝗮𝗿𝘁𝗲 𝗱𝗶 𝗻𝗲𝘀𝘀𝘂𝗻𝗮 𝗴𝗮𝗻𝗴! 𝗖𝗿𝗲𝗮𝗻𝗲 𝘂𝗻𝗮 𝗰𝗼𝗻 /creagang';
    if (user.gang.role !== 'leader') throw '🔪 𝗦𝗼𝗹𝗼 𝗶𝗹 𝗰𝗮𝗽𝗼 𝗽𝘂𝗼̀ 𝗶𝗻𝘃𝗶𝘁𝗮𝗿𝗲 𝗺𝗲𝗺𝗯𝗿𝗶!';
    
    let mention = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : null;
    if (!mention) throw `🔫 𝗧𝗮𝗴𝗴𝗮 𝗶𝗹 𝗳𝘂𝘁𝘂𝗿𝗼 𝗺𝗮𝗻𝗴𝘀𝘁𝗲𝗿!\n\n𝗘𝘀𝗲𝗺𝗽𝗶𝗼: ${usedPrefix}invitogang @utente`;
    
    if (mention === m.sender) throw '🤡 𝗡𝗼𝗻 𝗽𝘂𝗼𝗶 𝗶𝗻𝘃𝗶𝘁𝗮𝗿𝗲 𝘁𝗲 𝘀𝘁𝗲𝘀𝘀𝗼!';
    
    let targetUser = users[mention];
    if (!targetUser) throw '🚫 𝗨𝘁𝗲𝗻𝘁𝗲 𝗻𝗼𝗻 𝘁𝗿𝗼𝘃𝗮𝘁𝗼';
    if (targetUser.gang) throw '🚷 𝗤𝘂𝗲𝘀𝘁𝗼 𝗴𝗮𝗻𝗴𝘀𝘁𝗲𝗿 𝗳𝗮 𝗴𝗶𝗮̀ 𝗽𝗮𝗿𝘁𝗲 𝗱𝗶 𝘂𝗻𝗮 𝗴𝗮𝗻𝗴!';
    
    if (gangRequests[mention]) throw '⏳ 𝗛𝗮𝗶 𝗴𝗶𝗮̀ 𝗶𝗻𝘃𝗶𝘁𝗮𝘁𝗼 𝗾𝘂𝗲𝘀𝘁𝗼 𝗺𝗲𝗺𝗯𝗿𝗼! 𝗔𝘀𝗽𝗲𝘁𝘁𝗮 𝗹𝗮 𝘀𝘂𝗮 𝗿𝗶𝘀𝗽𝗼𝘀𝘁𝗮.';
    
    const gangInfo = gangData[user.gang.id];
    gangRequests[mention] = {
        from: m.sender,
        gangId: user.gang.id,
        timeout: null
    };
    
    let inviteMsg = `🔫 *𝗜𝗡𝗩𝗜𝗧𝗢 𝗗𝗜 𝗚𝗔𝗡𝗚* 🔫\n\n@${m.sender.split('@')[0]} 𝘁𝗶 𝘀𝘁𝗮 𝗶𝗻𝘃𝗶𝘁𝗮𝗻𝗱𝗼 𝗮 𝗳𝗮𝗿𝗲 𝗽𝗮𝗿𝘁𝗲 𝗱𝗲𝗹𝗹𝗮 𝗴𝗮𝗻𝗴:\n\n*${gangInfo.emoji} ${gangInfo.name} ${gangInfo.emoji}*\n\n💀 𝗥𝗶𝘀𝗽𝗼𝗻𝗱𝗶 "𝗮𝗰𝗰𝗲𝘁𝘁𝗮" 𝗽𝗲𝗿 𝗲𝗻𝘁𝗿𝗮𝗿𝗲 𝗼 "𝗿𝗶𝗳𝗶𝘂𝘁𝗮" 𝗽𝗲𝗿 𝗿𝗶𝗳𝗶𝘂𝘁𝗮𝗿𝗲.\n⏳ 𝗛𝗮𝗶 𝟲𝟬 𝘀𝗲𝗰𝗼𝗻𝗱𝗶 𝗽𝗲𝗿 𝗱𝗲𝗰𝗶𝗱𝗲𝗿𝗲!`;
    await conn.sendMessage(m.chat, { 
        text: inviteMsg, 
        mentions: [mention, m.sender] 
    });
    
    // Timeout dopo 60 secondi
    gangRequests[mention].timeout = setTimeout(() => {
        if (gangRequests[mention]) {
            conn.sendMessage(m.chat, { 
                text: `⌛ 𝗟'𝗶𝗻𝘃𝗶𝘁𝗼 𝗽𝗲𝗿 @${mention.split('@')[0]} 𝗲̀ 𝘀𝗰𝗮𝗱𝘂𝘁𝗼!`, 
                mentions: [mention] 
            });
            delete gangRequests[mention];
        }
    }, 60000);
};

handler.before = async (m, { conn }) => {
    let users = global.db.data.users; // Ensure users is defined
    if (!(m.sender in gangRequests)) return;
    
    const request = gangRequests[m.sender];
    clearTimeout(request.timeout);
    
    if (/^accetta$/i.test(m.text)) {
        const gangId = request.gangId;
        const gangInfo = gangData[gangId];
        const inviter = request.from;
        
        gangInfo.members.push(m.sender);
        users[m.sender].gang = {
            id: gangId,
            role: 'member'
        };
        
        await conn.sendMessage(m.chat, {
            text: `🎊 @${m.sender.split('@')[0]} 𝗲̀ 𝗲𝗻𝘁𝗿𝗮𝘁𝗼 𝗻𝗲𝗹𝗹𝗮 𝗴𝗮𝗻𝗴 *${gangInfo.emoji} ${gangInfo.name} ${gangInfo.emoji}*! 🔥\n\n𝗡𝘂𝗺𝗲𝗿𝗼 𝗱𝗶 𝗺𝗲𝗺𝗯𝗿𝗶: ${gangInfo.members.length}`,
            mentions: [m.sender]
        });
        
        delete gangRequests[m.sender];
    }
    else if (/^rifiuta$/i.test(m.text)) {
        await conn.sendMessage(m.chat, {
            text: `💢 @${m.sender.split('@')[0]} 𝗵𝗮 𝗿𝗶𝗳𝗶𝘂𝘁𝗮𝘁𝗼 𝗹'𝗶𝗻𝘃𝗶𝘁𝗼 𝗱𝗶 𝗴𝗮𝗻𝗴!`,
            mentions: [m.sender]
        });
        delete gangRequests[m.sender];
    }
};

const handleLeaveGang = (m, user, users) => {
    if (!user.gang) throw '🚫 𝗡𝗼𝗻 𝗳𝗮𝗶 𝗽𝗮𝗿𝘁𝗲 𝗱𝗶 𝗻𝗲𝘀𝘀𝘂𝗻𝗮 𝗴𝗮𝗻𝗴!';
    
    const gangId = user.gang.id;
    const gangInfo = gangData[gangId];
    
    if (user.gang.role === 'leader') {
        // Se il leader lascia, la gang viene sciolta
        gangInfo.members.forEach(member => {
            if (users[member]) users[member].gang = null;
        });
        delete gangData[gangId];
        return m.reply(`💥 𝗟𝗮 𝗴𝗮𝗻𝗴 *${gangInfo.name}* 𝘀𝗶 𝘀𝗰𝗶𝗼𝗴𝗹𝗶𝗲! 𝗜𝗹 𝗰𝗮𝗽𝗼 @${m.sender.split('@')[0]} 𝗹'𝗵𝗮 𝗮𝗯𝗯𝗮𝗻𝗱𝗼𝗻𝗮𝘁𝗮.`, null, { mentions: [m.sender] });
    }
    
    // Rimuovi il membro
    gangInfo.members = gangInfo.members.filter(member => member !== m.sender);
    user.gang = null;
    
    m.reply(`🏳️ 𝗛𝗮𝗶 𝗮𝗯𝗯𝗮𝗻𝗱𝗼𝗻𝗮𝘁𝗼 𝗹𝗮 𝗴𝗮𝗻𝗴 *${gangInfo.name}*!`);
};

const handleKickFromGang = (m, user, users) => {
    if (!user.gang) throw '🚫 𝗡𝗼𝗻 𝗳𝗮𝗶 𝗽𝗮𝗿𝘁𝗲 𝗱𝗶 𝗻𝗲𝘀𝘀𝘂𝗻𝗮 𝗴𝗮𝗻𝗴!';
    if (user.gang.role !== 'leader') throw '🔪 𝗦𝗼𝗹𝗼 𝗶𝗹 𝗰𝗮𝗽𝗼 𝗽𝘂𝗼̀ 𝗰𝗮𝗰𝗰𝗶𝗮𝗿𝗲 𝗾𝘂𝗮𝗹𝗰𝗰𝘂𝗻𝗼!';
    
    let mention = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : null;
    if (!mention) throw '🔫 𝗧𝗮𝗴𝗴𝗮 𝗶𝗹 𝗺𝗲𝗺𝗯𝗿𝗼 𝗱𝗮 𝗰𝗮𝗰𝗰𝗶𝗮𝗿𝗲!';
    if (mention === m.sender) throw '🤡 𝗡𝗼𝗻 𝗽𝘂𝗼𝗶 𝗰𝗮𝗰𝗰𝗶𝗮𝗿𝗲 𝘁𝗲 𝘀𝘁𝗲𝘀𝘀𝗼!';
    
    const gangId = user.gang.id;
    const gangInfo = gangData[gangId];
    
    if (!gangInfo.members.includes(mention)) throw '🚷 𝗤𝘂𝗲𝘀𝘁𝗼 𝗴𝗮𝗻𝗴𝘀𝘁𝗲𝗿 𝗻𝗼𝗻 𝗳𝗮 𝗽𝗮𝗿𝘁𝗲 𝗱𝗲𝗹𝗹𝗮 𝘁𝘂𝗮 𝗴𝗮𝗻𝗴!';
    
    // Rimuovi il membro
    gangInfo.members = gangInfo.members.filter(member => member !== mention);
    if (users[mention]) users[mention].gang = null;
    
    m.reply(`🔪 @${mention.split('@')[0]} 𝘀𝘁𝗮𝘁𝗲 𝗰𝗮𝗰𝗰𝗶𝗮𝘁𝗼 𝗱𝗮𝗹𝗹𝗮 𝗴𝗮𝗻𝗴!`, null, { mentions: [mention] });
};

const handleGangInfo = (m, user, users) => {
    if (!user.gang) throw '🚫 𝗡𝗼𝗻 𝗳𝗮𝗶 𝗽𝗮𝗿𝘁𝗲 𝗱𝗶 𝗻𝗲𝘀𝘀𝘂𝗻𝗮 𝗴𝗮𝗻𝗴!';
    
    const gangId = user.gang.id;
    const gangInfo = gangData[gangId];
    
    let membersList = gangInfo.members.map(member => {
        let role = member === gangInfo.leader ? '👑 Capo' : '💀 Soldato';
        return `• @${member.split('@')[0]} (${role})`;
    }).join('\n');
    
    let infoMsg = `🔫 *𝗜𝗡𝗙𝗢 𝗚𝗔𝗡𝗚* 🔫\n\n` +
                 `*${gangInfo.emoji} ${gangInfo.name} ${gangInfo.emoji}*\n\n` +
                 `🆔 𝗖𝗼𝗱𝗶𝗰𝗲: ${gangId}\n` +
                 `📅 𝗙𝗼𝗻𝗱𝗮𝘁𝗮: ${new Date(gangInfo.createdAt).toLocaleDateString()}\n` +
                 `👥 𝗠𝗲𝗺𝗯𝗿𝗶 (${gangInfo.members.length}):\n${membersList}`;
    
    m.reply(infoMsg, null, { mentions: gangInfo.members });
};

// Funzione helper per generare ID gang
function generateGangId() {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
}

handler.command = ['creagang', 'invitogang', 'abbandonagang', 'caccialogang', 'infogang'];
handler.help = [
    'creagang <nome> <emoji> - Crea una nuova gang',
    'invitogang @utente - Invita un utente nella tua gang',
    'abbandonagang - Lascia la tua gang',
    'caccialogang @utente - Caccia un membro dalla gang (solo capo)',
    'infogang - Mostra info sulla tua gang'
];

export default handler;