import { ReactNode } from 'react';

import { MultiStepFormWrapper } from './styles';

interface FormWrapperProps {
	title: string;
	children: ReactNode;
	// prevFormStep: () => void;
	// currentStep: number
}

export const MultiFormWrapper = ({ title, children }: FormWrapperProps) => {
	return (
		<MultiStepFormWrapper>
			<h2>{title}</h2>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '1rem',
				}}
			>
				{children}
			</div>
		</MultiStepFormWrapper>
	);
};
