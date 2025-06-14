import { performance } from 'perf_hooks';
import fetch from 'node-fetch'; // Assicurati di avere node-fetch installato

const handler = async (message, { conn, usedPrefix }) => {
    const userCount = Object.keys(global.db.data.users).length;
    const botName = global.db.data.nomedelbot || 'ChatUnity';

    const menuText = generateMenuText(usedPrefix, botName, userCount);
    
    const messageOptions = {
        contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363259442839354@newsletter',
                serverMessageId: '',
                newsletterName: `${botName}`
            },
        }
    };

    // Invia la foto con il menu
    const imagePath = './menu/chatunitybot.mp4';
    await conn.sendMessage(message.chat, { image: { url: imagePath }, caption: menuText, ...messageOptions }, { quoted: message });
};

async function fetchThumbnail(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        return new Uint8Array(arrayBuffer);
    } catch (error) {
        console.error('Errore durante il fetch della thumbnail:', error);
        return 'default-thumbnail'; // Fallback thumbnail in caso di errore
    }
}

handler.help = ['menu'];
handler.tags = ['menu'];
handler.command = /^(menuologo|menuloghi)$/i;

export default handler;

function generateMenuText(prefix, botName, userCount) {
    return `
╭━〔*💫 𝑴𝑬𝑵𝑼 𝑳𝑶𝑮𝑶 💫*〕━┈⊷
┃◈╭─────────────·๏
┃◈┃• *𝑪𝑶𝑴𝑨𝑵𝑫𝑰 𝑳𝑶𝑮𝑶*
┃◈┃
┃◈┃• 🎨 .logo 3d-deep-sea-metal
┃◈┃• 🎨 .logo American-flag-3D
┃◈┃• 🎨 .logo 3D-sci-fi
┃◈┃• 🎨 .logo 3D-rainbow-color-calligraphy
┃◈┃• 🎨 .logo 3D-water-pipe
┃◈┃• 🎨 .logo Halloween-skeleton
┃◈┃• 🎨 .logo a-spooky-Halloween
┃◈┃• 🎨 .logo a-cinematic-horror
┃◈┃• 🎨 .logo a-sketch
┃◈┃• 🎨 .logo blue-circuit-style
┃◈┃• 🎨 .logo space
┃◈┃• 🎨 .logo a-metallic
┃◈┃• 🎨 .logo Creat-glossy-metalic
┃◈┃• 🎨 .logo a-Captain-America
┃◈┃• 🎨 .logo science-fiction
┃◈┃• 🎨 .logo Video-game-classic-8-bit
┃◈┃• 🎨 .logo green-horror-style
┃◈┃• 🎨 .logo a-transformer
┃◈┃• 🎨 .logo berry
┃◈┃• 🎨 .logo layered
┃◈┃• 🎨 .logo Online-thunder--generator
┃◈┃• 🎨 .logo a-magma-hot
┃◈┃• 🎨 .logo 3D-stone-cracked-cool
┃◈┃• 🎨 .logo 3D-neon-light
┃◈┃• 🎨 .logo impressive-glitch
┃◈┃• 🎨 .logo a-glitch
┃◈┃• 🎨 .logo Harry-Potter
┃◈┃• 🎨 .logo embossed--on-cracked-surface
┃◈┃• 🎨 .logo Broken-glass
┃◈┃• 🎨 .logo art-paper-cut
┃◈┃• 🎨 .logo artistic-black-and-white-status-and-quote-with-your-photos
┃◈┃• 🎨 .logo Online-3D-gradient--generator
┃◈┃• 🎨 .logo a-3D-glossy-metal
┃◈┃• 🎨 .logo 3D-realistic--on-the-beach
┃◈┃• 🎨 .logo a-watercolor
┃◈┃• 🎨 .logo Online-multicolor-3D-paper-cut
┃◈┃• 🎨 .logo Write-text-on-foggy-window
┃◈┃• 🎨 .logo neon-devil-wings
┃◈┃• 🎨 .logo 3D-underwater--generator
┃◈┃• 🎨 .logo Online-black-and-white-bear-mascot-logo-creation
┃◈┃• 🎨 .logo wonderful-graffiti-art
┃◈┃• 🎨 .logo a-cool-graffiti-text-on-the-wall
┃◈┃• 🎨 .logo cool-wall-graffiti
┃◈┃• 🎨 .logo a-christmas-holiday-snow
┃◈┃• 🎨 .logo a-futuristic-technology-neon-light
┃◈┃• 🎨 .logo snow--for-winter-holidays
┃◈┃• 🎨 .logo a-cloud--on-the-sky
┃◈┃• 🎨 .logo 3D-luxury-gold
┃◈┃• 🎨 .logo 3D-gradient
┃◈┃• 🎨 .logo Blackpink-logo-style
┃◈┃• 🎨 .logo realistic-vintage-style-light-bulb
┃◈┃• 🎨 .logo realistic-cloud
┃◈┃• 🎨 .logo a-cloud--in-the-sky
┃◈┃• 🎨 .logo Write-in-Sand-Summer-Beach
┃◈┃• 🎨 .logo Sand-Writing
┃◈┃• 🎨 .logo Sand-engraved-3d
┃◈┃• 🎨 .logo a-summery-sand-writing
┃◈┃• 🎨 .logo Foil-Balloon--For-Birthday
┃◈┃• 🎨 .logo 3d-glue--with-realistic-style
┃◈┃• 🎨 .logo space-3D
┃◈┃• 🎨 .logo Metal-Dark-Gold
┃◈┃• 🎨 .logo Glitch--Style-Tik-Tok
┃◈┃• 🎨 .logo a-Stone
┃◈┃• 🎨 .logo Neon-Light--With-Galaxy-Style
┃◈┃• 🎨 .logo 1917-Style
┃◈┃• 🎨 .logo 80's-Retro-Neon
┃◈┃• 🎨 .logo Minion--3D
┃◈┃• 🎨 .logo Pornhub-Style-Logo
┃◈┃• 🎨 .logo Double-Exposure--Black-&-White
┃◈┃• 🎨 .logo Holographic-3D
┃◈┃• 🎨 .logo 3D-Avengers-logo
┃◈┃• 🎨 .logo Metal-Purple-Dual-Effect
┃◈┃• 🎨 .logo logo-style-Marvel-studios-Ver:-metal
┃◈┃• 🎨 .logo logo-style-Marvel-studios
┃◈┃• 🎨 .logo Deluxe-Silver
┃◈┃• 🎨 .logo Color-Full-Luxury-Metal
┃◈┃• 🎨 .logo Glossy-Blue-Metal
┃◈┃• 🎨 .logo Deluxe-Gold
┃◈┃• 🎨 .logo Glossy-Carbon
┃◈┃• 🎨 .logo Fabric
┃◈┃• 🎨 .logo Neon
┃◈┃• 🎨 .logo New-Year-Cards-3D-By-Name
┃◈┃• 🎨 .logo Happ-new-year-card-firework-gif
┃◈┃• 🎨 .logo Fullcolor-Balloon
┃◈┃• 🎨 .logo Text-Logo-3D-Metal
┃◈┃• 🎨 .logo avatar-gold
┃◈┃• 🎨 .logo Text-Logo-3D-Metal-Silver
┃◈┃• 🎨 .logo Text-Logo-3D-Metal-Rose-Gold
┃◈┃• 🎨 .logo Text-Logo-3D-Metal-Gold
┃◈┃• 🎨 .logo Text-Logo-3D-Metal-Galaxy
┃◈┃• 🎨 .logo Xmas-Cards-3D
┃◈┃• 🎨 .logo Blood-Text-On-The-Frosted-Glass
┃◈┃• 🎨 .logo Halloween-Fire
┃◈┃• 🎨 .logo Metal-Dark-Gold
┃◈┃• 🎨 .logo Lion-Logo-Mascot
┃◈┃• 🎨 .logo Wolf-Logo-Black-&-White
┃◈┃• 🎨 .logo Wolf-Logo-Galaxy
┃◈┃• 🎨 .logo Ninja-Logo
┃◈┃• 🎨 .logo Logo-Joker
┃◈┃• 🎨 .logo Wicker
┃◈┃• 🎨 .logo Natural-Leaves
┃◈┃• 🎨 .logo Firework-Sparkle
┃◈┃• 🎨 .logo Skeleton
┃◈┃• 🎨 .logo Red-Foil-Balloon
┃◈┃• 🎨 .logo Purple-Foil-Balloon
┃◈┃• 🎨 .logo Pink-Foil-Balloon
┃◈┃• 🎨 .logo Green-Foil-Balloon
┃◈┃• 🎨 .logo Cyan-Foil-Balloon
┃◈┃• 🎨 .logo Blue-Foil-Balloon
┃◈┃• 🎨 .logo Gold-Foil-Balloon
┃◈┃• 🎨 .logo Steel
┃◈┃• 🎨 .logo Ultra-Gloss
┃◈┃• 🎨 .logo Denim
┃◈┃• 🎨 .logo Decorate-Green
┃◈┃• 🎨 .logo Decorate-Purple
┃◈┃• 🎨 .logo Peridot-Stone
┃◈┃• 🎨 .logo Rock
┃◈┃• 🎨 .logo Lava
┃◈┃• 🎨 .logo Yellow-Glass
┃◈┃• 🎨 .logo Purple-Glass
┃◈┃• 🎨 .logo Orange-Glass
┃◈┃• 🎨 .logo Green-Glass
┃◈┃• 🎨 .logo Cyan-Glass
┃◈┃• 🎨 .logo Blue-Glass
┃◈┃• 🎨 .logo Red-Glass
┃◈┃• 🎨 .logo Purple-Shiny-Glass
┃◈┃• 🎨 .logo Captain-America
┃◈┃• 🎨 .logo Robot-R2-D2
┃◈┃• 🎨 .logo Rainbow-Equalizer
┃◈┃• 🎨 .logo Toxic
┃◈┃• 🎨 .logo Pink-Sparkling-Jewelry
┃◈┃• 🎨 .logo Blue-Sparkling-Jewelry
┃◈┃• 🎨 .logo Green-Sparkling-Jewelry
┃◈┃• 🎨 .logo Purple-Sparkling-Jewelry
┃◈┃• 🎨 .logo Gold-Sparkling-Jewelry
┃◈┃• 🎨 .logo Red-Sparkling-Jewelry
┃◈┃• 🎨 .logo Cyan-Sparkling-Jewelry
┃◈┃• 🎨 .logo Purple-Glass
┃◈┃• 🎨 .logo Decorative-Glass
┃◈┃• 🎨 .logo Chocolate-Cake
┃◈┃• 🎨 .logo Strawberry
┃◈┃• 🎨 .logo Koi-Fish
┃◈┃• 🎨 .logo Bread
┃◈┃• 🎨 .logo Matrix-Style
┃◈┃• 🎨 .logo Horror-Blood
┃◈┃• 🎨 .logo Neon-Light
┃◈┃• 🎨 .logo Thunder
┃◈┃• 🎨 .logo 3D-Box
┃◈┃• 🎨 .logo Neon
┃◈┃• 🎨 .logo Road-Warning
┃◈┃• 🎨 .logo 3D-Steel
┃◈┃• 🎨 .logo Bokeh
┃◈┃• 🎨 .logo Green-Neon
┃◈┃• 🎨 .logo Free-Advanced-Glow
┃◈┃• 🎨 .logo Dropwater
┃◈┃• 🎨 .logo Break-Wall
┃◈┃• 🎨 .logo Chrismast-Gift
┃◈┃• 🎨 .logo Honey
┃◈┃• 🎨 .logo Plastic-Bag-Drug
┃◈┃• 🎨 .logo Horror-Gift
┃◈┃• 🎨 .logo Marble-Slabs
┃◈┃• 🎨 .logo Marble
┃◈┃• 🎨 .logo Ice-Cold
┃◈┃• 🎨 .logo Fruit-Juice
┃◈┃• 🎨 .logo Rusty-Metal
┃◈┃• 🎨 .logo Abstra-Gold
┃◈┃• 🎨 .logo Biscuit
┃◈┃• 🎨 .logo Bagel
┃◈┃• 🎨 .logo Wood
┃◈┃• 🎨 .logo SCI---Fi
┃◈┃• 🎨 .logo Metal-Rainbow
┃◈┃• 🎨 .logo Purple-Gem
┃◈┃• 🎨 .logo Shiny-Metal
┃◈┃• 🎨 .logo Yellow-Jewelry
┃◈┃• 🎨 .logo Silver-Jewelry
┃◈┃• 🎨 .logo Red-Jewelry
┃◈┃• 🎨 .logo Purple-Jewelry
┃◈┃• 🎨 .logo Orange-Jewelry
┃◈┃• 🎨 .logo Green-Jewelry
┃◈┃• 🎨 .logo Cyan-Jewelry
┃◈┃• 🎨 .logo Blue-Jewelry
┃◈┃• 🎨 .logo Hot-Metal
┃◈┃• 🎨 .logo Hexa-Golden
┃◈┃• 🎨 .logo Blue-Glitter
┃◈┃• 🎨 .logo Purple-Glitter
┃◈┃• 🎨 .logo Pink-Glitter
┃◈┃• 🎨 .logo Green-Glitter
┃◈┃• 🎨 .logo Silver-Glitter
┃◈┃• 🎨 .logo Gold-Glitter
┃◈┃• 🎨 .logo Bronze-Glitter
┃◈┃• 🎨 .logo Eroded-Metal
┃◈┃• 🎨 .logo Carbon
┃◈┃• 🎨 .logo Pink-Candy
┃◈┃• 🎨 .logo Blue-Metal
┃◈┃• 🎨 .logo Blue-Gem
┃◈┃• 🎨 .logo Black-Metal
┃◈┃• 🎨 .logo 3D-Glowing-Metal
┃◈┃• 🎨 .logo 3D-Chrome
┃◈┃• 🎨 .loli (txt)
┃◈┃• 🎨 .neon (txt)
┃◈┃• 🎨 .devil (txt)
┃◈┃• 🎨 .wolf (txt)
┃◈┃• 🎨 .pornhub (txt) + (txt)
┃◈┃
┃◈└───────────┈⊷
╰━━━━━━━━━━━━━┈·๏
`.trim();
}