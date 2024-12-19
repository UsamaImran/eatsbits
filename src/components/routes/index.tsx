import {
  createBrowserRouter as createRouter,
  RouterProvider,
} from 'react-router-dom';
import HomePage from '@/pages/home';
import SignInPage from '@/pages/signIn';
import SignUpPage from '@/pages/signUp';
import ProfilePage from '@/pages/profile';
import RestaurantPage from '@/pages/restaurant';
import PaymentPage from '@/pages/payment';
import ForgotPasswordPage from '@/pages/forgotPassword';
import ResetPasswordPage from '@/pages/resetPassword';
import PrivateRoute from '../privateRoute';
import ActivateAccount from '@/pages/activateAccount';
import Checkout from '@/pages/checkout';

function AppRoutes() {
  const router = createRouter([
    { path: '/', element: <HomePage /> },
    { path: 'sign-in', element: <SignInPage /> },
    { path: 'forgot-password', element: <ForgotPasswordPage /> },
    { path: 'reset-password', element: <ResetPasswordPage /> },
    { path: 'sign-up', element: <SignUpPage /> },
    {
      path: 'profile',
      element: (
        <PrivateRoute>
          <ProfilePage />
        </PrivateRoute>
      ),
    },
    {
      path: 'restaurant/:id',
      element: <RestaurantPage />,
    },
    {
      path: 'restaurant/:id/payment',
      element: <PaymentPage />,
    },
    {
      path: 'activate-account/:verificationCode',
      element: <ActivateAccount />,
    },
    {
      path: 'checkout/payment/success',
      element: <Checkout />,
    },
    {
      path: '*',
      element: <>not found</>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRoutes;
