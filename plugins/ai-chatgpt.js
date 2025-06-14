import fetch from 'node-fetch';
import axios from 'axios';
import translate from '@vitalets/google-translate-api';
import {Configuration, OpenAIApi} from 'openai';

const configuration = new Configuration({
  organization: global.openai_org_id,
  apiKey: global.openai_key
});
const openaiii = new OpenAIApi(configuration);

const handler = async (m, {conn, text, usedPrefix, command}) => {
  // Evita che risponda al prefisso 'a'
  if (usedPrefix == 'a' || usedPrefix == 'A') return;
  
  if (!text) {
    return conn.reply(m.chat, `*⚠️ ATTEZIONE*: Per favore inserisci una richiesta o un comando per utilizzare ChatGPT\n\n❏ *Esempi di richieste*:\n❏ ${usedPrefix + command} Consiglia 10 film d'azione\n❏ ${usedPrefix + command} Codice JavaScript per un gioco di carte`, m);
  }

  try {
    await conn.sendPresenceUpdate('composing', m.chat);

    // Comandi principali (ia, chatgpt)
    if (command == 'ia' || command == 'chatgpt') {
      const luminaiResponse = await callLuminaiAPI(text, m.pushName);
      await m.reply(luminaiResponse);
      return;
    }

    // Comandi alternativi (openai, ia2, chatgpt2)
    if (command == 'openai' || command == 'ia2' || command == 'chatgpt2') {
      const gptResponse = await callDeliriusAPI(text);
      await m.reply(gptResponse);
      return;
    }

  } catch (error) {
    console.error('Errore nella risposta di ChatGPT:', error);
    await conn.reply(m.chat, '❌ Si è verificato un errore durante la generazione della risposta. Riprova più tardi.', m);
  }
};

// Funzione per chiamare l'API Luminai
async function callLuminaiAPI(query, username) {
  try {
    const response = await axios.post("https://luminai.my.id", {
      content: query,
      user: username,
      prompt: `Rispondi sempre in italiano.`,
      webSearchMode: false
    });
    return response.data.result;
  } catch (error) {
    console.error('Errore Luminai API:', error);
    throw error;
  }
}

// Funzione per chiamare l'API Delirius
async function callDeliriusAPI(text) {
  try {
    const response = await fetch(`https://deliriusapi-official.vercel.app/ia/gptweb?text=${encodeURIComponent(text)}&lang=it`);
    const data = await response.json();
    return data.gpt || "Non ho potuto generare una risposta.";
  } catch (error) {
    console.error('Errore Delirius API:', error);
    throw error;
  }
}

handler.help = ['chatgpt <testo>', 'ia <testo>'];
handler.tags = ['ai'];
handler.command = /^(openai|chatgpt|ia|ai|openai2|chatgpt2|bot)$/i;
export default handler;