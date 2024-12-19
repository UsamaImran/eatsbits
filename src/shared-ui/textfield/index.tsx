import React from 'react';

interface Props extends React.ComponentProps<'input'> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode; // Added endIcon prop
  label?: string;
  error?: boolean;
  errorMessage?: string;
}

function TextField({
  startIcon,
  endIcon,
  label,
  error,
  errorMessage,
  ...rest
}: Props) {
  return (
    <div className='flex flex-col px-1'>
      {label && (
        <label htmlFor={rest.id} className='pl-1 mb-1 text-dark-5 text-[12px]'>
          {label}
        </label>
      )}
      <div
        className={`group h-[45px] border-[1px] border-border-gray rounded-xl ${
          error ? 'focus-within:border-red' : 'focus-within:border-primary'
        }  bg-white `}
      >
        <div className='flex items-center h-full w-full'>
          {startIcon && <span className='ml-2'>{startIcon}</span>}
          <input
            id={rest.id}
            {...rest}
            className={`h-full w-full focus:outline-none rounded-xl pl-5 placeholder-gray-300   ${rest.className}`}
          />
          {endIcon && <span className='mr-2 '>{endIcon}</span>}{' '}
        </div>
      </div>
      <div>
        <span className='text-[14px] text-red'>{errorMessage}</span>
      </div>
    </div>
  );
}

export default TextField;
