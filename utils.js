export function parseJson(body) {
    try {
        return JSON.parse(body);
    } catch (error) {
        return null;
    }
}