import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

interface Props extends React.ComponentProps<'button'> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: ButtonVariant;
}

function Button({
  children,
  startIcon,
  endIcon,
  variant = 'primary',
  ...rest
}: Props) {
  const baseStyles =
    'py-2 px-10 rounded-xl flex items-center justify-center space-x-2  transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed ';

  const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-primary text-white active:bg-primary/70',
    secondary: 'bg-light-gray text-primary-text active:bg-light-gray/20',
    tertiary: 'bg-white text-primary border-0 active:bg-light-primary/70',
  };

  return (
    <div>
      <button
        {...rest}
        className={`${baseStyles} ${variantStyles[variant]} disabled:bg-gray-300 ${rest.className}`}
      >
        {startIcon && <span className='mr-2'>{startIcon}</span>} {children}
        {endIcon && <span className='ml-2'>{endIcon}</span>}
      </button>
    </div>
  );
}

export default Button;
