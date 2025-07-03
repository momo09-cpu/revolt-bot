
const playAgainButtons = (prefix) => [
    {
        buttonId: `${prefix}bandiera`, // Usa il prefisso passato
        buttonText: { displayText: '🎮 Gioca Ancora!' },
        type: 1
    }
];

// Funzione principale del gestore del comando
let handler = async (m, { conn, args, participants, isAdmin, isBotAdmin, usedPrefix, command }) => {
    // Array di frasi da usare nel gioco
    let frasi = [
        `🇺🇳 *INDOVINA LA BANDIERA!* 🇺🇳`,
        `🌍 *Che nazione rappresenta questa bandiera?*`,
        `🏳️ *Sfida geografica: riconosci questa questa bandiera?*`,
        `🧭 *Indovina la nazione dalla sua bandiera!*`,
        `🎯 *Quiz bandiere: quale paese è questo?*`,
        `🌟 *Metti alla prova la tua conoscenza geografica!*`,
        `🔍 *Osserva attentamente e indovina la nazione!*`,
    ];

    // Logica per il comando .skipbandiera
    if (m.text?.toLowerCase() === '.skipbandiera') {
        if (!m.isGroup) return m.reply('⚠️ Questo comando funziona solo nei gruppi!');
        if (!global.bandieraGame?.[m.chat]) return m.reply('⚠️ Non c\'è nessuna partita attiva in questo gruppo!');

        // Solo gli admin possono skippare
        if (!isAdmin && !m.fromMe) {
            return m.reply('❌ *Questo comando può essere usato solo dagli admin!*');
        }

        clearTimeout(global.bandieraGame[m.chat].timeout);
        // Invia il messaggio di interruzione con il bottone "Gioca Ancora!"
        await conn.sendMessage(m.chat, {
            text: `🛑 *Gioco delle bandiere interrotto dall'admin*\n✨ La risposta era: *${global.bandieraGame[m.chat].rispostaOriginale}*`,
            buttons: playAgainButtons(usedPrefix),
            headerType: 1
        }, { quoted: m });
        delete global.bandieraGame[m.chat];
        return;
    }

    // Controlla se c'è già una partita attiva nel gruppo
    if (global.bandieraGame?.[m.chat]) {
        return m.reply('⚠️ C\'è già una partita attiva in questo gruppo!');
    }

    // Gestione del cooldown per prevenire spam di giochi
    const cooldownKey = `bandiera_${m.chat}`;
    const lastGame = global.cooldowns?.[cooldownKey] || 0;
    const now = Date.now();
    const cooldownTime = 10000; // 10 secondi di cooldown

    if (now - lastGame < cooldownTime) {
        const remainingTime = Math.ceil((cooldownTime - (now - lastGame)) / 1000);
        return m.reply(`⏳ *Aspetta ancora ${remainingTime} secondi prima di avviare un nuovo gioco!*`);
    }

    // Aggiorna il cooldown
    global.cooldowns = global.cooldowns || {};
    global.cooldowns[cooldownKey] = now;

    // Lista delle bandiere (ridotta per facilità e riconoscibilità)
    let bandiere = [
        { url: 'https://flagcdn.com/w320/it.png', nome: 'Italia' },
        { url: 'https://flagcdn.com/w320/fr.png', nome: 'Francia' },
        { url: 'https://flagcdn.com/w320/de.png', nome: 'Germania' },
        { url: 'https://flagcdn.com/w320/gb.png', nome: 'Regno Unito' },
        { url: 'https://flagcdn.com/w320/es.png', nome: 'Spagna' },
        { url: 'https://flagcdn.com/w320/se.png', nome: 'Svezia' },
        { url: 'https://flagcdn.com/w320/no.png', nome: 'Norvegia' },
        { url: 'https://flagcdn.com/w320/fi.png', nome: 'Finlandia' },
        { url: 'https://flagcdn.com/w320/dk.png', nome: 'Danimarca' },
        { url: 'https://flagcdn.com/w320/pl.png', nome: 'Polonia' },
        { url: 'https://flagcdn.com/w320/pt.png', nome: 'Portogallo' },
        { url: 'https://flagcdn.com/w320/gr.png', nome: 'Grecia' },
        { url: 'https://flagcdn.com/w320/ch.png', nome: 'Svizzera' },
        { url: 'https://flagcdn.com/w320/at.png', nome: 'Austria' },
        { url: 'https://flagcdn.com/w320/be.png', nome: 'Belgio' },
        { url: 'https://flagcdn.com/w320/nl.png', nome: 'Paesi Bassi' },
        { url: 'https://flagcdn.com/w320/ua.png', nome: 'Ucraina' },
        { url: 'https://flagcdn.com/w320/ro.png', nome: 'Romania' },
        { url: 'https://flagcdn.com/w320/hu.png', nome: 'Ungheria' },
        { url: 'https://flagcdn.com/w320/cz.png', nome: 'Repubblica Ceca' },
        { url: 'https://flagcdn.com/w320/ie.png', nome: 'Irlanda' },
        { url: 'https://flagcdn.com/w320/bg.png', nome: 'Bulgaria' },
        { url: 'https://flagcdn.com/w320/md.png', nome: 'Moldavia' },
        { url: 'https://flagcdn.com/w320/us.png', nome: 'Stati Uniti' },
        { url: 'https://flagcdn.com/w320/ca.png', nome: 'Canada' },
        { url: 'https://flagcdn.com/w320/mx.png', nome: 'Messico' },
        { url: 'https://flagcdn.com/w320/br.png', nome: 'Brasile' },
        { url: 'https://flagcdn.com/w320/ar.png', nome: 'Argentina' },
        { url: 'https://flagcdn.com/w320/cl.png', nome: 'Cile' },
        { url: 'https://flagcdn.com/w320/co.png', nome: 'Colombia' },
        { url: 'https://flagcdn.com/w320/pe.png', nome: 'Perù' },
        { url: 'https://flagcdn.com/w320/ve.png', nome: 'Venezuela' },
        { url: 'https://flagcdn.com/w320/cu.png', nome: 'Cuba' },
        { url: 'https://flagcdn.com/w320/au.png', nome: 'Australia' },
        { url: 'https://flagcdn.com/w320/nz.png', nome: 'Nuova Zelanda' },
        { url: 'https://flagcdn.com/w320/cn.png', nome: 'Cina' },
        { url: 'https://flagcdn.com/w320/jp.png', nome: 'Giappone' },
        { url: 'https://flagcdn.com/w320/in.png', nome: 'India' },
        { url: 'https://flagcdn.com/w320/kr.png', nome: 'Corea del Sud' },
        { url: 'https://flagcdn.com/w320/th.png', nome: 'Thailandia' },
        { url: 'https://flagcdn.com/w320/vn.png', nome: 'Vietnam' },
        { url: 'https://flagcdn.com/w320/id.png', nome: 'Indonesia' },
        { url: 'https://flagcdn.com/w320/ph.png', nome: 'Filippine' },
        { url: 'https://flagcdn.com/w320/my.png', nome: 'Malesia' },
        { url: 'https://flagcdn.com/w320/sg.png', nome: 'Singapore' },
        { url: 'https://flagcdn.com/w320/pk.png', nome: 'Pakistan' },
        { url: 'https://flagcdn.com/w320/af.png', nome: 'Afghanistan' },
        { url: 'https://flagcdn.com/w320/ir.png', nome: 'Iran' },
        { url: 'https://flagcdn.com/w320/iq.png', nome: 'Iraq' },
        { url: 'https://flagcdn.com/w320/tr.png', nome: 'Turchia' },
        { url: 'https://flagcdn.com/w320/il.png', nome: 'Israele' },
        { url: 'https://flagcdn.com/w320/sa.png', nome: 'Arabia Saudita' },
        { url: 'https://flagcdn.com/w320/ae.png', nome: 'Emirati Arabi Uniti' },
        { url: 'https://flagcdn.com/w320/qa.png', nome: 'Qatar' },
        { url: 'https://flagcdn.com/w320/eg.png', nome: 'Egitto' },
        { url: 'https://flagcdn.com/w320/ng.png', nome: 'Nigeria' },
        { url: 'https://flagcdn.com/w320/ma.png', nome: 'Marocco' },
        { url: 'https://flagcdn.com/w320/tn.png', nome: 'Tunisia' },
        { url: 'https://flagcdn.com/w320/ke.png', nome: 'Kenya' },
        { url: 'https://flagcdn.com/w320/et.png', nome: 'Etiopia' },
        { url: 'https://flagcdn.com/w320/gh.png', nome: 'Ghana' },
        { url: 'https://flagcdn.com/w320/cm.png', nome: 'Camerun' },
        { url: 'https://flagcdn.com/w320/ci.png', nome: "Costa d'Avorio" },
        { url: 'https://flagcdn.com/w320/sn.png', nome: 'Senegal' },
        { url: 'https://flagcdn.com/w320/za.png', nome: 'Sudafrica' },
        { url: 'https://flagcdn.com/w320/dz.png', nome: 'Algeria' },
        { url: 'https://flagcdn.com/w320/sd.png', nome: 'Sudan' },
        { url: 'https://flagcdn.com/w320/cd.png', nome: 'Repubblica Democratica del Congo' },
        { url: 'https://flagcdn.com/w320/ao.png', nome: 'Angola' },
        { url: 'https://flagcdn.com/w320/mg.png', nome: 'Madagascar' },
        { url: 'https://flagcdn.com/w320/tz.png', nome: 'Tanzania' },
        { url: 'https://flagcdn.com/w320/ug.png', nome: 'Uganda' },
    ];

    // Scelta casuale di una bandiera e una frase
    let scelta = bandiere[Math.floor(Math.random() * bandiere.length)];
    let frase = frasi[Math.floor(Math.random() * frasi.length)];

    try {
        // Invia il messaggio con l'immagine della bandiera e le istruzioni
        let msg = await conn.sendMessage(m.chat, {
            image: { url: scelta.url },
            caption: `${frase}\n\n ㌌ *Rispondi con il nome della nazione!*\n⏱️ *Tempo disponibile:* 30 secondi\n\n> \`vare ✧ bot\``,
            quoted: m
        });

        // Inizializza l'oggetto del gioco globale per il chat corrente
        global.bandieraGame = global.bandieraGame || {};
        global.bandieraGame[m.chat] = {
            id: msg.key.id,
            risposta: scelta.nome.toLowerCase(), // Risposta normalizzata per il confronto
            rispostaOriginale: scelta.nome,      // Risposta originale per i messaggi
            tentativi: {},
            suggerito: false,
            startTime: Date.now(),
            // Timer per la scadenza del tempo
            timeout: setTimeout(async () => {
                if (global.bandieraGame?.[m.chat]) {
                    // Invia messaggio di tempo scaduto con bottone "Gioca Ancora!"
                    await conn.sendMessage(m.chat, {
                        text: `⏳ *Tempo scaduto!*\n\n🌍 *La risposta era:* *${scelta.nome}*\n\n> \`vare ✧ bot\``,
                        buttons: playAgainButtons(usedPrefix), // Passa usedPrefix
                        headerType: 1
                    }, { quoted: msg });
                    delete global.bandieraGame[m.chat]; // Elimina il gioco
                }
            }, 30000) // 30 secondi
        };
    } catch (error) {
        console.error('Errore nel gioco bandiere:', error);
        m.reply('❌ *Si è verificato un errore durante l\'avvio del gioco*\n\n🔄 *Riprova tra qualche secondo*');
    }
};

