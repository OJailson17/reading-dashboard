import { BookForm } from '@/components/Form/BookForm';
import { PageTitle } from '@/styles/common';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const metadata = {
	title: 'Create Book | Reading Dashboard',
};

export default async function CreateBook() {
	// Get token from cookies
	const token = cookies().get('@reading_dashboard:token')?.value;
	// Get database id from cookies
	const databaseId = cookies().get('@reading_dashboard:database_id')?.value;

	// Redirect to login page if token does not exists
	if (!token || !databaseId) {
		redirect('/login');
	}

	return (
		<>
			<PageTitle>Create Book</PageTitle>

			<BookForm database_id={databaseId} />
		</>
	);
}