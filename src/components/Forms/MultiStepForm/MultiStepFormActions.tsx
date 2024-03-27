'use client';

import { useMultiForm } from '@/context/MultiFormContext';
import { useEffect, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';

interface MultiStepFormActionsProps {
	onHandleBack?: () => void;
	onHandleSubmit?: () => void;
	isLoading?: boolean;
	removeEvents?: boolean;
}

export const MultiStepFormActions = (props: MultiStepFormActionsProps) => {
	const { isLoading, onHandleSubmit } = props;

	const { step, onHandleBack } = useMultiForm();

	const [removeButtonEvents, setRemoveButtonEvents] = useState(false);

	// When the function removeEvent is passed the buttons events are disabled when selects is open
	// This is necessary to avoid click when the buttons are behind a select option
	useEffect(() => {
		if (!props.removeEvents) {
			setTimeout(() => {
				setRemoveButtonEvents(false);
			}, 50);
		} else {
			setRemoveButtonEvents(props.removeEvents);
		}
	}, [props.removeEvents]);

	return (
		<div className='w-full flex items-center gap-4'>
			{step > 1 && (
				<button
					type='button'
					onClick={onHandleBack}
					style={{ pointerEvents: removeButtonEvents ? 'none' : 'auto' }}
					className='px-8 py-2 bg-purple font-bold text-white text-lg flex items-center justify-center rounded-md'
				>
					Back
				</button>
			)}
			<button
				type='button'
				onClick={onHandleSubmit}
				style={{ pointerEvents: removeButtonEvents ? 'none' : 'auto' }}
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
