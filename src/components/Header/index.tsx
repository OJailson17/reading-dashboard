import { Logo } from '../Logo';

export const Header = () => {
	return (
		<header className='w-full mt-14 flex items-center justify-between'>
			<Logo />

			<div className='w-full max-w-56 flex items-center justify-center gap-4 bg'>
				<div className='w-14 h-14 rounded-full bg-span' />
				<div className='flex-1 overflow-hidden'>
					<p className='font-semibold '>Jailson de Oliveira</p>
					<span className='text-span'>@ojailson17</span>
				</div>
			</div>
		</header>
	);
};
