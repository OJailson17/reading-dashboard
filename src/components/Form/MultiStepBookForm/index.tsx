'use client';

import { useMultiStepForm } from '@/hooks/useMultiStepForm';
import React from 'react';
import { BookTitleForm } from './BookTitleForm';

export const MultiStepBookForm = () => {
	const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
		// eslint-disable-next-line react/jsx-key
		useMultiStepForm([<BookTitleForm />]);

	return (
		<>
			<h1>Multi Step Form</h1>

			<main>
				<div>
					<div>1/3</div>

					{step}

					<div style={{ marginTop: '1rem' }}>
						<button type='submit'>{'Next'}</button>
					</div>
				</div>
			</main>
		</>
	);
};
