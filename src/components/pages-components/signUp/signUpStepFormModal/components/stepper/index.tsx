import { useSignUpFormContext } from '@/context/signUpFormContext/signUpFormContext';

import Separator from '@/shared-ui/separator';
import Text from '@/shared-ui/text';

const STEPS = [
  { name: 'Profile Details', number: 0 },
  { name: 'Address Details', number: 1 },
];

function Stepper() {
  const { currentIndex } = useSignUpFormContext();
  return (
    <div>
      {/* ON PC */}
      <div className='justify-center xs:hidden lg:flex'>
        <div className='w-[757px] '>
          <div className='flex gap-3 items-center justify-center'>
            {STEPS.map((step, index) => (
              <div key={index} className={`flex items-center gap-3 w-full `}>
                <p
                  className={`size-[38px]  flex items-center justify-center rounded-full ${
                    currentIndex === step.number
                      ? 'bg-primary text-white'
                      : 'bg-gray-2 text-gray-400'
                  }`}
                >
                  {step.number + 1}
                </p>
                <Text className='!m-0 !p-0 text-secondary-text'>
                  {step.name}
                </Text>
                {index !== STEPS.length - 1 && (
                  <div className='w-[50%]'>
                    <Separator />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ON MOBILE */}
      <div className='xs:block lg:hidden'>
        <div className='flex gap-2'>
          {STEPS.map((step, index) => (
            <div key={index}>
              <div className='flex flex-col'>
                <p
                  className={`size-[10px]  rounded-full ${
                    currentIndex === step.number
                      ? 'bg-primary text-white w-[30px]'
                      : 'bg-gray-2 text-gray-400'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
        <div className='mt-3'>
          <Text className='text-[18px] text-primary-text font-semibold'>
            {!!STEPS[currentIndex]?.name ? STEPS[currentIndex].name : ''}
          </Text>
        </div>
      </div>
    </div>
  );
}

export default Stepper;
