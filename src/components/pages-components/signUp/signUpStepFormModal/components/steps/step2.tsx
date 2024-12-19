import { useSignUpFormContext } from '@/context/signUpFormContext/signUpFormContext';
import AnimationContainer from '@/shared-ui/animationContainer';
import TextField from '@/shared-ui/textfield';

function Step2() {
  const { values, handleChange } = useSignUpFormContext();
  return (
    <AnimationContainer>
      <div className=' w-full'>
        <div className='flex flex-col gap-5'>
          <div className='w-full'>
            <TextField
              label='Address1'
              placeholder='Enter Your Address'
              name='address.addressLine1'
              value={values.address?.addressLine1}
              onChange={handleChange}
            />
          </div>
          <div className='w-full'>
            <TextField
              label='Address2'
              placeholder='Enter Your Address'
              name='address.addressLine2'
              value={values.address?.addressLine2 || ''}
              onChange={handleChange}
            />
          </div>
          <div className='w-full'>
            <TextField
              label='City'
              placeholder='Enter Your City'
              value={values.address?.city || ''}
              name='address.city'
              onChange={handleChange}
            />
          </div>
          <div className='flex xs:flex-col lg:flex-row gap-5'>
            <div className='w-full'>
              <TextField
                label='State'
                placeholder='Enter Your State'
                value={values.address?.state || ''}
                name='address.state'
                onChange={handleChange}
              />
            </div>
            <div className='w-full'>
              <TextField
                label='Zip Code'
                placeholder='Enter Your Zip Code'
                name='address.zipCode'
                value={values.address?.zipCode || ''}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </AnimationContainer>
  );
}

export default Step2;
