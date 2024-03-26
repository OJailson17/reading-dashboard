import { ComponentProps, ReactNode, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

interface InputComponentProps extends ComponentProps<'input'> {
	error?: FieldError;
	label: string;
	id: string;
	// isCustom?: boolean;
	// children?: ReactNode;
}

export const InputComponent = forwardRef<HTMLInputElement, InputComponentProps>(
	(props, ref) => {
		const { children, ...rest } = props;

		return (
			<div className='w-full max-w-80 flex flex-col gap-2'>
				<label htmlFor={props.id} className='font-bold text-lg'>
					{props.label}
				</label>
				<input
					type='text'
					className='py-3 px-2 bg-background rounded-md text-white placeholder:text-placeholder placeholder:text-sm'
					ref={ref}
					{...rest}
				/>
			</div>
		);
	},
);

InputComponent.displayName = 'InputComponent';
