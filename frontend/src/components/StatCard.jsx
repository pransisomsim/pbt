// components/StatCard.jsx
import Skeleton from './Skeleton';

export const StatCard = ({ 
  title, 
  value, 
  icon, 
  subtitle, 
  loading, 
  valueColor = 'text-[#e2c97e]',
  iconColor,
  prefix = '₱',
  isCurrency = true 
}) => {
  const formattedValue = !loading && isCurrency 
    ? `${prefix}${Math.abs(value).toLocaleString('en-PH', { minimumFractionDigits: 2 })}`
    : value;

  return (
    <div className="bg-[#16162a] border border-white/5 rounded-2xl p-4 sm:p-5 flex flex-col gap-2 sm:gap-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-white/40 font-medium uppercase tracking-wider">
          {title}
        </p>
        <span className={iconColor}>{icon}</span>
      </div>
      
      {loading ? (
        <Skeleton className="h-7 sm:h-8 w-24 sm:w-28" />
      ) : (
        <p className={`text-xl sm:text-2xl font-bold tracking-tight ${valueColor} truncate`}>
          {value < 0 ? '-' : (value > 0 && title !== 'Total Balance') ? '+' : ''}
          {formattedValue}
        </p>
      )}
      
      {subtitle && (
        <p className="text-xs text-white/30">{subtitle}</p>
      )}
    </div>
  );
};
