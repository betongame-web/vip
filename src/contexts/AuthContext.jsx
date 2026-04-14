import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import http from '@/services/http';

const AuthContext = createContext(null);

function getStoredToken() {
  return (
    localStorage.getItem('token') ||
    localStorage.getItem('authToken') ||
    localStorage.getItem('access_token') ||
    ''
  );
}

function storeToken(token) {
  if (!token) return;
  localStorage.setItem('token', token);
  localStorage.setItem('authToken', token);
  localStorage.setItem('access_token', token);
}

function clearToken() {
  localStorage.removeItem('token');
  localStorage.removeItem('authToken');
  localStorage.removeItem('access_token');
}

function getStoredUser() {
  try {
    const raw =
      localStorage.getItem('auth_user') ||
      localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function storeUser(user) {
  localStorage.setItem('auth_user', JSON.stringify(user || null));
  localStorage.setItem('user', JSON.stringify(user || null));
}

function clearUser() {
  localStorage.removeItem('auth_user');
  localStorage.removeItem('user');
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getStoredToken());
  const [user, setUser] = useState(() => getStoredUser());
  const [booting, setBooting] = useState(true);

  const isAuthenticated = Boolean(token);

  const logout = useCallback(() => {
    clearToken();
    clearUser();
    setToken('');
    setUser(null);
  }, []);

  const refreshMe = useCallback(async () => {
    const currentToken = getStoredToken();

    if (!currentToken) {
      setToken('');
      setUser(null);
      return null;
    }

    const endpoints = ['/auth/verify', '/auth/me', '/profile/me', '/user'];

    for (const endpoint of endpoints) {
      try {
        const { data } = await http.get(endpoint);
        const nextUser = data?.user || data?.data || data;
        setToken(currentToken);
        setUser(nextUser || null);
        storeUser(nextUser || null);
        return nextUser || null;
      } catch {
        // try next endpoint
      }
    }

    logout();
    return null;
  }, [logout]);

  useEffect(() => {
    let ignore = false;

    async function boot() {
      const currentToken = getStoredToken();

      if (!currentToken) {
        if (!ignore) {
          setBooting(false);
          setToken('');
          setUser(null);
        }
        return;
      }

      try {
        await refreshMe();
      } finally {
        if (!ignore) {
          setBooting(false);
        }
      }
    }

    boot();

    return () => {
      ignore = true;
    };
  }, [refreshMe]);

  const login = useCallback(async (payload) => {
    const { data } = await http.post('/auth/login', payload);

    const nextToken =
      data?.access_token ||
      data?.token ||
      data?.authToken ||
      '';

    const nextUser =
      data?.user ||
      data?.data?.user ||
      data?.me ||
      null;

    if (nextToken) {
      storeToken(nextToken);
      setToken(nextToken);
    }

    if (nextUser) {
      storeUser(nextUser);
      setUser(nextUser);
    }

    return data;
  }, []);

  const register = useCallback(async (payload) => {
    const { data } = await http.post('/auth/register', payload);

    const nextToken =
      data?.access_token ||
      data?.token ||
      data?.authToken ||
      '';

    const nextUser =
      data?.user ||
      data?.data?.user ||
      null;

    if (nextToken) {
      storeToken(nextToken);
      setToken(nextToken);
    }

    if (nextUser) {
      storeUser(nextUser);
      setUser(nextUser);
    }

    return data;
  }, []);

  const updateUser = useCallback((nextUser) => {
    storeUser(nextUser);
    setUser(nextUser || null);
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      booting,
      isAuthenticated,
      login,
      register,
      logout,
      refreshMe,
      updateUser,
      setUser: updateUser,
    }),
    [token, user, booting, isAuthenticated, login, register, logout, refreshMe, updateUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return value;
}