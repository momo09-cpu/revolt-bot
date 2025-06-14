let handler = async (m, { conn }) => {
    if (!m.isGroup) return; // Funziona solo nei gruppi
  
    // Ottieni i membri del gruppo
    let groupMetadata = await conn.groupMetadata(m.chat);
    let participants = groupMetadata.participants;
  
    // Accedi al database degli utenti
    let users = global.db.data.users;
  
    // Filtra i dati solo per gli utenti del gruppo
    let groupUsers = participants
      .map(p => ({
        id: p.id,
        bestemmie: users[p.id]?.blasphemy || 0, // Default a 0 se non esiste il campo
      }))
      .filter(u => u.bestemmie > 0) // Considera solo chi ha bestemmie > 0
      .sort((a, b) => b.bestemmie - a.bestemmie) // Ordina in ordine decrescente
      .slice(0, 10); // Prendi solo i primi 10
  
    // Genera il messaggio della classifica
    let text = `🏆 *Top 10 Bestemmiatori del Gruppo* 🏆\n\n`;
    groupUsers.forEach((user, index) => {
      text += `${index + 1}. @${user.id.split('@')[0]} - ${user.bestemmie} bestemmie\n`;
    });
  
    // Se non ci sono bestemmie registrate
    if (groupUsers.length === 0) {
      text = "😇 Nessuno ha bestemmiato in questo gruppo!";
    }
  
    // Invia il messaggio con menzioni
    await conn.sendMessage(
      m.chat,
      { 
        text, 
        mentions: groupUsers.map(u => u.id) 
      },
      { quoted: m }
    );
  };
  
  // Registrazione del comando
  handler.command = ['topbestemmie', 'bestemmietop']; // Comandi accettati
  handler.group = true; // Solo nei gruppi
  export default handler;