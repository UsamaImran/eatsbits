import Facebook from '@/assets/svgs/facebook';
import Logo from '@/assets/svgs/logo';
import Separator from '@/shared-ui/separator';
import Text from '@/shared-ui/text';
import Tiktok from '@/assets/svgs/tiktok';
import Instagram from '@/assets/svgs/instagram';
import Layout from '../layouts/layout';
import Accordion from '@/shared-ui/accordoin';

const SOCLIAL_MEDIA = [
  { name: 'instagram', icon: <Instagram />, url: '#' },
  { name: 'tiktok', icon: <Tiktok />, url: '#' },
  { name: 'facebook', icon: <Facebook />, url: '#' },
];

function renderCompanyItems() {
  return (
    <>
      <FooterItem label='About Us' link='#' />
      <FooterItem label='Contact Us' link='#' />
      <FooterItem label='Privacy Policy' link='#' />
    </>
  );
}

function Footer() {
  return (
    <Layout>
      <div className='bg-dark p-5 rounded-xl'>
        {/* PC */}
        <div className='hidden lg:flex flex-col md:flex-row md:flex-wrap mt-5'>
          <div className='w-full md:w-1/4'>{renderCompanyItems()}</div>
        </div>
        {/* Mobile */}
        <div className='lg:hidden mt-5'>
          <Accordion
            title={<div className='text-white'>Company</div>}
            className='!bg-transparent !border-x-0 !border-t-0 !border-b-1 rounded-none !px-0'
          >
            <div className='pl-3 pb-3'>{renderCompanyItems()}</div>
          </Accordion>
        </div>
        {/* Common */}
        <div className='flex justify-between items-center mt-16 lg:mt-8 '>
          <div className='flex gap-3 items-center'>
            <div className='flex items-center gap-3'>
              <Logo />
              <Text as={'p'} variant='h6' className='text-[22.7px] text-white'>
                EatsBits
              </Text>
            </div>
          </div>
          <div className='flex gap-3'>
            {SOCLIAL_MEDIA.map((social) => (
              <a key={social.name} href={social.url}>
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        <div className='my-5'>
          <Separator />
        </div>
        <div>
          <Text
            as={'div'}
            variant='small'
            className='text-white text-center !m-0'
          >
            &copy; 2010-2035 EatsBits. All rights reserved.
          </Text>
        </div>
      </div>
    </Layout>
  );
}

export default Footer;

interface FooterItemProps {
  label: string;
  link: string;
}

const FooterItem = ({ label, link }: FooterItemProps) => {
  return (
    <Text
      as={'p'}
      variant='small'
      className='text-white cursor-pointer hover:text-primary transition my-2'
    >
      <a href={link}>{label}</a>
    </Text>
  );
};
