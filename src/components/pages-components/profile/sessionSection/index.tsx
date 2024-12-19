import useUpdateUserInfo from '@/api/restaurants/useUpdateUserInfo';
import SectionCard from '@/components/cards/sectionCard';
import Button from '@/shared-ui/button';
import Text from '@/shared-ui/text';
import { logout } from '@/store/slices/userSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { toast } from 'react-toastify';

function SessionSection() {
  const { mutate: removeUserAccount } = useUpdateUserInfo();
  const userId = useAppSelector((state) => state.user?.userData?.correlationId);
  const dispatch = useAppDispatch();

  const onDeleteUser = () => {
    removeUserAccount(
      { isActive: false, appUserCorrelationId: userId },
      {
        onSuccess: () => {
          toast.success('Account deleted successfully');
          dispatch(logout());
        },
      }
    );
  };

  return (
    <SectionCard className='!w-full '>
      <div className='flex flex-col gap-5'>
        <div role='button' className='flex justify-between'>
          <div>
            <Text as={'h6'}>Delete your account</Text>
          </div>
          <Button
            variant='secondary'
            className='!text-primary !bg-primary/10'
            onClick={onDeleteUser}
          >
            Delete Account{' '}
          </Button>
        </div>
      </div>
    </SectionCard>
  );
}

export default SessionSection;
