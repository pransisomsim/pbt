// hooks/useUserName.js
import { useState, useEffect } from 'react';

export const useUserName = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserName(payload.name || payload.email || '');
      }
    } catch (err) {
      console.error('Failed to decode token:', err);
    }
  }, []);

  return userName;
};
