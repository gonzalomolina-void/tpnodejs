import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import mimeTypes from './mime-types.js';
import errorResponse from './errorResponse.js';

export default function serveStaticFile(req, res) {
    const filename = req.url === '/' ? '/index.html' : req.url;
    const filePath = fileURLToPath(new URL(`./public${filename}`, import.meta.url));

    if (!filePath.startsWith(fileURLToPath(new URL('./public/', import.meta.url)))) {
        errorResponse(res, 403, 'Forbidden');
        return;
    }

    if (!filePath.endsWith('.html') && !filePath.endsWith('.css') && !filePath.endsWith('.js')) {
        errorResponse(res, 404, 'Not Found');
        return;
    }

    if (!mimeTypes[filename.split('.').pop()]) {
        errorResponse(res, 404, 'Not Found');
        return;
    }

    const stream = fs.createReadStream(filePath);
    stream.on('error', () => {
        errorResponse(res, 404, 'Not Found');
    });
    stream.on('data', (chunk) => {
        res.write(chunk);
    });
    stream.on('open', () => {
        res.writeHead(200, { 'Content-Type': `${mimeTypes[filename.split('.').pop()]}; charset=utf-8` || 'application/octet-stream' });
        //stream.pipe(res);
    });
    stream.on('end', () => {
        res.end();
    });
}
