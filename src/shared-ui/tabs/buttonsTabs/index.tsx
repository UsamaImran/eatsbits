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

export default function ButtonTabs({ tabsData, onSelected }: Props) {
  return (
    <div>
      <TabGroup onChange={onSelected && onSelected}>
        <TabList className='flex w-full bg-gray-2 border-gray-3 border rounded-2xl p-1'>
          {({ selectedIndex }) => (
            <div className=' top-[-25px] w-full gap-1 flex' role='button'>
              {tabsData.map(({ title, id }, index) => (
                <Tab
                  key={id}
                  className={`flex-1 focus:outline-none rounded-2xl p-3 ${
                    selectedIndex === index
                      ? 'bg-white'
                      : 'text-secondary-text bg-gray-2 border-gray-3 border'
                  }`}
                >
                  <Text
                    className={`text-lg ${
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

        <TabPanels>
          {tabsData.map(({ id, component }) => (
            <TabPanel key={id} className='rounded-xl bg-white/5 ptp-3'>
              {component}
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  );
}
