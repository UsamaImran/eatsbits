import Modal from '@/shared-ui/modal';
import SignUpFormModalLayout from './components/layout';
import { useSignUpFormContext } from '@/context/signUpFormContext/signUpFormContext';

interface Props {
  open: boolean;
  onClose: () => void;
}

function SignUpPCModal(props: Props) {
  const { currentStep } = useSignUpFormContext();

  return (
    <Modal {...props} className={'!max-w-[1312px] h-[752px] min-h-[752px] '}>
      <SignUpFormModalLayout>{currentStep.component}</SignUpFormModalLayout>
    </Modal>
  );
}

export default SignUpPCModal;
