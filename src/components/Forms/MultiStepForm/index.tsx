'use client';

import { useMultiForm } from '@/context/MultiFormContext';
import { BookTitleForm } from './BookTitleForm';
import { BookAuthorForm } from './BookAuthorForm';
import { BookCoverForm } from './BookCoverForm';
import { BookPagesForm } from './BookPagesForm';
import { BookStatusLanguageForm } from './BookStatusLanguageForm';
import { BookReviewForm } from './BookReviewForm';
import { BookGenresForm } from './BookGenresForm';
import { BookPriceForm } from './BookPriceForm';

interface MultiStepFormProps {
	user_database_id: string;
}

export const MultiStepForm = ({ user_database_id }: MultiStepFormProps) => {
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
				return <BookPagesForm />;
			case 5:
				return <BookStatusLanguageForm />;
			case 6:
				return <BookGenresForm />;
			case 7:
				return <BookReviewForm user_database_id={user_database_id} />;
			case 8:
				return <BookPriceForm />;
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
