import SessionLayout from '@/components/layouts/sessionLayout';
import SignInForm from '@/components/pages-components/signIn/signInForm.tsx';

function SignInPage() {
  return (
    <SessionLayout>
      <SignInForm />
    </SessionLayout>
  );
}

export default SignInPage;
