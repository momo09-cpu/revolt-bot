const xpPerUniticoin = 450 // XP necessari per 1 Uniticoin

let handler = async (m, { conn, command, args }) => {
  // Determina quante Unitycoins comprare
  let quantita = command.replace(/^compra/i, '')
  quantita = quantita ? 
    /all/i.test(quantita) ? 
      Math.floor(global.db.data.users[m.sender].exp / xpPerUniticoin) : 
      parseInt(quantita) : 
    args[0] ? parseInt(args[0]) : 1
  
  quantita = Math.max(1, quantita) // Almeno 1 Uniticoin
  const costo = xpPerUniticoin * quantita

  if (global.db.data.users[m.sender].exp >= costo) {
    // Effettua l'acquisto
    global.db.data.users[m.sender].exp -= costo
    global.db.data.users[m.sender].limit += quantita
    
    conn.reply(m.chat, `╭────═[ 𝑁 𝐸 𝐺 𝑂 𝑍 𝐼 𝑂 ]═─────⋆
│╭───────────────···
││✯ 𝐚𝐪𝐮𝐢𝐬𝐭𝐚𝐭𝐞: +${quantita} 💶 𝐔𝐂 
││✯ *𝐜𝐨𝐬𝐭𝐨* : -${costo} 💫 𝐗𝐏
│╰────────────────···
╰───────────═┅═──────────`, m)
  } else {
    conn.reply(m.chat, `🚩 𝐦𝐢 𝐝𝐢𝐬𝐩𝐢𝐚𝐜𝐝 𝐧𝐨𝐧 𝐡𝐚𝐢 𝐚𝐛𝐛𝐚𝐬𝐭𝐚𝐧𝐳𝐬 💫 𝐗𝐏 𝐩𝐞𝐫 𝐜𝐨𝐦𝐩𝐫𝐚𝐫𝐞 *${quantita} 💶 𝐔𝐂 *.\n 𝐭𝐢 𝐬𝐞𝐫𝐯𝐨𝐧𝐨 𝐚𝐧𝐜𝐨𝐫𝐚 *${costo - global.db.data.users[m.sender].exp} 💫 𝐗𝐏!`, m)
  }
}

handler.help = ['compra [quantità]', 'compraall']
handler.tags = ['rpg']
handler.command = ['compra', 'compraunitycoins', 'buy'] 
handler.register = true 

export default handler