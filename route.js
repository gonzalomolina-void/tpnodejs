export function findRoute(routes, method, url) {
    const regex = /^\/api\/characters\/\d+$/;

    if (regex.test(url)) {
        return routes.find(r => r.method === method && r.path === '/api/characters/:id');
    }

    return routes.find(r => r.method === method && r.path === url);
}