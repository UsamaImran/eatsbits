import Text from '@/shared-ui/text';
import ContactFieldsSection from './contactFieldsSection';
import SocialNetworksSection from './socialNetworksSection';
import useSmallScreen from '@/hooks/useSmallScreen';

function ContactSection() {
  const isSmall = useSmallScreen();
  return (
    <div className='mt-0 lg:mt-10'>
      {!isSmall && (
        <div>
          <Text as={'h3'} variant='h1' className='text-dark-1'>
            Contacts
          </Text>
        </div>
      )}
      <div className='lg:mt-5 mt-0'>
        <ContactFieldsSection />
      </div>
      <div className='mt-5'>
        <SocialNetworksSection />
      </div>
    </div>
  );
}

export default ContactSection;
