import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './authContext';
import { UserProfile } from '@/types';


type UserProfileType = {
    user: UserProfile | null;
    isLoading: boolean;
    error: string | null;
}


// Create the context
const UserContext = createContext<UserProfileType | null>(null);

// Create the provider component
export const UserProvider:React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { token, loading } = useAuth();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_PRODUCT_LIST_API}user-auth/profile`, {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        });

        const userData:UserProfile = await response.json();
        setUser(userData);
        console.log("üsers data is loaded");
        
      } catch (err) {
        setError((err as Error).message);
        setIsLoading(false);
      }
      finally{
        setIsLoading(false);
      }
    };

    if(!loading && token){fetchData();}
  }, [token, loading]);

  return (
    <UserContext.Provider value={{ user, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUserProfile(): UserProfileType {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error("useCartContext must be used within a CartContextProvider");
    }
    return context;
  }