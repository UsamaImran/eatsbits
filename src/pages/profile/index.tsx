import AppLayout from '@/components/layouts/appLayout';
import AccountSection from '@/components/pages-components/profile/accountSection';

import AddressSection from '@/components/pages-components/profile/addressSection';

import useSmallScreen from '@/hooks/useSmallScreen';

import FullScreenModal from '@/shared-ui/modal/fullScreenModal';
import { useNavigate } from 'react-router-dom';
import SessionSection from '@/components/pages-components/profile/sessionSection';
import {
  MdOutlinePerson,
  MdOutlineHistory,
  MdOutlineLogout,
  MdOutlineDelete,
} from 'react-icons/md';
import Accordion from '@/shared-ui/accordoin';
import Text from '@/shared-ui/text';
import AnimationContainer from '@/shared-ui/animationContainer';
import { useState } from 'react';
import OrderHistorySection from '@/components/pages-components/profile/orderHistorySection';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { logout } from '@/store/slices/userSlice';
import Tabs from '@/shared-ui/tabs';
import SectionCard from '@/components/cards/sectionCard';
import Separator from '@/shared-ui/separator';
import ImageInput from '@/shared-ui/imageInput';
import useUpdateUserInfo from '@/api/restaurants/useUpdateUserInfo';
import { toast } from 'react-toastify';

function ProfilePage() {
  const [selectedOption, setSelectedOption] = useState(0);
  const isSmall = useSmallScreen();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { mutate: removeUserAccount } = useUpdateUserInfo();
  const userId = useAppSelector((state) => state.user?.userData?.correlationId);

  const onDeleteUser = () => {
    removeUserAccount(
      { isActive: false, appUserCorrelationId: userId },
      {
        onSuccess: () => {
          toast.success('Account deleted successfully');
          dispatch(logout());
        },
      }
    );
  };

  const [selectedItem, setSelectedItem] = useState(-1);

  const MOBILE_NAV_OPTIONS = [
    {
      name: 'Edit Account Details',
      icon: (
        <span className='size-[36px] bg-gray-2 flex justify-center items-center rounded-lg'>
          <MdOutlinePerson />
        </span>
      ),
      component: (
        <AnimationContainer>
          <div className='flex flex-col gap-5 my-5 '>
            <AccountSection />
            <AddressSection />
          </div>
        </AnimationContainer>
      ),
      onClick: () => {},
    },
    {
      name: 'Order History',
      icon: (
        <span className='size-[36px] bg-gray-2 flex justify-center items-center rounded-lg'>
          <MdOutlineHistory />
        </span>
      ),
      component: <OrderHistorySection />,
      onClick: () => {},
    },
    {
      name: 'Log Out',
      icon: (
        <span className='size-[36px] bg-gray-2 flex justify-center items-center rounded-lg'>
          <MdOutlineLogout />
        </span>
      ),
      onClick: () => {
        dispatch(logout());
      },
      displayArrow: false,
    },
    {
      name: 'Delete Account',
      icon: (
        <span className='size-[36px] bg-rose-100 flex justify-center items-center rounded-lg'>
          <MdOutlineDelete className='text-red' />
        </span>
      ),
      onClick: () => {
        onDeleteUser();
      },

      displayArrow: false,
    },
  ];

  return (
    <AppLayout>
      {/* PC */}
      <div className='lg:flex justify-center flex-col items-center gap-4 mt-2 xs:hidden mb-5'>
        <SectionCard>
          <Tabs
            tabsData={[
              {
                id: '1',
                title: 'General Settings',
                component: (
                  <div className='flex flex-col gap-4'>
                    <AccountSection />
                    <Separator />
                    <AddressSection />
                    <Separator />
                    <SessionSection />
                  </div>
                ),
              },
              {
                id: '2',
                title: 'Order History',
                component: <OrderHistorySection />,
              },
            ]}
          />
        </SectionCard>
      </div>

      {/* Mobile */}
      <div>
        {isSmall && (
          <FullScreenModal
            title={MOBILE_NAV_OPTIONS[selectedOption]?.name}
            onBack={() => {
              if (selectedItem >= 0) {
                setSelectedItem(-1);
                setSelectedOption(0);
              } else {
                navigate('/');
              }
            }}
          >
            <AnimationContainer>
              <div className='px-3'>
                {selectedOption === 0 && <ImageInput />}
                {selectedItem < 0 && (
                  <div className='flex flex-col gap-5 mt-20'>
                    {MOBILE_NAV_OPTIONS.map((option, index) => (
                      <div
                        key={index}
                        role='button'
                        onClick={() => {
                          setSelectedItem(index);
                          option.onClick();
                          setSelectedOption(index);
                        }}
                      >
                        <Accordion
                          displayArrow={option.displayArrow}
                          className={'py-3'}
                          title={
                            <div className='flex items-center gap-3'>
                              {option.icon}

                              <Text
                                variant='extra-small'
                                className='!m-0 !p-0 font-[400]'
                              >
                                {option.name}
                              </Text>
                            </div>
                          }
                        ></Accordion>
                      </div>
                    ))}
                  </div>
                )}
                {MOBILE_NAV_OPTIONS[selectedItem]?.component || <></>}
              </div>
            </AnimationContainer>
          </FullScreenModal>
        )}
      </div>
    </AppLayout>
  );
}

export default ProfilePage;
