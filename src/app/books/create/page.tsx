import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { getSession } from '@/app/actions/getSession';
import LoadingScreen from '@/app/loading';
import { BookCreationPreview } from '@/components/BookCreationPreview';
import { Footer } from '@/components/Footer';
import { MultiStepFormWrapper } from '@/components/Forms/MultiStepForm/MultiStepFormWrapper';
import { Header } from '@/components/Header';

export const metadata: Metadata = {
	title: 'Create Book | Reading Dashboard',
};

export default async function CreateBook() {
	const session = await getSession();

	if (!session) {
		return redirect('/login');
	}

	return (
		<Suspense fallback={<LoadingScreen />}>
			<Header />

			<main className='w-full max-sm:max-w-md max-sm:mx-auto mt-20 max-w-7xl flex sm:items-start items-center justify-center gap-8 max-sm:flex-col'>
				<BookCreationPreview />

				<MultiStepFormWrapper user_database_id={session.database_id} />
			</main>

			<Footer />
		</Suspense>
	);
}
