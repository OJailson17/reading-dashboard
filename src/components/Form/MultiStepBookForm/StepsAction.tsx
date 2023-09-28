import React from 'react';
import { CreateBook } from '../BookForm';
import { UseFormHandleSubmit } from 'react-hook-form';

interface FormStepsActionProps {
	step: number;
	onHandleBack?: () => void;
	onHandleSubmit?: () => void;
	isLoading?: boolean;
}

export const FormStepsAction = ({
	step,
	onHandleBack,
	onHandleSubmit,
	isLoading,
}: FormStepsActionProps) => {
	return (
		<div style={{ marginTop: '1rem' }}>
			{step > 1 && (
				<button type='button' onClick={onHandleBack}>
					Back
				</button>
			)}
			<button type='button' onClick={onHandleSubmit}>
				{!isLoading ? (step >= 8 ? 'Create' : 'Next') : 'loading'}
			</button>
		</div>
	);
};
