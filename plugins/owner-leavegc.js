let handler = async (m, { conn, args, command }) => {
await m.reply('𝒎𝒊 𝒔𝒐𝒏𝒐 𝒓𝒐𝒕𝒕𝒐 𝒊𝒍 𝒄𝒂𝒛𝒛𝒐 𝒅𝒊 𝒔𝒕𝒂𝒓𝒆 𝒒𝒖𝒊 𝒂𝒅𝒅𝒊𝒐 𝒑𝒖𝒕𝒕𝒂𝒏𝒆🐶') 
await  conn.groupLeave(m.chat)}
handler.command = /^(out|addio|leave)$/i
handler.group = true
handler.rowner = true
export default handler
