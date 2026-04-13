import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import http from '@/services/http';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => localStorage.getItem('token') || '');
  const [user, setUserState] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem('token')));
  const [booting, setBooting] = useState(true);

  const setToken = useCallback((value) => {
    if (value) {
      localStorage.setItem('token', value);
    } else {
      localStorage.removeItem('token');
    }
    setTokenState(value || '');
  }, []);

  const setUser = useCallback((value) => {
    if (value) {
      localStorage.setItem('user', JSON.stringify(value));
    } else {
      localStorage.removeItem('user');
    }
    setUserState(value || null);
  }, []);

  const logout = useCallback(() => {
    setToken('');
    setUser(null);
    setIsAuthenticated(false);
  }, [setToken, setUser]);

  const verify = useCallback(async () => {
    if (!localStorage.getItem('token')) {
      setBooting(false);
      setIsAuthenticated(false);
      return null;
    }
    try {
      const { data } = await http.get('/auth/verify');
      setUser(data);
      setIsAuthenticated(true);
      return data;
    } catch {
      logout();
      return null;
    } finally {
      setBooting(false);
    }
  }, [logout, setUser]);

  const login = useCallback(async (payload) => {
    const { data } = await http.post('/auth/login', payload);
    setToken(data.access_token);
    setUser(data.user);
    setIsAuthenticated(true);
    return data;
  }, [setToken, setUser]);

  const register = useCallback(async (payload) => {
    const { data } = await http.post('/auth/register', payload);
    if (data.access_token) {
      setToken(data.access_token);
      setUser(data.user || null);
      setIsAuthenticated(true);
    }
    return data;
  }, [setToken, setUser]);

  useEffect(() => {
    verify();
  }, [verify]);

  const value = useMemo(() => ({
    token,
    user,
    isAuthenticated,
    booting,
    setToken,
    setUser,
    login,
    register,
    verify,
    logout,
  }), [token, user, isAuthenticated, booting, setToken, setUser, login, register, verify, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return value;
}
