let handler = async (m, { conn }) => {
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
            displayName: 'Creatore', 
            contacts: [
                { vcard: createVCard('𝑺𝑼𝑷𝑹𝑬𝑴𝑶', '393534243103', 'Founder') },
                { vcard: createVCard('𝑴𝒀 𝑮', '639514776359', 'Friend') },
                { vcard: createVCard('𝐦𝐲 𝐠𝐢𝐫𝐥', '6282120972782', 'Friend') }
            ]
        }
    }, { quoted: m });
};

handler.help = ['creatore'];
handler.tags = ['info'];
handler.command = ['proprietario'];
export default handler;