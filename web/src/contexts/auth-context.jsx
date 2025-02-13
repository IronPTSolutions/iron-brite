import { useContext, createContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : undefined);

  function login(user) {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  }

  function logout() {
    localStorage.removeItem('user');
    setUser(undefined);
  }

  const contextData = {
    user,
    login,
    logout
  }
  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  return useContext(AuthContext);
}
