const PORT = process.env.PORT || 3000
    const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys')

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('session')
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true
    })

    sock.ev.on('creds.update', saveCreds)
    sock.ev.on('messages.upsert', async m => {
        const msg = m.messages[0]
        if (!msg.key.fromMe && msg.message) {
            const text = msg.message.conversation || ''
            if (text === '.ping') {
                await sock.sendMessage(msg.key.remoteJid, { text: 'Pong! RUKSHAN-MD online ✅' })
            }
        }
    })
}
startBot()
