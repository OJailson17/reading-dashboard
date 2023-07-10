'use client';

import { ReactNode, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import { CreateBookInputContainer } from './styles';

interface InputComponentProps {
	error?: FieldError;
	label: string;
	id: string;
	placeholder?: string;
	type?: string;
	isCustom?: boolean;
	children?: ReactNode;
}

export const InputComponent = forwardRef<HTMLInputElement, InputComponentProps>(
	(props, ref) => {
		const { isCustom = false, children, ...rest } = props;

		return (
			<>
				{!props.isCustom ? (
					<CreateBookInputContainer>
						<label htmlFor={props.id}>{props.label}</label>
						<input
							ref={ref}
							type={props.type || 'text'}
							defaultValue={props.type === 'number' ? 0 : ''}
							{...rest}
						/>
						<span className='error-message'>{props.error?.message}</span>
					</CreateBookInputContainer>
				) : (
					<CreateBookInputContainer>
						<label htmlFor={props.id}>{props.label}</label>
						{children}
						<span className='error-message'>{props.error?.message}</span>
					</CreateBookInputContainer>
				)}
			</>
		);
	},
);

InputComponent.displayName = 'InputComponent';
