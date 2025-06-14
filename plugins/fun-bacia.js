let handler = async (m, { conn, text, participants }) => {
    // Controllo se è stato menzionato qualcuno
    let utentiMenzionati = m.mentionedJid;
    
    if (!utentiMenzionati.length) {
        return m.reply("💋 *Devi menzionare qualcuno per baciarlo!*\nEsempio: *.bacia @utente*");
    }

    // Prende l'ID della persona menzionata
    let utenteBaciato = utentiMenzionati[0];

    // Messaggio di bacio
    let messaggio = `💋 *${await conn.getName(m.sender)} ha dato un bacio a ${await conn.getName(utenteBaciato)}!* 😘`;

    // Invia il messaggio con la menzione
    await conn.sendMessage(m.chat, { text: messaggio, mentions: [utenteBaciato] }, { quoted: m });
};

// Definizione del comando per Gab
handler.command = ["bacia"];
export default handler;