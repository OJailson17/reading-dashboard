import { Logo } from '../Logo';

export const Header = () => {
	return (
		<header className='w-full max-w-7xl pt-14 flex items-center justify-between'>
			<Logo />

			<div className='max-w-max sm:w-full sm:max-w-56 flex items-center justify-center gap-4 bg'>
				<div className='w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-span' />
				<div className='hidden md:block flex-1 overflow-hidden'>
					<p className='font-semibold '>Jailson de Oliveira</p>
					<span className='text-span'>@ojailson17</span>
				</div>
			</div>
		</header>
	);
};
