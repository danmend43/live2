const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

const HLS_DIR = path.join(__dirname, 'hls', 'live');
const PORT = 8082;
const RECENT_SECONDS = 5; // tempo em segundos para considerar online

const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', ws => {
  console.log('Cliente WebSocket conectado!');
  // Envia status atual ao conectar
  ws.send(JSON.stringify({ status: lastStatus }));
  });

let lastStatus = 'offline';

function checkLiveStatus() {
  fs.readdir(HLS_DIR, (err, files) => {
    let online = false;
    if (!err && files) {
      const now = Date.now();
      // Considera online se houver pelo menos um .ts modificado recentemente
      online = files.some(f => {
        if (f.endsWith('.ts')) {
          const filePath = path.join(HLS_DIR, f);
          try {
            const stats = fs.statSync(filePath);
            return (now - stats.mtimeMs) < RECENT_SECONDS * 1000;
          } catch (e) { return false; }
        }
        return false;
      });
    }
    const status = online ? 'online' : 'offline';
    if (status !== lastStatus) {
      lastStatus = status;
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ status }));
        }
      });
    }
  });
}

setInterval(checkLiveStatus, 2000);

console.log(`Watcher WebSocket rodando em ws://localhost:${PORT}`); 