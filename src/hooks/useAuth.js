import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { 
  selectCurrentUser, 
  selectCurrentToken, 
  selectIsAuthenticated,
  selectUserRole,
  selectUserType,
  setCredentials,
  logout as logoutAction,
} from '../store/slices/authSlice';
import { useLoginMutation } from '../api/auth/authApi';

/**
 * Custom Auth Hook
 * Provides authentication state and methods
 */
export const useAuth = () => {
  const dispatch = useDispatch();
  
  // Selectors
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const role = useSelector(selectUserRole);
  const userType = useSelector(selectUserType);
  
  // Mutations
  const [loginMutation, { isLoading: isLoggingIn }] = useLoginMutation();
  
  /**
   * Login function
   */
  const login = useCallback(async (credentials) => {
    try {
      const response = await loginMutation(credentials).unwrap();
      
      // Store credentials in Redux and localStorage
      dispatch(setCredentials({
        user: response.user || response.data?.user,
        token: response.token || response.data?.token,
      }));
      
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error };
    }
  }, [loginMutation, dispatch]);
  
  /**
   * Logout function
   * Since there is no logout endpoint in the backend,
   * we handle it purely on the frontend by clearing the data.
   */
  const logout = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);
  
  /**
   * Check if user has specific role
   */
  const hasRole = useCallback((requiredRole) => {
    if (!role) return false;
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(role);
    }
    return role === requiredRole;
  }, [role]);
  
  return {
    // State
    user,
    token,
    isAuthenticated,
    role,
    userType,
    
    // Methods
    login,
    logout,
    hasRole,
    
    // Loading states
    isLoading: isLoggingIn,
    isLoggingIn,
  };
};
