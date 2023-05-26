/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		API_BASE_URL: process.env.API_BASE_URL,
	},
	compiler: {
		styledComponents: {
			ssr: true,
			minify: true,
		},
	},
	swcMinify: true,
};

module.exports = nextConfig;
