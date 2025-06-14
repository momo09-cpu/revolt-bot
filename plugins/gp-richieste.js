// Codice di ADMIN_accetta-richieste.js

let handler = async (m, { conn, isAdmin, isBotAdmin, participants, groupMetadata, args, usedPrefix, command }) => {
  if (!m.isGroup) return m.reply("Questo comando si usa solo nei gruppi.")
  if (!isBotAdmin) return m.reply("Devo essere admin per accettare le richieste.")
  if (!isAdmin) return m.reply("Solo gli admin del gruppo possono usare questo comando.")

  const groupId = m.chat
  const pending = await conn.groupRequestParticipantsList(groupId)

  // Se non ci sono richieste
  if (!pending.length) return m.reply("Non ci sono richieste da accettare.")

  // Gestione bottoni
  if (!args[0]) {
    let text = `Richieste in sospeso: ${pending.length}\n\nScegli un'opzione:`
    return await conn.sendMessage(m.chat, {
      text,
      buttons: [
        { buttonId: `${usedPrefix}${command} accetta`, buttonText: { displayText: "✅ Accetta tutte" }, type: 1 },
        { buttonId: `${usedPrefix}${command} rifiuta`, buttonText: { displayText: "❌ Rifiuta tutte" }, type: 1 },
        { buttonId: `${usedPrefix}${command} accetta39`, buttonText: { displayText: "✅ Accetta solo +39" }, type: 1 }
      ],
      footer: 'Gestione richieste gruppo'
    }, { quoted: m });
  }

  // ACCETTA TUTTI
  if (args[0] === 'accetta') {
    let accettati = 0
    for (let p of pending) {
      try {
        await conn.groupRequestParticipantsUpdate(groupId, [p.jid], 'approve')
        accettati++
      } catch (e) {
        console.log(`[ERRORE] Non sono riuscito ad accettare ${p.jid}:`, e)
      }
    }
    return m.reply(`✅ Accettate ${accettati} richieste con successo.`);
  }

  // RIFIUTA TUTTI
  if (args[0] === 'rifiuta') {
    let rifiutati = 0
    for (let p of pending) {
      try {
        await conn.groupRequestParticipantsUpdate(groupId, [p.jid], 'reject')
        rifiutati++
      } catch (e) {
        console.log(`[ERRORE] Non sono riuscito a rifiutare ${p.jid}:`, e)
      }
    }
    return m.reply(`❌ Rifiutate ${rifiutati} richieste con successo.`);
  }

  // ACCETTA SOLO +39
  if (args[0] === 'accetta30') {
    let accettati = 0
    for (let p of pending) {
      // Accetta solo chi ha +39 nel nome visualizzato
      const name = p?.name || p?.notify || '';
      if (/\+39/.test(name)) {
        try {
          await conn.groupRequestParticipantsUpdate(groupId, [p.jid], 'approve')
          accettati++
        } catch (e) {
          console.log(`[ERRORE] Non sono riuscito ad accettare ${p.jid}:`, e)
        }
      }
    }
    return m.reply(`✅ Accettate ${accettati} richieste con '+39' nel nome.`);
  }
}

handler.command = ['richieste']
handler.tags = ['gruppo']
handler.help = ['accettarichieste - gestisci tutte le richieste in sospeso']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler