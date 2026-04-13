// components/TransactionList.jsx
import { IncomeIcon, ExpenseIcon } from './Icons';
import Skeleton from './Skeleton';
import EmptyState from './EmptyState';
import { formatCurrency, formatDate } from '../utils/formatters';

export const TransactionList = ({ transactions, loading, onViewAll }) => {
  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-14 w-full" />)}
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <EmptyState 
        icon="📋"
        title="No transactions yet"
        description='Hit "Add Transaction" to record your first entry'
      />
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      {transactions.map(transaction => (
        <TransactionCard key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
};

const TransactionCard = ({ transaction }) => {
  const isIncome = transaction.type === 'income';
  const Icon = isIncome ? IncomeIcon : ExpenseIcon;
  const colorClass = isIncome ? 'green' : 'red';
  
  return (
    <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.05] transition-colors duration-150 cursor-default">
      <div className="flex items-center gap-3 min-w-0">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-${colorClass}-400/10 text-${colorClass}-400`}>
          <Icon />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium truncate">
            {transaction.note || transaction.category_name || 'Transaction'}
          </p>
          <p className="text-xs text-white/35 mt-0.5">
            {transaction.category_name} · {formatDate(transaction.transaction_date)}
          </p>
        </div>
      </div>

      <div className="text-right flex-shrink-0 ml-4">
        <p className={`text-sm font-bold text-${colorClass}-400`}>
          {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
        </p>
        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded bg-${colorClass}-400/10 text-${colorClass}-400`}>
          {transaction.type}
        </span>
      </div>
    </div>
  );
};
