const handler = async (msg, { client, conn }) => {
    const percent = Math.floor(Math.random() * 101);
    
    if (!conn?.sendMessage) throw new Error("Bro, manca il conn 😒");

    // Frasi da social media (no cringe boomer) 🔥
    const savageReactions = [
        `🧢 "𝑛𝑎ℎ, 𝑠𝑒𝑖 𝑝𝑢𝑙𝑖𝑡𝑜" (𝑚𝑎 𝑠𝑜𝑡𝑡𝑜 𝑖𝑙 ${percent}% 𝑠𝑒𝑖 𝑢𝑛 𝑝𝑜' 𝑠𝑜𝑠𝑝𝑒𝑡𝑡𝑜...)`,  
        `👀 "𝑓𝑟𝑎, 𝑚𝑎 𝑠𝑒𝑖 𝑙𝑎 𝑝𝑒𝑐𝑜𝑟𝑎 𝑛𝑒𝑟𝑎 𝑑𝑒𝑙𝑙𝑎 𝑐ℎ𝑎𝑡?"`,  
        `💀 *"𝑠𝑒𝑖 𝑖𝑙 𝑚𝑜𝑡𝑖𝑣𝑜 𝑝𝑒𝑟 𝑐𝑢𝑖 𝑙𝑒 𝑛𝑜𝑛𝑛𝑒 𝑛𝑎𝑠𝑐𝑜𝑛𝑑𝑜𝑛𝑜 𝑖𝑙 𝑝𝑜𝑟𝑡𝑎𝑓𝑜𝑔𝑙𝑖𝑜"`,  
        `🤡 "𝑠𝑒 𝑙'𝑖𝑛𝑓𝑎𝑚𝑖𝑎 𝑓𝑜𝑠𝑠𝑒 𝑢𝑛 𝑡𝑖𝑘𝑡𝑜𝑘, 𝑠𝑎𝑟𝑒𝑠𝑡𝑖 𝑣𝑖𝑟𝑎𝑙𝑒"`,  
        `🚓 "𝑝𝑜𝑙𝑖𝑧𝑖𝑎 𝑙𝑜𝑐𝑎𝑙𝑒? 𝑛𝑜, 𝑑𝑖𝑡𝑡𝑎𝑡𝑜𝑟𝑢𝑎𝑙𝑒 𝑐𝑜𝑛 𝑠𝑡𝑜 𝑙𝑖𝑣𝑒𝑙𝑙𝑜"*`,  
        `🤑 "𝑠𝑒 𝑟𝑢𝑏𝑎𝑠𝑠𝑖 𝑐𝑜𝑚𝑒 𝑖𝑛𝑓𝑎𝑚𝑖, 𝑠𝑎𝑟𝑒𝑠𝑡𝑖 𝑗𝑒𝑓𝑓 𝑏𝑒𝑧𝑜𝑠"`,  
        `📸 "𝑠𝑒𝑖 𝑙𝑜 𝑠𝑐𝑟𝑒𝑒𝑛𝑠ℎ𝑜𝑡 𝑐ℎ𝑒 𝑛𝑜𝑛 𝑑𝑜𝑣𝑒𝑣𝑖 𝑓𝑎𝑟𝑒"`,  
        `🔥 "ℎ𝑎𝑖 𝑝𝑖𝑢 𝑠𝑐ℎ𝑒𝑙𝑒𝑡𝑟𝑖 𝑛𝑒𝑙𝑙'𝑎𝑟𝑚𝑎𝑑𝑖𝑜 𝑐ℎ𝑒 𝑓𝑜𝑙𝑙𝑜𝑤𝑒𝑟𝑠"`
    ];
    
    const randomSavage = savageReactions[Math.floor(Math.random() * savageReactions.length)];
    
    let response = `📊 𝑇𝐸𝑆𝑇 𝐼𝑁𝐹𝐴𝑀𝐸-𝑍 📊\n\n` +
                  `👤 *Il tuo livello di infame:* **${percent}%**\n` +
                  `${percent > 80 ? "🚨 𝑆𝐸𝐼 𝐼𝐿 𝐶𝐴𝑃𝑂 𝐷𝐸𝐼 𝑆𝐵𝐼𝑅𝑅𝐼!* 🚨" : percent > 50 ? "😎 𝑠𝑒𝑖 𝑛𝑒𝑙𝑙𝑎 𝑧𝑜𝑛𝑎 𝑑𝑖 𝑚𝑜𝑚𝑜.." : "🧼 𝑝𝑢𝑙𝑖𝑡𝑜... 𝑓𝑜𝑟𝑠𝑒.*"}\n\n` +
                  `${randomSavage}`;

    await conn.sendMessage(
        msg.chat, 
        { 
            text: response,
            mentions: [msg.sender],
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                externalAdReply: {
                    title: "⚠️ Sei stato GIOBATO ⚠️",
                    body: "Risultati ufficiali (e inappellabili)",
                    thumbnail: Buffer.alloc(0) // Puoi aggiungere un'immagine qui
                }
            }
        }, 
        { quoted: msg }
    );
};

handler.command = ['infame', 'quantosbirro', 'sbirrocheck'];
handler.tags = ['social'];
handler.help = ['infame @user', 'quantosbirro (scopri quanto sei infame)'];
export default handler;