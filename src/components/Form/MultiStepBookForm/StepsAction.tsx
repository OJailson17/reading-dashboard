import React, { ButtonHTMLAttributes } from 'react';
import { UseFormHandleSubmit } from 'react-hook-form';
import { MultiStepActionButton, MultiStepActionContainer } from './styles';
import { Puff } from 'react-loading-icons';

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
				{!isLoading ? (
					step >= 8 ? (
						'Create'
					) : (
						'Next'
					)
				) : (
					<Puff width={20} height={20} stroke='#32ccbc' />
				)}
			</MultiStepActionButton>
		</MultiStepActionContainer>
	);
};
