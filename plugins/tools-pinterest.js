import { pinterest } from '@bochilteam/scraper';
import axios from 'axios';

// Definizione di lenguajeGB
const lenguajeGB = {
  smsAvisoMG: () => "Per favore, inserisci un testo valido.",
  smsAvisoEG: () => "Avviso:",
  smsMensError2: () => "Si è verificato un errore durante l'elaborazione della richiesta.",
  // Aggiungi altre chiavi e funzioni necessarie qui
};

// Definizione di mid
const mid = {
  smsMalused7: "Utilizzo errato del comando. Esempio:",
  buscador: "Risultati della ricerca",
  // Aggiungi altre chiavi necessarie qui
};

// Definizione di apis
const apis = "https://api.siputzx.my.id/api/s/pinterest?query="; // Sostituisci con l'URL base corretto per le API

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `${lenguajeGB['smsAvisoMG']()} ${mid.smsMalused7}\n*${usedPrefix + command} gatta | gatto*`;
  m.react("🚀");

  try {
    let response = await axios.get(`https://api.dorratz.com/v2/pinterest?q=${text}`);
    let searchResults = response.data;
    let selectedResults = searchResults.slice(0, 9);

    if (m.isWABusiness) {
      const medias = selectedResults.map(result => ({ image: { url: result.image }, caption: result.fullname || text }));
      await conn.sendAlbumMessage(m.chat, medias, { quoted: m, delay: 2000, caption: `${lenguajeGB['smsAvisoEG']()} 💞 ${mid.buscador}: ${text}` });
    } else {
      let message = `${lenguajeGB['smsAvisoEG']()} 💞 ${mid.buscador}: ${text}\n\n`;
      selectedResults.forEach(result => {
        message += `*${result.fullname || text}*\n💞 *Autore:* ${result.upload_by}\n💞 *Seguaci:* ${result.followers}\n🔗 ${result.image}\n\n`;
      });
      await m.reply(message.trim());
      m.react("✅️");
    }
  } catch {
    try {
      let response = await axios.get(`https://api.siputzx.my.id/api/s/pinterest?query=${encodeURIComponent(text)}`);
      if (!response.data.status) return await m.reply("❌ Nessun risultato trovato.");
      let searchResults = response.data.data;
      let selectedResults = searchResults.slice(0, 6);
      let message = `${lenguajeGB['smsAvisoEG']()} 💞 ${mid.buscador}: ${text}\n\n`;
      selectedResults.forEach(result => {
        message += `*${result.grid_title || text}*\n🔗 ${result.images_url}\n\n`;
      });
      await m.reply(message.trim());
    } catch {
      try {
        let { data: response } = await axios.get(`${apis}/search/pinterestv2?text=${encodeURIComponent(text)}`);
        if (!response.status || !response.data || response.data.length === 0) return m.reply(`❌ Nessun risultato trovato per "${text}".`);
        let searchResults = response.data;
        let selectedResults = searchResults.slice(0, 6);
        let message = `${lenguajeGB['smsAvisoEG']()} 💞 ${mid.buscador}: ${text}\n\n`;
        selectedResults.forEach(result => {
          message += `*${result.description || text}*\n🔎 *Autore:* ${result.name} (@${result.username})\n🔗 ${result.image}\n\n`;
        });
        await m.reply(message.trim());
      } catch (e) {
        console.log(`❗❗ ${lenguajeGB['smsMensError2']()} ${usedPrefix + command} ❗❗`);
        console.log(e);
        handler.money = false;
      }
    }
  }
};

handler.help = ['pinterest <keyword>'];
handler.tags = ['internet'];
handler.command = /^(pinterest|dlpinterest|pinterestdl)$/i;
export default handler;