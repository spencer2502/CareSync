// context/UserContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '@/lib/api';
import { toast } from '@/hooks/use-toast';

interface UserContextType {
  userData: any;
  setUserData: (user: any) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  getUserData: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getUserData = async () => {
    try {
      const { data } = await axiosInstance.get('/api/user/data');
      if (data.success) {
        setUserData(data.userData);
        setIsLoggedIn(true);
      } else {
        toast({ title: 'Fetch Failed', description: data.message });
      }
    } catch (error: any) {
      toast({ title: 'Fetch Error', description: 'Could not load user data.' });
    }
  };

  return (
    <UserContext.Provider
      value={{ userData, setUserData, isLoggedIn, setIsLoggedIn, getUserData }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error('useUserContext must be used within UserContextProvider');
  return context;
};
