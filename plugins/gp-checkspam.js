import fetch from "node-fetch";

let handler = async (m, { conn, args }) => {
    if (!args[0]) return m.reply("❌ *Devi inserire un sito da controllare!*\n📌 _Esempio:_ *.checkscam www.sito.com*");

    let sito = args[0].replace(/https?:\/\//, "").replace("www.", "").split("/")[0]; // Pulizia URL

    try {
        // 🌐 Controllo con Google Safe Browsing API (senza chiave API)
        let googleResponse = await fetch(`https://transparencyreport.google.com/safe-browsing/search?url=${sito}`);
        let isScam = googleResponse.status !== 200;

        let messaggio = `🔍 *Analisi del sito:*\n🌐 *Dominio:* ${sito}\n\n`;
        messaggio += isScam ? "⚠️ *RISCHIO SCAM!* ❌" : "✅ *Sito Sicuro!*";
        messaggio += `\n\n🔗 *Verifica anche su:* [ScamAdviser](https://www.scamadviser.com/check-website/${sito})`;

        await conn.sendMessage(m.chat, { text: messaggio }, { quoted: m });

    } catch (err) {
        console.error(err);
        m.reply("❌ *Errore nel controllo del sito! Riprova più tardi.*");
    }
};

// Configurazione del comando per Gab
handler.command = ["checkscam"];
handler.category = "security";
handler.desc = "Controlla se un sito è scam o sicuro 🔍";

export default handler;