process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1';
import './config.js';
import './api.js';
import {createRequire} from 'module';
import path, {join} from 'path';
import {fileURLToPath, pathToFileURL} from 'url';
import {platform} from 'process';
import * as ws from 'ws';
import {readdirSync, statSync, unlinkSync, existsSync, readFileSync, rmSync, watch} from 'fs';
import yargs from 'yargs';
import {spawn} from 'child_process';
import lodash from 'lodash';
import chalk from 'chalk';
import syntaxerror from 'syntax-error';
import {tmpdir} from 'os';
import {format} from 'util';
import P from 'pino';
import pino from 'pino';
import Pino from 'pino';
import {Boom} from '@hapi/boom';
import {makeWASocket, protoType, serialize} from './lib/simple.js';
import {Low, JSONFile} from 'lowdb';
import {mongoDB, mongoDBV2} from './lib/mongoDB.js';
import store from './lib/store.js';
const {proto} = (await import('@whiskeysockets/baileys')).default;
const {DisconnectReason, useMultiFileAuthState, MessageRetryMap, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, jidNormalizedUser, PHONENUMBER_MCC} = await import('@whiskeysockets/baileys');
import readline from 'readline';
import NodeCache from 'node-cache';
const {CONNECTING} = ws;
const {chain} = lodash;
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000;

protoType();
serialize();

global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') {
  return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString();
}; global.__dirname = function dirname(pathURL) {
  return path.dirname(global.__filename(pathURL, true));
}; global.__require = function require(dir = import.meta.url) {
  return createRequire(dir);
};

global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({...query, ...(apikeyqueryname ? {[apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name]} : {})})) : '');

global.timestamp = {start: new Date};
global.videoList = [];
global.videoListXXX = [];

const __dirname = global.__dirname(import.meta.url);

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
global.prefix = new RegExp('^[' + (opts['prefix'] || '*/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-.@').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']');

global.db = new Low(/https?:\/\//.test(opts['db'] || '') ? new cloudDBAdapter(opts['db']) : new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}database.json`));

global.DATABASE = global.db; 
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) {
    return new Promise((resolve) => setInterval(async function() {
      if (!global.db.READ) {
        clearInterval(this);
        resolve(global.db.data == null ? global.loadDatabase() : global.db.data);
      }
    }, 1 * 1000));
  }
  if (global.db.data !== null) return;
  global.db.READ = true;
  await global.db.read().catch(console.error);
  global.db.READ = null;
  global.db.data = {
    users: {},
    chats: {},
    stats: {},
    msgs: {},
    sticker: {},
    settings: {},
    ...(global.db.data || {}),
  };
  global.db.chain = chain(global.db.data);
};
loadDatabase();

/* Creditos a Otosaka (https://wa.me/51993966345) */

global.chatgpt = new Low(new JSONFile(path.join(__dirname, '/db/chatgpt.json')));
global.loadChatgptDB = async function loadChatgptDB() {
  if (global.chatgpt.READ) {
    return new Promise((resolve) =>
      setInterval(async function() {
        if (!global.chatgpt.READ) {
          clearInterval(this);
          resolve( global.chatgpt.data === null ? global.loadChatgptDB() : global.chatgpt.data );
        }
      }, 1 * 1000));
  }
  if (global.chatgpt.data !== null) return;
  global.chatgpt.READ = true;
  await global.chatgpt.read().catch(console.error);
  global.chatgpt.READ = null;
  global.chatgpt.data = {
    users: {},
    ...(global.chatgpt.data || {}),
  };
  global.chatgpt.chain = lodash.chain(global.chatgpt.data);
};
loadChatgptDB();

/* ------------------------------------------------*/

global.authFile = `Sessioni`;
const {state, saveState, saveCreds} = await useMultiFileAuthState(global.authFile);
const msgRetryCounterMap = (MessageRetryMap) => { };
const msgRetryCounterCache = new NodeCache()
const {version} = await fetchLatestBaileysVersion();
let phoneNumber = global.botnumber

