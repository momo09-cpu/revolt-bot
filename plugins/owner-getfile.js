import fs from 'fs'
import syntaxError from 'syntax-error'
import path from 'path'

const _fs = fs.promises

let handler = async (m, { text, usedPrefix, command, __dirname, conn }) => {
  if (!text) throw `
> Utilizzo: ${usedPrefix + command} <nome file/percorso> (file/script)
Esempi:
  ${usedPrefix}getplugin menu-gruppo file
  ${usedPrefix}getplugin menu-gruppo script
  ${usedPrefix}getfile config.js file
  ${usedPrefix}getfile config.js script
  `.trim()

  const args = text.split(' ')
  if (args.length < 2) throw '❌ Devi specificare "file" o "script".'
  const option = args[1].toLowerCase()

  let isPlugin = /p(lugin)?/i.test(command)
  let fileArg = args[0]
  let filename, pathFile

  if (isPlugin) {
    filename = fileArg.replace(/plugin(s)?\//i, '') + (/\.js$/i.test(fileArg) ? '' : '.js')
    pathFile = path.join(__dirname, filename)
  } else {
    filename = path.basename(fileArg)
    pathFile = fileArg
  }

  const header = "//Plugin fatto da Gabs & 333 Staff\n"
  
  try {
    const isJS = /\.js$/i.test(filename)
    let fileContent

    if (isJS) {
      fileContent = await _fs.readFile(pathFile, 'utf8')
    } else {
      fileContent = await _fs.readFile(pathFile)
    }
    
    if (option === 'file') {
      if (isJS) {
        const contentToSend = header + fileContent
        await conn.sendMessage(m.chat, {
          document: Buffer.from(contentToSend, 'utf8'),
          mimetype: 'application/javascript',
          fileName: filename,
          caption: isPlugin ? `Ecco il plugin: ${filename}` : `Ecco il file: ${filename}`
        }, { quoted: m })
      } else {
        await conn.sendMessage(m.chat, {
          document: fileContent,
          fileName: filename,
          caption: `Ecco il file: ${filename}`
        }, { quoted: m })
      }
    } else if (option === 'script') {
      if (!isJS) throw '❌ L\'opzione script è disponibile solo per file JavaScript.'
      await m.reply(`Codice di ${filename}:\n\n\`\`\`js\n${fileContent}\n\`\`\``)
    } else {
      throw '❌ Opzione non valida! Usa "file" o "script".'
    }

    if (isJS) {
      const error = syntaxError(fileContent, filename, {
        sourceType: 'module',
        allowReturnOutsideFunction: true,
        allowAwaitOutsideFunction: true
      })
      if (error) {
        await m.reply(`⛔️ Errore in *${filename}*:\n\n${error}`.trim())
      }
    }
  } catch (err) {
    await m.reply(`❌ Errore: Il file *${filename}* non esiste o non può essere letto.\n${err}`)
  }
}

handler.help = ['getplugin <nome file> (file/script)', 'getfile <percorso file> (file/script)']
handler.tags = ['owner']
handler.command = /^g(et)?(p(lugin)?|f(ile)?)$/i
handler.rowner = true

export default handler