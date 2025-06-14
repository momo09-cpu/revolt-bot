import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
    if (!global.db.data.settings[conn.user.jid].restrict) throw 'ⓘ Attiva restrict';
    
    let mention = 'ⓘ Mentiona la persona da bannare';
    if (!m.mentionedJid[0] && !m.quoted) return m.reply(mention, m.chat, { mentions: conn.parseMention(mention) });
    
    let target = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
    let name = await conn.getName(user);
    
    const pp = await conn.profilePictureUrl(target, 'image').catch(_ => null) || './src/avatar_contact.png';
    let avatar;
    pp !== './src/avatar_contact.png' ? avatar = await (await fetch(pp)).buffer() : avatar = await (await fetch('https://telegra.ph/file/8ca14ef9fa43e99d1d196.jpg')).buffer();
    
    let groupName = m.chat.split`-`[0];
    const groupMetadata = await conn.groupMetadata(m.chat);
    let groupOwner = groupMetadata.owner || m.chat.split`-`[0] + '@s.whatsapp.net';
    let botOwner = global.owner[0][0] + '@s.whatsapp.net';
    
    if (target === conn.user.jid) throw 'ⓘ Non puoi rimuovere il bot';
    if (target === botOwner) throw 'ⓘ Non puoi rimuovere il creatore del bot';
    if (target === groupOwner) throw 'ⓘ Non puoi rimuovere il creatore del gruppo';
    
    let msg = {
        key: {
            participants: '0@s.whatsapp.net',
            fromMe: false,
            id: 'Halo'
        },
        message: {
            locationMessage: {
                name: 'Unlimited',
                jpegThumbnail: await (await fetch('https://i.ibb.co/6RMtRXW0/dragonball.jpg')).buffer(),
                vcard: 'BEGIN:VCARD\nVERSION:5.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD'
            }
        },
        participant: '0@s.whatsapp.net'
    };
    
    let successMsg = 'ⓘ Utente rimosso con successo ✔️';
    conn.sendMessage(m.chat, {
        text: successMsg,
        contextInfo: {
            externalAdReply: {
                title: name + ' ',
                previewType: 'PHOTO',
                thumbnail: avatar,
                sourceUrl: 'https://wa.me/' + target.split('@')[0],
                mediaType: 1
            }
        }
    }, { quoted: msg });
    
    await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
};

handler.help = ['ban', 'kick'];
handler.tags = ['group'];
handler.command = /^(cacca|kick|ban)$/i
handler.admin = true;
handler.group = true;
handler.botAdmin = true;

export default handler;
