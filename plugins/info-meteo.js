import axios from 'axios';

async function handler(m, { conn, args }) {
  if (!args[0]) return m.reply('❗ Inserisci il nome di una città. Uso: .meteo [nome città]');

  try {
    const city = args.join(' ');
    const apiKey = '2d61a72574c11c4f36173b627f8cb177';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    const res = await axios.get(url);
    const data = res.data;

    const weather = `
> 🌍 Info Meteo per ${data.name}, ${data.sys.country} 🌍
> 🌡 Temperatura: ${data.main.temp}°C
> 🌡 Percepita: ${data.main.feels_like}°C
> 🌡 Minima: ${data.main.temp_min}°C
> 🌡 Massima: ${data.main.temp_max}°C
> 💧 Umidità: ${data.main.humidity}%
> ☁ Meteo: ${data.weather[0].main}
> 🌫 Descrizione: ${data.weather[0].description}
> 💨 Vento: ${data.wind.speed} m/s
> 🔽 Pressione: ${data.main.pressure} hPa

> © Powered By CRISS AI
    `.trim();

    m.reply(weather);
  } catch (e) {
    console.error(e);
    if (e.response && e.response.status === 404) {
      m.reply('🚫 Città non trovata. Controlla la scrittura e riprova.');
    } else {
      m.reply('⚠ Si è verificato un errore durante il recupero delle informazioni meteo. Riprova più tardi.');
    }
  }
}

handler.command = /^(meteo)$/i;
handler.help = ['meteo <città>'];
handler.tags = ['other'];
handler.description = 'Ottieni informazioni meteo per una località';
handler.react = '🌤';
handler.limit = true;
handler.exp = 5;

export default handler;