let handler = async (m, { conn, command, text }) => {
    let love = `︶︶ ⊹ ︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶ ⊹ ︶︶\n𝐂𝐀𝐋𝐂𝐎𝐋𝐀𝐓𝐎𝐑𝐄 𝐃𝐈 𝐀𝐌𝐎𝐑𝐄 ❤️\n𝑎𝑓𝑓𝑖𝑛𝑖𝑡𝑎 𝑡𝑟𝑎 ${text} 𝑒 𝑡𝑒: ${Math.floor(Math.random() * 100)}%\n︶︶ ⊹ ︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶ ⊹ ︶︶`.trim()
    
    // Get bot name from database or use default
    let nomeDelBot = global.db.data.nomedelbot || `𝙧ᥱ𝙫𝗈ᶩէ💠`
  
    await conn.sendMessage(m.chat, { 
      text: love,
      contextInfo: {
        mentionedJid: conn.parseMention(love),
        forwardingScore: 99,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363259442839354@newsletter',
          serverMessageId: '',
          newsletterName: `${𝙧ᥱ𝙫𝗈ᶩէ💠}`
        }
      }
    }, { quoted: m })
  }
  
  handler.help = ['love']
  handler.tags = ['fun']
  handler.command = /^(love|amore)$/i
  export default handler