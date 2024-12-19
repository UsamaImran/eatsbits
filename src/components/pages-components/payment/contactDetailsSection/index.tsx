import SectionCard from '@/components/cards/sectionCard';
import Text from '@/shared-ui/text';
import TextField from '@/shared-ui/textfield';
import { IGuestState, setGuestUserData } from '@/store/slices/guestSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';

function ContactDetailsSection() {
  const user = useAppSelector((state) => state.user);
  const guestUser = useAppSelector((state) => state.guestUser);
  const dispatch = useAppDispatch();

  const source = user.isLoggedIn ? user?.userData : guestUser;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const updatedState: Partial<IGuestState> = {
      [name]: value,
    };

    const newState = { ...guestUser, ...updatedState };

    dispatch(setGuestUserData(newState));
  };

  const renderSection = () => (
    <div className='flex gap-4 xs:flex-col lg:flex-row'>
      <div className='flex-grow'>
        <TextField
          disabled={user?.isLoggedIn}
          label='Name'
          defaultValue={source?.firstName || ''}
          name='firstName'
          onChange={handleChange}
        />
      </div>
      <div className='flex-grow'>
        <TextField
          disabled={user?.isLoggedIn}
          label='Email'
          defaultValue={source?.email}
          name='email'
          onChange={handleChange}
        />
      </div>
      <div className='flex-grow'>
        <TextField
          disabled={user?.isLoggedIn}
          label='Phone'
          defaultValue={source?.phoneNumber}
          name='phoneNumber'
          onChange={handleChange}
        />
      </div>
    </div>
  );
  return (
    <div>
      {/* PC */}
      <div className='lg:block xs:hidden'>
        <SectionCard heading='Contact details' className='!w-full'>
          {renderSection()}
        </SectionCard>
      </div>
      {/* Mobile */}
      <div className=' xs:block lg:hidden'>
        <div className='mb-2'>
          <Text variant='body' className='font-semibold'>
            Contact details
          </Text>
        </div>
        {renderSection()}
      </div>
    </div>
  );
}

export default ContactDetailsSection;
