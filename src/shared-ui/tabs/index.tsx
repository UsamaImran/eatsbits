import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import Text from '@/shared-ui/text';

interface Props {
  tabsData: {
    title: React.ReactNode;
    component: React.ReactNode;
    id: string | number;
  }[];
  onSelected?: (index: number) => void;
}

export default function Tabs({ tabsData, onSelected }: Props) {
  return (
    <div>
      <div className=''>
        <TabGroup
          key={tabsData.length}
          onChange={onSelected && onSelected}
          defaultIndex={0}
          defaultValue={0}
        >
          <TabList className='border-b-2 border-gray-7  '>
            {({ selectedIndex }) => (
              <div className=' top-[-25px] flex gap-2' role='button'>
                {tabsData.map(({ title, id }, index) => (
                  <Tab
                    key={id}
                    className={`m-0  px-2    focus:outline-none   ${
                      selectedIndex === index
                        ? 'font-semibold border-primary border-b-4'
                        : 'text-secondary-text'
                    }`}
                  >
                    <Text
                      className={` ${
                        selectedIndex === index
                          ? '!text-text-primary'
                          : '!text-secondary-text'
                      }`}
                    >
                      {title}
                    </Text>
                  </Tab>
                ))}
              </div>
            )}
          </TabList>

          <TabPanels className='mt-10'>
            {tabsData.map(({ id, component }) => (
              <TabPanel key={id} className='rounded-xl bg-white/5 ptp-3'>
                {component}
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
}
