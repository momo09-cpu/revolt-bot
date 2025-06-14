let handler = async (m, { conn }) => {
    // Funzione per generare vCard perfettamente formattate
    const createVCard = (name, number, role) => {
        return `BEGIN:VCARD
VERSION:3.0
FN:${name}
ORG:ChatUnity;
TEL;type=CELL;type=VOICE;waid=${number}:+${number}
X-ABLabel:${role}
END:VCARD`.replace(/\n/g, '\r\n');
    };

    await conn.sendMessage(m.chat, { 
        contacts: { 
            displayName: '👥 ChatUnity Staff', 
            contacts: [
                // Team Principale
                { vcard: createVCard('Creatore', '393515533859', 'Founder') },
                { vcard: createVCard('Finanziatore', '393803482529', 'Financer') },
                { vcard: createVCard('Social Manager', '639076516872', 'Social Media') },
                { vcard: createVCard('Promoter', '393534243103', 'Promoter') },
                
                // Team Sviluppo
                { vcard: createVCard('Developer 1', '393935731102', 'Developer') },
                { vcard: createVCard('Developer 2', '447365589428', 'Developer') },
                { vcard: createVCard('Developer 3', '590590596699', 'Developer') },
                { vcard: createVCard('Developer 4', '393518419909', 'Developer') },
                { vcard: createVCard('Developer 5', '639649477630', 'Developer') },
                { vcard: createVCard('Developer 6', '393509368693', 'Developer') }, // Numero aggiunto
            ]
        }
    }, { quoted: m });
};

// Comandi e metadati
handler.help = ['staff'];
handler.tags = ['info'];
handler.command = ['staff', 'team'];
export default handler;
