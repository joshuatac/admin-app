const baseUrl = location.hostname === "localhost" ? "http://localhost:2000" : "https://josebekadmin.herokuapp.com";
export const api = `${baseUrl}/api`;
export const generatePublicUrl = (filename) => {
    return `${baseUrl}/${filename}`;
}