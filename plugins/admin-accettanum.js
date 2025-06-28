let handler = async (m, { conn, args, groupMetadata, isAdmin, isROwner }) => {
  if (!m.isGroup) return m.reply('❌ Questo comando va usato in un gruppo.');
  if (!isAdmin && !isROwner) return m.reply('❌ Solo admin possono accettare richieste.');

  const count = parseInt(args[0]);
  if (isNaN(count) || count <= 0) return m.reply("📌 Specifica un numero valido di richieste da accettare.\nEsempio: *.accetta 5*");

  const requests = groupMetadata?.participantsRequest || [];
  if (!requests.length) return m.reply("📭 Nessuna richiesta in sospeso al momento.");

  const toAccept = requests.slice(0, count);
  let accepted = [];

  for (let user of toAccept) {
    try {
      await conn.groupAcceptInviteV4(m.chat, user.jid);
      accepted.push(user.jid);
    } catch (e) {
      console.error(`Errore nell'accettare ${user.jid}:`, e);
    }
  }

  if (accepted.length) {
    await m.reply(`✅ Accettate ${accepted.length} richieste:\n${accepted.map(j => '➤ @' + j.split('@')[0]).join('\n')}`, null, {
      mentions: accepted
    });
  } else {
    m.reply("⚠️ Nessuna richiesta è stata accettata. Forse già approvate o errore.");
  }
};

handler.help = ['accetta <numero>'];
handler.tags = ['group'];
handler.command = /^accetta$/i;
handler.group = true;
handler.admin = true;

export default handler;