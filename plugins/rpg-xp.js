let handler = async (m, { conn, usedPrefix }) => {
    let user = global.db.data.users[m.sender]
    
    // Inizializzazione sicura per evitare NaN
    user.exp = Number(user.exp) || 0
    user.level = Number(user.level) || 1
    
    // Calcolo XP necessario per il prossimo livello
    let { min, xp, max } = xpRange(user.level, global.multiplier || 1)
    let xpNeeded = max - user.exp
    
    // Formattazione numeri con separatore delle migliaia
    let format = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    
    // Messaggio con stile avanzato
    let txt = `✨ 𝐈𝐋 𝐓𝐔𝐎 𝐏𝐑𝐎𝐅𝐈𝐋𝐎 𝐗𝐏 ✨\n\n`
    txt += `▸ *𝐔𝐓𝐄𝐍𝐓𝐄*: ${conn.getName(m.sender)}\n`
    txt += `▸ *𝐥𝐢𝐯𝐞𝐥𝐥𝐨 𝐚𝐭𝐭𝐮𝐚𝐥𝐞*: ${user.level}\n`
    txt += `▸  𝐗𝐏 𝐭𝐨𝐭𝐚𝐥𝐢: ${format(user.exp)}\n\n`
    txt += `📈 *𝐩𝐫𝐨𝐠𝐫𝐞𝐬𝐬𝐨*: ${format(user.exp - min)}/${format(xp)} 𝐗𝐋\n`
    txt += `🎯 𝐌𝐀𝐍𝐂𝐀𝐍𝐎: ${format(xpNeeded)} 𝐗𝐏 𝐩𝐞𝐫 𝐢𝐥 𝐥𝐢𝐯𝐞𝐥𝐥𝐨 ${user.level + 1}\n\n`
    txt += `ℹ️ 𝐮𝐬𝐚 ${usedPrefix}𝐦𝐢𝐧𝐚 𝐩𝐞𝐫 𝐠𝐮𝐚𝐝𝐚𝐠𝐧𝐚𝐫𝐞 𝐩𝐢𝐮 𝐗𝐏!`
    
    // Invia messaggio con immagine di sfondo (opzionale)
    let img = 'https://i.ibb.co/pcjHVvx/Whats-App-Image-2025-04-12-at-00-50-15.jpg' // Sostituisci con il tuo URL
    try {
        await conn.sendFile(m.chat, img, 'xp.jpg', txt, m)
    } catch {
        await conn.reply(m.chat, txt, m) // Fallback senza immagine
    }
}

handler.help = ['xp']
handler.tags = ['rpg']
handler.command = ['xp', 'exp', 'esperienza']
handler.register = true
export default handler

// Funzione necessaria per il calcolo (simile a quella in levelling.js)
function xpRange(level, multiplier = 1) {
    let min = level * level * 20
    let max = (level + 1) * (level + 1) * 20
    let xp = Math.floor((max - min) * multiplier)
    return { min, xp, max }
}