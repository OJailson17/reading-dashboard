/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	reactStrictMode: true,
	env: {
		API_BASE_URL: process.env.API_BASE_URL,
	},
	compiler: {
		styledComponents: true,
	},
};

module.exports = nextConfig;
