const handler = async (m) => {
    const text = m.text; 
    const mention = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text;
    const user = global.db.data.users[mention];
  if (!user) return conn.reply(m.chat, '𝐧𝐨𝐧 𝐯𝐚 𝐢𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐠𝐮𝐚𝐫𝐝𝐚 𝐬𝐞 𝐡𝐚𝐢 𝐭𝐚𝐠𝐠𝐚𝐭𝐨 𝐥'𝐮𝐭𝐞𝐧𝐭𝐞 𝐨𝐩𝐩𝐮𝐫𝐞 𝐧𝐨.');
    conn.reply(m.chat, `@${m.sender.split('@')[0]} 𝐡𝐚 𝐚𝐳𝐳𝐞𝐫𝐚𝐭𝐨 𝐥𝐞 𝐛𝐞𝐬𝐭𝐞𝐦𝐦𝐢𝐞 𝐝𝐢 @${mention.split('@')[0]}`, null, {mentions: [mention, m.sender]});
    user.blasphemy = 0;
  };
  
  handler.command = /^(azzerabestemmie)$/i;
  handler.owner = true;
  export default handler;