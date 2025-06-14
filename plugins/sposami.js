let toM = a => '@' + a.split('@')[0]

const inoltra = (nomeDelBot) => {
  let messageOptions = {
    contextInfo: {
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363259442839354@newsletter',
        serverMessageId: '',
        newsletterName: `${nomeDelBot}`
      }
    }
  }
  return messageOptions;
}

function handler(m, { groupMetadata, conn }) {
  let ps = groupMetadata.participants.map(v => v.id)
  let a = ps.getRandom()
  let b
  do b = ps.getRandom()
  while (b === a)

  const channelJid = '120363259442839354@g.us' // Sostituisci con l'ID del canale
  const message = `*${toM(a)}, Dovresti sposarti 💍 con ${toM(b)}, formate una bella coppia 💓*`
  const options = inoltra('NomeDelBot') // Sostituisci 'NomeDelBot' con il nome del bot

  conn.sendMessage(channelJid, { text: message, ...options }) // Invia il messaggio al canale
}

handler.help = ['formarpareja']
handler.tags = ['main', 'fun']
handler.command = ['sposami','sposa']
handler.group = true
export default handler
