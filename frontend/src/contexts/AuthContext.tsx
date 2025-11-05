import { createContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../lib/axios';
import { User } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!user;

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Here you would typically fetch the user profile
      // For now, we'll just simulate it
      // setUser({ id: 1, name: 'User', email: 'user@example.com' });
    }
    setLoading(false);
  }, []);

  async function signIn(token: string) {
    localStorage.setItem('authToken', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // Fetch user profile after login
    // const response = await api.get('/user/me');
    // setUser(response.data);
    // For now, just setting a dummy user
    setUser({ id: 1, name: 'User', email: 'user@example.com' });
  }

  function signOut() {
    localStorage.removeItem('authToken');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
