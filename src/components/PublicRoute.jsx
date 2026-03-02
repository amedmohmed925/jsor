import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES, USER_ROLES } from '../utils/constants';

/**
 * Public Route Component
 * Wraps routes that should only be accessible when NOT authenticated (login, register)
 * Redirects authenticated users to their appropriate dashboard
 */
const PublicRoute = ({ children }) => {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();
  
  // If authenticated, redirect back to the page that triggered the auth modal (if any),
  // otherwise redirect to the appropriate default dashboard
  if (isAuthenticated) {
    const from = location.state?.from;
    if (from) return <Navigate to={from} replace />;

    switch (role) {
      case USER_ROLES.ADMIN:
        return <Navigate to={ROUTES.ADMIN_DASHBOARD} replace />;
      case USER_ROLES.DRIVER:
        return <Navigate to={ROUTES.DRIVER_ORDERS} replace />;
      case USER_ROLES.USER:
        return <Navigate to={ROUTES.USER_ORDERS} replace />;
      default:
        return <Navigate to={ROUTES.HOME} replace />;
    }
  }
  
  // Render public content
  return children;
};

export default PublicRoute;
