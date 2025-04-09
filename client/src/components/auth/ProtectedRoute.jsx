import { Navigate } from 'react-router-dom';
//import { useAuth } from './hooks/useAuth'; // assume this gives isAuthenticated
function ProtectedRoute({ element }) {
    //  const { isAuthenticated } = useAuth();
    const isAuthenticated = false;
    return isAuthenticated ? element : <Navigate to="/auth/login" />;
  }


export default ProtectedRoute;