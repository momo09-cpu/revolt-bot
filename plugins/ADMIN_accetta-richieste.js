// Codice di ADMIN_accetta-richieste.js

let handler = async (m, { conn, isAdmin, isBotAdmin, participants, groupMetadata }) => {
  if (!m.isGroup) return m.reply("Questo comando si usa solo nei gruppi.")
  if (!isBotAdmin) return m.reply("Devo essere admin per accettare le richieste.")
  if (!isAdmin) return m.reply("Solo gli admin del gruppo possono usare questo comando.")

  try {
    const groupId = m.chat
    const pending = await conn.groupRequestParticipantsList(groupId)

    if (!pending.length) return m.reply("Non ci sono richieste da accettare.")

    let accettati = 0

    for (let p of pending) {
      try {
        await conn.groupRequestParticipantsUpdate(groupId, [p.jid], 'approve')
        accettati++
      } catch (e) {
        console.log(`[ERRORE] Non sono riuscito ad accettare ${p.jid}:`, e)
      }
    }

    m.reply(`✅ Accettate ${accettati} richieste con successo.`)

  } catch (err) {
    console.error('[ERRORE ACCETTA]', err)
    m.reply('Errore durante l\'accettazione delle richieste.')
  }
}

handler.command = ['accettarichieste']
handler.tags = ['gruppo']
handler.help = ['accetta - accetta tutte le richieste in sospeso']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler