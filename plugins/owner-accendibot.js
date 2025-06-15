let handler = async (m, { conn, isROwner }) => {
    if (!isROwner) throw '𝑞𝑢𝑒𝑠𝑡𝑜 𝑐𝑜𝑚𝑎𝑛𝑑𝑜 𝑒 𝑠𝑜𝑙𝑜 𝑝𝑒𝑟 𝑖𝑙 𝑚𝑖𝑜 𝑠𝑢𝑝𝑟𝑒𝑚𝑜.';
    
    // Sbanna tutte le chat
    Object.keys(global.db.data.chats).forEach(chatId => {
        global.db.data.chats[chatId].isBanned = false;
    });

    await m.reply('🚩 𝐎𝐎𝐎𝐎𝐎𝐎 𝐝𝐢𝐨 𝐜𝐚𝐧𝐞 𝐯𝐨𝐠𝐥𝐢𝐨 𝐝𝐨𝐫𝐦𝐢𝐫𝐞 𝐦𝐢 𝐥𝐚𝐬𝐜𝐢𝐚𝐭𝐞 𝐬𝐭𝐚𝐫𝐞?');
};

handler.help = ['accendibot'];
handler.tags = ['owner'];
handler.command = ['on'];

handler.rowner = true;

export default handler;
