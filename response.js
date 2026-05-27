export function response(res, statusCode, contentType, data) {
    res.writeHead(statusCode, { 'Content-Type': contentType });
    res.end(data);
}

export function errorResponse(res, statusCode, message) {
    response(res, statusCode, 'text/plain', message);
}

export function responseWithJson(res, statusCode, data) {
    response(res, statusCode, 'application/json', JSON.stringify(data));
}