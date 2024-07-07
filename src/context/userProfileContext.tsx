import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './authContext';
import { Product, UserProfile } from '@/types';

type UserProfileType = {
  user: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  updateUserProfile: (name: string, value: string) => void;
  addToFavourite: (newFavourite: NewFavouriteType) => void; // Added addFavourite to the type
};

interface NewFavouriteType {
  createdAt: string;
  product: Product;
}

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

  const addToFavourite = useCallback((newFavourite: NewFavouriteType) => {
    setUser(prevProfile => {
      if (!prevProfile) return null; // Handle case where user profile is not loaded

      // Determine the next id
      const nextId = prevProfile.favourites.length > 0 ? Math.max(...prevProfile.favourites.map(fav => fav.id)) + 1 : 1;

      // Create the new favourite object
      const favourite = {
        id: nextId,
        createdAt: newFavourite.createdAt,
        product: newFavourite.product,
      };

      // Update the favourites array
      return {
        ...prevProfile,
        favourites: [...prevProfile.favourites, favourite],
      };
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading, error, updateUserProfile, addToFavourite }}>
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
