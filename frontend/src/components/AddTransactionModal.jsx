// src/components/AddTransactionModal.jsx
import { useState, useEffect } from 'react';
import { XIcon } from './Icons';
import transactionService from '../services/transactionService';
import accountService from '../services/accountService';
import categoryService from '../services/categoryService'; // Add this import

export default function AddTransactionModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    account_id: '',
    category_id: '',
    amount: '',
    type: 'expense',
    transaction_date: new Date().toISOString().split('T')[0],
    note: ''
  });
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]); // Remove hardcoded categories
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadAccounts();
      loadCategories(); // Fetch categories from backend
    }
  }, [isOpen]);

  const loadAccounts = async () => {
    const result = await accountService.getAll();
    if (!result.error) {
      setAccounts(result.accounts || []);
    }
  };


const loadCategories = async () => {
  try {
    const result = await categoryService.getAll();
    if (!result.error) {
      setCategories(result.categories || []);
    } else {
      // Fallback categories - ensure correct types
      setCategories([
        // Income categories
        { id: 1, name: 'Salary', type: 'income' },
        { id: 2, name: 'Freelance', type: 'income' },
        { id: 3, name: 'Business', type: 'income' },
        { id: 4, name: 'Investment', type: 'income' },
        { id: 5, name: 'Gift', type: 'income' },
        { id: 6, name: 'Other Income', type: 'income' },
        // Expense categories
        { id: 7, name: 'Food', type: 'expense' },
        { id: 8, name: 'Transport', type: 'expense' },
        { id: 9, name: 'Rent', type: 'expense' },
        { id: 10, name: 'Utilities', type: 'expense' },
        { id: 11, name: 'Healthcare', type: 'expense' },
        { id: 12, name: 'Shopping', type: 'expense' },
        { id: 13, name: 'Education', type: 'expense' },
        { id: 14, name: 'Entertainment', type: 'expense' },
        { id: 15, name: 'Other Expense', type: 'expense' },
      ]);
    }
  } catch (err) {
    console.error('Failed to load categories:', err);
  }
};

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await transactionService.create({
        ...formData,
        amount: parseFloat(formData.amount)
      });

      if (result.error) {
        setError(result.message);
      } else {
        setFormData({
          account_id: '',
          category_id: '',
          amount: '',
          type: 'expense',
          transaction_date: new Date().toISOString().split('T')[0],
          note: ''
        });
        onSuccess();
        onClose();
      }
    } catch (err) {
      setError('Failed to create transaction');
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories = categories.filter(c => c.type === formData.type);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      
      <div className="relative bg-[#16162a] border border-white/10 rounded-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Add Transaction</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white">
            <XIcon />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-400/10 border border-red-400/20 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type Selector */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'expense', category_id: '' })}
              className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                formData.type === 'expense'
                  ? 'bg-red-400/20 text-red-400 border border-red-400/30'
                  : 'bg-white/5 text-white/40 border border-white/10'
              }`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'income', category_id: '' })}
              className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                formData.type === 'income'
                  ? 'bg-green-400/20 text-green-400 border border-green-400/30'
                  : 'bg-white/5 text-white/40 border border-white/10'
              }`}
            >
              Income
            </button>
          </div>

          {/* Account */}
          <div>
            <label className="block text-sm text-white/60 mb-1">Account</label>
            <select
              value={formData.account_id}
              onChange={(e) => setFormData({ ...formData, account_id: e.target.value })}
              required
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#e2c97e]/50"
            >
              <option value="">Select account</option>
              {accounts.map(acc => (
                <option key={acc.id} value={acc.id}>
                  {acc.name} (₱{parseFloat(acc.balance).toFixed(2)})
                </option>
              ))}
            </select>
            {accounts.length === 0 && (
              <p className="text-xs text-yellow-400/60 mt-1">
                No accounts yet. Create one first!
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm text-white/60 mb-1">Category</label>
            <select
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
              required
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#e2c97e]/50"
            >
              <option value="">Select category</option>
              {filteredCategories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm text-white/60 mb-1">Amount (₱)</label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="0.00"
              required
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#e2c97e]/50"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm text-white/60 mb-1">Date</label>
            <input
              type="date"
              value={formData.transaction_date}
              onChange={(e) => setFormData({ ...formData, transaction_date: e.target.value })}
              required
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#e2c97e]/50"
            />
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm text-white/60 mb-1">Note (Optional)</label>
            <input
              type="text"
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              placeholder="Add a note"
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#e2c97e]/50"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-white/5 text-white/70 rounded-xl text-sm font-medium hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || accounts.length === 0}
              className="flex-1 px-4 py-2.5 bg-[#e2c97e] text-[#0d0d1a] rounded-xl text-sm font-bold hover:bg-[#d4b86c] disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
