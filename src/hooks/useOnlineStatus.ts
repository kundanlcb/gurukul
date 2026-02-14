// src/hooks/useOnlineStatus.ts
import { useState, useEffect } from 'react';
// import NetInfo from '@react-native-community/netinfo';

export const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // const unsubscribe = NetInfo.addEventListener(state => {
    //   setIsOnline(state.isConnected ?? true);
    // });
    // return () => unsubscribe();
    
    // Stub: Always online for MVP unless manually triggered
    return () => {};
  }, []);

  return isOnline;
};
