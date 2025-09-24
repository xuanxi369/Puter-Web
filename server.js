const express = require('express');
const path = require('path');
const fs = require('fs');
const net = require('net');
const WebSocket = require('ws');

// 读取配置
const configPath = path.join(__dirname, 'config.json');
if (!fs.existsSync(configPath)) {
    console.error('config.json not found!');
    process.exit(1);
}
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
const { vncHost, vncPort, httpPort } = config;

// 启动 Express 静态服务
const app = express();
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// 自动重定向根路径到带参数的 vnc.html
app.get('/', (req, res) => {
    res.redirect(`/vnc.html?host=${req.hostname}&path=websockify`);
});

// app.get('/', (req, res) => {
//     res.send('<h1>Welcome</h1><p>Please go to <a href="/vnc.html">/vnc.html</a> to connect.</p>');
// });


// 启动 HTTP 服务
const httpServer = app.listen(httpPort, () => {
    console.log(`[INFO] HTTP server running on http://localhost:${httpPort}/`);
});

// =========================
// 内置 Websockify (挂载到 HTTP Server)
// =========================
const wss = new WebSocket.Server({ server: httpServer, path: "/websockify" });
console.log(`[INFO] WebSocket proxy mounted at ws(s)://<host>:${httpPort}/websockify -> ${vncHost}:${vncPort}`);

wss.on('connection', (ws) => {
    console.log('[INFO] New WebSocket connection');

    // 连接到 VNC 服务
    const tcpSocket = net.connect(vncPort, vncHost, () => {
        console.log('[INFO] Connected to VNC server');
    });

    // WS → TCP
    ws.on('message', (msg) => {
        if (tcpSocket.writable) {
            tcpSocket.write(msg);
        }
    });

    // TCP → WS
    tcpSocket.on('data', (data) => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(data);
        }
    });

    // 关闭处理
    ws.on('close', () => {
        tcpSocket.end();
    });
    tcpSocket.on('close', () => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.close();
        }
    });
    tcpSocket.on('error', (err) => {
        console.error('[TCP ERROR]', err.message);
        ws.close();
    });
});
