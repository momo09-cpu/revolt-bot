import fetch from "node-fetch";
import yts from "yt-search";
import axios from "axios";

const formatAudio = ['mp3', 'm4a', 'webm', 'acc', 'flac', 'opus', 'ogg', 'wav'];
const formatVideo = ['360', '480', '720', '1080'];
const MAX_DURATION = 360;

const ddownr = {
  download: async (url, format) => {
    if (!formatAudio.includes(format) && !formatVideo.includes(format)) {
      throw new Error('Formato non supportato');
    }

    const { data } = await axios.get(`https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });

    if (data?.success) {
      return {
        id: data.id,
        image: data.info.image,
        title: data.title,
        downloadUrl: await ddownr.cekProgress(data.id)
      };
    }
    throw new Error('Errore nel recupero dei dettagli');
  },

  cekProgress: async (id) => {
    while (true) {
      const { data } = await axios.get(`https://p.oceansaver.in/ajax/progress.php?id=${id}`, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });

      if (data?.success && data.progress === 1000) {
        return data.download_url;
      }
      await new Promise(resolve => setTimeout(resolve, 3000));
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
          `https://api.zenkey.my.id/api/download/ytmp4?apikey=zenkey&url=${url}`
        ];
        
        for (const src of sources) {
          try {
            const res = await fetch(src);
            const data = await res.json();
            const downloadUrl = data?.result?.download?.url || data?.downloadUrl;
            if (downloadUrl) {
              return conn.sendMessage(m.chat, {
                video: { url: downloadUrl },
                caption: '✅ Download completato!',
                thumbnail: thumb
              }, { quoted: m });
            }
          } catch (e) {
            console.error(`Errore con sorgente ${src}:`, e);
          }
        }
        return conn.sendMessage(m.chat, { 
          text: '╭━━〔 ❗ 〕━━┈⊷\n┃◈ Nessun link valido trovato\n╰━━━━━━━━━━┈·๏'
        }, { quoted: m });
      }
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
    
    const infoMessage = `╭〔🎥 𝑰𝑵𝑭𝑶 𝑽𝑰𝑫𝑬𝑶〕┈⊷
┃◈╭─────────·๏
┃◈┃• Titolo: ${title}
┃◈┃• Durata: ${timestamp}
┃◈┃• Visualizzazioni: ${formattedViews}
┃◈┃• Canale: ${author?.name || "Sconosciuto"}
┃◈┃• Pubblicato: ${ago}
┃◈┃• Link: ${url}
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



