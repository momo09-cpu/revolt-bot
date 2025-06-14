let handler = async (m, { conn, command, text }) => {
    if (!text) return conn.reply(m.chat, "🚨 *Manca il nome della tua crush!* 🚨\nScrivi così: `.crush @nome` o `.crush Mario`", m);
  
    let lovePercent = Math.floor(Math.random() * 100);
    let loveMessage = "";
  
    // Risposte personalizzate in base alla percentuale! 😜
    if (lovePercent < 30) {
      loveMessage = "💔 *Pessime notizie...* 💔\n";
    } else if (lovePercent < 70) {
      loveMessage = "😳 *C'è speranza... ma non esultare!* 😳\n";
    } else {
      loveMessage = "💘 *WOW! È AMORE VERO!* 💘\n";
    }
  
    let finalText = `✨ *💌 CALCOLATORE DI AMORE 💌* ✨
  
  ${loveMessage}
  *${text}* ti ama al *${lovePercent}%*! ${lovePercent > 80 ? "🔥" : "😅"}
  
  ${lovePercent > 50 
    ? "💬 *Che aspetti? Scrivile/subito!* 🥰" 
    : "📉 *Forse è il momento di guardare altrove...* 😂"}`.trim();
  
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