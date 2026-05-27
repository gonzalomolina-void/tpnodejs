export function parseJson(body) {
    try {
        return JSON.parse(body);
    } catch (error) {
        return null;
    }
}

export function parseUrl(url) {
    return new URL(url, `http://${req.headers.host}`);
}

export function getIdFromUrl(url) {
    const parsedUrl = parseUrl(url);
    return parsedUrl.pathname.split('/').pop();
}

export function newId(characters) {
    const maxId = characters.reduce((max, c) => Math.max(max, parseInt(c.id, 10)), 0);                                                                                                                       
    const newId = String(maxId + 1);                                                                                                                                                                        
    
    return newId;
}