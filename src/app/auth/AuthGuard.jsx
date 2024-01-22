import useAuth from 'app/hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react'


const AuthGuard = ({ children }) => {
  const { isAuthenticated,user } = useAuth();
  const { pathname } = useLocation();

  // useEffect(() => {
  //   console.log('Component mounted',user?.authorities?.authority);
  //   return () => {
  //     console.log('Component unmounted');
  //   };
  // }, []);

  if (isAuthenticated) return <>{children}</>;

  return <Navigate replace to="/signin" state={{ from: pathname }} />;
};

export default AuthGuard;
