import {
  Field,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';

import clsx from 'clsx';
import { useState } from 'react';
import { FaCheck, FaChevronDown } from 'react-icons/fa';

interface Props<T> extends React.ComponentProps<typeof Listbox> {
  optionsList: T[];
  uniqueKey: keyof T;
  onSelect: (value: T) => void;
  renderOption: (option: T, index: string | number) => React.ReactNode;
  buttonProps?: React.ComponentProps<typeof ListboxButton>;
  listBoxProps?: React.ComponentProps<typeof Listbox>;
  listItemProps?: React.ComponentProps<typeof ListboxOption>;
  label?: React.ReactNode;
}

export default function Select<T>({
  optionsList,
  label,
  uniqueKey,
  buttonProps,
  listBoxProps,
  listItemProps,
  onSelect,
  renderOption,
  ...rest
}: Props<T>) {
  const [selected, setSelected] = useState((rest.value as T) || optionsList[0]);

  return (
    <Field className={'flex items-center lg:gap-3  xs:gap-1 '}>
      {label && <Label>{label}</Label>}
      <Listbox
        as='div'
        {...rest}
        value={selected}
        onChange={(val: T) => {
          setSelected(val);
          onSelect(val);
        }}
        className={`border-2 rounded-xl  ${rest.className}`}
      >
        <ListboxButton
          {...buttonProps}
          className={clsx(
            'relative w-full rounded-lg bg-white/5 py-1.5 pr-8 pl-3 text-left text-sm/6 flex items-center',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-green/25 ',
            buttonProps?.className
          )}
        >
          {renderOption(selected, 0)}
          <FaChevronDown
            className='group absolute top-4.5 right-2.5 size-4 '
            aria-hidden='true'
          />
        </ListboxButton>
        <ListboxOptions
          transition
          className={clsx(
            'w-[var(--button-width)] mt-1  border    rounded-2xl overflow-hidden   focus:outline-none bg-white shadow-md',
            'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 absolute z-[100]',
            listBoxProps?.className
          )}
          {...listBoxProps}
        >
          {optionsList.map((option, index) => (
            <ListboxOption
              disabled={JSON.stringify(selected) === JSON.stringify(option)}
              key={option[uniqueKey]}
              value={option}
              className='group  flex cursor-default items-center gap-2  py-1.5 px-3 select-none data-[focus]:bg-primary/30 data-[selected]:bg-primary data-[selected]:text-white data-[selected]:font-semibold '
              {...listItemProps}
            >
              <FaCheck className='invisible size-4 group-data-[selected]:visible' />
              {renderOption(option, index)}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </Field>
  );
}
