let handler = async (m, { conn, command, text }) => {
    // Genera un livello casuale di alcol nel sangue
    let width = Math.floor(Math.random() * 101);

    // Determina il messaggio in base al livello
    let finalPhrase = width >= 70 
        ? "🌿 𝒂𝒕𝒕𝒆𝒏𝒕𝒊 𝒄𝒉𝒆 𝒒𝒖𝒆𝒔𝒕𝒐 𝒑𝒊𝒑𝒑𝒂 𝒑𝒖𝒓𝒆 𝒊𝒍 𝒈𝒆𝒔𝒔𝒐" 
        : width >= 30 
        ? "🌿 𝒎𝒂 𝒄𝒉𝒆 𝒇𝒂𝒊 𝒄𝒐𝒔𝒊 𝒑𝒐𝒄𝒐 𝒂𝒖𝒎𝒆𝒏𝒕𝒂 𝒍𝒆 𝒅𝒐𝒔𝒊!!" 
        : "🌿 𝒖𝒏'𝒆𝒔𝒆𝒎𝒑𝒊𝒐 𝒅𝒂 𝒔𝒆𝒈𝒖𝒊𝒓𝒆, 𝒄𝒐𝒎𝒑𝒍𝒊𝒎𝒆𝒏𝒕𝒊.";

    // Creazione del messaggio
    let message = `
『💬』 ══ •⊰✰⊱• ══ 『💬』

𝒎𝒐𝒎𝒆𝒏𝒕𝒐 𝒅𝒆𝒍 𝒈𝒓𝒖𝒈 𝒕𝒆𝒔𝒕! 🌿 
━━━━━━━━━━━━━━
 ${text ? text : 'Tu'} 𝒉𝒂 𝒖𝒏 𝒕𝒂𝒔𝒔𝒐 𝒂𝒍𝒄𝒐𝒍𝒆𝒎𝒊𝒄𝒐 𝒅𝒆𝒍 ${width}%! 🌿
『💬』 ══ •⊰✰⊱• ══ 『💬』

${finalPhrase}
`.trim();

    const messageOptions = {
        contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363259442839354@newsletter',
                serverMessageId: '',
                newsletterName: `𝙧ᥱ𝙫𝗈ᶩէ💠` // Utilizzo della variabile botName
            },
        }
    };

    // Invia il messaggio con le menzioni e le opzioni
    m.reply(message, null, { mentions: conn.parseMention(message), ...messageOptions });
};

handler.command = /^(drogato)$/i;

export default handler;