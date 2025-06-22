import fetch from "node-fetch";
import yts from "yt-search";
import axios from "axios";
import { downloadFromSource } from './tools-playvideo.js';

const formatAudio = ['mp3', 'm4a', 'webm', 'acc', 'flac', 'opus', 'ogg', 'wav'];
const formatVideo = ['360', '480', '720', '1080'];
const MAX_DURATION = 360;

const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, come Gecko) Chrome/91.0.4472.124 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, come Gecko) Version/14.0.1 Safari/605.1.15',
  'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, come Gecko) Chrome/91.0.4472.124 Mobile Safari/537.36'
];

const ddownr = {
  download: async (url, format) => {
    const config = {
      method: 'GET',
      url: `https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`,
      headers: {
        'User-Agent': userAgents[Math.floor(Math.random() * userAgents.length)]
      }
    };
    try {
      const response = await axios.request(config);
      if (response.data && response.data.success) {
        const { id, title, info } = response.data;
        const { image } = info;
        const downloadUrl = await ddownr.cekProgress(id);
        return { id, image, title, downloadUrl };
      } else {
        throw new Error('𝐄𝐑𝐑𝐎𝐑𝐄 𝐃𝐔𝐑𝐀𝐍𝐓𝐄 𝐈𝐋 𝐑𝐄𝐂𝐔𝐏𝐄𝐑𝐎 𝐃𝐄𝐋𝐋𝐄 𝐈𝐍𝐅𝐎 𝐃𝐄𝐋 𝐕𝐈𝐃𝐄𝐎.');
      }
    } catch (error) {
      console.error('𝐄𝐑𝐑𝐎𝐑𝐄:', error);
      throw error;
    }
  },
  cekProgress: async (id) => {
    const config = {
      method: 'GET',
      url: `https://p.oceansaver.in/ajax/progress.php?id=${id}`,
      headers: {
        'User-Agent': userAgents[Math.floor(Math.random() * userAgents.length)]
      }
    };
    try {
      while (true) {
        const response = await axios.request(config);
        if (response.data && response.data.success && response.data.progress === 1000) {
          return response.data.download_url;
        }
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    } catch (error) {
      console.error('𝐄𝐑𝐑𝐎𝐑𝐄:', error);
      throw error;
    }
  }
};

const handler = async (m, { conn, text, usedPrefix, command, args }) => {
  try {
    if (!text.trim()) {
      return conn.sendMessage(m.chat, { 
        text: '╭━━〔 ❗ 〕━━┈⊷\n┃◈ Inserisci un titolo o un link\n╰━━━━━━━━━━┈·๏'
      }, { quoted: m });
    }

    // Modalità download diretto da bottone
    if (args[0] === 'audio' || args[0] === 'video') {
      const search = await yts(args.slice(1).join(' '));
      if (!search.all.length) {
        return conn.sendMessage(m.chat, { 
          text: '╭━━〔 ❗ 〕━━┈⊷\n┃◈ Nessun risultato trovato\n╰━━━━━━━━━━┈·๏'
        }, { quoted: m });
      }

      const videoInfo = search.all[0];
      const { url, title, thumbnail } = videoInfo;
      const thumb = (await conn.getFile(thumbnail))?.data;

      if (args[0] === 'audio') {
        await conn.sendMessage(m.chat, { text: '🎵 Sto scaricando l\'audio...' }, { quoted: m });
        const api = await ddownr.download(url, 'mp3');
        return conn.sendMessage(m.chat, { 
          audio: { url: api.downloadUrl }, 
          mimetype: "audio/mpeg"
        }, { quoted: m });
      } else {
        await conn.sendMessage(m.chat, { text: '🎬 Sto scaricando il video...' }, { quoted: m });
        const sources = [
          `https://api.siputzx.my.id/api/d/ytmp4?url=${url}`,
          `https://api.zenkey.my.id/api/download/ytmp4?apikey=zenkey&url=${url}`,
          `https://axeel.my.id/api/download/video?url=${encodeURIComponent(url)}`,
          `https://delirius-apiofc.vercel.app/download/ytmp4?url=${url}`,
          `https://api.neoxr.eu/api/youtube?url=${url}&type=video&quality=720p&apikey=GataDios`,
          `https://api.davidcyriltech.my.id/download/ytmp3?url=${encodeURIComponent(url)}`,
          `https://exonity.tech/api/ytdlp2-faster?apikey=adminsepuh&url=${url}`
        ];
        const thumb = (await conn.getFile(thumbnail))?.data;
        const downloadPromises = sources.map(source => downloadFromSource(source, url, title, thumb, m, conn));
        const results = await Promise.all(downloadPromises);
        if (!results.includes(true)) {
          return conn.sendMessage(m.chat, {
            text: '⚠︎ *ERRORE:* Nessun link valido trovato per il download.'
          }, { quoted: m });
        }
        return;
      }
    }

    // Download diretto video play2/ytmp4
    if (command === 'play2' || command === 'ytmp4') {
      await conn.sendMessage(m.chat, { text: '🎬 Sto scaricando il video...' }, { quoted: m });
      const sources = [
        `https://api.siputzx.my.id/api/d/ytmp4?url=${url}`,
        `https://api.zenkey.my.id/api/download/ytmp4?apikey=zenkey&url=${url}`,
        `https://axeel.my.id/api/download/video?url=${encodeURIComponent(url)}`,
        `https://delirius-apiofc.vercel.app/download/ytmp4?url=${url}`
      ];
      const thumb = (await conn.getFile(thumbnail))?.data;
      const downloadPromises = sources.map(source => downloadFromSource(source, url, title, thumb, m, conn));
      const results = await Promise.all(downloadPromises);
      if (!results.includes(true)) {
        return conn.sendMessage(m.chat, {
          text: '⚠︎ *ERRORE:* Nessun link valido trovato per il download.'
        }, { quoted: m });
      }
      return;
    }

    // Modalità ricerca normale
    const search = await yts(text);
    if (!search.all.length) {
      return conn.sendMessage(m.chat, { 
        text: '╭━━〔 ❗ 〕━━┈⊷\n┃◈ Nessun risultato trovato\n╰━━━━━━━━━━┈·๏'
      }, { quoted: m });
    }

    const videoInfo = search.all[0];
    if (videoInfo.seconds > MAX_DURATION) {
      return conn.sendMessage(m.chat, { 
        text: `╭━━〔 ❗ 〕━━┈⊷\n┃◈ Video troppo lungo!\n┃◈ Massimo consentito: 5 minuti\n┃◈ Durata attuale: ${videoInfo.timestamp}\n╰━━━━━━━━━━┈·๏`
      }, { quoted: m });
    }

    const { title, thumbnail, timestamp, views, ago, url, author } = videoInfo;
    const formattedViews = new Intl.NumberFormat().format(views);

     const infoMessage = `╭〔🎥 𝑴𝑼𝑺𝑰𝑪𝑨〕┈⊷
┃◈╭─────────·๏
┃◈┃• ✍️𝒕𝒊𝒕𝒐𝒍𝒐: ${title}
┃◈┃• ⏳𝒅𝒖𝒓𝒂𝒕𝒂: ${timestamp}
┃◈┃• 👀𝒗𝒊𝒔𝒖𝒂𝒍: ${formattedViews}
┃◈┃• 🔰𝒄𝒂𝒏𝒂𝒍𝒆: ${author?.name ||"Sconosciuto"}
┃◈┃• ✔️𝒑𝒖𝒃𝒃𝒍𝒊𝒄𝒂𝒕𝒐: ${ago}
┃◈┃• 🔗𝒍𝒊𝒏𝒌: ${url}                                  
┃◈┃  
┃◈└───────┈⊷
╰━━━━━━━━━┈·๏`;
    await conn.sendMessage(
      m.chat,
      {
        text: infoMessage,
        footer: 'Seleziona un formato:',
        buttons: [
          { buttonId: `${usedPrefix}play audio ${text}`, buttonText: { displayText: "🎵 Audio" }, type: 1 },
          { buttonId: `${usedPrefix}play video ${text}`, buttonText: { displayText: "🎬 Video" }, type: 1 },
          { buttonId: `${usedPrefix}salva ${title}`, buttonText: { displayText: "💾 Salva in Playlist" }, type: 1 }
        ],
        viewOnce: true,
        headerType: 4
      },
      { quoted: m }
    );

  } catch (error) {
    console.error('Errore:', error);
    await conn.sendMessage(m.chat, { 
      text: `╭━━〔 ❗ 〕━━┈⊷\n┃◈ Errore: ${error.message}\n╰━━━━━━━━━━┈·๏`
    }, { quoted: m });
  }
};

handler.help = ['play <testo/url>'];
handler.tags = ['downloader'];
handler.command = /^(play|ytmp4|play2)$/i;

export default handler;

