import { ReactNode } from 'react';

interface FormWrapperProps {
	title: string;
	children: ReactNode;
}

export const MultiFormWrapper = ({ title, children }: FormWrapperProps) => {
	return (
		<>
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
		</>
	);
};
