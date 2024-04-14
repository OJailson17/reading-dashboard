import { redirect } from 'next/navigation';

import { LoginForm } from '@/components/Forms/LoginForm';
import { Logo } from '@/components/Logo';
import { Toaster } from '@/components/ui/toaster';
import { aclonica } from '@/utils';

import { getUser } from '../actions/getUser';

export default async function Login() {
	const user = await getUser();

	if (user.token && user.user_database) {
		return redirect('/');
	}

	return (
		<>
			<Toaster />
			<header className='w-full pt-14 text-center'>
				<Logo />
			</header>

			<main className='w-full max-w-[550px] mx-auto flex items-center justify-center mt-20 font-poppins'>
				<div className='w-full max-w-[685px] flex flex-col items-center justify-center bg-secondary-background  rounded-2xl py-9'>
					<h2
						className={`bg-gradient-primary inline-block text-transparent bg-clip-text text-3xl ${aclonica.className} `}
					>
						Login
					</h2>

					<LoginForm />
				</div>
			</main>
		</>
	);
}
