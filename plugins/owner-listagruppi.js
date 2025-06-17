const handler = async (m, { conn }) => {  
  let output = [  
    `𝐋𝐈𝐒𝐓𝐀 𝐃𝐄𝐈 𝐆𝐑𝐔𝐏𝐏𝐈 𝐃𝐈 ${nomebot}`,  
    ''  
  ];  

  const groups = Object.entries(conn.chats)  
    .filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats)  
    .sort(([jidA], [jidB]) => {  
      const messaggiA = global.db.data.chats[jidA]?.messaggi || 0;  
      const messaggiB = global.db.data.chats[jidB]?.messaggi || 0;  
      return messaggiB - messaggiA;  
    });  

  output.push(`➣ 𝐓𝐨𝐭𝐚𝐥𝐞 𝐆𝐫𝐮𝐩𝐩𝐢: ${groups.length}`, '\n══════ ೋೋ══════\n');  

  for (const [index, [jid]] of groups.entries()) {  
    let groupMetadata = {};  
    try {  
      groupMetadata = conn.chats[jid]?.metadata || (await conn.groupMetadata(jid)) || {};  
    } catch (error) {}  

    const participants = groupMetadata.participants || [];  
    const totalParticipants = participants.length;  
    const botParticipant = participants.find(p => conn.decodeJid(p.id) === conn.user.jid);  
    const isBotAdmin = botParticipant?.admin ?? false;  

    let groupName = 'Nome non disponibile';  
    try {  
      groupName = await conn.getName(jid);  
    } catch (error) {}  

    const groupMessages = global.db.data.chats[jid]?.messaggi || 0;  

    let groupInviteLink = global.db.data.chats[jid]?.groupInviteLink || 'Non disponibile';  
    if (isBotAdmin) {  
      try {  
        const code = await conn.groupInviteCode(jid);  
        groupInviteLink = `https://chat.whatsapp.com/${code}`;  
        global.db.data.chats[jid] = {  
          ...global.db.data.chats[jid],  
          groupInviteLink  
        };  
      } catch (error) {}  
    }  

    output.push(  
      `➣ 𝐆𝐑𝐔𝐏𝐏Ꮻ 𝐍𝐔𝐌𝚵𝐑Ꮻ: ${index + 1}`,  
      `➣ 𝐆𝐑𝐔𝐏𝐏Ꮻ: ${groupName}`,  
      `➣ 𝐏𝚲𝐑𝐓𝚵𝐂𝚲𝐏𝚲𝐍𝐓𝕀: ${totalParticipants}`,  
      `➣ 𝐌𝚵𝐒𝐒𝚲𝐆𝐆𝕀: ${groupMessages}`,  
      `➣ 𝚲𝐃𝐌𝕀𝐍: ${isBotAdmin ? '✓' : '☓'}`,  
      `➣ 𝕀𝐃: ${jid}`,  
      `➣ 𝐋𝕀𝐍𝐊: ${groupInviteLink}`,  
      '\n══════ ೋೋ══════\n'  
    );  
  }  

  m.reply(output.join('\n'));  
};  

handler.command = /^(gruppi)$/i;  
handler.owner = true;  
export default handler;