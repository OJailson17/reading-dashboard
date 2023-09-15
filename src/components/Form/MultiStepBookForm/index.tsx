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

export const MultiStepBookForm = () => {
	const [formStep, setFormStep] = useState(0);

	const nextFormStep = () => setFormStep(currentStep => currentStep + 1);

	const prevFormStep = () => setFormStep(currentStep => currentStep - 1);

	// const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
	// 	// eslint-disable-next-line react/jsx-key
	// 	useMultiStepForm([]);

	// const { onCreateBook } = useMultiForm();

	// const handleSubmit = (e: FormEvent) => {
	// 	e.preventDefault();

	// 	if (!isLastStep) return next();

	// 	onCreateBook();
	// };

	return (
		<>
			<h1>Multi Step Form</h1>

			<main>
				<div>
					<div>
						{formStep + 1}/{8}
					</div>

					{formStep >= 0 && (
						<BookTitleForm formStep={formStep} nextFormStep={nextFormStep} />
					)}

					{formStep === 1 && (
						<BookAuthorForm formStep={formStep} nextFormStep={nextFormStep} />
					)}

					{formStep === 2 && (
						<BookPagesForm formStep={formStep} nextFormStep={nextFormStep} />
					)}

					{formStep === 3 && (
						<BookStatusLanguageForm
							formStep={formStep}
							nextFormStep={nextFormStep}
						/>
					)}

					<div style={{ marginTop: '1rem' }}>
						{formStep > 0 && (
							<button type='button' onClick={prevFormStep}>
								Back
							</button>
						)}
						<button type='button' onClick={nextFormStep}>
							Next
						</button>
					</div>
				</div>
			</main>
		</>
	);
};
