let handler = async (m) => {
global.db.data.chats[m.chat].isBanned = true
m.reply('+1𝐜𝐡𝐚𝐭 𝐟𝐮𝐨𝐫𝐢 𝐝𝐚𝐢 𝐜𝐨𝐠𝐥𝐢𝐨𝐧𝐢 ✓')
}
handler.help = ['banchat']
handler.tags = ['owner']
handler.command = /^banchat|bangp$/i
handler.rowner = true
export default handler
