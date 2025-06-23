import { createHash } from 'crypto';
import PhoneNumber from 'awesome-phonenumber';
import fetch from 'node-fetch';
import fs from 'fs';

const handler = async (m, { conn, usedPrefix, command }) => {
  const mention = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.quoted;
  const who = mention ? mention : m.sender;
  const user = global.db.data.users[who] || {};

  if (!global.db.data.users[who]) {
    global.db.data.users[who] = { ex: [] };
  }

  let pic;
  try {
    pic = await conn.profilePictureUrl(who, 'image');
  } catch (error) {
    pic = null;
  }

  const prova = { "key": {"participants": "0@s.whatsapp.net","fromMe": false, "id": "Halo" }, "message": {
    "locationMessage": { name: `𝐏𝐑Ꮻ𝐅𝕀𝐋Ꮻ 𝐔𝐓𝚵𝐍𝐓𝚵`,
    jpegThumbnail: fs.readFileSync('./icone/bal.png'),
    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}},
    "participant": "0@s.whatsapp.net"
  };

  let list = [];
  for (let i = 0; i < user.ex.length; i++) {
    list.push("@" + user.ex[i].split("@")[0]);
  }

  conn.sendMessage(m.chat, {
    text: `ೋೋ══ • ══ೋೋ
> 𝐍𝐨𝐦𝐞: ${user.name && user.name.trim() !== '' ? user.name : 'Sconosciuto'}
ೋೋ══ • ══ೋೋ
𝐒𝐩𝐨𝐬𝐚𝐭𝐨/𝐚: ${user.sposato ? 'si' : 'no'}
𝐂𝐨𝐧𝐢𝐮𝐠𝐞: ${user.coniuge ? "@" + user.coniuge.split('@')[0] : "nessuno"}
𝐄𝐱 𝐂𝐨𝐧𝐢𝐮𝐠𝐢: ${list.length > 0 ? list.join("\n") : ''}
ೋೋ══ • ══ೋೋ`,
    contextInfo: {
      mentionedJid: [user.coniuge, user.ex],
      externalAdReply: {
        showAdAttribution: true,
        //title: `${user.name && user.name.trim() !== '' ? user.name : 'Sconosciuto'}`,
        //body: `${usedPrefix}𝐬𝐞𝐭𝐢𝐠 + 𝐧𝐨𝐦𝐞 𝐢𝐠 𝐩𝐞𝐫 𝐢𝐦𝐩𝐨𝐬𝐭𝐚𝐫𝐞 𝐢𝐧𝐬𝐭𝐚`,
        sourceUrl: "https://wa.me/" + (mention ? mention.split("@")[0] : m.sender.split("@")[0]),
        thumbnail: pic ? await (await fetch(pic)).buffer() : await (await fetch('https://telegra.ph/file/17e7701f8b0a63806e312.png')).buffer()
      }
    }
  }, { quoted: prova });
};

handler.command = ['famiglia'];
export default handler;