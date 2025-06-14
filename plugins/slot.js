//import db from '../lib/database.js'
let cooldowns = {};

let reg = 40
let handler = async (m, { conn, args, usedPrefix, command }) => {
    let fa = `.`.trim()
    let users = global.db.data.users[m.sender]
    let apuesta = parseInt(args[0])

    // Cooldown di 5 minuti (solo in caso di vincita)
    if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < 5 * 60 * 1000) {
        let ms = cooldowns[m.sender] + 5 * 60 * 1000 - Date.now();
        let min = Math.floor(ms / 60000);
        let sec = Math.floor((ms % 60000) / 1000);
        let tempoRimanente = `${min}m ${sec}s`

        await conn.sendMessage(
          m.chat,
          {
            text: `⏳ Devi aspettare ${tempoRimanente} prima di poter rigiocare dopo una vincita!`,
            footer: 'Torna più tardi o scegli un altro comando:',
            buttons: [
              { buttonId: `${usedPrefix}menu`, buttonText: { displayText: "🏠 Menu Principale" }, type: 1 }
            ],
            viewOnce: true,
            headerType: 4
          },
          { quoted: m }
        );
        return;
    }

    let emojis = ["🪙", "🎰", "💎"];
    // Estrai 3 simboli casuali
    let estratti = [];
    for (let i = 0; i < 3; i++) {
        estratti.push(emojis[Math.floor(Math.random() * emojis.length)]);
    }

    // Aumenta la probabilità di vincita: 1 su 4 (25%) per tripla uguale
    let win = false;
    if (Math.random() < 0.25) {
        estratti = [emojis[0], emojis[0], emojis[0]]; // tripla vincente
        win = true;
    }

    // Ricostruisci la matrice per la visualizzazione
    let x = [estratti[0], estratti[0], estratti[0]];
    let y = [estratti[1], estratti[1], estratti[1]];
    let z = [estratti[2], estratti[2], estratti[2]];

    let end;
    if (win || (estratti[0] === estratti[1] && estratti[1] === estratti[2])) {
        end = `𝐡𝐚𝐢 𝐯𝐢𝐧𝐭𝐨 🎉 🎁`
        users.exp += apuesta + apuesta
        win = true;
    } else if (estratti[0] === estratti[1] || estratti[0] === estratti[2] || estratti[1] === estratti[2]) {
        end = `𝐜𝐨𝐧𝐭𝐢𝐧𝐮𝐚 𝐚 𝐭𝐞𝐧𝐭𝐚𝐫𝐞 . . .`
    } else {
        end = `𝐡𝐚𝐢 𝐩𝐞𝐫𝐬𝐨 🤡`
        users.exp -= apuesta
    }

    // Se ha vinto, imposta il cooldown
    if (win) {
        cooldowns[m.sender] = Date.now();
    }

    let risultatoSlot = `
       🎰 ┃ 𝐒𝐋𝐎𝐓
     ──────────
       ${x[0]} : ${y[0]} : ${z[0]}
       ${x[1]} : ${y[1]} : ${z[1]}
       ${x[2]} : ${y[2]} : ${z[2]}
     ──────────
        
${end}`

    await conn.sendMessage(
      m.chat,
      {
        text: risultatoSlot, // o caption se usi video/foto
        footer: 'Vuoi giocare ancora?',
        buttons: [
          { buttonId: `${usedPrefix}slot`, buttonText: { displayText: "🎰 Gioca ancora" }, type: 1 },
          { buttonId: `${usedPrefix}menu`, buttonText: { displayText: "🏠 Menu Principale" }, type: 1 }
        ],
        viewOnce: true,
        headerType: 4
      },
      { quoted: m }
    );
}
handler.help = ['slot <apuesta>']
handler.tags = ['game']
handler.command = ['slot']

export default handler