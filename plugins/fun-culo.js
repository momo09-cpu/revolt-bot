let handler = async (m, { conn, usedPrefix }) => {
    let grandezze = [
        "🟢 𝒑𝒊𝒄𝒄𝒐𝒍𝒐 𝒄𝒐𝒎𝒆 𝒖𝒏𝒂 𝒇𝒐𝒓𝒎𝒊𝒄𝒂 🐜",
        "🔵 𝒏𝒐𝒓𝒎𝒂𝒍𝒆, 𝒏𝒊𝒆𝒏𝒕𝒆 𝒅𝒊 𝒔𝒑𝒆𝒄𝒊𝒂𝒍𝒆 😌",
        "🟠 𝒎𝒆𝒅𝒊𝒐, 𝒄𝒊 𝒑𝒂𝒔𝒔𝒂 𝒖𝒏 𝒅𝒊𝒕𝒐 🖕",
        "🔴 𝒆𝒏𝒐𝒓𝒎𝒆! 𝒄𝒊 𝒑𝒂𝒔𝒔𝒂 𝒖𝒏𝒂 𝒃𝒐𝒕𝒕𝒊𝒈𝒍𝒊𝒂 🍾",
        "⚫ 𝒅𝒊𝒔𝒕𝒓𝒖𝒕𝒕𝒐, 𝒔𝒆𝒎𝒃𝒓𝒂 𝒖𝒏 𝒕𝒖𝒏𝒏𝒆𝒍 𝒇𝒆𝒓𝒓𝒐𝒗𝒊𝒂𝒓𝒊𝒐 🚇",
        "🟤 𝒏𝒐𝒏 𝒉𝒂𝒊 𝒑𝒊𝒖 𝒖𝒏 𝒃𝒖𝒄𝒐, 𝒆 𝒆𝒔𝒑𝒍𝒐𝒔𝒐 💣"
    ];

    let grandezzaCasuale = grandezze[Math.floor(Math.random() * grandezze.length)];
    let messaggio = "𝒂𝒏𝒏𝒂𝒍𝒊𝒛𝒛𝒐 𝒊𝒍 𝒕𝒖𝒐 𝒃𝒖𝒄𝒐...*\n\n📏 𝒓𝒊𝒔𝒖𝒍𝒕𝒂𝒕𝒐: " + grandezzaCasuale;

    let opzioniInoltro = inoltra("𝙧ᥱ𝙫𝗈ᶩէ💠");
    await conn.sendMessage(m.chat, { text: messaggio, ...opzioniInoltro }, { quoted: m });
};

const inoltra = (𝙧ᥱ𝙫𝗈ᶩէ💠) => {
    let messageOptions = {
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363259442839354@newsletter',
                serverMessageId: '',
                newsletterName: `$𝙧ᥱ𝙫𝗈ᶩէ💠}`
            }
        }
    };
    return messageOptions;
};

handler.command = ["ano"];
export default handler;