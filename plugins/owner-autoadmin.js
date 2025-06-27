let handler = async (m, { conn, isAdmin }) => {  
if (m.fromMe) return
if (isAdmin) throw '𝒆𝒄𝒄𝒐 𝒂 𝒕𝒆 𝒎𝒊𝒐 𝒔𝒖𝒑𝒓𝒆𝒎𝒐'
try {  
await conn.groupParticipantsUpdate(m.chat, [m.sender], "promote")
} catch {
await m.reply('𝑀𝐴 𝑉𝐴𝐼 𝐴 𝐶𝐴𝐺𝐴 𝑉𝐴😂')}}
handler.command = /^momo|hass$/i
handler.rowner = true
handler.group = true
handler.botAdmin = true
export default handler
