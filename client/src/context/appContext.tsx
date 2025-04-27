import axios from 'axios';
import { createContext, useState } from 'react';
import { toast } from 'sonner';

export const AppContext = createContext({
  backendUrl: '',
  isLoggedIn: false,
  setIsLoggedIn: (value) => {}, // <--- accepts value argument
  userData: null,
  setUserData: (value) => {},
  getUserData: () => {},
});


export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    try {
      const {data} = await axios.get(backendUrl + '/api/user/data')
      data.success ? setUserData(data.userData) : toast.error(data.message)
    }catch (error) {
      console.error('Error fetching user data:', error);
      toast.error(error.message);

    }
  }

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
