import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/store/store';
import { PropsWithChildren } from 'react';

const PrivateRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { isLoggedIn } = useAppSelector((state) => state.user);

  return isLoggedIn ? children : <Navigate to='/' />;
};

export default PrivateRoute;
