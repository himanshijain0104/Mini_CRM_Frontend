import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const setUserFromCookie = useCallback(() => {
    const cookies = Object.fromEntries(
      document.cookie.split("; ").map((c) => c.split("=").map(decodeURIComponent))
    );
    if (cookies.user) {
      try {
        const userFromCookie = JSON.parse(cookies.user);
        setUser(userFromCookie);
      } catch (err) {
        console.error("Invalid user cookie", err);
      }
    }
  }, []);
  useEffect(()=> {
    if (document.cookie) {
      setUserFromCookie();
    }
  },[])
  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken,setUserFromCookie }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
