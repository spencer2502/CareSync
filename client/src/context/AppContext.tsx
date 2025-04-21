import axiosInstance from '@/lib/api';
import { toast } from '@/hooks/use-toast';
import React, { createContext, useContext, useState, useEffect } from 'react';

const [userData, setUserData] = useState(null);

const getUserData = async () => {
  try {
    const { data } = await axiosInstance.get('/api/user/data');
    if (data.success) {
      setUserData(data.userData);
    } else {
      toast({ title: 'Fetch Failed', description: data.message });
    }
  } catch (error: any) {
    toast({ title: 'Fetch Error', description: 'Could not load user data.' });
  }
};


export default getUserData