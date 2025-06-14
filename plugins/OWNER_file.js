import fs from 'fs';
import path from 'path';

let handler = async (m, { text, conn, usedPrefix, command }) => {
  let fileName = text.trim();
  if (!fileName) {
    return m.reply("⚠️ Devi specificare il nome del file da creare. Es: `.file nome.txt`");
  }
  
  let filePath = path.join(process.cwd(), fileName);
  
  if (fs.existsSync(filePath)) {
    return m.reply(`⚠️ Il file "${fileName}" esiste già.`);
  }
  
  fs.writeFile(filePath, '', (err) => {
    if (err) {
      console.error(`Errore nella creazione del file: ${err.message}`);
      return m.reply(`❌ Errore nella creazione del file: ${err.message}`);
    }
    m.reply(`✅ Il file "${fileName}" è stato creato con successo nella cartella del bot.`);
  });
};

handler.command = /^file$/i;
handler.owner = true;
export default handler;