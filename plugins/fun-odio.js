let handler = async (m, { conn, command, text }) => {
    let nomeDelBot = global.db.data.nomedelbot || `𝙧ᥱ𝙫𝗈ᶩէ💠`
  
    let love = `──────────────\n𝐂𝐀𝐋𝐂𝐎𝐋𝐀𝐓𝐎𝐑𝐄 𝐃𝐈 𝐎𝐃𝐈𝐎 😡
  𝒍'𝒐𝒅𝒊𝒐 𝒕𝒓𝒂 ${text} 𝒆 𝒕𝒆: ${Math.floor(Math.random() * 100)}%\n──────────────`.trim()
  
    await conn.sendMessage(m.chat, {
      text: love,
      contextInfo: {
        mentionedJid: conn.parseMention(love),
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363259442839354@newsletter',
          serverMessageId: '',
          newsletterName: `${𝙧ᥱ𝙫𝗈ᶩէ💠}`
        }
      }
    })
  }
  
  handler.command = /^(odio)$/i
  handler.tags = ['fun']
  handler.help = ['odio @tag']
  
  export default handler