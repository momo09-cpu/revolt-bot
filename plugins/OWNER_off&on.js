import fs from 'fs'
import path from 'path'

const handler = async (m, { conn, args, command }) => {
  if (!args[0]) return m.reply('Scrivi il nome dello script, esempio: .offscript info')

  let file = args[0]
  if (!file.endsWith('.js')) file += '.js'

  const filePath = path.join('./plugins', file)
  if (!fs.existsSync(filePath)) return m.reply('File non trovato.')

  let content = fs.readFileSync(filePath, 'utf-8')

  if (command === 'offscript') {
    if (content.includes('/*') && content.includes('*/')) return m.reply('Script è già spento.')
    const lines = content.split('\n')
    const preservedLine = lines.find(line => line.includes('Plugin fatto da Gabs & 333 Staff'))
    const rest = lines.filter(line => !line.includes('Plugin fatto da Gabs & 333 Staff'))
    const newContent = `${preservedLine || ''}\n/*\n${rest.join('\n')}\n*/`
    fs.writeFileSync(filePath, newContent)
    return m.reply(`Script ${file} spento.`)
  }

  if (command === 'onscript') {
    const newContent = content
      .replace(/^\/\*/gm, '')
      .replace(/\*\/$/gm, '')
    fs.writeFileSync(filePath, newContent.trim())
    return m.reply(`Script ${file} riattivato.`)
  }
}

handler.command = /^(offscript|onscript)$/i
handler.rowner = true;
export default handler