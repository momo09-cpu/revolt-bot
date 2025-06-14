const botsInfo = {
  "333bot": "🤖 *333bot*\nBot storico italiano creato da Gab 333, famoso per la modularità, la gestione gruppi e oltre 100 plugin attivi.",
  "bixby-bot": "🤖 *Bixby-Bot*\nInnovativo e versatile, specializzato in automazioni e risposte smart.",
  "origin-bot": "🤖 *Origin-Bot*\nBot ricco di funzionalità di sicurezza e automazioni, la sua velocità è imbattibile.",
  "universal-bot": "🤖 *Universal-Bot*\nBot multiuso, supporta molte piattaforme e integrazioni.",
  "turbo-bot": "🤖 *Turbo-Bot*\nOttimizzato per performance e gestione di grandi gruppi.",
  "onix-bot": "🤖 *Onix-Bot*\nOgni risposta, un tocco di classe. L'eleganza si fa notare"
};

const handler = async (m, { conn, args, usedPrefix }) => {
  // Risposta specifica per ogni bot
  if (args && args[0] && botsInfo[args[0].toLowerCase()]) {
    await conn.sendMessage(
      m.chat,
      {
        text: botsInfo[args[0].toLowerCase()],
        footer: 'Torna indietro con .egemonia',
        buttons: [
          { buttonId: `${usedPrefix}egemonia`, buttonText: { displayText: "🔙 Torna a Egemonia" }, type: 1 }
        ],
        viewOnce: true,
        headerType: 4
      },
      { quoted: m }
    );
    return;
  }

  const text = `
╭━━〔 *🌐 PROGETTO EGEMONIA* 〕━━┈⊷
┃◈ L'*Egemonia* è un progetto ideato dal founder di ChatUnity per riunire i più grandi developer di bot privati:
┃◈
┃◈ • 333bot
┃◈ • Bixby-Bot
┃◈ • Origin-Bot
┃◈ • Universal-Bot
┃◈ • Turbo-Bot
┃◈ • Onix-Bot
┃◈
┃◈ Tutti insieme per portare revolt-bot in concorrenza globale, aiutando con la creazione/fix di plugin.
┃◈ Dalla versione 5.0 sono già presenti plugin creati da questi sviluppatori!
╰━━━━━━━━━━━━━━━━━━━⊷

*Scopri di più su ogni bot cliccando sui bottoni qui sotto!*
`.trim();

  await conn.sendMessage(
    m.chat,
    {
      text,
      footer: 'Powered by ChatUnity Egemonia',
      buttons: [
        { buttonId: `${usedPrefix}egemonia 333bot`, buttonText: { displayText: "🤖 333bot" }, type: 1 },
        { buttonId: `${usedPrefix}egemonia bixby-bot`, buttonText: { displayText: "🤖 Bixby-Bot" }, type: 1 },
        { buttonId: `${usedPrefix}egemonia origin-bot`, buttonText: { displayText: "🤖 Origin-Bot" }, type: 1 },
        { buttonId: `${usedPrefix}egemonia universal-bot`, buttonText: { displayText: "🤖 Universal-Bot" }, type: 1 },
        { buttonId: `${usedPrefix}egemonia turbo-bot`, buttonText: { displayText: "🤖 Turbo-Bot" }, type: 1 },
        { buttonId: `${usedPrefix}egemonia onix-bot`, buttonText: { displayText: "🤖 Onix-Bot" }, type: 1 }
      ],
      viewOnce: true,
      headerType: 4
    },
    { quoted: m }
  );
};

handler.help = ['egemonia'];
handler.tags = ['info'];
handler.command = /^egemonia(?:\s(\S+))?$/i;

export default handler;