// --- Funzioni di utilità per la gestione delle risposte ---

// Normalizza una stringa per il confronto (minuscolo, senza accenti, senza caratteri speciali)
function normalizeString(str) {
    if (!str) return '';
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Rimuove gli accenti
        .replace(/[^a-z0-9\s]/g, '')    // Rimuove caratteri non alfanumerici (tranne spazi)
        .trim();
}

// Calcola la similarità tra due stringhe basata sulle parole comuni
function calculateSimilarity(str1, str2) {
    const words1 = str1.split(' ').filter(word => word.length > 1);
    const words2 = str2.split(' ').filter(word => word.length > 1);

    if (words1.length === 0 || words2.length === 0) return 0;

    const matches = words1.filter(word =>
        words2.some(w2 => w2.includes(word) || word.includes(w2))
    );

    return matches.length / Math.max(words1.length, words2.length);
}

// Controlla se la risposta dell'utente è corretta (anche con una certa tolleranza)
function isAnswerCorrect(userAnswer, correctAnswer) {
    if (userAnswer.length < 2) return false;

    const similarityScore = calculateSimilarity(userAnswer, correctAnswer);

    return (
        userAnswer === correctAnswer ||
        (correctAnswer.includes(userAnswer) && userAnswer.length > correctAnswer.length * 0.5) ||
        (userAnswer.includes(correctAnswer) && userAnswer.length < correctAnswer.length * 1.5) ||
        similarityScore >= 0.8 // Soglia di similarità
    );
}

