import { createHash } from 'crypto';
import PhoneNumber from 'awesome-phonenumber';
import fetch from 'node-fetch';
import fs from 'fs';

const handler = async (m, { conn, usedPrefix, command }) => {
  try {
    const mention = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
    const who = mention || m.sender;

    if (!global.db.data.users) global.db.data.users = {};
    if (!global.db.data.users[who]) global.db.data.users[who] = { amici: [] };

    const user = global.db.data.users[who];
    const friends = user.amici || [];

    const lastFriend = friends[friends.length - 1];
    const lastFriendName = lastFriend ? lastFriend.split('@')[0] : 'Nessuno';
    const friendList = friends.length > 0 
      ? friends.map((friend, index) => `${index + 1}. @${friend.split('@')[0]}`).join('\n') 
      : 'Nessuno';

    const message = `📜 *Lista Amici di ${user.name && user.name.trim() !== '' ? user.name : 'Sconosciuto'}*
┌───────────────
│ 👤 *Ultimo Amico:* ${friends.length > 0 ? "@" + lastFriendName : 'Nessuno'}
│
│ 👥 *Lista Completa:*
${friends.length > 0 ? friendList : '│   Nessuno'}
└───────────────`;

    await conn.sendMessage(m.chat, { 
        text: message,
        contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363259442839354@newsletter',
                serverMessageId: '',
                newsletterName: 'ChatUnity'
            }
        },
        mentions: friends.map(friend => `${friend.split('@')[0]}@s.whatsapp.net`)
    }, { quoted: m });

  } catch (err) {
    console.error('Error in handler:', err);
    conn.reply(m.chat, "❌ Si è verificato un errore durante l'esecuzione del comando.");
  }
};

handler.command = ['listamici'];
export default handler;