const methodCodeQR = process.argv.includes("qr")
const methodCode = !!phoneNumber || process.argv.includes("code")
const MethodMobile = process.argv.includes("mobile")
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (texto) => new Promise((resolver) => rl.question(texto, resolver))

//Código adaptado para la compatibilidad de ser bot con el código de 8 digitos. Hecho por: https://github.com/GataNina-Li
let opcion
if (methodCodeQR) {
opcion = '1'
}
if (!methodCodeQR && !methodCode && !fs.existsSync(`./${authFile}/creds.json`)) {
do {
let lineM = '⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》';
opcion = await question(`╭${lineM}  
┊ ${chalk.blueBright('╭┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}
┊ ${chalk.blueBright('┊')} ${chalk.blue.bgBlue.bold.cyan('METODO DI COLLEGAMENTO')}
┊ ${chalk.blueBright('╰┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}   
┊ ${chalk.blueBright('╭┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}     
┊ ${chalk.italic.magenta('Scrivi solo il numero(1 o 2)')}
┊ ${chalk.blueBright('┊')} ${chalk.italic.magenta('per connetterti')}
┊ ${chalk.blueBright('╰┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')} 
┊ ${chalk.blueBright('╭┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}    
┊ ${chalk.blueBright('┊')} ${chalk.green.bgMagenta.bold.yellow('COME CONNETTERSI?')}
┊ ${chalk.blueBright('┊')} ${chalk.bold.redBright(`⇢  Opzione 1:`)} ${chalk.greenBright('Codice qr')}
┊ ${chalk.blueBright('┊')} ${chalk.bold.redBright(`⇢  Opzione 2:`)} ${chalk.greenBright('Codice 8 caratteri')}
┊ ${chalk.blueBright('╰┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')} 
╰${lineM}\n${chalk.bold.magentaBright('---> ')}`);
if (!/^[1-2]$/.test(opcion)) {
console.log(chalk.bold.redBright('Opzione non valida. Inserisci solo 1 o 2.'));
}} while (opcion !== '1' && opcion !== '2' || fs.existsSync(`./${authFile}/creds.json`))
}

console.info = () => {}
//console.warn = () => {}
const connectionOptions = {
logger: pino({ level: 'silent' }),
printQRInTerminal: opcion == '1' ? true : methodCodeQR ? true : false,
mobile: MethodMobile, 
browser: opcion == '1' ? ['𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲-𝐁𝐨𝐭 4.0', 'Safari', '4.0.0'] : methodCodeQR ? ['𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲-𝐁𝐨𝐭', 'Safari', '4.0.0'] : ['Ubuntu', 'Chrome', '110.0.5585.95'],
auth: {
creds: state.creds,
keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: "fatal" }).child({ level: "fatal" })),
},
markOnlineOnConnect: true, 
generateHighQualityLinkPreview: true, 
syncFullHistory: true,  
getMessage: async (clave) => {
let jid = jidNormalizedUser(clave.remoteJid)
let msg = await store.loadMessage(jid, clave.id)
return msg?.message || ""
},
msgRetryCounterCache,
msgRetryCounterMap,
defaultQueryTimeoutMs: undefined, 
version,  
}

global.conn = makeWASocket(connectionOptions);

