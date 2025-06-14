let handler = async (m, { conn, isAdmin, isBotAdmin }) => {
    // Solo in gruppo, funzione attiva, non admin, bot admin e messaggio testuale
    if (
        !m.isGroup ||
        !global.db.data.chats[m.chat] ||
        !global.db.data.chats[m.chat].antibestemmie ||
        isAdmin ||
        !isBotAdmin ||
        typeof m.text !== 'string'
    ) return;

    const badWords = [
        "dio", "madonna", "cristo", "gesù", "porco", "porca", "maria", "gesu", "dio cane", "dio porco", "maledetto", "bestemmia"
    ];
    const messageText = m.text.toLowerCase();
    const containsBadWord = badWords.some(word => messageText.includes(word));
    if (containsBadWord) {
        // Aggiungi warn all'utente
        let user = global.db.data.users[m.sender];
        if (user) {
            user.warn = (user.warn || 0) + 1;
            // Se warn >= 3, resetta e banna
            if (user.warn >= 3) {
                user.warn = 0;
                await conn.sendMessage(m.chat, { text: `⛔ ${m.name || 'Utente'} rimosso dopo 3 avvertimenti (bestemmie).` }, { quoted: m });
                await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
            } else {
                await conn.sendMessage(m.chat, { text: `⚠️ ${m.name || 'Utente'} ha ricevuto un avvertimento per bestemmia (${user.warn}/3).` }, { quoted: m });
            }
        }
        await conn.sendMessage(m.chat, { delete: m.key }, { quoted: m });
    }
};

handler.before = handler;
handler.group = true;

export default handler;
