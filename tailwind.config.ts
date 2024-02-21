import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				background: '#0E102E',
				'secondary-background': '#1B1D42',
				'light-green': '#5CDAC3',
				blue: '#739DDC',
				placeholder: '#7E808D',
				span: '#B6B7C2',
				purple: '#5E3A91',
				title: 'linear-gradient(to right,#739DDC,#5CDAC3 )',
			},
			backgroundImage: {
				'gradient-primary': 'linear-gradient(to right,#739DDC,#5CDAC3 )',
				'gradient-secondary': 'linear-gradient(to right,#BAA3DB,#9467D3 )',
			},
			fontFamily: {
				poppins: ['var(--poppins)'],
				aclonica: ['Aclonica', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
export default config;
