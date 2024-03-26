'use client';

import { useMultiForm } from '@/context/MultiFormContext';
import { BookTitleForm } from './BookTitleForm';
import { BookAuthorForm } from './BookAuthorForm';
import { BookCoverForm } from './BookCoverForm';

export const MultiStepForm = () => {
	const { step } = useMultiForm();

	const ActiveStepFormComponent = () => {
		switch (step) {
			case 1:
				return <BookTitleForm />;
			case 2:
				return <BookAuthorForm />;
			case 3:
				return <BookCoverForm />;
			case 4:
				return <h1>Hello Pages</h1>;
			case 5:
				return <h1>Hello Status and Language</h1>;
			case 6:
				return <h1>Hello Genres</h1>;
			case 7:
				return <h1>Hello Review</h1>;
			case 8:
				return <h1>Hello Price</h1>;
			case 9:
				return <h1>Hello Dates</h1>;
			default:
				return null;
		}
	};

	return (
		<div className='w-full mt-14'>
			<ActiveStepFormComponent />
		</div>
	);
};
