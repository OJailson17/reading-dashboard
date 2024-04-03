'use client';

import { useEffect, useState } from 'react';

import { onSignOut } from '@/app/actions/signOut';
import { storageStrings } from '@/utils';

import { Logo } from '../Logo';

export const Header = () => {
	const [username, setUsername] = useState('demo');
	const [userFullName, setUserFullName] = useState('Demo User');

	const handleSignOut = async () => {
		localStorage.clear();

		await onSignOut();
	};

	useEffect(() => {
		if (typeof window !== undefined) {
			const username = localStorage.getItem(storageStrings.username);
			const fullName = localStorage.getItem(storageStrings.name);

			if (username && fullName) {
				setUsername(username);
				setUserFullName(fullName);
			}
		}
	}, []);

	return (
		<header className='w-full max-w-7xl pt-14 flex items-center justify-between'>
			<Logo />

			<button
				onClick={handleSignOut}
				className='max-w-max sm:w-full sm:max-w-56 flex items-center justify-center gap-4 rounded-sm text-left'
			>
				<div className='w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-span' />
				<div className='hidden md:block flex-1 overflow-hidden '>
					<p className='font-semibold '>{userFullName}</p>
					<span className='text-span'>@{username}</span>
				</div>
			</button>
		</header>
	);
};