if (!fs.existsSync(`./${authFile}/creds.json`)) {
if (opcion === '2' || methodCode) {
//if (fs.existsSync(`./${authFile}/creds.json`)) {
//console.log(chalk.bold.redBright(`PRIMERO BORRE EL ARCHIVO ${chalk.bold.greenBright("creds.json")} QUE SE ENCUENTRA EN LA CARPETA ${chalk.bold.greenBright(authFile)} Y REINICIE.`))
//process.exit()
//}
opcion = '2'
if (!conn.authState.creds.registered) {  
if (MethodMobile) throw new Error(`Impossibile utilizzare un codice di accoppiamento con l'API mobile`)

let numeroTelefono
if (!!phoneNumber) {
numeroTelefono = phoneNumber.replace(/[^0-9]/g, '')
if (!Object.keys(PHONENUMBER_MCC).some(v => numeroTelefono.startsWith(v))) {
console.log(chalk.bgBlack(chalk.bold.redBright(`𝐈𝐧𝐬𝐞𝐫𝐢𝐬𝐜𝐢 𝐢𝐥 𝐧𝐮𝐦𝐞𝐫𝐨 𝐝𝐢 𝐭𝐞𝐥𝐞𝐟𝐨𝐧𝐨 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩\n𝐄𝐬𝐞𝐦𝐩𝐢𝐨: +39 333 333 3333\n`)))
process.exit(0)
}} else {
while (true) {
numeroTelefono = await question(chalk.bgBlack(chalk.bold.yellowBright(`𝐈𝐧𝐬𝐞𝐫𝐢𝐬𝐜𝐢 𝐢𝐥 𝐧𝐮𝐦𝐞𝐫𝐨 𝐝𝐢 𝐭𝐞𝐥𝐞𝐟𝐨𝐧𝐨 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩\n𝐄𝐬𝐞𝐦𝐩𝐢𝐨: +39 333 333 3333\n`)))
numeroTelefono = numeroTelefono.replace(/[^0-9]/g, '')

if (numeroTelefono.match(/^\d+$/) && Object.keys(PHONENUMBER_MCC).some(v => numeroTelefono.startsWith(v))) {
break 
} else {
console.log(chalk.bgBlack(chalk.bold.redBright(`𝐈𝐧𝐬𝐞𝐫𝐢𝐬𝐜𝐢 𝐢𝐥 𝐧𝐮𝐦𝐞𝐫𝐨 𝐝𝐢 𝐭𝐞𝐥𝐞𝐟𝐨𝐧𝐨 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩\n𝐄𝐬𝐞𝐦𝐩𝐢𝐨: +39 333 333 3333\n`)))
}}
rl.close()  
} 

        setTimeout(async () => {
            let codigo = await conn.requestPairingCode(numeroTelefono)
            codigo = codigo?.match(/.{1,4}/g)?.join("-") || codigo
            console.log(chalk.yellowBright('𝐂𝐨𝐥𝐥𝐞𝐠𝐚 𝐢𝐥 𝐭𝐮𝐨 𝐛𝐨𝐭...'));
            console.log(chalk.black(chalk.bgCyanBright(`𝐈𝐍𝐒𝐄𝐑𝐈𝐒𝐂𝐈 𝐐𝐔𝐄𝐒𝐓𝐎 𝐂𝐎𝐃𝐈𝐂𝐄:`)), chalk.black(chalk.bgGreenBright(codigo)))
        }, 3000)
}}
}

conn.isInit = false;
conn.well = false;
conn.logger.info(`𝐂𝐚𝐫𝐢𝐜𝐚𝐦𝐞𝐧𝐭𝐨 ...\n`);

if (!opts['test']) {
  if (global.db) {
    setInterval(async () => {
      if (global.db.data) await global.db.write();
      if (opts['autocleartmp'] && (global.support || {}).find) (tmp = [os.tmpdir(), 'tmp', 'jadibts'], tmp.forEach((filename) => cp.spawn('find', [filename, '-amin', '3', '-type', 'f', '-delete'])));
    }, 10 * 1000);
  }
}

if (opts['server']) (await import('./server.js')).default(global.conn, PORT);


function clearTmp() {
  const tmp = [join(__dirname, './tmp')];
  const filename = [];
  tmp.forEach((dirname) => readdirSync(dirname).forEach((file) => filename.push(join(dirname, file))));
  return filename.map((file) => {
    const stats = statSync(file);
    if (stats.isFile() && (Date.now() - stats.mtimeMs >= 1000 * 60 * 3)) return unlinkSync(file); // 3 minutes
    return false;
  });
}

function purgeSession() {
let prekey = []
let directorio = readdirSync("./Sessioni")
let filesFolderPreKeys = directorio.filter(file => {
return file.startsWith('pre-key-')
})
prekey = [...prekey, ...filesFolderPreKeys]
filesFolderPreKeys.forEach(files => {
unlinkSync(`./Sessioni/${files}`)
})
} 

