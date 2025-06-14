import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'fs'
import { join } from 'path'
import { exec } from 'child_process'
import qrcode from 'qrcode'
import NodeCache from 'node-cache'
import pino from 'pino'
import { 
    makeWASocket, 
    DisconnectReason, 
    useMultiFileAuthState, 
    fetchLatestBaileysVersion, 
    makeCacheableSignalKeyStore 
} from '@whiskeysockets/baileys'

// Configurazioni
const SESSION_FOLDER = 'jadibts'
const DEFAULT_BROWSER = ['chatunitysubot', 'Chrome', '2.0.0']
const LOGGER = pino({ level: 'silent' })

// Funzioni di utilità
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const sleep = ms => delay(ms)

async function createSubBot(conn, m = {}, args = [], isCodeRequest = false) {
    try {
        // Verifica che m esista e abbia sender
        if (!m || !m.sender) {
            console.error('Messaggio o sender non definito:', m)
            throw new Error('Dati messaggio non validi')
        }

        const sender = m.sender.split('@')[0]
        const sessionPath = join(SESSION_FOLDER, sender)
        
        // Crea cartella sessione se non esiste
        if (!existsSync(sessionPath)) {
            mkdirSync(sessionPath, { recursive: true })
        }

        // Configurazione del sub-bot
        const { version } = await fetchLatestBaileysVersion()
        const { state, saveCreds } = await useMultiFileAuthState(sessionPath)
        
        const socketConfig = {
            printQRInTerminal: false,
            logger: LOGGER,
            auth: {
                creds: state.creds,
                keys: makeCacheableSignalKeyStore(state.keys, LOGGER)
            },
            browser: DEFAULT_BROWSER,
            version,
            shouldIgnoreJid: jid => jid.endsWith('@broadcast')
        }

        const subBot = makeWASocket(socketConfig)
        
        // Gestione eventi
        subBot.ev.on('connection.update', async (update) => {
            try {
                const { connection, qr, lastDisconnect } = update
                
                if (qr) {
                    const qrImage = await qrcode.toDataURL(qr, { scale: 8 })
                    await conn.sendMessage(m.chat, { 
                        image: Buffer.from(qrImage.split(',')[1], 'base64'),
                        caption: 'Scansiona questo QR per collegare il sub-bot'
                    }, { quoted: m })
                }
                
                if (connection === 'close') {
                    await handleDisconnection(subBot, lastDisconnect, conn, m)
                }
            } catch (error) {
                console.error('Errore in connection.update:', error)
            }
        })

        subBot.ev.on('creds.update', saveCreds)
        
        return subBot
    } catch (error) {
        console.error('Errore creazione sub-bot:', error)
        throw error
    }
}

async function handleDisconnection(bot, lastDisconnect, conn, m) {
    try {
        if (!lastDisconnect) {
            console.log('Disconnessione senza motivo specifico')
            return
        }

        const statusCode = lastDisconnect?.error?.output?.statusCode
        
        if (statusCode === DisconnectReason.restartRequired) {
            console.log('Riavvio richiesto, riconnessione...')
            await createSubBot(conn, m)
        } else if (statusCode === DisconnectReason.connectionLost) {
            console.log('Connessione persa, tentativo di riconnessione...')
            await delay(5000)
            await createSubBot(conn, m)
        } else {
            console.log('Disconnessione inattesa:', statusCode)
            if (conn && m) {
                await conn.sendMessage(m.chat, { 
                    text: '❌ Sub-bot disconnesso: ' + (statusCode || 'sconosciuto')
                })
            }
        }
    } catch (error) {
        console.error('Errore in handleDisconnection:', error)
    }
}

const handler = async (m, { conn, args }) => {
    try {
        const isCodeRequest = args[0]?.toLowerCase() === '--code'
        
        if (!conn || !m) {
            console.error('Conn o m non definiti')
            return
        }

        await createSubBot(conn, m, args, isCodeRequest)
        await conn.sendMessage(m.chat, { 
            text: '✅ Sub-bot creato con successo!'
        }, { quoted: m })
    } catch (error) {
        console.error('Errore handler:', error)
        if (conn && m) {
            await conn.sendMessage(m.chat, { 
                text: '❌ Errore durante la creazione del sub-bot: ' + error.message
            }, { quoted: m })
        }
    }
}

handler.command = ['serbot']
handler.help = ['Crea un sub-bot collegato']
handler.tags = ['tools']
handler.premium = false

export default handler