// --- Funzione handler.before per processare le risposte ---
// Questa funzione viene eseguita prima del handler principale per ogni messaggio nel gruppo.
handler.before = async (m, { conn, usedPrefix, command }) => {
    const chat = m.chat;
    const game = global.bandieraGame?.[chat];

    // Ignora messaggi non pertinenti al gioco attivo
    if (!game || !m.quoted || m.quoted.id !== game.id || m.key.fromMe) return;

    const userAnswer = normalizeString(m.text || '');
    const correctAnswer = normalizeString(game.risposta);

    if (!userAnswer || userAnswer.length < 2) return; // Ignora risposte troppo corte

    const similarityScore = calculateSimilarity(userAnswer, correctAnswer);

    // Se la risposta è corretta
    if (isAnswerCorrect(userAnswer, correctAnswer)) {
        clearTimeout(game.timeout); // Blocca il timer

        const timeTaken = Math.round((Date.now() - game.startTime) / 1000); // Calcola tempo impiegato
        let reward = Math.floor(Math.random() * 31) + 20; // Ricompensa base
        let exp = 500; // EXP base

        const timeBonus = timeTaken <= 10 ? 20 : timeTaken <= 20 ? 10 : 0; // Bonus velocità
        reward += timeBonus;

        // Aggiorna euro ed EXP dell'utente (richiede global.db.data.users)
        if (!global.db.data.users[m.sender]) global.db.data.users[m.sender] = {};
        global.db.data.users[m.sender].euro = (global.db.data.users[m.sender].euro || 0) + reward;
        global.db.data.users[m.sender].exp = (global.db.data.users[m.sender].exp || 0) + exp;

        let congratsMessage = `
╭━『 🎉 *RISPOSTA CORRETTA!* 』━╮
┃
┃ 🌍 *Nazione:* ${game.rispostaOriginale}
┃ ⏱️ *Tempo impiegato:* ${timeTaken}s
┃
┃ 🎁 *Ricompense:*
┃ • ${reward} 💰 euro ${timeBonus > 0 ? `(+${timeBonus} bonus velocità)` : ''}
┃ • ${exp} 🆙 EXP
┃
╰━━━━━━━━━━━━━━━━╯`;

        // Invia messaggio di congratulazioni con bottone "Gioca Ancora!"
        await conn.sendMessage(chat, {
            text: congratsMessage,
            buttons: playAgainButtons(usedPrefix), // Passa usedPrefix
            headerType: 1
        }, { quoted: m });
        delete global.bandieraGame[chat]; // Elimina il gioco
    } else if (similarityScore >= 0.6 && !game.suggerito) {
        // Suggerimento se la risposta è quasi corretta ma non ancora suggerito
        game.suggerito = true;
        await conn.reply(chat, '👀 *Ci sei quasi!*', m);
    } else if (game.tentativi[m.sender] >= 3) {
        // Se l'utente ha esaurito i tentativi
        await conn.sendMessage(chat, {
            text: '❌ *Hai esaurito i tuoi 3 tentativi!*\n\n⏳ *Aspetta che altri giocatori provino o che finisca il tempo*',
            buttons: playAgainButtons(usedPrefix), // Passa usedPrefix
            headerType: 1
        }, { quoted: m });
        delete global.bandieraGame[chat]; // Elimina il gioco per consentirne uno nuovo
    } else {
        // Incrementa il conteggio dei tentativi e fornisce suggerimenti
        game.tentativi[m.sender] = (game.tentativi[m.sender] || 0) + 1;
        const tentativiRimasti = 3 - game.tentativi[m.sender];

        if (tentativiRimasti === 1) {
            const primaLettera = game.rispostaOriginale[0].toUpperCase();
            const numeroLettere = game.rispostaOriginale.length;
            await conn.reply(chat, `❌ *Risposta errata!*

💡 *Suggerimento:*
  • Inizia con la lettera *"${primaLettera}"*
  • È composta da *${numeroLettere} lettere*`, m);
        } else if (tentativiRimasti === 2) {
            await conn.reply(chat, `❌ *Risposta errata!*

📝 *Tentativi rimasti:* ${tentativiRimasti}
🤔 *Pensa bene alla tua prossima risposta!*`, m);
        } else {
             await conn.reply(chat, `❌ *Risposta errata!*

📝 *Ultimo tentativo rimasto..*`, m);
        }
    }
};

// --- Configurazione del comando per il bot ---
handler.help = ['bandiera'];
handler.tags = ['giochi'];
handler.command = /^(bandiera|skipbandiera)$/i; // Riconosce entrambi i comandi
handler.group = true; // Funziona solo nei gruppi
handler.register = true; // Richiede la registrazione (se il tuo bot ha un sistema di registrazione)

export default handler;