// utils/calculations.js
export const calculateTotalBalance = (accounts) => {
  return accounts.reduce((sum, account) => sum + (+account.balance || 0), 0);
};

export const calculateCategoryBreakdown = (transactions) => {
  const categoryMap = {};
  
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      const name = t.category_name || 'Other';
      categoryMap[name] = (categoryMap[name] || 0) + Math.abs(+t.amount);
    });
  
  return Object.entries(categoryMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
};

export const calculateMonthlyStats = (transactions) => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  
  const thisMonth = transactions.filter(t => {
    const d = new Date(t.transaction_date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });
  
  const income = thisMonth
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + Math.abs(+t.amount), 0);
    
  const expense = thisMonth
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(+t.amount), 0);
  
  return { income, expense, net: income - expense };
};
