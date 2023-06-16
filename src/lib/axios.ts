import axios from 'axios';

let baseURL = process.env.API_BASE_URL;

if (typeof window !== 'undefined') {
	console.log(window.location.href);

	if (process.env.NODE_ENV !== 'production') {
		baseURL = `${window.location.href}/api`;
	}
}

export const api = axios.create({
	baseURL,
});
