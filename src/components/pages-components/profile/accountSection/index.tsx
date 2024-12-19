import TextField from '@/shared-ui/textfield';
import SectionCard from '../../../cards/sectionCard';
import Text from '@/shared-ui/text';
import ImageInput from '@/shared-ui/imageInput';
import { useAppDispatch, useAppSelector } from '@/store/store';
import Button from '@/shared-ui/button';
import { Formik } from 'formik';
import { RegularUser } from '@/types';
import { validationSchema } from './validationSchema';
import useUpdateUserInfo from '@/api/restaurants/useUpdateUserInfo';
import Loader from '@/shared-ui/loader';
import { updateStoreUser } from '@/store/slices/userSlice';
import { toast } from 'react-toastify';

type UpdateRegularUserInput = Pick<
  RegularUser,
  'firstName' | 'lastName' | 'phoneNumber' | 'email'
>;

function AccountSection() {
  const user = useAppSelector((state) => state.user?.userData);
  const { mutate: updateUser, isPending } = useUpdateUserInfo();
  const dispatch = useAppDispatch();

  const initialValues = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
  };

  const handleSubmit = (values: UpdateRegularUserInput) => {
    updateUser(
      { appUserCorrelationId: user?.correlationId, ...values },
      {
        onSuccess(data: Record<string, RegularUser>) {
          dispatch(updateStoreUser({ ...data.updateRegularUser }));
          toast.success('User information updated successfully');
        },
        onError: (err) => {
          toast.error('Failed to update user information');
          console.log(err, 'ERR');
        },
      }
    );
  };

  const renderSection = () => (
    <Formik<UpdateRegularUserInput>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, handleChange, handleSubmit, dirty }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <div className='xs:block lg:hidden my-5'>
              <Text className='text-[18px] font-semibold'>Profile Details</Text>
            </div>

            <div className='flex flex-col gap-5'>
              <div className='flex gap-4 xs:flex-col lg:flex-row'>
                <div className='flex-grow'>
                  <TextField
                    label='First Name'
                    name='firstName'
                    value={values.firstName}
                    onChange={handleChange}
                    error={!!errors.firstName}
                    errorMessage={errors.firstName}
                  />
                </div>
                <div className='flex-grow'>
                  <TextField
                    label='Last Name'
                    name='lastName'
                    value={values.lastName}
                    onChange={handleChange}
                    error={!!errors.lastName}
                    errorMessage={errors.lastName}
                  />
                </div>
              </div>
              <div className='flex gap-4 xs:flex-col lg:flex-row'>
                <div className='flex-grow lg:w-[50%] xs:w-full'>
                  <TextField
                    label='Email'
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    errorMessage={errors.email}
                  />
                </div>
                <div className='flex-grow lg:w-[50%] xs:w-full'>
                  <TextField
                    label='Phone'
                    name='phoneNumber'
                    value={values.phoneNumber}
                    onChange={handleChange}
                    error={!!errors.phoneNumber}
                    errorMessage={errors.phoneNumber}
                  />
                </div>
              </div>
            </div>
            <div className='mt-5 flex justify-end'>
              <Button
                disabled={!!Object.keys(errors).length || !dirty}
                type='submit'
              >
                Update &nbsp;
                {isPending && (
                  <Loader className='!border-gray-400 size-[15px]' />
                )}
              </Button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );

  return (
    <div className='w-full xs:block lg:flex justify-center'>
      {/* PC */}
      <div className='lg:block xs:hidden'>
        <SectionCard
          heading='Account'
          subHeading='Please configure your profile and fill in your information'
        >
          <div className='lg:block xs:hidden my-3'>
            <ImageInput />
          </div>
          {renderSection()}
        </SectionCard>
      </div>

      {/* Mobile */}
      <div className=' xs:block lg:hidden'>{renderSection()}</div>
    </div>
  );
}

export default AccountSection;
