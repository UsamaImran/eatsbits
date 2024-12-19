import Layout from '@/components/layouts/layout';
import { SuccessCard } from '@/components/pages-components/payment/successCard';
import { clearCart } from '@/store/slices/cartSlice';
import { useAppDispatch } from '@/store/store';
import { useEffect } from 'react';

function Checkout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <Layout>
      <SuccessCard />
    </Layout>
  );
}

export default Checkout;
