// hooks/useAccounts.js
import { useState, useEffect } from 'react';
import accountService from '../services/accountService';

export const useAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const result = await accountService.getAll();
      console.log('Accounts result:', result);
      if (result.error) {
        setError(result.message);
      } else {
        setAccounts(result.accounts || []);
        setError(null);
      }
    } catch (err) {
      setError('Failed to fetch accounts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return { accounts, loading, error, refetch: fetchAccounts };
};
