import { createContext, useState, useEffect, useContext } from 'react';
import { 
  getCurrentUser, 
  login, 
  register as authRegister,
  logout as authLogout 
} from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check auth state on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await getCurrentUser();
        setUser(user);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const signIn = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await login(email, password);
      setUser(user);
      return user;
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Using register instead of signUp
  const register = async (email, password, name) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await authRegister(email, password, name);
      setUser(user);
      return user;
    } catch (err) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await authLogout();
      setUser(null);
      setError(null);
    } catch (err) {
      setError(err.message || 'Logout failed');
      throw err;
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        signIn,
        register, // Only exposing register, not signUp
        signOut,
        clearError,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
