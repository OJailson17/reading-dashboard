/* eslint-disable react/jsx-key */
'use client';

import { BookTitleForm } from './BookTitleForm';

import { useMultiStepForm } from '@/hooks/useMultiStepForm';
import React, { FormEvent, useEffect, useState } from 'react';
// import { BookTitleForm } from './BookTitleForm';
import { BookAuthorForm } from './BookAuthorForm';
import { useMultiForm } from '@/context/MultiFormContext';
import { MultiFormWrapper } from './MultiFormWrapper';
import { BookPagesForm } from './BookPagesForm';
import { BookStatusLanguageForm } from './BookStatusLanguageForm';
import { BookCoverForm } from './BookCoverForm';
import { BookReviewForm } from './BookReviewForm';

interface MultiStepBookFormProps {
	database_id: string;
}

export const MultiStepBookForm = ({ database_id }: MultiStepBookFormProps) => {
	const { step, onHandleBack, onHandleNext } = useMultiForm();

	function ActiveStepFormComponent() {
		switch (step) {
			case 1:
				return <BookTitleForm />;
			case 2:
				return <BookAuthorForm />;
			case 3:
				return <BookPagesForm />;
			case 4:
				return <BookCoverForm />;
			// case 5:
			// 	return <BookReviewForm database_id={database_id} />;
			default:
				return null;
		}
	}

	return (
		<>
			<h1>Multi Step Form</h1>

			<main>
				<div>
					<div>
						{step}/{8}
					</div>
					<ActiveStepFormComponent />

					<div style={{ marginTop: '1rem' }}>
						{step > 1 && (
							<button type='button' onClick={onHandleBack}>
								Back
							</button>
						)}
						<button type='button' onClick={onHandleNext}>
							Next
						</button>
					</div>
				</div>
			</main>
		</>
	);
};
