import http from 'node:http';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import serveStaticFile from './static.js';
import { characters } from './data/characters.js';
import errorResponse from './errorResponse.js';

function helloHandler(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, World!');
}

function healthHandler(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
}

function charactersHandler(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(characters));
}

function characterHandler(req, res) {
    const id = req.url.split('/').pop();
    const character = characters.find(c => c.id === id);
    
    if (character) {
        responseWithJson(res, 200, character);
    } else {
        errorResponse(res, 404, 'Character not found');
    }
}

function findRoute(method, url) {
    const regex = /^\/api\/characters\/\d+$/;

    if (regex.test(url)) {
        return routes.find(r => r.method === method && r.path === '/api/characters/:id');
    }

    return routes.find(r => r.method === method && r.path === url);
}

function newId() {
    const maxId = characters.reduce((max, c) => Math.max(max, parseInt(c.id, 10)), 0);                                                                                                                       
    const newId = String(maxId + 1);                                                                                                                                                                        
    
    return newId;
}

function responseWithJson(res, statusCode, data) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}

function insertCharacterHandler(req, res) {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const character = parseJson(body);

        if (!character) {
            errorResponse(res, 400, 'Invalid JSON');
            return;
        }

        character.id = newId();
        characters.push(character);
        responseWithJson(res, 201, character);
    });
}

function updateCharacterHandler(req, res) {
    const id = req.url.split('/').pop();
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const character = parseJson(body);

        if (!character) {
            errorResponse(res, 400, 'Invalid JSON');
            return;
        }

        const index = characters.findIndex(c => c.id === id);

        if (index !== -1) {
            characters[index] = { ...characters[index], ...character };
            responseWithJson(res, 200, characters[index]);
        } else {
            errorResponse(res, 404, 'Character not found');
        }
    });
}

function deleteCharacterHandler(req, res) {
    const id = req.url.split('/').pop();
    const index = characters.findIndex(c => c.id === id);
    if (index !== -1) {
        const deletedCharacter = characters.splice(index, 1);
        responseWithJson(res, 200, deletedCharacter[0]);
    } else {
        errorResponse(res, 404, 'Character not found');
    }
}

function parseJson(body) {
    try {
        return JSON.parse(body);
    } catch (error) {
        return null;
    }
}

const routes = [
    { method: 'GET', path: '/hello', handler: helloHandler },
    { method: 'GET', path: '/health', handler: healthHandler },
    { method: 'GET', path: '/api/characters', handler: charactersHandler },
    { method: 'GET', path: '/api/characters/:id', handler: characterHandler }, 
    { method: 'POST', path: '/api/characters', handler: insertCharacterHandler },
    { method: 'PUT', path: '/api/characters/:id', handler: updateCharacterHandler },
    { method: 'DELETE', path: '/api/characters/:id', handler: deleteCharacterHandler }
]

const server = http.createServer(async (req, res) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    const route = findRoute(req.method, req.url);
    if (route) {
        await route.handler(req, res);
    } else {
        await serveStaticFile(req, res);
    }
});


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});