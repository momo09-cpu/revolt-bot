// Codice di ADMIN_rifiuta-richieste.js

// Rifiuta +## by Youns
let handler = async (m, { conn, isAdmin, isBotAdmin, args }) => {
  if (!m.isGroup) return m.reply("Questo comando si usa solo nei gruppi.")
  if (!isBotAdmin) return m.reply("Devo essere admin per rifiutare le richieste.")
  if (!isAdmin) return m.reply("Solo gli admin del gruppo possono usare questo comando.")

  try {
    const groupId = m.chat
    const pending = await conn.groupRequestParticipantsList(groupId)
    const filtroPrefisso = args[0]

    if (!pending.length) return m.reply("Non ci sono richieste da rifiutare.")

    let rifiutati = 0

    for (let p of pending) {
      const numero = p.jid.split('@')[0]

      if (!filtroPrefisso || numero.startsWith(filtroPrefisso)) {
        try {
          await conn.groupRequestParticipantsUpdate(groupId, [p.jid], 'reject')
          rifiutati++
        } catch (e) {
          console.log(`[ERRORE] Non sono riuscito a rifiutare ${p.jid}:`, e)
        }
      }
    }

    if (rifiutati === 0) {
      return m.reply(filtroPrefisso ? `Nessuna richiesta con prefisso +${filtroPrefisso}.` : "Nessuna richiesta rifiutata.")
    }

    m.reply(`❌ Rifiutate ${rifiutati} richieste con successo${filtroPrefisso ? ` con prefisso +${filtroPrefisso}` : ""}.`)

  } catch (err) {
    console.error('[ERRORE RIFIUTA]', err)
    m.reply("Errore durante il rifiuto delle richieste.")
  }
}

handler.command = ['rifiutarichieste']
handler.tags = ['gruppo']
handler.help = ['rifiuta [prefisso] - rifiuta le richieste (es. .rifiuta 39)']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler