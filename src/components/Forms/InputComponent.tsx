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
						<label
							htmlFor={props.id}
							className='font-bold text-lg bg-gradient-primary text-transparent bg-clip-text'
						>
							{props.label}
						</label>
						<div className='w-full'>
							<input
								type='text'
								className='w-full py-3 px-4 bg-background rounded-md text-white placeholder:text-placeholder placeholder:text-sm outline-none'
								defaultValue={props.type === 'number' ? 0 : ''}
								ref={ref}
								{...rest}
							/>
							<span className='text-red-500 text-sm mt-1 inline-block'>
								{props.error?.message}
							</span>
						</div>
					</div>
				)}

				{isCustom && (
					<div className='w-full max-w-80 flex flex-col gap-2'>
						<label
							htmlFor={props.id}
							className='font-bold text-lg bg-gradient-primary text-transparent bg-clip-text'
						>
							{props.label}
						</label>
						<div className='w-full'>
							{children}
							<span className='text-red-500 text-sm mt-1 inline-block'>
								{props.error?.message}
							</span>
						</div>
					</div>
				)}
			</>
		);
	},
);

InputComponent.displayName = 'InputComponent';
