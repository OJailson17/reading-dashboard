'use client';

import { ReactElement, useState } from 'react';

export const useMultiStepForm = (steps: ReactElement[]) => {
	const [currentStepIndex, setCurrentStepIndex] = useState(0);

	const next = () => {
		setCurrentStepIndex(prevIndex => {
			if (prevIndex >= steps.length - 1) return prevIndex;

			return prevIndex + 1;
		});
	};

	const back = () => {
		setCurrentStepIndex(prevIndex => {
			if (prevIndex <= 0) return prevIndex;

			return prevIndex - 1;
		});
	};

	const goTo = (index: number) => {
		setCurrentStepIndex(index);
	};

	return {
		step: steps[currentStepIndex],
		currentStepIndex,
		back,
		next,
		goTo,
		steps,
		isFirstStep: currentStepIndex === 0,
		isLastStep: currentStepIndex === steps.length - 1,
	};
};
