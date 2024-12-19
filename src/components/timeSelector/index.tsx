import useEarliestOrderTime from '@/api/restaurants/useEarliestOrderTime';
import { calculateTimeRange, generateYears } from '@/helpers';
import Select from '@/shared-ui/select';

const timeRanges = [
  { label: 'Today', ...calculateTimeRange('Today') },
  { label: 'Yesterday', ...calculateTimeRange('Yesterday') },
  { label: 'Last 7 Days', ...calculateTimeRange('Last 7 Days') },
  { label: 'Last 30 Days', ...calculateTimeRange('Last 30 Days') },
  { label: 'Last Month', ...calculateTimeRange('Last Month') },
  { label: 'Last 90 Days', ...calculateTimeRange('Last 90 Days') },
  { label: 'Last Year', ...calculateTimeRange('Last Year') },
];

interface Props {
  onSelect: (value: (typeof timeRanges)[0]) => void;
}

export default function TimeSelector({ onSelect }: Props) {
  const { data } = useEarliestOrderTime();

  const startingYear = !!data
    ? new Date(data?.earliestOrderTimeByCustomerCorrelationId).getFullYear()
    : new Date().getFullYear();

  const finalTimeRanges = [
    ...timeRanges,
    ...generateYears(startingYear).map((year) => ({
      label: `${year}`,
      ...calculateTimeRange(`${year}`),
    })),
  ];

  return (
    <Select
      optionsList={finalTimeRanges}
      label={'Select Time:'}
      renderOption={(i) => <p className='font-[500]'>{i.label}</p>}
      uniqueKey={'label'}
      onSelect={onSelect}
      className={'w-40'}
    />
  );
}
