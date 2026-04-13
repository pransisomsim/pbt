import { PlusIcon } from './Icons';

export default function Header({ greeting, userName, currentPath, onAddTransaction, onAddAccount }) {
  const navItems = {
    '/dashboard': 'Overview',
    '/accounts': 'Accounts',
    '/transactions': 'Transactions',
  };

  const currentLabel = navItems[currentPath] || 'Dashboard';

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 lg:pt-0">
      <div className="ml-8 lg:ml-0">
        <p className="text-sm text-white/40">
          {greeting}{userName ? `, ${userName}` : ''} 👋
        </p>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight mt-0.5">
          {currentLabel}
        </h1>
      </div>
      <div className="flex gap-2 w-full sm:w-auto">
        {currentPath === '/dashboard' && (
          <button
            onClick={onAddAccount}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl text-sm font-medium hover:bg-white/10 transition-all duration-150"
          >
            + Account
          </button>
        )}
        <button
          onClick={onAddTransaction}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#e2c97e] text-[#0d0d1a] rounded-xl text-sm font-bold hover:bg-[#d4b86c] active:scale-95 transition-all duration-150 flex-1 sm:flex-initial justify-center"
        >
          <PlusIcon />
          <span>Add Transaction</span>
        </button>
      </div>
    </div>
  );
}
