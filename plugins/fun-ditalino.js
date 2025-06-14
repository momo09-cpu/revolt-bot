import { performance } from "perf_hooks";

// Funzione per selezionare un elemento casuale da un array
function pickRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

let handler = async (message, { conn, text }) => {
    // Messaggi personalizzati
    let message1 = `🤟🏻 Inizio una serie di ditalino per *${text}*...`;
    let message2 = "👆🏻 Preparati!";
    let message3 = "✌🏻 Si comincia...";
    let message9 = "🤟🏻 Ci siamo quasi...";
    let message10 = "☝🏻 Sta per schizzare!";
    let message12 = "👋🏻 riparatevi dalla cascata!!";

    // Opzioni per l'inoltro
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

    // Sequenza dei messaggi
    await message.reply(message1, null, messageOptions);
    await message.reply(message2, null, messageOptions);
    await message.reply(message3, null, messageOptions);
    await message.reply(message9, null, messageOptions);
    await message.reply(message10, null, messageOptions);
    await message.reply(message12, null, messageOptions);

    // Calcolo del tempo
    let startTime = performance.now();
    let endTime = performance.now();
    let elapsedTime = "" + (endTime - startTime);
    let resultMessage = `✨ *${text}* è venuta🥵! Sta spruzzando come una cozza dopo *${elapsedTime}ms*!`;

    conn.reply(message.chat, resultMessage, message, messageOptions);
};

handler.command = ["ditalino"];
handler.tags = ["fun"];
export default handler;