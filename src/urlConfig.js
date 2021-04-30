const baseUrl = 'https://josebekadmin.herokuapp.com';
export const api = `${baseUrl}/api`;
export const generatePublicUrl = (filename) => {
	return `${baseUrl}/${filename}`;
};
