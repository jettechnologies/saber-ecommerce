import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';

// Define the shape of the context state
interface AuthState {
  token: string;
  isLogin: boolean;
  loading: boolean;
}

// Define the shape of the context methods
interface AuthContextProps extends AuthState {
  setToken: (token: string) => void;
  deleteToken: () => void;
}

// Create the context with default values
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// AuthProvider component to wrap around components that need access to the context
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // console.log(token, isLogin);

  useEffect(() => {
    const auth_token = Cookies.get("auth_token");
    
    if (auth_token) {
      setToken(auth_token);
      setIsLogin(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (token) {
      setIsLogin(true);
    }
  }, [token]);

  // function for deleting the token
  const deleteToken = useCallback(() =>{
    if(token){
      setToken('');
      setIsLogin(false);
      Cookies.remove("auth_token");
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, isLogin, loading, setToken, deleteToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
