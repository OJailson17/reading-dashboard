'use client';

import Link from 'next/link';
import { MultiStepForm } from '.';
import { useMultiForm } from '@/context/MultiFormContext';

interface MultiStepFormWrapperProps {
	user_database_id: string;
}

export const MultiStepFormWrapper = ({
	user_database_id,
}: MultiStepFormWrapperProps) => {
	const { step } = useMultiForm();

	const totalNumberOfSteps = 9;

	return (
		<div className='flex-1 w-full max-w-3xl bg-secondary-background min-h-80 rounded-2xl px-8 sm:px-9 py-6'>
			<header className='w-full flex items-center justify-between'>
				<Link href={'/'} className='font-medium underline'>
					Cancel
				</Link>
				<h3 className='bg-gradient-secondary text-transparent bg-clip-text text-2xl font-bold'>
					Create Book
				</h3>
				<p className='font-bold text-span'>
					<span>{step}</span>/<span>{totalNumberOfSteps}</span>
				</p>
			</header>

			<MultiStepForm user_database_id={user_database_id} />
		</div>
	);
};
