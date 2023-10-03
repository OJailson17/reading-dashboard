import React, { ButtonHTMLAttributes } from 'react';
import { CreateBook } from '../BookForm';
import { UseFormHandleSubmit } from 'react-hook-form';
import { MultiStepActionButton, MultiStepActionContainer } from './styles';

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
		<MultiStepActionContainer>
			{step > 1 && (
				<MultiStepActionButton type='button' onClick={onHandleBack}>
					Back
				</MultiStepActionButton>
			)}
			<MultiStepActionButton type='button' onClick={onHandleSubmit}>
				{!isLoading ? (step >= 8 ? 'Create' : 'Next') : 'loading'}
			</MultiStepActionButton>
		</MultiStepActionContainer>
	);
};
