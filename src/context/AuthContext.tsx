import React, { createContext, useState, useEffect, ReactNode } from 'react';
import api from '../api/index';

interface AuthContextType {
  token: string | null;
  login: (userName: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('authToken');
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem('authToken', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('authToken');
      delete api.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const login = async (userName: string, password: string) => {
    const form = new FormData();
    form.append('user_name', userName);
    form.append('password', password);
    const resp = await api.post('/admin_api/login?model=Admin', form, {
      headers: { Accept: 'application/json' },
    });
    setToken(resp.data.data.token);
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};