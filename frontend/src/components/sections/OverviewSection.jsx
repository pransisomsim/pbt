import { StatCard } from '../StatCard';
import { AccountList } from '../AccountList';
import { TransactionList } from '../TransactionList';
import DonutChart from '../DonutChart';
import Skeleton from '../Skeleton';
import { Section } from '../Section';
import { WalletIcon, IncomeIcon, ExpenseIcon } from '../Icons';
import { calculateTotalBalance } from '../../utils/calculations';

export const OverviewSection = ({ 
  accounts, 
  summary, 
  recentTransactions, 
  categories,
  loading,
  onAddAccount 
}) => {
  const totalBalance = calculateTotalBalance(accounts);
  const netColor = summary.net >= 0 ? 'text-blue-400' : 'text-red-400';

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <StatCard
            title="Total Balance"
            value={totalBalance}
            icon={<WalletIcon />}
            subtitle={`${accounts.length} account${accounts.length !== 1 ? 's' : ''}`}
            loading={loading.accounts}
            iconColor="text-[#e2c97e]/60"
          />
        </div>
        
        <StatCard
          title="Income"
          value={summary.income}
          icon={<IncomeIcon />}
          subtitle="This month"
          loading={loading.summary}
          valueColor="text-green-400"
          iconColor="text-green-400/60"
        />
        
        <StatCard
          title="Expenses"
          value={-summary.expense}
          icon={<ExpenseIcon />}
          subtitle="This month"
          loading={loading.summary}
          valueColor="text-red-400"
          iconColor="text-red-400/60"
        />
        
        <StatCard
          title="Net"
          value={summary.net}
          icon={summary.net >= 0 ? <IncomeIcon /> : <ExpenseIcon />}
          subtitle={summary.net >= 0 ? '🎉 On track' : '⚠️ Over budget'}
          loading={loading.summary}
          valueColor={netColor}
          iconColor={summary.net >= 0 ? 'text-blue-400/60' : 'text-red-400/60'}
        />
      </div>

      {/* Accounts and Spending Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Section title="Your Accounts" viewAllLink="/accounts">
          <div className="mb-3">
            <button
              onClick={onAddAccount}
              className="w-full py-2 px-4 bg-[#e2c97e]/10 border border-[#e2c97e]/20 text-[#e2c97e] rounded-lg text-sm font-medium hover:bg-[#e2c97e]/20 transition-all"
            >
              + Add Account
            </button>
          </div>
          <AccountList 
            accounts={accounts} 
            loading={loading.accounts}
          />
        </Section>

        <Section title="Spending Breakdown">
          {loading.summary ? (
            <Skeleton className="h-36 w-full" />
          ) : (
            <DonutChart slices={categories} />
          )}
        </Section>
      </div>

      {/* Recent Transactions */}
      <Section title="Recent Transactions" viewAllLink="/transactions">
        <TransactionList 
          transactions={recentTransactions}
          loading={loading.transactions}
        />
      </Section>
    </>
  );
};
