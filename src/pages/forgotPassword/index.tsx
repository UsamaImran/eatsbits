import ForgotPasswordForm from '@/components/pages-components/forgotPassword/forgotPasswordForm';
import AnimationContainer from '@/shared-ui/animationContainer';

function ForgotPassword() {
  return (
    <div className='bg-linear-gradient h-[100vh]  bg-cover'>
      <div className='flex justify-center items-center h-full'>
        <AnimationContainer>
          <ForgotPasswordForm />
        </AnimationContainer>
      </div>
    </div>
  );
}

export default ForgotPassword;
