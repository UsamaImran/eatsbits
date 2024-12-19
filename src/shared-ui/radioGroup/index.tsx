import { Radio, RadioGroup } from '@headlessui/react';

import { useState } from 'react';

interface Props<T> extends React.ComponentProps<typeof RadioGroup> {
  items: T[];
  keyExtractor: (item: T, index: string | number) => string | number;
  renderItem: (
    item: T,
    selected: boolean,
    index: number | string
  ) => React.ReactNode;
  comparisonKey: keyof T;
  onSelect?: (item: T) => void;
  defaultSelected?: T | null;
  radioItemProps?: (item: T) => React.ComponentProps<typeof Radio>;
}

export default function MyRadioGroup<T>({
  items,
  renderItem,
  keyExtractor,
  onSelect,
  defaultSelected,
  comparisonKey,
  radioItemProps,
  ...rest
}: Props<T>) {
  const [selected, setSelected] = useState<T | null>(defaultSelected ?? null);

  return (
    <div className='w-full'>
      <div className='w-full'>
        <RadioGroup
          onChange={(val: T) => {
            onSelect && onSelect(val);
            setSelected(val);
            rest.onChange && rest.onChange(val);
          }}
          aria-label='Server size'
          className={`gap-3 flex  ${rest.className}`}
          {...rest}
          value={selected}
        >
          {items?.map((plan, index) => {
            const isCurrentItemSelected =
              selected && selected[comparisonKey] === plan[comparisonKey];

            return (
              <Radio
                key={keyExtractor(plan, index)}
                className={`group flex cursor-pointer lg:w-auto xs:w-full justify-center transition focus:outline-none data-[focus]:outline-1 ${
                  radioItemProps ? radioItemProps(plan)?.className : ''
                }`}
                {...radioItemProps}
                value={plan}
              >
                {renderItem(
                  plan,
                  isCurrentItemSelected ? isCurrentItemSelected : false,
                  index
                )}
              </Radio>
            );
          })}
        </RadioGroup>
      </div>
    </div>
  );
}
