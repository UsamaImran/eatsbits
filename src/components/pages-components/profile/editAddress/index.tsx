import useUpdateUserInfo from '@/api/restaurants/useUpdateUserInfo';
import Button from '@/shared-ui/button';
import TextField from '@/shared-ui/textfield';
import { updateStoreUser } from '@/store/slices/userSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { validationSchema } from './validationSchema';
import Loader from '@/shared-ui/loader';
import { AddressInput } from '@/gql/graphql';
import { IoCloseOutline } from 'react-icons/io5';

interface Props {
  onSave: (val: boolean) => void;
}

function EditAddress({ onSave }: Props) {
  const user = useAppSelector((state) => state.user?.userData);
  const { mutate: updateUser, isPending } = useUpdateUserInfo();
  const dispatch = useAppDispatch();

  const initialValues: AddressInput = {
    addressLine1: user?.address?.addressLine1 || '',
    addressLine2: user?.address?.addressLine2 || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zipCode: user?.address?.zipCode || '',
  };

  const handleSubmit = (values: AddressInput) => {
    updateUser(
      {
        appUserCorrelationId: user?.correlationId,
        address: values,
      },
      {
        onSuccess: (data) => {
          toast.success('Address updated successfully');
          dispatch(updateStoreUser(data.updateRegularUser));
          onSave(false);
        },
        onError: () => {
          toast.error('Failed to update address');
        },
      }
    );
  };

  return (
    <Formik<AddressInput>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, dirty, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-4'>
            <div className='flex justify-end'>
              <span role='button' onClick={() => onSave(false)}>
                <IoCloseOutline size={23} />
              </span>
            </div>
            <div>
              <TextField
                label='Address 1'
                name='addressLine1'
                value={values.addressLine1}
                onChange={handleChange}
                error={!!errors.addressLine1}
                errorMessage={errors.addressLine1}
              />
            </div>
            <div>
              <TextField
                label='Address 2'
                name='addressLine2'
                value={values.addressLine2 || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <TextField
                label='City'
                name='city'
                value={values.city}
                onChange={handleChange}
                error={!!errors.city}
                errorMessage={errors.city}
              />
            </div>
            <div className='flex gap-4'>
              <div className='flex-grow'>
                <TextField
                  label='State'
                  name='state'
                  value={values.state}
                  onChange={handleChange}
                  error={!!errors.state}
                  errorMessage={errors.state}
                />
              </div>
              <div className='flex-grow'>
                <TextField
                  label='Zip Code'
                  name='zipCode'
                  value={values.zipCode}
                  onChange={handleChange}
                  error={!!errors.zipCode}
                  errorMessage={errors.zipCode}
                />
              </div>
            </div>
            <div className='ml-auto mt-3 xs:w-full lg:w-auto'>
              <Button
                disabled={!!Object.keys(errors).length || !dirty}
                type='submit'
                className='w-full'
              >
                Save Changes
                {isPending && (
                  <Loader className='ml-2 !border-gray-400 size-[15px]' />
                )}
              </Button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default EditAddress;
