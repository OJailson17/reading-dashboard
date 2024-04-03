import Link from 'next/link';

import { Logo } from '../Logo';

export const Footer = () => {
	return (
		<footer className='w-full max-w-7xl flex flex-col-reverse gap-4 md:flex-row items-center justify-between py-14'>
			<Logo variant='footer' />
			<p>
				developed by 💜
				<Link href={'/'} className='font-medium text-purple hover:underline'>
					Jailson de Oliveira
				</Link>
			</p>
		</footer>
	);
};
