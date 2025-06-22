import { createHash } from 'crypto';
import PhoneNumber from 'awesome-phonenumber';

const handler = async (m, { conn }) => {
  try {
    if (m?.buttonId === '.setanni') {
      return conn.sendMessage(m.chat, { text: 'Per impostare la tua età usa il comando .setanni <età>\nPer rimuovere la tua età usa .eliminaanni' }, { quoted: m });
    }

    if (m?.buttonId === '.setig') {
      return conn.sendMessage(m.chat, { text: 'Specifica un nome utente Instagram con .setig <user> oppure usa .delig per rimuoverlo.' }, { quoted: m });
    }

    if (!m.isGroup) {
      return conn.sendMessage(m.chat, { text: "❌ Questo comando può essere usato solo nei gruppi." }, { quoted: m });
    }

    const mention = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : m.sender);
    const who = mention || m.sender;

    // Inizializza i dati dell'utente se non esistono
    if (!global.db.data.users[who]) {
      global.db.data.users[who] = { 
        money: 0, warn: 0, warnlink: 0, 
        muto: false, banned: false, 
        messaggi: 0, blasphemy: 0, 
        command: 0, vittorieSlot: 0, 
        categoria: null, instagram: null, 
        eta: null, genere: null
      };
    }

    const user = global.db.data.users[who];

    // Lista gradi
    const gradi = [
      "𝐏𝐫𝐢𝐧𝐜𝐢𝐩𝐢𝐚𝐧𝐭𝐞 𝐈 😐", "𝐏𝐫𝐢𝐧𝐜𝐢𝐩𝐢𝐚𝐧𝐭𝐞 𝐈𝐈 😐",
      "𝐑𝐞𝐜𝐥𝐮𝐭𝐚 𝐈 🙂", "𝐑𝐞𝐜𝐥𝐮𝐭𝐚 𝐈𝐈 🙂",
      "𝐀𝐯𝐚𝐧𝐳𝐚𝐭𝐨 𝐈 🫡", "𝐀𝐯𝐚𝐧𝐝𝐚𝐭𝐨 𝐈𝐈 🫡",
      "𝐁𝐨𝐦𝐛𝐞𝐫 𝐈 😎", "𝐁𝐨𝐦𝐛𝐞𝐫 𝐈𝐈 😎",
      "𝐏𝐫𝐨 𝐈 😤", "𝐏𝐫𝐨 𝐈𝐈 😤",
      "𝐄́𝐥𝐢𝐭𝐞 𝐈 🤩", "𝐄́𝐭𝐢𝐭𝐞 𝐈𝐈 🤩",
      "𝐌𝐚𝐬𝐭𝐞𝐫 𝐈 💪🏼", "𝐌𝐚𝐬𝐭𝐞𝐫 𝐈𝐈 💪🏼",
      "𝐌𝐢𝐭𝐢𝐜𝐨 𝐈 🔥", "𝐌𝐢𝐭𝐢𝐜𝐨 𝐈𝐈 🔥",
      "𝐄𝐫𝐨𝐞 𝐈 🎖", "𝐄𝐫𝐨𝐞 𝐈𝐈 🎖",
      "𝐂𝐚𝐦𝐩𝐢𝐨𝐧𝐞 𝐈 🏆", "𝐂𝐚𝐦𝐩𝐢𝐨𝐧𝐞 𝐈𝐈 🏆",
      "𝐃𝐨𝐦𝐢𝐧𝐚𝐭𝐨𝐫𝐞 𝐈 🥶", "𝐃𝐨𝐦𝐢𝐧𝐚𝐭𝐨𝐫𝐞 𝐈𝐈 🥶",
      "𝐒𝐭𝐞𝐥𝐥𝐚𝐫𝐞 𝐈 💫", "𝐒𝐭𝐞𝐥𝐥𝐚𝐫𝐞 𝐈𝐈 💫",
      "𝐂𝐨𝐬𝐦𝐢𝐜𝐨 𝐈 🔮", "𝐂𝐨𝐬𝐦𝐢𝐜𝐨 𝐈𝐈 🔮",
      "𝐓𝐢𝐭𝐚𝐧𝐨 𝐈 😈", "𝐓𝐢𝐭𝐚𝐧𝐨 𝐈𝐈 😈",
      "𝐋𝐞𝐠𝐠𝐞𝐧𝐝𝐚 𝐈 ⭐️", "𝐋𝐞𝐠𝐠𝐞𝐧𝐝𝐚 𝐈𝐈 ⭐️",
    ];

    const livello = Math.floor(user.messaggi / 1000);
    const grado = livello >= 30 ? "𝐄𝐜𝐥𝐢𝐩𝐬𝐢𝐚𝐧𝐨 ❤️‍🔥" : (gradi[livello] || "-");

    // Ottenere info sul gruppo
    const groupMetadata = await conn.groupMetadata(m.chat);
    const participants = groupMetadata.participants;
    const groupOwner = groupMetadata.owner;

    // Controllare se l'utente è admin
    const participant = participants.find(p => p.id === who);
    const isAdmin = participant && (participant.admin === 'admin' || participant.admin === 'superadmin');
    const isFounder = who === groupOwner;

    const ruolo = isFounder ? '𝐅𝐨𝐮𝐧𝐝𝐞𝐫 ⚜️' : isAdmin ? '𝐀𝐝𝐦𝐢𝐧 👑' : '𝐌𝐞𝐦𝐛𝐫𝐨 🤍';

    // Emoji genere
    const emojiGenere = user.genere === "maschio" ? "🚹" : user.genere === "femmina" ? "🚺" : "𝐍𝐨𝐧 𝐢𝐦𝐩𝐨𝐬𝐭𝐚𝐭𝐨";

    let pic;
    try {
      pic = await conn.profilePictureUrl(who, 'image');
    } catch (error) {
      pic = 'https://qu.ax/LoGxD.png'; // Immagine di default
    }

    // Invia il messaggio con i dati aggiornati
    conn.sendMessage(m.chat, {
      text: `꧁════ ☾︎•✮•☽︎ ════꧂\n` +
        ` 📝 𝑚𝑒𝑠𝑠𝑎𝑔𝑖: ${user.messaggi || 0}\n` +
        ` ⚠️ 𝑤𝑎𝑟𝑛: ${user.warn || 0} / 4\n` +
        ` 🟣 𝑟𝑢𝑜𝑙𝑜: ${ruolo}\n` + 
        ` 🗓️ 𝑒𝑡𝑎: ${user.eta ? user.eta + " 𝐚𝐧𝐧𝐢" : "𝐍𝐨𝐧 𝐢𝐦𝐩𝐨𝐬𝐭𝐚𝐭𝐚"}\n` +  
        ` 🚻 𝑔𝑒𝑛𝑒𝑟𝑒: ${emojiGenere}\n` +
        `${user.instagram ? ` 🌐 instagram.com/${user.instagram}` : ' 🌐 𝑖𝑛𝑠𝑡𝑎𝑔𝑟𝑎𝑚: 𝐧𝐨𝐧 𝐢𝐦𝐩𝐨𝐬𝐭𝐚𝐭𝐨'}\n` 
        `꧁════ ☾︎•✮•☽︎ ════꧂`,
      contextInfo: {
        mentionedJid: [who],
        externalAdReply: {
          title: `${user.name || 'Sconosciuto'}`,
          body: `𝒄𝒓𝒆𝒂𝒛𝒊𝒐𝒏𝒆 𝒅𝒊 𝒐𝒏𝒊𝒙🌟 𝑿 𝙧ᥱ𝙫𝗈ᶩէ💠`,
          thumbnail: await (await fetch(pic)).buffer(),
        }
      },
      buttons: [
        { buttonId: '.setanni', buttonText: { displayText: '🗓️ Imposta Età' }, type: 1 },
        { buttonId: '.setgenere maschio', buttonText: { displayText: '🚹 Genere Maschio' }, type: 1 },
        { buttonId: '.setgenere femmina', buttonText: { displayText: '🚺 Genere Femmina' }, type: 1 },
        { buttonId: '.setig', buttonText: { displayText: '🌐 Imposta IG' }, type: 1 }
      ],
      footer: 'Imposta i tuoi dati personali:',
      viewOnce: true,
      headerType: 4
    }, { quoted: m });

  } catch (error) {
    console.error(error);
  }
};

handler.command = /^(info)$/i;
export default handler;