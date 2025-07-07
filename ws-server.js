const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8081 });

let liveOnline = false;

wss.on('connection', ws => {
  // Envia status atual ao conectar
  ws.send(JSON.stringify({ type: 'status', online: liveOnline }));

  // Simular live online/offline manualmente
  ws.on('message', msg => {
    if (msg === 'online') {
      liveOnline = true;
      wss.clients.forEach(client => client.send(JSON.stringify({ type: 'online' })));
    }
    if (msg === 'offline') {
      liveOnline = false;
      wss.clients.forEach(client => client.send(JSON.stringify({ type: 'offline' })));
    }
  });
});

console.log('WebSocket server running on ws://localhost:8081'); 