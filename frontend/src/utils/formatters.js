// utils/formatters.js
export const formatCurrency = (amount, currency = '₱') => {
  const num = Math.abs(amount);
  const formatted = num.toLocaleString('en-PH', { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
  });
  return `${currency}${formatted}`;
};

export const formatCompactCurrency = (amount, currency = '₱') => {
  if (amount >= 1000000) {
    return `${currency}${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `${currency}${(amount / 1000).toFixed(1)}K`;
  }
  return formatCurrency(amount, currency);
};

export const formatDate = (date, format = 'short') => {
  const d = new Date(date);
  if (format === 'short') {
    return d.toLocaleDateString('en-PH', { month: 'short', day: 'numeric' });
  }
  return d.toLocaleDateString('en-PH');
};

export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};
