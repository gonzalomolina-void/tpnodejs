export function findRoute(routes, method, url) {
    let route = routes.find(r => r.method === method && r.path === url);

    if (route) {
        return route;
    }

    route = routes.find(r => r.method === method && r.regex && r.regex.test(url));

    return route;   
}