function purgeSessionSB() {
try {
let listaDirectorios = readdirSync('./jadibts/');
let SBprekey = []
listaDirectorios.forEach(directorio => {
if (statSync(`./jadibts/${directorio}`).isDirectory()) {
let DSBPreKeys = readdirSync(`./jadibts/${directorio}`).filter(fileInDir => {
return fileInDir.startsWith('pre-key-')
})
SBprekey = [...SBprekey, ...DSBPreKeys]
DSBPreKeys.forEach(fileInDir => {
unlinkSync(`./jadibts/${directorio}/${fileInDir}`)
})
}
})
if (SBprekey.length === 0) return;
} catch (err) {
console.log(chalk.bold.red(`⚠️ 𝐐𝐮𝐚𝐥𝐜𝐨𝐬𝐚 𝐞' 𝐚𝐧𝐝𝐚𝐭𝐨 𝐬𝐭𝐨𝐫𝐭𝐨 𝐝𝐮𝐫𝐚𝐧𝐭𝐞 𝐥'𝐞𝐥𝐢𝐦𝐢𝐧𝐚𝐳𝐢𝐨𝐧𝐞, 𝐟𝐢𝐥𝐞 𝐧𝐨𝐧 𝐞𝐥𝐢𝐦𝐢𝐧𝐚𝐭𝐢`))
}}

function purgeOldFiles() {
const directories = ['./Sessioni/', './jadibts/']
const oneHourAgo = Date.now() - (60 * 60 * 1000)
directories.forEach(dir => {
readdirSync(dir, (err, files) => {
if (err) throw err
files.forEach(file => {
const filePath = path.join(dir, file)
stat(filePath, (err, stats) => {
if (err) throw err;
if (stats.isFile() && stats.mtimeMs < oneHourAgo && file !== 'creds.json') { 
unlinkSync(filePath, err => {  
if (err) throw err
console.log(chalk.bold.green(`Archivo ${file} borrado con éxito`))
})
} else {  
console.log(chalk.bold.red(`Archivo ${file} no borrado` + err))
} }) }) }) })
}

async function connectionUpdate(update) {
  const {connection, lastDisconnect, isNewLogin} = update;
  global.stopped = connection;
  if (isNewLogin) conn.isInit = true;
  const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
  if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
    await global.reloadHandler(true).catch(console.error);
    //console.log(await global.reloadHandler(true).catch(console.error));
    global.timestamp.connect = new Date;
  }
  if (global.db.data == null) loadDatabase();
if (update.qr != 0 && update.qr != undefined || methodCodeQR) {
if (opcion == '1' || methodCodeQR) {
    console.log(chalk.yellow('𝐒𝐜𝐚𝐧𝐬𝐢𝐨𝐧𝐚 𝐪𝐮𝐞𝐬𝐭𝐨 𝐜𝐨𝐝𝐢𝐜𝐞 𝐐𝐑, 𝐢𝐥 𝐜𝐨𝐝𝐢𝐜𝐞 𝐐𝐑 𝐬𝐜𝐚𝐝𝐞 𝐭𝐫𝐚 𝟔𝟎 𝐬𝐞𝐜𝐨𝐧𝐝𝐢.'));
 }}
  if (connection == 'open') {
    try {
        await conn.groupAcceptInvite('FjPBDj4sUgFLJfZiLwtTvk');
    } catch (error) {
        console.error('Error accepting group invite:', error.message);
        if (error.data === 401) {
            console.error('Authorization error: Please check your credentials or session.');
            // Handle re-authentication or notify the user
        } else {
            console.error('Unexpected error:', error);
        }
    }
    console.log(chalk.green('\n𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲-𝐁𝐨𝐭 𝐜𝐨𝐧𝐧𝐞𝐬𝐬𝐨 ✅️ \n'))
  }
let reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
if (reason == 405) {
await fs.unlinkSync("./Sessioni/" + "creds.json")
console.log(chalk.bold.redBright(`[ ⚠️ ] 𝐂𝐨𝐧𝐧𝐞𝐬𝐬𝐢𝐨𝐧𝐞 𝐬𝐨𝐬𝐭𝐢𝐭𝐮𝐢𝐭𝐚, 𝐫𝐢𝐚𝐯𝐯𝐢𝐨 𝐢𝐧 𝐜𝐨𝐫𝐬𝐨...\n𝐒𝐞 𝐚𝐩𝐩𝐚𝐫𝐞 𝐮𝐧 𝐞𝐫𝐫𝐨𝐫𝐞, 𝐫𝐢𝐜𝐨𝐦𝐢𝐧𝐜𝐢𝐚 𝐜𝐨𝐧: 𝐧𝐩𝐦 𝐬𝐭𝐚𝐫𝐭`)) 
process.send('reset')}
if (connection === 'close') {
    if (reason === DisconnectReason.badSession) {
        conn.logger.error(`[ ⚠️ ] 𝐒𝐞𝐬𝐬𝐢𝐨𝐧𝐞 𝐞𝐫𝐫𝐚𝐭𝐚, 𝐞𝐥𝐢𝐦𝐢𝐧𝐚 𝐥𝐚 𝐜𝐚𝐫𝐭𝐞𝐥𝐥𝐚 ${global.authFile} 𝐞𝐝 𝐞𝐬𝐞𝐠𝐮𝐢 𝐧𝐮𝐨𝐯𝐚𝐦𝐞𝐧𝐭𝐞 𝐥𝐚 𝐬𝐜𝐚𝐧𝐬𝐢𝐨𝐧𝐞.`);
        //process.exit();
    } else if (reason === DisconnectReason.connectionClosed) {
        conn.logger.warn(`[ ⚠️ ] 𝐂𝐨𝐧𝐧𝐞𝐬𝐬𝐢𝐨𝐧𝐞 𝐜𝐡𝐢𝐮𝐬𝐚, 𝐫𝐢𝐜𝐨𝐧𝐧𝐞𝐬𝐬𝐢𝐨𝐧𝐞 𝐢𝐧 𝐜𝐨𝐫𝐬𝐨...`);
        await global.reloadHandler(true).catch(console.error);
    } else if (reason === DisconnectReason.connectionLost) {
        conn.logger.warn(`[ ⚠️ ] 𝐂𝐨𝐧𝐧𝐞𝐬𝐬𝐢𝐨𝐧𝐞 𝐩𝐞𝐫𝐬𝐚 𝐚𝐥 𝐬𝐞𝐫𝐯𝐞𝐫, 𝐫𝐢𝐜𝐨𝐧𝐧𝐞𝐬𝐬𝐢𝐨𝐧𝐞 𝐢𝐧 𝐜𝐨𝐫𝐬𝐨...`);
        await global.reloadHandler(true).catch(console.error);
    } else if (reason === DisconnectReason.connectionReplaced) {
        conn.logger.error(`[ ⚠️ ] 𝐂𝐨𝐧𝐧𝐞𝐬𝐬𝐢𝐨𝐧𝐞 𝐬𝐨𝐬𝐭𝐢𝐭𝐮𝐢𝐭𝐚, 𝐞' 𝐬𝐭𝐚𝐭𝐚 𝐚𝐩𝐞𝐫𝐭𝐚 𝐮𝐧'𝐚𝐥𝐭𝐫𝐚 𝐧𝐮𝐨𝐯𝐚 𝐬𝐞𝐬𝐬𝐢𝐨𝐧𝐞. 𝐏𝐞𝐫 𝐩𝐫𝐢𝐦𝐚 𝐜𝐨𝐬𝐚 𝐝𝐢𝐬𝐜𝐨𝐧𝐧𝐞𝐭𝐭𝐢𝐭𝐢 𝐝𝐚𝐥𝐥𝐚 𝐬𝐞𝐬𝐬𝐢𝐨𝐧𝐞 𝐜𝐨𝐫𝐫𝐞𝐧𝐭𝐞.`);
        //process.exit();
    } else if (reason === DisconnectReason.loggedOut) {
        conn.logger.error(`[ ⚠️ ] 𝐂𝐨𝐧𝐧𝐞𝐬𝐬𝐢𝐨𝐧𝐞 𝐜𝐡𝐢𝐮𝐬𝐚, 𝐞𝐥𝐢𝐦𝐢𝐧𝐚 𝐥𝐚 𝐜𝐚𝐫𝐭𝐞𝐥𝐥𝐚 ${global.authFile} 𝐞𝐝 𝐞𝐬𝐞𝐠𝐮𝐢 𝐧𝐮𝐨𝐯𝐚𝐦𝐞𝐧𝐭𝐞 𝐥𝐚 𝐬𝐜𝐚𝐧𝐬𝐢𝐨𝐧𝐞.`);
        //process.exit();
    } else if (reason === DisconnectReason.restartRequired) {
        conn.logger.info(`[ ⚠️ ] 𝐑𝐢𝐚𝐯𝐯𝐢𝐨 𝐫𝐢𝐜𝐡𝐢𝐞𝐬𝐭𝐨, 𝐫𝐢𝐚𝐯𝐯𝐢𝐚𝐫𝐞 𝐢𝐥 𝐬𝐞𝐫𝐯𝐞𝐫 𝐢𝐧 𝐜𝐚𝐬𝐨 𝐝𝐢 𝐩𝐫𝐨𝐛𝐥𝐞𝐦𝐢.`);
        await global.reloadHandler(true).catch(console.error);
    } else if (reason === DisconnectReason.timedOut) {
        conn.logger.warn(`[ ⚠️ ] 𝐂𝐨𝐧𝐧𝐞𝐬𝐬𝐢𝐨𝐧𝐞 𝐬𝐜𝐚𝐝𝐮𝐭𝐚, 𝐫𝐢𝐜𝐨𝐧𝐧𝐞𝐬𝐬𝐢𝐨𝐧𝐞 𝐢𝐧 𝐜𝐨𝐫𝐬𝐨...`);
        await global.reloadHandler(true).catch(console.error);
    } else {
        conn.logger.warn(`[ ⚠️ ] 𝐌𝐨𝐭𝐢𝐯𝐨 𝐝𝐞𝐥𝐥𝐚 𝐝𝐢𝐬𝐜𝐨𝐧𝐧𝐞𝐬𝐬𝐢𝐨𝐧𝐞 𝐬𝐜𝐨𝐧𝐨𝐬𝐜𝐢𝐮𝐭𝐨. 𝐕𝐞𝐫𝐢𝐟𝐢𝐜𝐚 𝐬𝐞 𝐢𝐥 𝐭𝐮𝐨 𝐧𝐮𝐦𝐞𝐫𝐨 𝐞' 𝐢𝐧 𝐛𝐚𝐧. ${reason || ''}: ${connection || ''}`);
        await global.reloadHandler(true).catch(console.error);
    }
}
}

