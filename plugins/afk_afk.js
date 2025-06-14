let handler = async (m, { conn }) => {
    if (!global.db.data.users) return
    const user = global.db.data.users[m.sender]
    
    // Disattivazione AFK
    if (user?.afk) {
        const duration = formatTime(new Date() - user.afk.time)
        await conn.sendMessage(m.chat, {
            text: `▶️ *Tornato online*\nUtente: @${m.sender.split('@')[0]}\n⏱️ Durata AFK: ${duration}\n📌 Motivo: ${user.afk.reason}`,
            mentions: [m.sender]
        })
        delete user.afk
    }
    
    // Gestione menzioni
    if (m.mentionedJid?.length > 0) {
        const now = new Date()
        for (const jid of m.mentionedJid) {
            const user = global.db.data.users[jid]
            if (user?.afk) {
                const duration = formatTime(now - user.afk.time)
                await conn.sendMessage(m.chat, {
                    text: `⏸️ *Utente AFK*\n@${jid.split('@')[0]} è offline\n⏱️ Da: ${duration}\n📌 Motivo: ${user.afk.reason}`,
                    mentions: [jid]
                })
            }
        }
    }
}

function formatTime(ms) {
    const sec = Math.floor(ms/1000)
    const min = Math.floor(sec/60)
    const hrs = Math.floor(min/60)
    return [
        hrs > 0 ? `${hrs} ore` : '',
        min%60 > 0 ? `${min%60} minuti` : '',
        sec%60 > 0 ? `${sec%60} secondi` : '0s'
    ].filter(Boolean).join(' ')
}

// ESSENZIALE: Intercetta TUTTI i messaggi
handler.all = true
handler.group = true
export default handler