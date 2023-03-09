import axios from 'axios';

const baseUrl = process.env.API_BASE_URL;

export const api = axios.create({
	baseURL: baseUrl,
});
