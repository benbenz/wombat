// watchHtml.js
const WebSocket = require('ws');
const chokidar = require('chokidar');
const path = require('path');

const wss = new WebSocket.Server({ port: 9999 });

const watcher = chokidar.watch(path.resolve(__dirname, 'public/*.html'));

watcher.on('change', (filePath) => {
  console.log(`File ${filePath} has been changed`);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send('html-update:'+filePath);
    }
  });
});

console.log('WebSocket server is running on port 9999');
