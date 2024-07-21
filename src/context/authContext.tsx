// import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
// import Cookies from 'js-cookie';
// // import { UserProfile } from '@/types';

// // Define the shape of the context state
// interface AuthState {
//   token: string;
//   isLogin: boolean;
//   // userProfile: UserProfile | null;
// }

// // Define the shape of the context methods
// interface AuthContextProps extends AuthState {
//   setToken: (token: string) => void;
//   // setIsLogin: (isLogin: boolean) => void;
//   // setUserProfile: (userProfile: UserProfile) => void;
// }

// // Create the context with default values
// const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// // AuthProvider component to wrap around components that need access to the context
// export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [token, setToken] = useState<string>('');
//   const [isLogin, setIsLogin] = useState<boolean>(false);

//   console.log(token);

//   useEffect(() =>{
//     const auth_token = Cookies.get("auth_token");
//     if(auth_token){
//         setToken(auth_token);
//         setIsLogin(true);
//     }
//   }, []);

//   console.log(token);

//   useEffect(() =>{
//     if(token){
//       setIsLogin(true);
//     }
//   }, [token, setIsLogin])

//   return (
//     <AuthContext.Provider value={{ token, isLogin, setToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use the AuthContext
// export const useAuth = (): AuthContextProps => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };


// new way 
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
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
}

// Create the context with default values
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// AuthProvider component to wrap around components that need access to the context
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  console.log(token, isLogin);

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

  return (
    <AuthContext.Provider value={{ token, isLogin, loading, setToken }}>
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
