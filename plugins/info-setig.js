const setigHandler = async (m, { conn, usedPrefix, command, text }) => {
  const who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;

  // Se il comando è .setig
  if (command === 'setig') {
    // Se l'utente non fornisce il nome Instagram, rispondi con un errore
    if (!text) {
      return conn.reply(m.chat, `𝐌𝐚𝐧𝐜𝐚 𝐢𝐥 𝐧𝐢𝐜𝐤 𝐝𝐢 𝐈𝐆`, m);
    }

    // Aggiungi il nome Instagram nel database dell'utente
    global.db.data.users[who].instagram = text.trim();

    // Risposta di conferma con il nome Instagram aggiornato
    conn.reply(m.chat, `✓ 𝐍𝐢𝐜𝐤 𝐝𝐢 𝐢𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦 𝐢𝐦𝐩𝐨𝐬𝐭𝐚𝐭𝐨 𝐜𝐨𝐦𝐞: instagram.com/${text.trim()}`, m);
  }

  // Se il comando è .eliminaig
  if (command === 'eliminaig') {
    // Rimuovi il link Instagram dal database dell'utente
    delete global.db.data.users[who].instagram;

    // Risposta di conferma con l'eliminazione dell'Instagram
    conn.reply(m.chat, `𝐍𝐢𝐜𝐤 𝐝𝐢 𝐈𝐆 𝐫𝐢𝐦𝐨𝐬𝐬𝐨 ✓ `, m);
  }
}

// Aggiungi i comandi .setig ed .eliminaig
setigHandler.command = /^(setig|eliminaig)$/i;
export default setigHandler;