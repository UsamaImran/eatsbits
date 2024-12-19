import Button from '@/shared-ui/button';
import Text from '@/shared-ui/text';
import { useState } from 'react';

interface Props {
  disabled?: boolean;
  onAddToCart?: (quantity: number) => void;
}

function FoodItemQuantityCounter({ disabled = false, onAddToCart }: Props) {
  const [newQuantity, setNewQuantity] = useState(1);
  return (
    <div className={`flex justify-end gap-3 mt-auto `}>
      <Counter counter={newQuantity} onCounterChange={setNewQuantity} />

      <Button
        disabled={disabled}
        className=' xs:!px-3 lg:!px-inherit'
        onClick={() => onAddToCart && onAddToCart(newQuantity)}
      >
        Add to Cart
      </Button>
    </div>
  );
}

export default FoodItemQuantityCounter;

const Counter = ({
  counter,
  onCounterChange,
}: {
  counter: number;
  onCounterChange: (num: number) => void;
}) => {
  const increment = () => {
    onCounterChange(counter + 1);
  };

  const decrement = () => {
    if (counter > 1) {
      onCounterChange(counter - 1);
    }
  };

  return (
    <div className='flex items-center gap-4'>
      <Button
        variant='tertiary'
        className='text-primary-text !bg-gray-1 xs:px-4'
        onClick={decrement}
      >
        -
      </Button>
      <Text className='!p-0 !m-0'>{counter}</Text>
      <Button
        variant='tertiary'
        className='text-primary-text !bg-gray-1 xs:px-4'
        onClick={increment}
      >
        +
      </Button>
    </div>
  );
};
