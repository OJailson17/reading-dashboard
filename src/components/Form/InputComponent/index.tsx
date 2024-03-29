'use client';

import { ComponentProps, ReactNode, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

import { CreateBookInputContainer } from './styles';

interface InputComponentProps extends ComponentProps<'input'> {
	error?: FieldError;
	label: string;
	id: string;
	isCustom?: boolean;
	children?: ReactNode;
}

export const InputComponent = forwardRef<HTMLInputElement, InputComponentProps>(
	(props, ref) => {
		const { isCustom = false, children, ...rest } = props;

		return (
			<>
				{!props.isCustom && (
					<CreateBookInputContainer>
						<label htmlFor={props.id}>{props.label}</label>
						<input
							ref={ref}
							defaultValue={props.type === 'number' ? 0 : ''}
							style={props.error ? { outline: '1px solid red' } : {}}
							{...rest}
						/>
						<span className='error-message'>{props.error?.message}</span>
					</CreateBookInputContainer>
				)}

				{props.isCustom && (
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
