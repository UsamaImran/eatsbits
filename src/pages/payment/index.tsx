import useRestaurant from '@/api/restaurants/useRestaurant';
import CartSummary from '@/components/cartSummary';
import AppLayout from '@/components/layouts/appLayout';
import CartSection from '@/components/pages-components/payment/cartSection';
import CommentSection from '@/components/pages-components/payment/commentSection';
import ContactDetailsSection from '@/components/pages-components/payment/contactDetailsSection';
import DeliveryMethodSection from '@/components/pages-components/payment/deliveryMethodSection';
import { calculateCartTotal } from '@/helpers';
import useSmallScreen from '@/hooks/useSmallScreen';
import Breadcrumb from '@/shared-ui/breadcrumb';
import FullScreenModal from '@/shared-ui/modal/fullScreenModal';
import { useAppSelector } from '@/store/store';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function PaymentPage() {
  const navigate = useNavigate();
  const isSmall = useSmallScreen();
  const { items } = useAppSelector((state) => state.cart);

  useEffect(() => {
    if (!items.length) navigate('/');
  }, []);

  const totalTax =
    items?.reduce(
      (acc, item) =>
        (acc +=
          item.quantity *
          parseFloat(item?.price) *
          parseFloat(`${item.taxRate}`)),
      0
    ) || 0;

  return (
    <AppLayout>
      <RenderBreadCrumb />
      {/* PC */}
      <div className='lg:block hidden'>
        <div className='flex flex-wrap -mx-2 mt-5'>
          <div className='w-2/3 px-2 py-2 flex flex-col gap-4'>
            <ContactDetailsSection />
            <DeliveryMethodSection />
            <CommentSection />
          </div>
          <div className='w-1/3 px-2 py-2'>
            <CartSection totalTax={totalTax} />
          </div>
        </div>
      </div>
      {/* Mobile */}
      {isSmall && (
        <FullScreenModal title='Confirm order' onBack={() => navigate(-1)}>
          <div className='flex flex-col gap-6'>
            <RenderBreadCrumb />
            <CartSection totalTax={totalTax} />
            <CommentSection />
            <DeliveryMethodSection />
            <ContactDetailsSection />
            <CartSummary
              totalTax={totalTax}
              total={calculateCartTotal(items)}
            />
          </div>
        </FullScreenModal>
      )}
    </AppLayout>
  );
}

export default PaymentPage;

const RenderBreadCrumb = () => {
  const { data } = useRestaurant();
  const name = data?.stores[0]?.name || 'Restaurant';
  const { id } = useParams();

  return (
    <div className='my-3'>
      <Breadcrumb
        items={[
          { label: 'Home', value: '/' },
          {
            label: name,
            value: `/restaurant/${id}`,
          },
          {
            label: 'Payment',
            value: `/restaurant/${id}/payment`,
          },
        ]}
      />
    </div>
  );
};
