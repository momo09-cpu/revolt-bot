let cooldowns = {}

let handler = async (m, { conn, isPrems }) => {
  let user = global.db.data.users[m.sender]
  let cooldownTime = 5 * 60 // 5 minuti di cooldown
  
  // Controllo cooldown
  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < cooldownTime * 1000) {
    let remainingTime = formatTime(Math.ceil((cooldowns[m.sender] + cooldownTime * 1000 - Date.now()) / 1000));
    let message = `⏳ 𝚊𝚜𝚙𝚎𝚝𝚝𝚊 *${remainingTime}* 𝚙𝚛𝚒𝚖𝚊 𝚍𝚒 𝚕𝚊𝚟𝚘𝚛𝚊𝚛𝚎 𝚊𝚗𝚌𝚘𝚛𝚊
    await conn.sendMessage(m.chat, { 
        text: message,
        contextInfo: {
            forwardingScore: 99,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363259442839354@newsletter',
                serverMessageId: '',
                newsletterName: 'ChatUnity'
            }
        }
    }, { quoted: m });
    return;
  }

  // Genera ricompensa casuale
  let reward = Math.floor(Math.random() * 5000)
  cooldowns[m.sender] = Date.now()
  
  // Assegna XP e invia messaggio
  user.exp += reward
  let rewardMessage = `💼 ${pickRandom(jobs)} *${formatNumber(reward)}* ( *${reward}* ) XP 💫`;
  await conn.sendMessage(m.chat, { 
      text: rewardMessage,
      contextInfo: {
          forwardingScore: 99,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
              newsletterJid: '120363259442839354@newsletter',
              serverMessageId: '',
              newsletterName: 'ChatUnity'
          }
      }
  }, { quoted: m });
}

// Funzioni di utilità
function formatNumber(num) {
  if (num >= 1000 && num < 1000000) {
    return (num / 1000).toFixed(1) + 'k'
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  return num.toString()
}

function formatTime(seconds) {
  let minutes = Math.floor((seconds % 3600) / 60)
  let remainingSeconds = seconds % 60
  return `${minutes} minuti e ${remainingSeconds} secondi`
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

// Lista lavori tradotta
const jobs = [
  "Hai lavorato in una fabbrica di biscotti e guadagni",
  "Lavori per un'azienda militare privata e ottieni",
  "Organizzi una degustazione di vini e ricevi",
  "Pulendo un camino trovi",
  "Sviluppi videogiochi e guadagni",
  "Hai fatto gli straordinari in ufficio per",
  "Lavori come wedding planner e guadagni",
  "Qualcuno ha messo in scena uno spettacolo teatrale. Per averlo guardato ricevi",
  "Hai comprato e venduto articoli guadagnando",
  "Lavori nel ristorante della nonna come chef e guadagni",
  "Hai lavorato 10 minuti in una pizzeria. Hai guadagnato",
  "Scrivi i biglietti dei biscotti della fortuna e guadagni",
  "Vendi oggetti inutili dal tuo borsello e guadagni",
  "Lavori tutto il giorno in azienda per",
  "Disegni un logo per un'azienda e guadagni",
  "Hai lavorato in una tipografia guadagnando",
  "Potando siepi guadagni",
  "Fai il doppiatore per SpongeBob e guadagni",
  "Coltivando l'orto ottieni",
  "Costruisci castelli di sabbia e guadagni",
  "Fai l'artista di strada e guadagni",
  "Fai volontariato e ricevi",
  "Ripari un carro armato in Afghanistan e la squadra ti paga",
  "Lavori come ambientalista e guadagni",
  "Lavori a Disneyland travestito da panda guadagnando",
  "Ripari videogiochi arcade e ricevi",
  "Fai lavoretti in città e guadagni",
  "Rimuovi della muffa tossica e guadagni",
  "Risolvi un caso di colera e il governo ti premia con",
  "Lavori come zoologo guadagnando",
  "Vendi panini al pesce e ottieni",
  "Ripari slot machine e ricevi"
]

handler.help = ['lavora']
handler.tags = ['rpg']
handler.command = ['lavora', 'work', 'w']

// Esporta il modulo utilizzando la sintassi ES Module
export default handler