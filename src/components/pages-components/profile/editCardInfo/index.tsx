import Button from '@/shared-ui/button';
import TextField from '@/shared-ui/textfield';
import { useState } from 'react';
import { IoEyeOutline } from 'react-icons/io5';
import { IoEyeOffOutline } from 'react-icons/io5';

interface Props {
  onSave: () => void;
}

function EditCardInfo({ onSave }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible((prev) => !prev);
  return (
    <div className='flex flex-col gap-4'>
      <div>
        <TextField label='Name on card' />
      </div>
      <div>
        <TextField label='Card Number' />
      </div>
      <div className='flex items-center  gap-3'>
        <div className='flex-grow'>
          <TextField label='Expires on' />
        </div>
        <div className='flex-grow '>
          <TextField
            label='CVV'
            type={isVisible ? 'password' : 'text'}
            endIcon={
              isVisible ? (
                <IoEyeOutline
                  className='cursor-pointer'
                  onClick={toggleVisibility}
                />
              ) : (
                <IoEyeOffOutline
                  className='cursor-pointer'
                  onClick={toggleVisibility}
                />
              )
            }
          />
        </div>
      </div>
      <div className='ml-auto mt-3 xs:w-full lg:w-auto'>
        <Button className='w-full' onClick={onSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}

export default EditCardInfo;
