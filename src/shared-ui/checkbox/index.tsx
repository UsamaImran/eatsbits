import { Checkbox, Field, Label } from '@headlessui/react';
import Text from '../text';

function CheckboxField() {
  return (
    <Field className='flex items-center gap-2'>
      <Checkbox
        className={`group block min-w-4 min-h-4 size-4 rounded transition-colors duration-200 bg-white border border-primary data-[checked]:bg-primary`}
      >
        <svg
          className='stroke-primary opacity-0 group-data-[checked]:opacity-100 group-data-[checked]:stroke-white transition-opacity duration-200'
          viewBox='0 0 14 14'
          fill='none'
        >
          <path
            d='M3 8L6 11L11 3.5'
            strokeWidth={2}
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </Checkbox>
      <Label className='leading-none'>
        <Text variant='extra-small'>
          Receive discounts, loyalty offers and other updated via email, SMS.
          <Text as={'span'} variant='small' className='!text-primary'>
            Show more
          </Text>
        </Text>
      </Label>
    </Field>
  );
}

export default CheckboxField;
