const baseUrl = 'https://josebekbackend.herokuapp.com';
export const api = `${baseUrl}/api`;
export const generatePublicUrl = (filename) => {
	return `${baseUrl}/${filename}`;
};