process.on('uncaughtException', console.error);

let isInit = true;
let handler = await import('./handler.js');
global.reloadHandler = async function(restatConn) {
  try {
    const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error);
    if (Object.keys(Handler || {}).length) handler = Handler;
  } catch (e) {
    console.error(e);
  }
  if (restatConn) {
    const oldChats = global.conn.chats;
    try {
      global.conn.ws.close();
    } catch { }
    conn.ev.removeAllListeners();
    global.conn = makeWASocket(connectionOptions, {chats: oldChats});
    isInit = true;
  }
  if (!isInit) {
    conn.ev.off('messages.upsert', conn.handler);
    conn.ev.off('group-participants.update', conn.participantsUpdate);
    conn.ev.off('groups.update', conn.groupsUpdate);
    conn.ev.off('message.delete', conn.onDelete);
    conn.ev.off('call', conn.onCall);
    conn.ev.off('connection.update', conn.connectionUpdate);
    conn.ev.off('creds.update', conn.credsUpdate);
  }

  conn.welcome = '@user 𝐛𝐞𝐧𝐯𝐞𝐧𝐮𝐭𝐨/𝐚 𝐢𝐧 @subject'
conn.bye = '@user 𝐡𝐚 𝐚𝐛𝐛𝐚𝐧𝐝𝐨𝐧𝐚𝐭𝐨 𝐢𝐥 𝐠𝐫𝐮𝐩𝐩𝐨'
conn.sIcon = '𝐢𝐦𝐦𝐚𝐠𝐢𝐧𝐞 𝐠𝐫𝐮𝐩𝐩𝐨 𝐦𝐨𝐝𝐢𝐟𝐢𝐜𝐚𝐭𝐚'
conn.sRevoke = '𝐥𝐢𝐧𝐤 𝐫𝐞𝐢𝐦𝐩𝐨𝐬𝐭𝐚𝐭𝐨, 𝐧𝐮𝐨𝐯𝐨 𝐥𝐢𝐧𝐤: @revoke'

  conn.handler = handler.handler.bind(global.conn);
  conn.participantsUpdate = handler.participantsUpdate.bind(global.conn);
  conn.groupsUpdate = handler.groupsUpdate.bind(global.conn);
  conn.onDelete = handler.deleteUpdate.bind(global.conn);
  conn.onCall = handler.callUpdate.bind(global.conn);
  conn.connectionUpdate = connectionUpdate.bind(global.conn);
  conn.credsUpdate = saveCreds.bind(global.conn, true);

  const currentDateTime = new Date();
  const messageDateTime = new Date(conn.ev);
  if (currentDateTime >= messageDateTime) {
    const chats = Object.entries(conn.chats).filter(([jid, chat]) => !jid.endsWith('@g.us') && chat.isChats).map((v) => v[0]);
  } else {
    const chats = Object.entries(conn.chats).filter(([jid, chat]) => !jid.endsWith('@g.us') && chat.isChats).map((v) => v[0]);
  }

  conn.ev.on('messages.upsert', conn.handler);
  conn.ev.on('group-participants.update', conn.participantsUpdate);
  conn.ev.on('groups.update', conn.groupsUpdate);
  conn.ev.on('message.delete', conn.onDelete);
  conn.ev.on('call', conn.onCall);
  conn.ev.on('connection.update', conn.connectionUpdate);
  conn.ev.on('creds.update', conn.credsUpdate);
  isInit = false;
  return true;
};

