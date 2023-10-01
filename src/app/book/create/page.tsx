import { Footer } from '@/components/Footer';
import { BookForm } from '@/components/Form/BookForm';
import { MultiStepBookForm } from '@/components/Form/MultiStepBookForm';
import { PageTitle } from '@/styles/common';
import { cookiesStrings } from '@/utils/constants/storageStrings';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const metadata = {
	title: 'Create Book | Reading Dashboard',
};

export default async function CreateBook() {
	// Get token from cookies
	const token = cookies().get(cookiesStrings.TOKEN)?.value;
	// Get database id from cookies
	const databaseId = cookies().get(cookiesStrings.DATABASE_ID)?.value;

	// Redirect to login page if token does not exists
	if (!token || !databaseId) {
		redirect('/login');
	}

	return (
		<>
			<PageTitle>Create Book</PageTitle>

			<MultiStepBookForm database_id={databaseId} />

			{/* <BookForm database_id={databaseId} /> */}

			<Footer />
		</>
	);
}
