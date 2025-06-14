const userSpamData = {}
let handler = m => m
handler.before = async function (m, {conn, isAdmin, isBotAdmin, isOwner, isROwner, isPrems}) {
const chat = global.db.data.chats[m.chat]
if (!m.isGroup) return
if (chat.modoadmin) return  
if (isOwner || isROwner || isAdmin || !isBotAdmin || isPrems) return
  
let user = global.db.data.users[m.sender]
const sender = m.sender
const currentTime = new Date().getTime()
const timeWindow = 4500
const messageLimit = 8

let time, time2, time3, mensaje
time = 60000
time2 = 120000
time3 = 360000

if (!(sender in userSpamData)) {
userSpamData[sender] = {
lastMessageTime: currentTime,
messageCount: 1,
antiBan: 0, 
message: 0,
message2: 0,
message3: 0,
}
} else {
const userData = userSpamData[sender]
const timeDifference = currentTime - userData.lastMessageTime

if (userData.antiBan === 1) {
if (userData.message < 1) {
userData.message++  
mensaje = `*𝐇𝐄𝐘 @${m.sender.split`@`[0]} 𝐒𝐓𝐀𝐈 𝐒𝐏𝐀𝐌𝐌𝐀𝐍𝐃𝐎?🤨*\n*𝐎𝐑𝐀 𝐕𝐄𝐑𝐑𝐀𝐈 𝐌𝐔𝐓𝐀𝐓𝐎 𝐏𝐄𝐑 1 𝐌𝐈𝐍𝐔𝐓𝐎*\n\n*𝐌𝐎𝐓𝐈𝐕𝐎:𝐒𝐏𝐀𝐌*\n\n⚠️ \`\`\`𝚆𝙰𝚁𝙽𝙸𝙽𝙶 1/3\`\`\` ⚠️`
await conn.reply(m.chat, mensaje, m, { mentions: [m.sender] })  
}} else if (userData.antiBan === 2) {
if (userData.message2 < 1) {
userData.message2++  
mensaje = `*𝐇𝐄𝐘 @${m.sender.split`@`[0]} 𝐃𝐈 𝐍𝐔𝐎𝐕𝐎?? 🤨 𝐀𝐋𝐋𝐎𝐑𝐀 𝐍𝐎𝐍 𝐂𝐀𝐏𝐈𝐒𝐂𝐈 𝐍𝐈𝐄𝐍𝐓𝐄 𝐄𝐇?*\n*𝐎𝐑𝐀 𝐕𝐄𝐑𝐑𝐀𝐈 𝐌𝐔𝐓𝐀𝐓𝐎 𝐏𝐄𝐑 2 𝐌𝐈𝐍𝐔𝐓𝐈*\n*𝐌𝐎𝐓𝐈𝐕𝐎:𝐒𝐏𝐀𝐌*\n\n*𝐐𝐔𝐄𝐒𝐓𝐎 𝐄 𝐋'𝐔𝐋𝐓𝐈𝐌𝐎 𝐖𝐀𝐑𝐍𝐈𝐍𝐆, 𝐀𝐋𝐋𝐀 𝐏𝐑𝐎𝐒𝐒𝐈𝐌𝐀 𝐕𝐄𝐑𝐑𝐀𝐈 𝐑𝐈𝐌𝐎𝐒𝐒𝐎*\n\n⚠️ \`\`\`𝚆𝙰𝚁𝙽𝙸𝙽𝙶 2/3\`\`\` ⚠️`
await conn.reply(m.chat, mensaje, m, { mentions: [m.sender] })  
}} else if (userData.antiBan === 3) {
if (userData.message3 < 1) {
userData.message3++  
mensaje = `*𝐦𝐚 𝐠𝐮𝐚𝐫𝐝𝐚 𝐮𝐧 𝐩𝐨.... @${m.sender.split`@`[0]} 🤨 𝐀𝐋𝐋𝐎𝐑𝐀 𝐍𝐎𝐍 𝐂𝐀𝐏𝐈𝐒𝐂𝐈 𝐄𝐇? 𝐐𝐔𝐄𝐒𝐓𝐀 𝐄 𝐋𝐀 3 𝐕𝐎𝐋𝐓𝐀, 𝐍𝐈𝐄𝐍𝐓𝐄 𝐏𝐈𝐔 𝐖𝐀𝐑𝐍𝐈𝐍𝐆*\n𝐎𝐑𝐀 𝐕𝐄𝐑𝐑𝐀𝐈 𝐑𝐈𝐌𝐎𝐒𝐒𝐎.`
await conn.reply(m.chat, mensaje, m, { mentions: [m.sender] })  
await conn.groupParticipantsUpdate(m.chat, [sender], 'remove')
}}

if (timeDifference <= timeWindow) {
userData.messageCount += 1

if (userData.messageCount >= messageLimit) {
const mention = `@${sender.split("@")[0]}`
const warningMessage = `*${mention} 𝐍𝐎𝐍 𝐄 𝐂𝐎𝐍𝐂𝐄𝐒𝐒𝐎 𝐒𝐏𝐀𝐌𝐌𝐀𝐑𝐄 𝐌𝐄𝐒𝐒𝐀𝐆𝐆𝐈!!*`
if (userData.antiBan > 2) return
await conn.reply(m.chat, warningMessage, m, { mentions: [m.sender] })  
user.muto = true
userData.antiBan++
userData.messageCount = 1
                
if (userData.antiBan === 1) {
setTimeout(() => {
if (userData.antiBan === 1) {
userData.antiBan = 0
userData.message = 0
userData.message2 = 0
userData.message3 = 0
user.muto = false
}}, time) 
  
} else if (userData.antiBan === 2) {
setTimeout(() => {
if (userData.antiBan === 2) {
userData.antiBan = 0
userData.message = 0
userData.message2 = 0
userData.message3 = 0
user.muto = false
}}, time2) 
                
} else if (userData.antiBan === 3) {
setTimeout(() => {
if (userData.antiBan === 3) {
userData.antiBan = 0
userData.message = 0
userData.message2 = 0
userData.message3 = 0
user.muto = false
}}, time3)
    
}}
} else {
if (timeDifference >= 2000) {
userData.messageCount = 1
}}
userData.lastMessageTime = currentTime
}}

export default handler