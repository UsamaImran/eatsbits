import SectionCard from '@/components/cards/sectionCard';
import useSmallScreen from '@/hooks/useSmallScreen';
import Button from '@/shared-ui/button';
import Text from '@/shared-ui/text';
import TextArea from '@/shared-ui/textArea';
import { setComment } from '@/store/slices/cartSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';

import { useState } from 'react';
import { MdOutlineEdit } from 'react-icons/md';

function CommentSection() {
  const comment = useAppSelector((state) => state.cart.comment);
  const dispatch = useAppDispatch();
  const isSmall = useSmallScreen();
  const [isEdit, setIsEdit] = useState(false);

  const onEdit = () => {
    setIsEdit((prev) => !prev);
  };
  const renderSection = () => {
    return (
      <div>
        {!isSmall && (
          <div className='absolute top-6 right-6'>
            <MdOutlineEdit
              size={20}
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className='text-primary cursor-pointer'
            />
          </div>
        )}
        {!isSmall && isEdit ? (
          <div>
            <TextArea
              label='Comment for the restaurant'
              placeholder={'add your comments here'}
              value={comment}
              onChange={({ target: { value } }) => dispatch(setComment(value))}
            />
            <div className='flex justify-end gap-2 mt-5'>
              <Button
                variant='tertiary'
                className='!bg-gray-100 text-primary-text'
                onClick={onEdit}
              >
                Cancel
              </Button>
              <Button onClick={onEdit}>Save</Button>
            </div>
          </div>
        ) : (
          <div>
            <Text variant='small' className='text-primary-text'>
              {comment}
            </Text>
          </div>
        )}
      </div>
    );
  };
  return (
    <div>
      {/* PC */}
      <div className='lg:block xs:hidden'>
        <SectionCard
          heading='Comment for Restaurant'
          className='!w-full relative'
        >
          {renderSection()}
        </SectionCard>
      </div>
      {/* Mobile */}
      <div className=' xs:block lg:hidden'>
        <div className='mb-2'>
          <Text variant='body' className='font-semibold'>
            Comment
          </Text>
        </div>
        {renderSection()}
      </div>
    </div>
  );
}

export default CommentSection;
