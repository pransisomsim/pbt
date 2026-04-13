// hooks/useMonthlySummary.js
import { useState, useEffect } from 'react';
import transactionService from '../services/transactionService';

export const useMonthlySummary = () => {
  const [summary, setSummary] = useState({ income: 0, expense: 0, net: 0 });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const result = await transactionService.getMonthlySummary();
      if (result.error) {
        setError(result.message);
      } else {
        setSummary(result.summary);
        setCategories(result.categories || []);
        setError(null);
      }
    } catch (err) {
      setError('Failed to fetch summary');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return { summary, categories, loading, error, refetch: fetchSummary };
};
