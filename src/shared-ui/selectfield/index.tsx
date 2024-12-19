import React from 'react';

interface Option {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface Props extends React.ComponentProps<'select'> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  optionsList: Option[];
}

function SelectField({
  startIcon,
  endIcon,
  label,
  error,
  errorMessage,
  optionsList,
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
        className={`group h-[45px] border-[1px] rounded-xl focus-within:border-primary bg-white ${
          error ? 'border-red-500' : 'border-border-gray'
        }`}
      >
        <div className='flex items-center h-full w-full'>
          {startIcon && <span className='ml-2'>{startIcon}</span>}
          <select
            id={rest.id}
            {...rest}
            className={`h-full w-full focus:outline-none rounded-xl pl-2 mr-2 bg-white ${rest.className}`}
          >
            {optionsList.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {endIcon && <span className='mr-2'>{endIcon}</span>}
        </div>
      </div>
      {error && errorMessage && (
        <span className='text-red-500 text-[12px] pl-1'>{errorMessage}</span>
      )}
    </div>
  );
}

export default SelectField;
