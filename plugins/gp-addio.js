import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  const chatId = m.chat;
  const senderId = m.sender;

  // Lista whitelist locale (solo per questo comando)
  const localWhitelist = [
    '639649477630@s.whatsapp.net', // Sostituisci con numeri reali
    
  ];

  

  // Trova l'utente da rimuovere
  let target;
  if (m.quoted) {
    target = m.quoted.sender;
  } else if (m.mentionedJid && m.mentionedJid[0]) {
    target = m.mentionedJid[0];
  } else {
    return m.reply('𝐂𝐡𝐢 𝐝𝐞𝐯𝐨 𝐟𝐚𝐫 𝐟𝐮𝐨𝐫𝐢? 👀');
  }

  const groupMetadata = await conn.groupMetadata(chatId);
  const groupOwner = groupMetadata.owner || chatId.split('-')[0] + '@s.whatsapp.net';
  const botNumber = conn.user.jid;

  // Protezioni
  if (target === botNumber) {
    throw '✯ 𝐇𝐚𝐢 𝐟𝐚𝐥𝐥𝐢𝐭𝐨 😂';
  }
  if (target === groupOwner) {
    throw '✯ 𝐍𝐨𝐧 𝐩𝐮𝐨𝐢 𝐫𝐢𝐦𝐮𝐨𝐯𝐞𝐫𝐞 𝐢𝐥 𝐜𝐫𝐞𝐚𝐭𝐨𝐫𝐞 𝐝𝐞𝐥 𝐠𝐫𝐮𝐩𝐩𝐨';
  }
  if (localWhitelist.includes(target)) {
    throw '✯ 𝐑𝐢𝐚𝐝 𝐭𝐢 𝐢𝐧𝐜𝐮𝐥𝐚 𝐬𝐞 𝐜𝐢 𝐫𝐢𝐩𝐫𝐨𝐯𝐢.';
  }

  // Prendi immagine profilo o fallback
  let profilePic = './src/avatar_contact.png';
  try {
    profilePic = await conn.profilePictureUrl(target, 'image');
  } catch {}

  let thumb;
  try {
    thumb = await (await fetch(profilePic)).buffer();
  } catch {
    thumb = await (await fetch('https://qu.ax/LoGxD.png')).buffer(); // fallback
  }

  // Crea messaggio visuale con immagine
  let quotedMessage = {
    key: {
      participants: '0@s.whatsapp.net',
      fromMe: false,
      id: 'Halo'
    },
    message: {
      locationMessage: {
        name: ' 𝙧ᥱ𝙫𝗈ᶩէ💠',
        jpegThumbnail: await (await fetch('https://qu.ax/rOuCV.png')).buffer()
      }
    },
    participant: '0@s.whatsapp.net'
  };

  const text = ' `𝑬𝒍𝒊𝒎𝒊𝒏𝒂𝒛𝒊𝒐𝒏𝒆 𝒄𝒐𝒈𝒍𝒊𝒐𝒏𝒆 𝒊𝒏 𝒄𝒐𝒓𝒔𝒐...` ';

  await conn.sendMessage(chatId, {
    text,
    contextInfo: {
      externalAdReply: {
        title: await conn.getName(target) + ' ',
        body: '𝑹𝒊𝒎𝒐𝒛𝒊𝒐𝒏𝒆 𝒖𝒕𝒆𝒏𝒕𝒆 🚫',
        previewType: 'PHOTO',
        thumbnail: thumb,
        
        mediaType: 1
      }
    }
  }, { quoted: quotedMessage });

  await conn.groupParticipantsUpdate(chatId, [target], 'remove');
};

handler.customPrefix = /kick|outnigga|momo ti odia|puffo|kamehameha|seba ti odia/i
handler.command = new RegExp
handler.admin = true;
handler.group = true;
handler.botAdmin = true;

export default handler;