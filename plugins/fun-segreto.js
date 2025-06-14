const handler = async (m, {
    conn, text,
  }) => {
    if (!m.isGroup) {
      throw '';
    }
    const gruppi = global.db.data.chats[m.chat];
    if (gruppi.spacobot === false) {
      throw '';
    }
    const menzione = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text;
  

    const message = `@${menzione.split`@`[0]} ${pickRandom(['mi usa solo per masturbarsi sulle foto zozze che invio', 'è innamorato/a di un membro del gruppo', 'non si fa il bidet', 'adora vestirsi del sesso opposto, fotografarsi per poi masturbarsi', 'adora le donne grasse', 'ha i piedi puzzolenti', 'dopo che fa la cacca guarda con orgoglio il suo capolavoro e poi tira lo sciaqquone', 'masturba il suo cane', 'ha iniziato a mangiare il calippo per imparare a fare i bocchini', 'ha preso più cazzi che forchette in bocca', 'ha una collezione di 1 TB di porno trans', 'si fa leccare il suo organo genitale dal suo cane', 'spende 1000€ al mese in escorts e mente al suo compagno sullo stipendio', 'sa che uno del gruppo è gay', 'è più ignorante di miss Italia per quello non parla tanto', 'è vergine', 'vuole più bene alla sua cagna che alla cagna della sorella', 'usa Internet Explorer', 'io  fa finta finta di lasciar vincere il cugino di 12 anni alla PlayStation ma la realtà è una sega mortale', 'la scorew notte si è pisciato/a addosso', 'ha il culo sporco di merda', 'scoreggia in discoteca, tanto non lo sente nessuno', 'lo eccita la fantasia di farsi trombare da un cane', 'non si lava i denti il fine settimana', 'a 10 anni andò a un funerale e invece di dire condoglianze disse tanti auguri alla vedova])}`;
    const messageOptions = {
        contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363259442839354@newsletter',
                serverMessageId: '',
                newsletterName: `ChatUnity`
            },
        }
    };

    // Invia il messaggio con le menzioni e le opzioni
    m.reply(message, null, { mentions: [menzione], ...messageOptions });
  };

handler.command = /^\segreto$/i; // Modifica per accettare solo il comando `.minaccia`
export default handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}
