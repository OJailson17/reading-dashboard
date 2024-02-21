import { Logo } from '@/components/Logo';
import { aclonica } from '@/utils/fonts';

export default function Login() {
	return (
		<>
			<header className='w-full mt-14'>
				<Logo />
			</header>

			<main className='w-full flex items-center justify-center mt-20 font-poppins'>
				<div className='w-full max-w-[685px] flex flex-col items-center justify-center bg-secondary-background rounded-2xl py-9'>
					<h2
						className={`bg-gradient-primary inline-block text-transparent bg-clip-text text-3xl ${aclonica.className}`}
					>
						Login
					</h2>

					<form className='mt-9 w-full max-w-[362px] flex items-center justify-center flex-col'>
						<div className='w-full'>
							<label htmlFor='username' className='text-span block'>
								use{' '}
								<span className='bg-gradient-primary inline-block text-transparent bg-clip-text font-bold'>
									demo_user
								</span>
							</label>
							<input
								type='text'
								placeholder='username'
								className='w-full h-12 mt-1 bg-background text-span placeholder:text-placeholder px-6 rounded-md'
							/>
						</div>

						<button className='w-36 h-10 font-semibold text-sm bg-purple mt-5 rounded-md text-white'>
							enter
						</button>
					</form>
				</div>
			</main>
		</>
	);
}
