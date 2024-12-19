import useCustomerOrders from '@/api/restaurants/useCustomerOrders';
import OrderHistoryItemCard from '@/components/cards/oderHistoryItemCard';
import SectionCard from '@/components/cards/sectionCard';
import TimeSelector from '@/components/timeSelector';
import { calculateTimeRange } from '@/helpers';
import Button from '@/shared-ui/button';
import Skeleton from '@/shared-ui/skeleton';
import Text from '@/shared-ui/text';
import { useEffect, useState } from 'react';

function OrderHistorySection() {
  const [dateRange, setDateRange] = useState(calculateTimeRange('Today'));
  const [cursor, setCursor] = useState<string | null>(null);
  const { data, isLoading } = useCustomerOrders({ ...dateRange, cursor });
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    if (!!data) {
      const itemsList =
        data?.customerOrdersByCustomerCorrelationId?.edges || [];

      setItems((prev) => [...prev, ...itemsList]);
    }
  }, [dateRange.endTime, dateRange.startTime, cursor, isLoading]);

  const pageInfo = data?.customerOrdersByCustomerCorrelationId?.pageInfo;

  return (
    <div>
      <SectionCard
        className='!w-full xs:px-3'
        heading='Order History'
        headingOptions={
          <TimeSelector
            onSelect={(range) => {
              setDateRange(range);
              setItems([]);
              setCursor(null);
            }}
          />
        }
      >
        <RenderItems items={items} isLoading={false} />
        {pageInfo?.hasNextPage && (
          <div className='flex justify-center mt-5'>
            <Button
              disabled={!pageInfo?.hasNextPage}
              onClick={() => setCursor(pageInfo?.endCursor)}
            >
              {isLoading ? 'Loading ...' : 'Load More'}
            </Button>
          </div>
        )}
      </SectionCard>
    </div>
  );
}

export default OrderHistorySection;

const RenderItems = ({
  items,
  isLoading,
}: {
  items: any[];
  isLoading?: boolean;
}) => (
  <div>
    <div className='flex gap-3 flex-col max-h-[55vh] overflow-auto pb-10'>
      {isLoading
        ? [...Array(2)].map((_, index) => <RenderSkeleton key={index} />)
        : items.map((item, index) => (
            <OrderHistoryItemCard {...item?.node} key={index} />
          ))}
    </div>
    {!items.length && !isLoading && (
      <Text variant='small'>You don't have any order yet</Text>
    )}
  </div>
);

const RenderSkeleton = () => (
  <div>
    <Skeleton
      type='mixed'
      className='!w-[323.33px] min-h-[381px] h-[381px] border-2 rounded-2xl p-4'
    />
  </div>
);
