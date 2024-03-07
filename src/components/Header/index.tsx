'use client';

import { onSignOut } from '@/app/actions/signOut';
import { Logo } from '../Logo';

export const Header = () => {
	const handleSignOut = async () => {
		await onSignOut();
	};

	return (
		<header className='w-full max-w-7xl pt-14 flex items-center justify-between'>
			<Logo />

			<button
				onClick={handleSignOut}
				className='max-w-max sm:w-full sm:max-w-56 flex items-center justify-center gap-4 rounded-sm text-left'
			>
				<div className='w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-span' />
				<div className='hidden md:block flex-1 overflow-hidden '>
					<p className='font-semibold '>Jailson de Oliveira</p>
					<span className='text-span'>@ojailson17</span>
				</div>
			</button>
		</header>
	);
};
