import { useSignUpFormContext } from '@/context/signUpFormContext/signUpFormContext';
import AnimationContainer from '@/shared-ui/animationContainer';
import TextField from '@/shared-ui/textfield';
import PhoneInput from 'react-phone-input-2';

function Step1() {
  const { values, handleChange } = useSignUpFormContext();
  return (
    <AnimationContainer>
      <div className=' w-full'>
        <div className='flex xs:flex-col lg:flex-row gap-5 mt-4'>
          <div className='w-full'>
            <TextField
              label='First Name'
              placeholder='Enter Your First Name'
              name='firstName'
              value={values.firstName}
              onChange={handleChange}
            />
          </div>
          <div className='w-full'>
            <TextField
              label='Last Name'
              placeholder='Enter Your First Name'
              name='lastName'
              value={values.lastName}
              onChange={handleChange}
            />
          </div>
          <div className='w-full'>
            <PhoneInput
              country={'us'}
              inputClass=' w-full focus:outline-none rounded-xl border-[1px] h-[45px] pl-5 placeholder-gray-300 focus-within:border-primary'
              inputProps={{
                name: 'phoneNumber',
                id: 'phoneNumber',
                country: 'us',
                required: true,
                placeholder: 'phone',
              }}
              enableAreaCodes={true}
              areaCodes={{ us: ['332'] }}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </AnimationContainer>
  );
}

export default Step1;
