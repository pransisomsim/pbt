// components/AccountList.jsx
import { CardIcon } from './Icons';
import Skeleton from './Skeleton';
import EmptyState from './EmptyState';  // <-- ADD THIS LINE
import { formatCurrency } from '../utils/formatters';

export const AccountList = ({ accounts, loading, onViewAll }) => {
  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
      </div>
    );
  }

  if (!accounts || accounts.length === 0) {
    return (
      <EmptyState 
        icon="🏦"
        title="No accounts yet"
        description="Add your first account to get started"
      />
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {accounts.map(account => (
        <AccountCard key={account.id} account={account} />
      ))}
    </div>
  );
};

const AccountCard = ({ account }) => (
  <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] rounded-xl border border-white/[0.06] hover:bg-white/[0.05] transition-colors">
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 bg-[#e2c97e]/10 rounded-lg flex items-center justify-center text-[#e2c97e]">
        <CardIcon />
      </div>
      <span className="text-sm font-medium">{account.name}</span>
    </div>
    <span className={`text-sm font-bold ${+account.balance >= 0 ? 'text-[#e2c97e]' : 'text-red-400'}`}>
      {formatCurrency(account.balance)}
    </span>
  </div>
);
