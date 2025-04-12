import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const ProtectedRoute = ({ requiredRole, children }) => {
  const { currentUser } = useUser();
  
  // If user is not logged in, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // If specific role is required, check it
  if (requiredRole && currentUser.role !== requiredRole) {
    // Redirect to different dashboard based on role
    if (currentUser.role === 'startup') {
      return <Navigate to="/startup/dashboard" replace />;
    } else if (currentUser.role === 'investor') {
      return <Navigate to="/investor/dashboard" replace />;
    } else if (currentUser.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  // If user is authenticated and has required role, show the component
  return children;
};

export default ProtectedRoute; 