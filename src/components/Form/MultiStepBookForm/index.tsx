/* eslint-disable react/jsx-key */
'use client';

import Link from 'next/link';

import { useMultiForm } from '@/context/MultiFormContext';

import { BookAuthorForm } from './BookAuthorForm';
import { BookCoverForm } from './BookCoverForm';
import { BookDatesForm } from './BookDatesForm';
import { BookGenresForm } from './BookGenresForm';
import { BookPagesForm } from './BookPagesForm';
import { BookReviewForm } from './BookReviewForm';
import { BookStatusLanguageForm } from './BookStatusLanguageForm';
import { BookTitleForm } from './BookTitleForm';
import { MultiStepFormContainer } from './styles';

interface MultiStepBookFormProps {
	database_id: string;
}

export const MultiStepBookForm = ({ database_id }: MultiStepBookFormProps) => {
	const { step } = useMultiForm();

	function ActiveStepFormComponent() {
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
				return <BookReviewForm database_id={database_id} />;
			case 8:
				return <BookDatesForm database_id={database_id} />;
			default:
				return null;
		}
	}

	const totalNumberOfSteps = 8;

	return (
		<>
			<MultiStepFormContainer>
				<div>
					<div className='steps-info'>
						<Link href={'/'}>Cancel</Link>
						{step}/{totalNumberOfSteps}
					</div>
					<ActiveStepFormComponent />
				</div>
			</MultiStepFormContainer>
		</>
	);
};
