import type { Config } from 'tailwindcss';

const config = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	prefix: '',
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
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
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
