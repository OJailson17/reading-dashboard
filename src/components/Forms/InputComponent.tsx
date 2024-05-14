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
          <div className="flex w-full max-w-80 flex-col gap-2">
            <label
              htmlFor={props.id}
              className="bg-gradient-primary bg-clip-text text-lg font-bold text-transparent"
            >
              {props.label}
            </label>
            <div className="w-full">
              <input
                type="text"
                className="w-full rounded-md bg-background px-4 py-3 text-white outline-none placeholder:text-sm placeholder:text-placeholder"
                defaultValue={props.type === 'number' ? 0 : ''}
                ref={ref}
                {...rest}
              />
              <span className="mt-1 inline-block text-sm text-red-500">
                {props.error?.message}
              </span>
            </div>
          </div>
        )}

        {isCustom && (
          <div className="flex w-full max-w-80 flex-col gap-2">
            <label
              htmlFor={props.id}
              className="bg-gradient-primary bg-clip-text text-lg font-bold text-transparent"
            >
              {props.label}
            </label>
            <div className="w-full">
              {children}
              <span className="mt-1 inline-block text-sm text-red-500">
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
