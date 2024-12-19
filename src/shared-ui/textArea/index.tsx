import { Field, Label, Textarea } from '@headlessui/react';
import clsx from 'clsx';
import React, { Fragment } from 'react';

interface Props extends React.ComponentProps<'textarea'> {
  label?: string;
  labelStyle?: React.ComponentProps<typeof Label>['className'];
}

export default function TextArea({ label, labelStyle, ...rest }: Props) {
  return (
    <Field>
      <Label
        className={`pl-1 mb-1 text-dark-5 text-[12px] !font-[500] ${labelStyle}`}
      >
        {label}
      </Label>
      <Textarea as={Fragment}>
        {() => (
          <textarea
            className={clsx(
              'mt-3 block w-full resize-none rounded-xl border-border-gray border-[1px]  py-1.5 px-3 text-sm/6',
              'focus:outline-none data-[focus]:border-primary data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            )}
            {...rest}
            rows={rest.rows || 5}
          />
        )}
      </Textarea>
    </Field>
  );
}
