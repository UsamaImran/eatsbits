import Card from '@/shared-ui/card';
import FoodItemCard from '../foodItemCard';
import {
  areAllRequiredOptionsSelected,
  formatNumberToCurrency,
  sortByKey,
} from '@/helpers';
import { FoodItem, FoodItemOption, ItemOptionElement } from '@/types';
import Text from '@/shared-ui/text';
import Separator from '@/shared-ui/separator';
import RadioGroup from '@/shared-ui/radioGroup';

import Button from '@/shared-ui/button';
import { useRef, useState } from 'react';
import FoodItemQuantityCounter from '../foodItemCard/FoodItemQuantityCounter';
import useSmallScreen from '@/hooks/useSmallScreen';

interface Props extends Partial<FoodItem> {
  onAddToCart?: (quantity: number, foodItemOptions?: FoodItemOption[]) => void;

  displayDetails?: boolean;
  containerProps?: React.ComponentProps<typeof Card>;
}

function FoodItemDetailCard(props: Props) {
  const [selectedFoodOptions, setSelectedFoodOptions] = useState<
    FoodItemOption[]
  >([]);
  const isSmallScreen = useSmallScreen();
  const numberRef = useRef(0);

  const itemOptions = sortByKey(props?.itemOptions || [], 'renderSequence');

  const handleFoodItemOptionSelect = (item: FoodItemOption) => {
    if (props.correlationId) {
      setSelectedFoodOptions((prev) => [
        ...prev.filter((i) => i.correlationId !== item.correlationId),
        item,
      ]);
    }
  };

  const handleClearOptions = () => {
    setSelectedFoodOptions([]);
    numberRef.current = Math.random();
  };

  const hasDetails = !!itemOptions?.length;

  const shouldDisableAddtoCard = !areAllRequiredOptionsSelected(
    itemOptions,
    selectedFoodOptions
  );

  return (
    <Card
      key={numberRef.current}
      className='border-none !p-0 !bg-pink !shadow-none'
    >
      <div>
        <div className='flex lg:flex-row xs:flex-col justify-between gap-3'>
          <div>
            <FoodItemCard
              displayDetails
              containerProps={{
                className: 'lg:!w-[429px] xs:w-full !shadow-none ',
              }}
              {...props}
              onAddToCart={(quantity) =>
                props.onAddToCart &&
                props.onAddToCart(quantity, selectedFoodOptions)
              }
            />
          </div>

          {hasDetails && (
            <div className='lg:w-[69%] xs:w-full flex flex-col gap-5 lg:max-h-[500px] lg:h-[500px] overflow-auto pr-2'>
              {itemOptions?.map(
                (item) =>
                  !!item.itemOptionElements?.length && (
                    <RenderItemOption
                      key={item.correlationId}
                      {...item}
                      onOptionSelect={handleFoodItemOptionSelect}
                    />
                  )
              )}
              <div className='flex justify-end xs:mb-10 mt-auto'>
                <Button className='px-3' onClick={handleClearOptions}>
                  Clear Options
                </Button>
              </div>
            </div>
          )}
        </div>

        {props?.displayDetails && hasDetails && (
          <>
            <div className='my-5'>
              <Separator />
            </div>
            <div
              className={`${
                isSmallScreen
                  ? 'xs:fixed xs:bottom-0 xs:bg-white xs:w-full right-5 p-5 mt-10 border-t-2'
                  : 'block'
              }`}
            >
              <FoodItemQuantityCounter
                disabled={shouldDisableAddtoCard}
                onAddToCart={(quantity) =>
                  props.onAddToCart &&
                  props.onAddToCart(quantity, selectedFoodOptions)
                }
              />
            </div>
          </>
        )}
      </div>
    </Card>
  );
}

export default FoodItemDetailCard;

const RenderItemOption = (
  props: FoodItemOption & {
    onOptionSelect: (item: FoodItemOption) => void;
    defaultSelected?: ItemOptionElement | null;
  }
) => {
  const {
    name,
    description,
    itemOptionElements,
    onOptionSelect,
    isRequired,
    correlationId,
    renderSequence,
    defaultSelected,
  } = props;

  const itemElements = sortByKey(itemOptionElements || [], 'renderSequence');

  return (
    <div>
      <div>
        <Text as={'p'} variant='small' className='!text-dark-1'>
          {name} &nbsp;
          {isRequired && (
            <span className='text-[12px] text-dark-4'>(Required)</span>
          )}
        </Text>
        <Text variant='extra-small' className='text-dark-6 text-[12px]'>
          {description}
        </Text>
      </div>
      <Separator />
      <div className='mt-3 '>
        <RadioGroup
          defaultSelected={defaultSelected || null}
          items={itemElements || []}
          className={' flex justify-between flex-wrap gap-4'}
          comparisonKey={'name'}
          keyExtractor={(item) => item.correlationId}
          onSelect={(item) =>
            onOptionSelect({
              name,
              description,
              correlationId,
              renderSequence,
              isRequired,
              itemOptionElements: [{ ...item }],
            })
          }
          radioItemProps={(item) => ({
            className: 'lg:!w-[49%] xs:w-full flex flex-wrap',
            value: item,
          })}
          renderItem={(item, selected) => (
            <RenderItemOptionElement
              key={item.correlationId}
              {...item}
              selected={selected}
            />
          )}
        />
      </div>
    </div>
  );
};

const RenderItemOptionElement = ({
  name,
  selected,
  price,
}: ItemOptionElement & { selected: boolean }) => {
  return (
    <div className='w-full flex justify-between items-center border-2 h-[60px] px-4 py-2 rounded-xl'>
      <Text variant='small' className='w-[32%] !text-dark-2'>
        {name}
      </Text>
      <Text variant='small' className='w-[32%] !text-dark-2'>
        + {formatNumberToCurrency(+price)}
      </Text>
      <div>
        <div className='size-[20px] border-2 rounded-full flex justify-center items-center'>
          {selected && <div className='size-[10px] bg-primary rounded-full' />}
        </div>
      </div>
    </div>
  );
};
