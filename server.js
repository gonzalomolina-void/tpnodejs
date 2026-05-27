import http from 'node:http';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import serveStaticFile from './static.js';
import { characters } from './data/characters.js';
import { errorResponse, responseWithJson, response } from './response.js';
import { findRoute } from './route.js';
import { parseJson, newId, getIdFromUrl } from './utils.js';

function helloHandler(req, res) {    
    response(res, 200, 'text/plain', 'Hello, World!');
}

function healthHandler(req, res) {
    responseWithJson(res, 200, { status: 'ok' });
}

function charactersHandler(req, res) {
    responseWithJson(res, 200, characters);
}

function characterHandler(req, res) {
    const id = getIdFromUrl(req.url);
    const character = characters.find(c => c.id === id);
    
    if (character) {
        responseWithJson(res, 200, character);
    } else {
        errorResponse(res, 404, 'Character not found');
    }
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

        character.id = newId(characters);
        characters.push(character);
        responseWithJson(res, 201, character);
    });
}

function updateCharacterHandler(req, res) {
    const id = getIdFromUrl(req.url);

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
    const id = getIdFromUrl(req.url);
    const index = characters.findIndex(c => c.id === id);
    if (index !== -1) {
        const deletedCharacter = characters.splice(index, 1);
        responseWithJson(res, 200, deletedCharacter[0]);
    } else {
        errorResponse(res, 404, 'Character not found');
    }
}

const routes = [
    { method: 'GET', path: '/hello', handler: helloHandler },
    { method: 'GET', path: '/health', handler: healthHandler },
    { method: 'GET', path: '/api/characters', handler: charactersHandler },
    { method: 'GET', path: '/api/characters/:id', handler: characterHandler, regex: /^\/api\/characters\/\d+$/ }, 
    { method: 'POST', path: '/api/characters', handler: insertCharacterHandler },
    { method: 'PUT', path: '/api/characters/:id', handler: updateCharacterHandler, regex: /^\/api\/characters\/\d+$/ },
    { method: 'DELETE', path: '/api/characters/:id', handler: deleteCharacterHandler, regex: /^\/api\/characters\/\d+$/ }
];

const server = http.createServer(async (req, res) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    const route = findRoute(routes, req.method, req.url);

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