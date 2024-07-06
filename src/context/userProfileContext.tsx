import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './authContext';
import { UserProfile } from '@/types';

type UserProfileType = {
  user: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  updateUserProfile: (name: string, value: string) => void;
};

// Create the context with a default value
const UserContext = createContext<UserProfileType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token, loading } = useAuth();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${import.meta.env.VITE_PRODUCT_LIST_API}user-auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const userData: UserProfile = await response.json();
        setUser(userData);
        console.log("User data is loaded");

      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    if (!loading && token) {
      fetchData();
    }
  }, [token, loading]);

  const updateUserProfile = useCallback((name: string, value: string) => {
    setUser(prevUser => prevUser ? { ...prevUser, [name]: value } : null);
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading, error, updateUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserProfile = (): UserProfileType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserProfile must be used within a UserProvider");
  }
  return context;
};
