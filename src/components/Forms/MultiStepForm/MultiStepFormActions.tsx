'use client';

import { useMultiForm } from '@/context/MultiFormContext';
import { ImSpinner2 } from 'react-icons/im';

interface MultiStepFormActionsProps {
	onHandleBack?: () => void;
	onHandleSubmit?: () => void;
	isLoading?: boolean;
}

export const MultiStepFormActions = (props: MultiStepFormActionsProps) => {
	const { isLoading, onHandleSubmit } = props;

	const { step, onHandleBack } = useMultiForm();

	return (
		<div className='w-full flex items-center gap-4'>
			{step > 1 && (
				<button
					type='button'
					onClick={onHandleBack}
					className='px-8 py-2 bg-purple font-bold text-white text-lg flex items-center justify-center rounded-md'
				>
					Back
				</button>
			)}
			<button
				type='button'
				onClick={onHandleSubmit}
				className='px-8 py-2 bg-purple font-bold  text-white text-lg flex items-center justify-center rounded-md'
			>
				{!isLoading ? (
					step >= 9 ? (
						'Create'
					) : (
						'Next'
					)
				) : (
					<ImSpinner2 className='text-white animate-spin' />
				)}
			</button>
		</div>
	);
};
