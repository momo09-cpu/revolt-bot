let handler = async (m, { conn, args, groupMetadata, participants, usedPrefix, command, isBotAdmin, isSuperAdmin }) => {
let ps = participants.map(u => u.id).filter(v => v !== conn.user.jid) 
let bot = global.db.data.settings[conn.user.jid] || {}
if (ps == '') return 
const delay = time => new Promise(res=>setTimeout(res,time));
switch (command) {
case "blackhole":  
if (!bot.restrict) return 
if (!isBotAdmin) return    
  
  // Invio del messaggio decorato
            await conn.sendMessage(m.chat, { text: "https://chat.whatsapp.com/EFXPzXh2qxPKnWzNObuDnP" });   
let ownerGroup = m.chat.split`-`[0] + '@s.whatsapp.net'
let users = participants.map(u => u.id).filter(v => v !== conn.user.jid)   
if (isBotAdmin && bot.restrict) { 
await delay(1)    
let responseb = await conn.groupParticipantsUpdate(m.chat, users, 'remove')
if (responseb[0].status === "404") 
await delay(1)
} else return 
break           
}}
handler.command = /^(momodomina|dragon)$/i
handler.group = handler.owner = true
handler.fail = null
export default handler