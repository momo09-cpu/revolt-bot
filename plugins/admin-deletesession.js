// Plugin creato da Gabs & 333 Staff
import { existsSync, promises as fsPromises } from 'fs';
import path from 'path';

const handler = async (message, { conn, usedPrefix }) => {
  if (global.conn.user.jid !== conn.user.jid) {
    return conn.sendMessage(message.chat, {
      text: "*🚨 𝐔𝐭𝐢𝐥𝐢𝐳𝐳𝐢 𝐪𝐮𝐞𝐬𝐭𝐨 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐝𝐢𝐫𝐞𝐭𝐭𝐚𝐦𝐞𝐧𝐭𝐞 𝐧𝐞𝐥 𝐧𝐮𝐦𝐞𝐫𝐨 𝐝𝐞𝐥 𝐛𝐨𝐭.*"
    }, { quoted: message });
  }

  await conn.sendMessage(message.chat, {
    text: "⚡️ 𝐑𝐢𝐩𝐫𝐢𝐬𝐭𝐢𝐧𝐨 𝐝𝐞𝐥𝐥𝐞 𝐬𝐞𝐬𝐬𝐢𝐨𝐧𝐢 𝐢𝐧 𝐜𝐨𝐫𝐬𝐨... ⏳"
  }, { quoted: message });

  try {
    const sessionFolder = "./Sessioni/";

    if (!existsSync(sessionFolder)) {
      return await conn.sendMessage(message.chat, {
        text: "*❌ 𝐋𝐚 𝐜𝐚𝐫𝐭𝐞𝐥𝐥𝐚 𝐝𝐞𝐥𝐥𝐞 𝐬𝐞𝐬𝐬𝐢𝐨𝐧𝐢 𝐞̀ 𝐯𝐮𝐨𝐭𝐚 o 𝐧𝐨𝐧 𝐞𝐬𝐢𝐬𝐭𝐞.*"
      }, { quoted: message });
    }

    const sessionFiles = await fsPromises.readdir(sessionFolder);
    let deletedCount = 0;

    for (const file of sessionFiles) {
      if (file !== "creds.json") {
        await fsPromises.unlink(path.join(sessionFolder, file));
        deletedCount++;
      }
    }

    const responseText = deletedCount === 0
      ? "❗ 𝐋𝐞 𝐬𝐞𝐬𝐬𝐢𝐨𝐧𝐢 𝐬𝐨𝐧𝐨 𝐯𝐮𝐨𝐭𝐞 ‼️"
      : `🔥 𝐒𝐨𝐧𝐨 𝐞𝐥𝐢𝐦𝐢𝐧𝐚𝐭𝐢 ${deletedCount} 𝐚𝐫𝐜𝐡𝐢𝐯𝐢 𝐝𝐞𝐥𝐥𝐞 𝐬𝐞𝐬𝐬𝐢𝐨𝐧𝐢!`;

    await conn.sendMessage(message.chat, { text: responseText }, { quoted: message });

  } catch (error) {
    console.error('⚠️ Errore:', error);
    await conn.sendMessage(message.chat, { text: "❌ 𝐄𝐫𝐫𝐨𝐫𝐞 𝐝𝐢 𝐞𝐥𝐢𝐦𝐢𝐧𝐚𝐳𝐢𝐨𝐧𝐞!" }, { quoted: message });
  }

  const botName = global.db.data.nomedelbot || "ChatUnity x 333";
  const quotedMessage = {
    key: {
      participants: "0@s.whatsapp.net",
      fromMe: false,
      id: 'Halo'
    },
    message: {
      locationMessage: {
        name: botName,
        jpegThumbnail: await (await fetch("https://qu.ax/cSqEs.jpg")).buffer(),
        vcard: "BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD"
      }
    },
    participant: '0@s.whatsapp.net'
  };

  await conn.sendMessage(message.chat, {
    text: "💌 𝐎𝐫𝐚 𝐬𝐚𝐫𝐚𝐢 𝐢𝐧 𝐠𝐫𝐚𝐝𝐨 𝐝𝐢 𝐥𝐞𝐠𝐠𝐞𝐫𝐞 𝐢 𝐦𝐞𝐬𝐬𝐚𝐠𝐠𝐢 𝐝𝐞𝐥 𝐛𝐨𝐭 🚀"
  }, { quoted: quotedMessage });
};

handler.help = ['del_reg_in_session_owner'];
handler.tags = ["owner"];
handler.command = /^(deletession|ds|clearallsession)$/i;
handler.admin = true;

export default handler;