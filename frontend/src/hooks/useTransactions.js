// hooks/useTransactions.js
import { useState, useEffect } from 'react';
import transactionService from '../services/transactionService';

export const useRecentTransactions = (limit = 5) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const result = await transactionService.getAll(limit);
      if (result.error) {
        setError(result.message);
      } else {
        setTransactions(result.transactions || []);
        setError(null);
      }
    } catch (err) {
      setError('Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [limit]);

  return { transactions, loading, error, refetch: fetchTransactions };
};
