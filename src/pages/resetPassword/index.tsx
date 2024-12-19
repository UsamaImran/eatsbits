import ResetPasswordForm from '@/components/pages-components/resetPassword/resetPasswordForm';
import AnimationContainer from '@/shared-ui/animationContainer';

function ResetPassword() {
  return (
    <div className='bg-linear-gradient h-[100vh]  bg-cover'>
      <div className='flex justify-center items-center h-full'>
        <AnimationContainer>
          <ResetPasswordForm />
        </AnimationContainer>
      </div>
    </div>
  );
}

export default ResetPassword;
