/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	fontLoaders: [
		{ loader: '@next/font/google', options: { subsets: ['latin'] } },
	],
	reactStrictMode: true,
};

module.exports = nextConfig;
