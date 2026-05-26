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
        if (!res.headersSent) {                                                                                                                                                                                                
            errorResponse(res, 404, 'Not Found');                                                                                                                                                                              
        } else {                                                                                                                                                                                                               
            res.end();                                                                                                                                                                                                         
        }                                                                                                                                                                                                                      
    });                                                                                                                                                                                                                        
                                                                                                                                                                                                                               
    stream.on('open', () => {
        const contentType = mimeTypes[filename.split('.').pop()] || 'application/octet-stream';                                                                                                                                                                                           
        res.writeHead(200, { 'Content-Type': `${contentType}; charset=utf-8` });                                                                                                                                               
        stream.pipe(res);                                                                                                                                                                                                      
    }); 
}
