'use client';

import { useMultiForm } from '@/context/MultiFormContext';

export const MultiStepForm = () => {
	const { step } = useMultiForm();

	const ActiveStepFormComponent = () => {
		switch (step) {
			case 1:
				return <h1>Hello Title</h1>;
			case 2:
				return <h1>Hello Author</h1>;
			case 3:
				return <h1>Hello Cover</h1>;
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
