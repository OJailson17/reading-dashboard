import { BookForm } from '@/components/BookForm';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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
			<h1>Create Book</h1>

			<BookForm database_id={databaseId} />
		</>
	);
}
