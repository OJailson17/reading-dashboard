import { ComponentProps, ReactNode, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

interface InputComponentProps extends ComponentProps<'input'> {
	error?: FieldError;
	label: string;
	id: string;
	isCustom?: boolean;
	children?: ReactNode;
}

export const InputComponent = forwardRef<HTMLInputElement, InputComponentProps>(
	(props, ref) => {
		const { children, isCustom, ...rest } = props;

		return (
			<>
				{!isCustom && (
					<div className='w-full max-w-80 flex flex-col gap-2'>
						<label htmlFor={props.id} className='font-bold text-lg'>
							{props.label}
						</label>
						<input
							type='text'
							className='py-3 px-4 bg-background rounded-md text-white placeholder:text-placeholder placeholder:text-sm'
							defaultValue={props.type === 'number' ? 0 : ''}
							ref={ref}
							{...rest}
						/>
					</div>
				)}

				{isCustom && (
					<div className='w-full max-w-80 flex flex-col gap-2'>
						<label htmlFor={props.id} className='font-bold text-lg'>
							{props.label}
						</label>
						{children}
					</div>
				)}
			</>
		);
	},
);

InputComponent.displayName = 'InputComponent';
