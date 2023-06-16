import axios from 'axios';

const baseURL = process.env.API_BASE_URL;

export const api = axios.create({
	baseURL,
});
