import { useAuth } from '../context/index.js';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  console.log('user', user);

  return (
    <>
      {!loading && (
        <>{user ? <Outlet /> : <Navigate to='/login' state={{ next: location.pathname }} />}</>
      )}
    </>
  );
};

export default ProtectedRoute;