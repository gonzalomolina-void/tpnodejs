import http from 'node:http';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import serveStaticFile from './static.js';

const server = http.createServer(async (req, res) => {
    console.log(`Received request: ${req.method} ${req.url}`);

    switch (req.url) {
        case '/hello':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Hello, World!');
            break;
        case '/health':
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'ok' }));
            break;
        case '/api/characters':
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify([]));
            break;
        default:
            await serveStaticFile(req, res);
            break;
    }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});