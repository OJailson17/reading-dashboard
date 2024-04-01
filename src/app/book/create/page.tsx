import { getUser } from '@/app/actions/getUser';
import LoadingScreen from '@/app/loading';
import { Footer } from '@/components/Footer';
import { MultiStepFormWrapper } from '@/components/Forms/MultiStepForm/MultiStepFormWrapper';
import { Header } from '@/components/Header';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default async function CreateBook() {
	const user = await getUser();

	if (!user.token || !user.user_database) {
		redirect('/login');
	}

	return (
		<Suspense fallback={<LoadingScreen />}>
			<Header />

			<main className='w-full max-sm:max-w-md max-sm:mx-auto mt-20 max-w-7xl flex items-center justify-center gap-8 max-sm:flex-col'>
				<div className='bg-secondary-background w-full min-h-80 max-w-96 sm:max-lg:w-80 rounded-2xl px-2 py-4 flex flex-col items-center justify-center gap-2'>
					{/* Cover */}
					<div className='w-28 h-40 bg-background rounded-md' />

					{/* Title */}
					<div className='bg-background w-full max-w-52 h-6 rounded-md' />

					{/* Author */}
					<div className='bg-background w-full max-w-36 h-6 rounded-md' />

					{/* Status/Rating */}
					<div className='w-full max-w-52 flex items-center justify-center gap-2'>
						<div className='bg-background w-full h-6 rounded-md' />
						<div className='bg-background w-16 h-6 rounded-md' />
					</div>
				</div>

				<MultiStepFormWrapper user_database_id={user.user_database} />
			</main>

			<Footer />
		</Suspense>
	);
}
