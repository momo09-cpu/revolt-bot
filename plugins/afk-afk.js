let handler = async (m, { conn, text }) => {
    // Inizializza struttura dati se non esiste
    if (!global.db.data.users) global.db.data.users = {}
    if (!global.db.data.users[m.sender]) global.db.data.users[m.sender] = {}
    
    // Imposta stato AFK
    global.db.data.users[m.sender].afk = {
        time: new Date(),
        reason: text || 'Nessun motivo'
    }
    
    // Conferma attivazione
    await conn.sendMessage(m.chat, {
        text: `⏸️ *Modalità AFK attivata*\nUtente: @${m.sender.split('@')[0]}\nMotivo: ${text || 'Nessun motivo'}`,
        mentions: [m.sender]
    }, { quoted: m })
}

handler.command = /^afk$/i
handler.group = true
export default handler