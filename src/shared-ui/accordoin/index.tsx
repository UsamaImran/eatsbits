import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';

import { FaChevronRight } from 'react-icons/fa';

interface AccordionProps extends React.ComponentProps<typeof Disclosure> {
  title: React.ReactNode;
  displayArrow?: boolean;
}
// group-data-[open]:rotate-90
function Accordion({
  children,
  title,
  displayArrow = true,
  ...rest
}: AccordionProps) {
  return (
    <Disclosure
      {...rest}
      as='div'
      className={`w-full flex flex-col justify-center  bg-white rounded-2xl px-5 border-gray-2 border-[1px] ${rest.className}`}
    >
      <DisclosureButton className=' group  flex w-full items-center justify-between'>
        <div>{title}</div>
        {displayArrow && (
          <FaChevronRight className='size-5 fill-secondary-text group-data-[hover]:fill-secondary-text ' />
        )}
      </DisclosureButton>
      <div className='overflow-hidden'>
        <DisclosurePanel
          transition
          className='origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0'
        >
          {children}
        </DisclosurePanel>
      </div>
    </Disclosure>
  );
}
export default Accordion;