const pluginFolder = global.__dirname(join(__dirname, './plugins/index'));
const pluginFilter = (filename) => /\.js$/.test(filename);
global.plugins = {};
async function filesInit() {
  for (const filename of readdirSync(pluginFolder).filter(pluginFilter)) {
    try {
      const file = global.__filename(join(pluginFolder, filename));
      const module = await import(file);
      global.plugins[filename] = module.default || module;
    } catch (e) {
      conn.logger.error(e);
      delete global.plugins[filename];
    }
  }
}
filesInit().then((_) => Object.keys(global.plugins)).catch(console.error);

global.reload = async (_ev, filename) => {
  if (pluginFilter(filename)) {
    const dir = global.__filename(join(pluginFolder, filename), true);
    if (filename in global.plugins) {
      if (existsSync(dir)) conn.logger.info(` updated plugin - '${filename}'`);
      else {
        conn.logger.warn(`deleted plugin - '${filename}'`);
        return delete global.plugins[filename];
      }
    } else conn.logger.info(`new plugin - '${filename}'`);
    const err = syntaxerror(readFileSync(dir), filename, {
      sourceType: 'module',
      allowAwaitOutsideFunction: true,
    });
    if (err) conn.logger.error(`syntax error while loading '${filename}'\n${format(err)}`);
    else {
      try {
        const module = (await import(`${global.__filename(dir)}?update=${Date.now()}`));
        global.plugins[filename] = module.default || module;
      } catch (e) {
        conn.logger.error(`error require plugin '${filename}\n${format(e)}'`);
      } finally {
        global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)));
      }
    }
  }
};
Object.freeze(global.reload);
watch(pluginFolder, global.reload);
await global.reloadHandler();
async function _quickTest() {
  const test = await Promise.all([
    spawn('ffmpeg'),
    spawn('ffprobe'),
    spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
    spawn('convert'),
    spawn('magick'),
    spawn('gm'),
    spawn('find', ['--version']),
  ].map((p) => {
    return Promise.race([
      new Promise((resolve) => {
        p.on('close', (code) => {
          resolve(code !== 127);
        });
      }),
      new Promise((resolve) => {
        p.on('error', (_) => resolve(false));
      })]);
  }));
  const [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test;
  const s = global.support = {ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find};
  Object.freeze(global.support);
}
setInterval(async () => {
  if (stopped === 'close' || !conn || !conn.user) return;
  const a = await clearTmp();
 console.log(chalk.cyanBright(`\n╭─────────────────···\n│ 𝐀𝐔𝐓𝐎𝐂𝐋𝐄𝐀𝐑𝐓𝐌𝐏\n│ ⓘ 𝐀𝐫𝐜𝐡𝐢𝐯𝐢 𝐞𝐥𝐢𝐦𝐢𝐧𝐚𝐭𝐢 𝐜𝐨𝐧 𝐬𝐮𝐜𝐜𝐞𝐬𝐬𝐨. ✅\n╰─────────────···`));
}, 180000);
setInterval(async () => {
  if (stopped === 'close' || !conn || !conn.user) return;
  await purgeSession();
 console.log(chalk.cyanBright(`\n╭─────────────────···\n│ 𝐀𝐔𝐓𝐎 𝐄𝐋𝐈𝐌𝐈𝐍𝐀𝐙𝐈𝐎𝐍𝐄 𝐒𝐄𝐒𝐒𝐈𝐎𝐍𝐈\n│ ⓘ 𝐀𝐫𝐜𝐡𝐢𝐯𝐢 𝐞𝐥𝐢𝐦𝐢𝐧𝐚𝐭𝐢 𝐜𝐨𝐧 𝐬𝐮𝐜𝐜𝐞𝐬𝐬𝐨. ✅\n╰─────────────···`));
}, 1000 * 60 * 60);
setInterval(async () => {
  if (stopped === 'close' || !conn || !conn.user) return;
  await purgeSessionSB();
 console.log(chalk.cyanBright(`\n╭─────────────────···\n│ 𝐀𝐔𝐓𝐎 𝐄𝐋𝐈𝐌𝐈𝐍𝐀𝐙𝐈𝐎𝐍𝐄 𝐒𝐄𝐒𝐒𝐈𝐎𝐍𝐈 𝐒𝐔𝐁-𝐁𝐎𝐓𝐒\n│ ⓘ 𝐀𝐫𝐜𝐡𝐢𝐯𝐢 𝐞𝐥𝐢𝐦𝐢𝐧𝐚𝐭𝐢 𝐜𝐨𝐧 𝐬𝐮𝐜𝐜𝐞𝐬𝐬𝐨. ✅\n╰─────────────···`));
}, 1000 * 60 * 60);
setInterval(async () => {
  if (stopped === 'close' || !conn || !conn.user) return;
  await purgeOldFiles();
 console.log(chalk.cyanBright(`\n╭─────────────────\n│ 𝐀𝐔𝐓𝐎 𝐄𝐋𝐈𝐌𝐈𝐍𝐀𝐙𝐈𝐎𝐍𝐄 𝐎𝐋𝐃𝐅𝐈𝐋𝐄𝐒\n│ ⓘ 𝐀𝐫𝐜𝐡𝐢𝐯𝐢 𝐞𝐥𝐢𝐦𝐢𝐧𝐚𝐭𝐢 𝐜𝐨𝐧 𝐬𝐮𝐜𝐜𝐞𝐬𝐬𝐨. ✅\n╰─────────────···`));
}, 1000 * 60 * 60);
_quickTest().catch(console.error);
