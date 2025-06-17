let handler = async (m, { conn, text, participants }) => {
    // Controllo se è stato menzionato qualcuno
    let utentiMenzionati = m.mentionedJid;
    
    if (!utentiMenzionati.length) {
        return m.reply("💋 𝑚𝑒𝑛𝑧𝑖𝑜𝑛𝑎 𝑙𝑎 𝑝𝑒𝑟𝑠𝑜𝑛𝑎 𝑑𝑎 𝑏𝑎𝑐𝑖𝑎𝑟𝑒!\nEsempio: *.bacia @utente*");
    }

    // Prende l'ID della persona menzionata
    let utenteBaciato = utentiMenzionati[0];

    // Messaggio di bacio
    let messaggio = `💋 *${await conn.getName(m.sender)} ℎ𝑎 𝑑𝑎𝑡𝑜 𝑢𝑛 𝑏𝑎𝑐𝑖𝑜 𝑎 ${await conn.getName(utenteBaciato)}!* 😘`;

    // Invia il messaggio con la menzione
    await conn.sendMessage(m.chat, { text: messaggio, mentions: [utenteBaciato] }, { quoted: m });
};

// Definizione del comando per Gab
handler.command = ["bacia"];
export default handler;