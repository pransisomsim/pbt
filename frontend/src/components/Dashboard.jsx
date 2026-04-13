import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAccounts } from '../hooks/useAccounts';
import { useRecentTransactions } from '../hooks/useTransactions';
import { useMonthlySummary } from '../hooks/useMonthlySummary';
import { useUserName } from '../hooks/useUserName';
import { getGreeting } from '../utils/formatters';
import Sidebar from './Sidebar';
import Header from './Header';
import { OverviewSection } from './sections/OverviewSection';
import { PlaceholderSection } from './sections/PlaceholderSection';
import AddAccountModal from './AddAccountModal';
import AddTransactionModal from './AddTransactionModal';
import { MenuIcon } from './Icons';

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  
  const { accounts, loading: accountsLoading, refetch: refetchAccounts } = useAccounts(refreshKey);
  const { transactions: recentTransactions, loading: transactionsLoading, refetch: refetchTransactions } = useRecentTransactions(5, refreshKey);
  const { summary, categories, loading: summaryLoading, refetch: refetchSummary } = useMonthlySummary(refreshKey);
  const userName = useUserName();

  const loading = {
    accounts: accountsLoading,
    transactions: transactionsLoading,
    summary: summaryLoading
  };

  const refreshAll = () => {
    setRefreshKey(prev => prev + 1);
    refetchAccounts?.();
    refetchTransactions?.();
    refetchSummary?.();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const greeting = getGreeting();
  const currentPath = location.pathname;

  return (
    <div className="flex min-h-screen bg-[#0d0d1a] text-white">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#16162a] rounded-lg border border-white/10"
      >
        <MenuIcon />
      </button>

      {/* Sidebar - Desktop always visible, Mobile slide-in */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40
        transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 transition-transform duration-300 ease-in-out
      `}>
        <Sidebar 
          currentPath={currentPath}
          onNavigate={(path) => {
            navigate(path);
            setSidebarOpen(false);
          }}
          onLogout={handleLogout}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <main className="flex-1 min-w-0">
        <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto flex flex-col gap-4 sm:gap-6 min-h-screen">
          <Header 
            greeting={greeting}
            userName={userName}
            currentPath={currentPath}
            onAddTransaction={() => setShowAddTransaction(true)}
            onAddAccount={() => setShowAddAccount(true)}
          />

          {currentPath === '/dashboard' && (
            <OverviewSection
              accounts={accounts}
              summary={summary}
              recentTransactions={recentTransactions}
              categories={categories}
              loading={loading}
              onAddAccount={() => setShowAddAccount(true)}
            />
          )}

          {currentPath === '/accounts' && (
            <PlaceholderSection 
              icon="🏦"
              message="Accounts page — coming soon"
            />
          )}

          {currentPath === '/transactions' && (
            <PlaceholderSection 
              icon="📊"
              message="Transactions page — coming soon"
            />
          )}
        </div>
      </main>

      {/* Modals */}
      <AddAccountModal 
        isOpen={showAddAccount}
        onClose={() => setShowAddAccount(false)}
        onSuccess={refreshAll}
      />
      
      <AddTransactionModal 
        isOpen={showAddTransaction}
        onClose={() => setShowAddTransaction(false)}
        onSuccess={refreshAll}
      />
    </div>
  );
}
