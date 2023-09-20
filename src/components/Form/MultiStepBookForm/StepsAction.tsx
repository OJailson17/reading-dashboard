import React from 'react';
import { CreateBook } from '../BookForm';
import { UseFormHandleSubmit } from 'react-hook-form';

interface FormStepsActionProps {
	step: number;
	onHandleBack?: () => void;
	onHandleSubmit?: () => void;
}

export const FormStepsAction = ({
	step,
	onHandleBack,
	onHandleSubmit,
}: FormStepsActionProps) => {
	return (
		<div style={{ marginTop: '1rem' }}>
			{step > 1 && (
				<button type='button' onClick={onHandleBack}>
					Back
				</button>
			)}
			<button type='button' onClick={onHandleSubmit}>
				{step >= 8 ? 'Create' : 'Next'}
			</button>
		</div>
	);
};
