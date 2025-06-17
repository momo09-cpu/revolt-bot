let handler = async (m, { conn, command, text }) => {
    if (!text) return conn.reply(m.chat, "🚨 𝒎𝒂𝒏𝒄𝒂 𝒊𝒍 𝒏𝒐𝒎𝒆 𝒅𝒆𝒍𝒍𝒂 𝒕𝒖𝒂 𝒄𝒓𝒖𝒔𝒉!* 🚨\n𝒔𝒄𝒓𝒊𝒗𝒊 𝒄𝒐𝒔𝒊: `.crush @nome` o `.crush Mario`", m);
  
    let lovePercent = Math.floor(Math.random() * 100);
    let loveMessage = "";
  
    // Risposte personalizzate in base alla percentuale! 😜
    if (lovePercent < 30) {
      loveMessage = "💔 𝒑𝒆𝒔𝒔𝒊𝒎𝒆 𝒏𝒐𝒕𝒊𝒛𝒊𝒆...💔\n";
    } else if (lovePercent < 70) {
      loveMessage = "😳 𝒄𝒆 𝒍𝒂 𝒑𝒖𝒐𝒊 𝒇𝒂𝒓𝒆 𝒔𝒆 𝒕𝒊 𝒊𝒎𝒑𝒆𝒈𝒏𝒊!! 😳\n";
    } else {
      loveMessage = "💘 𝒘𝒐𝒘 𝒄𝒐𝒎𝒑𝒍𝒊𝒎𝒆𝒏𝒕𝒊 𝒂𝒏𝒅𝒂𝒕𝒆 𝒊𝒏 𝒑𝒓𝒊𝒗𝒂𝒕𝒐💘\n";
    }
  
    let finalText = `✨ *💌 𝒄𝒂𝒍𝒄𝒐𝒍𝒂𝒕𝒐𝒓𝒆 𝒅𝒊 𝒂𝒎𝒐𝒓𝒆 💌* ✨
  
  ${loveMessage}
  *${text}* 𝒕𝒊 𝒂𝒎𝒂 𝒂𝒍 *${lovePercent}%*! ${lovePercent > 80 ? "🔥" : "😅"}
  
  ${lovePercent > 50 
    ? "💬 𝒄𝒉𝒆 𝒂𝒔𝒑𝒆𝒕𝒕𝒊 𝒈𝒂𝒚 𝒔𝒄𝒓𝒊𝒗𝒊𝒍𝒆!* 🥰" 
    : "📉 𝒇𝒐𝒓𝒔𝒆 𝒆 𝒎𝒆𝒈𝒍𝒊𝒐 𝒄𝒆𝒓𝒄𝒂𝒓𝒏𝒆 𝒖𝒏'𝒂𝒍𝒕𝒓𝒂 😂"}`.trim();
  
    await conn.sendMessage(m.chat, { 
      text: finalText,
      contextInfo: {
        forwardingScore: 999, // Perché no? Più è alto, più è "ufficiale"! 😆
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363259442839354@newsletter',
          newsletterName: '💖 *Chat dell\'Amore Segreto* 💖'
        }
      },
      mentions: conn.parseMention(finalText)
    }, { quoted: m });
  };
  
  handler.help = ['love @nome', 'crush @nome'];
  handler.tags = ['fun', 'love'];
  handler.command = /^(love|crush|amore)$/i;
  handler.fail = "🚫 Inserisci un nome, es: `.crush @utente`";
  
  export default handler;