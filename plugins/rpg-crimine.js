let cooldowns = {}

let handler = async (m, { conn, text, command, usedPrefix }) => {
  let users = global.db.data.users;
  if (!users[m.sender]) {
      users[m.sender] = {
          // aggiungi qui tutte le proprietà di default che usi, ad esempio:
          limit: 10,
          // ...altre proprietà...
      };
  }

  let senderId = m.sender
  let senderName = conn.getName(senderId)
  
  // Cooldown di 5 minuti tra un crimine e l'altro
  let cooldownTime = 5 * 60
  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < cooldownTime * 1000) {
    let tempoRimanente = formattaTempo(Math.ceil((cooldowns[m.sender] + cooldownTime * 1000 - Date.now()) / 1000))
    return m.reply(`🚩 𝐡𝐚𝐢 𝐠𝐢𝐚 𝐜𝐨𝐦𝐦𝐞𝐬𝐬𝐨 𝐮𝐧 𝐜𝐫𝐢𝐦𝐢𝐧𝐞 𝐥𝐚𝐝𝐫𝐨 𝐝𝐢 𝐦𝐞𝐫𝐝𝐚 𝐚𝐬𝐩𝐞𝐭𝐭𝐚 *⏱ ${tempoRimanente}* 𝐩𝐫𝐢𝐦𝐚 𝐝𝐞𝐥𝐥𝐚 𝐩𝐫𝐨𝐬𝐬𝐢𝐦𝐚 𝐞𝐧𝐭𝐫𝐚𝐭𝐚 𝐢𝐧 𝐜𝐚𝐬𝐚 𝐩𝐞𝐫 𝐞𝐯𝐢𝐭𝐚𝐫𝐞 𝐝𝐢 𝐞𝐬𝐬𝐞𝐫𝐞 𝐩𝐫𝐞𝐬𝐨🚔.`)
  }
  
  cooldowns[m.sender] = Date.now()
  
  // Seleziona un utente specifico se taggato, altrimenti casuale
  let targetId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : Object.keys(users).filter(id => id !== senderId)[Math.floor(Math.random() * (Object.keys(users).length - 1))]
  let targetName = conn.getName(targetId)

  // Quantità rubabile (15-50 Unitycoins)
  let minRubare = 50
  let maxRubare = 100
  let quantita = Math.floor(Math.random() * (maxRubare - minRubare + 1)) + minRubare

  // Possibili esiti (0=successo, 1=catturato, 2=successo parziale)
  let esito = Math.floor(Math.random() * 3)

  switch (esito) {
    case 0: // Successo completo
      users[senderId].limit += quantita
      users[targetId].limit -= quantita
      await conn.sendMessage(m.chat, {
        text: `🚩 𝐜'𝐞̀𝐥'𝐡𝐚𝐢 𝐟𝐚𝐭𝐭𝐚 𝐥𝐚𝐝𝐫𝐨 𝐝𝐞𝐥 𝐜𝐚𝐳𝐳𝐨 *${quantita} 💶 𝐔𝐂* 𝐚 𝐬𝐭𝐨 𝐝𝐨𝐰𝐧 @${targetId.split("@")[0]}\n\n*+${quantita} 💶* 𝐦𝐞𝐬𝐬𝐢 𝐧𝐞𝐥 𝐭𝐮𝐨 𝐬𝐚𝐥𝐝𝐨.`,
        mentions: [targetId]
      }, { quoted: m })
      break

    case 1: // Catturato
      let multa = Math.min(Math.floor(Math.random() * (users[senderId].limit - minRubare + 1)) + minRubare, maxRubare)
      users[senderId].limit -= multa
      await conn.reply(m.chat, `🚩 𝐇𝐇𝐀 𝐬𝐞𝐢 𝐬𝐭𝐚𝐭𝐨 𝐩𝐫𝐞𝐬𝐨 𝐭𝐫𝐨𝐢𝐞𝐭𝐭𝐚 𝐬𝐢 𝐯𝐞𝐝𝐞 𝐜𝐡𝐞 𝐧𝐨𝐧 𝐡𝐚𝐢 𝐞𝐬𝐩𝐞𝐫𝐢𝐞𝐧𝐳𝐚 𝐨𝐫𝐚 𝐜𝐨𝐫𝐫𝐢!! 𝐦𝐮𝐥𝐭𝐚 𝐝𝐢*-${multa} 💶 𝐔𝐂* 𝐩𝐞𝐫 ${senderName}.`, m)
      break

    case 2: // Successo parziale
      let parziale = Math.min(Math.floor(Math.random() * (users[targetId].limit / 2 - minRubare + 1)) + minRubare, maxRubare)
      users[senderId].limit += parziale
      users[targetId].limit -= parziale
      await conn.sendMessage(m.chat, {
        text: `🚩 𝐜'𝐞̀𝐥'𝐡𝐚𝐢 𝐟𝐚𝐭𝐭𝐚 𝐦𝐚 𝐡𝐚𝐢 𝐩𝐫𝐞𝐬𝐨 𝐬𝐨𝐥𝐨 𝐥𝐚 𝐦𝐞𝐭𝐚̀ *${parziale} 💶 Unitycoins* da @${targetId.split("@")[0]}\n\n*+${parziale} 💶* 𝐚𝐠𝐠𝐢𝐮𝐧𝐭𝐞 𝐚𝐥 𝐭𝐮𝐨 𝐬𝐚𝐥𝐝𝐨.`,
        mentions: [targetId]
      }, { quoted: m })
      break
  }
  
  global.db.write()
}

handler.tags = ['rpg']
handler.help = ['crimine']
handler.command = [ 'ruba', 'rapina']
handler.register = true
handler.group = true

function formattaTempo(secondi) {
  let minuti = Math.floor(secondi / 60)
  let secondiRimanenti = Math.floor(secondi % 60)
  return `${minuti} minuti e ${secondiRimanenti} secondi`
}

export default handler