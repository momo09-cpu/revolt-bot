let handler = async (m, { conn, command, text }) => {
    // Genera un livello casuale di alcol nel sangue
    let width = Math.floor(Math.random() * 101);

    // Determina il messaggio in base al livello
    let finalPhrase = width >= 70 
        ? "🍾 𝑐ℎ𝑒 𝑓𝑟𝑜𝑐𝑖𝑜 𝑐ℎ𝑒 𝑏𝑒𝑣𝑖 𝑐𝑜𝑠𝑖 𝑡𝑎𝑛𝑡𝑜 𝑛𝑖𝑒𝑛𝑡𝑒 𝑝𝑎𝑡𝑒𝑛𝑡𝑒 𝑝𝑒𝑟 3 𝑚𝑒𝑠𝑖." 
        : width >= 30 
        ? "🥂 𝑏𝑒ℎ 𝑛𝑖𝑒𝑛𝑡𝑒 𝑚𝑎𝑙𝑒 𝑛𝑜𝑛 𝑏𝑒𝑟𝑒 𝑡𝑟𝑜𝑝𝑝𝑜 𝑚𝑖𝑟𝑎𝑐𝑐𝑜𝑚𝑎𝑛𝑑𝑜." 
        : "🚰 𝑐ℎ𝑒 𝑏𝑟𝑎𝑣𝑜 𝑐ℎ𝑒 𝑛𝑜𝑛 𝑏𝑒𝑣𝑖 𝑛𝑒 𝑡𝑎𝑛𝑡𝑜 𝑛𝑒 𝑝𝑜𝑐𝑜 𝑠𝑒𝑖 𝑛𝑒𝑙𝑙𝑎 𝑔𝑖𝑢𝑠𝑡𝑎 𝑠𝑡𝑟𝑎𝑑𝑎"

    // Creazione del messaggio
    let message = `
『💠』 ══ •⊰✰⊱• ══ 『💠』

𝑚𝑜𝑚𝑒𝑛𝑡𝑜 𝑑𝑒𝑙 𝑡𝑒𝑠𝑡 𝑑𝑒𝑙𝑙'𝑎𝑙𝑐𝑜𝑙!🍷 
━━━━━━━━━━━━━━━━━━
 ${text ? text : '𝑡𝑢'} ℎ𝑎 𝑢𝑛 𝑡𝑎𝑠𝑠𝑜 𝑎𝑙𝑐𝑜𝑙𝑖𝑐𝑜 𝑑𝑒𝑙 ${width}%!🍷
『💠』 ══ •⊰✰⊱• ══ 『💠』

${finalPhrase}
`.trim();

    const messageOptions = {
        contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363259442839354@newsletter',
                serverMessageId: '',
                newsletterName: `ChatUnity` // Utilizzo della variabile botName
            },
        }
    };

    // Invia il messaggio con le menzioni e le opzioni
    m.reply(message, null, { mentions: conn.parseMention(message), ...messageOptions });
};

handler.command = /^(alcolizzato|alcol)$/i;

export default handler;