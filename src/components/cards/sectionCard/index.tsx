import Text from '@/shared-ui/text';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren, React.ComponentProps<'div'> {
  heading?: string;
  subHeading?: string;
  headingOptions?: React.ReactNode;
  childrenProps?: React.ComponentProps<'div'>;
}

function SectionCard({
  heading,
  headingOptions,
  subHeading,
  children,
  childrenProps,
  ...rest
}: Props) {
  return (
    <div
      {...rest}
      className={`bg-white xs:w-full lg:w-[1058px] rounded-3xl p-6 ${rest.className}`}
    >
      <div className='flex flex-col gap-3'>
        <div className='flex lg:flex-row xs:flex-col xs:gap-5 lg:gap-0 justify-between'>
          {heading && (
            <Text as={'h6'} variant='h6' className='text-[21px]'>
              {heading}
            </Text>
          )}
          <div>{headingOptions}</div>
        </div>
        <div>
          <Text variant='small' className='text-[#606360]'>
            {subHeading}
          </Text>
        </div>
        <div {...childrenProps}>{children}</div>
      </div>
    </div>
  );
}

export default SectionCard;
