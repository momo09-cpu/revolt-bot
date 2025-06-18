let handler = async (m, { conn, command, text }) => {
    let width = Math.floor(Math.random() * 31);
    let finalPhrase = width >= 8 
        ? "🔥 𝐧𝐢𝐞𝐧𝐭𝐞 𝐦𝐚𝐥𝐞 𝐩𝐞𝐫 𝐮𝐧𝐚 𝐜𝐨𝐦𝐞 𝐭𝐞!"
        : "😅 𝐮𝐧 𝐫𝐢𝐬𝐮𝐥𝐭𝐚𝐭𝐨 𝐝𝐢 𝐦𝐞𝐫𝐝𝐚 𝐝𝐞𝐯𝐢 𝐚𝐩𝐫𝐢𝐫𝐞 𝐝𝐢 𝐩𝐢𝐮!";

    let message = `
━━━━━━━━━━━━━━━━
📏 𝐜𝐚𝐥𝐜𝐨𝐥𝐚𝐭𝐨𝐫𝐞 𝐝𝐢 𝐚𝐩𝐞𝐫𝐭𝐮𝐫𝐚 📏
━━━━━━━━━━━━━━━━
🔍 ${text} 𝐡𝐚 𝐮𝐧'𝐚𝐩𝐞𝐫𝐭𝐮𝐫𝐚 𝐬𝐭𝐢𝐦𝐚𝐭𝐚 𝐝𝐢:  
👉 ${width} cm!  
━━━━━━━━━━━━━━━━
${finalPhrase}
`.trim();

    const messageOptions = {
        contextInfo: {
            forwardingScore: 0,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363259442839354@newsletter',
                serverMessageId: '',
                newsletterName: `${conn.user.name}`
            }
        }
    };

    // Inoltra il messaggio generato senza rispondere al comando
    await conn.sendMessage(m.chat, { text: message, ...messageOptions });
};

handler.command = /^(figa)$/i;

export default handler;