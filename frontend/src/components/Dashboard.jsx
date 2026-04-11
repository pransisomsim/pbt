import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { apiRequest } from '../services/api';

// ── Inline SVG Icons ──────────────────────────────────────────────────────────
const WalletIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M20 12V8H6a2 2 0 0 1 0-4h14v4"/><path d="M20 12v4H6a2 2 0 0 0 0 4h14v-4"/><path d="M20 12H6"/>
  </svg>
);

const IncomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
  </svg>
);

const ExpenseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/>
  </svg>
);

const CardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
  </svg>
);

const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-4 h-4">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const GridIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
  </svg>
);

// ── Skeleton ──────────────────────────────────────────────────────────────────
function Skeleton({ className }) {
  return <div className={`rounded-lg animate-pulse bg-white/5 ${className}`} />;
}

// ── Donut Chart (pure SVG, no lib) ────────────────────────────────────────────
function DonutChart({ slices }) {
  const COLORS = ['#e2c97e', '#7eb8e2', '#7ee2b8', '#e27eb8', '#b87ee2'];
  const total = slices.reduce((s, d) => s + d.value, 0);

  if (!total) return (
    <div className="flex items-center justify-center h-32 text-sm text-white/30">
      No expense data yet
    </div>
  );

  const R = 54, cx = 70, cy = 70, circ = 2 * Math.PI * R;
  let offset = 0;
  const arcs = slices.map((s, i) => {
    const dash = (s.value / total) * circ;
    const arc = { ...s, dash, offset, color: COLORS[i % COLORS.length] };
    offset += dash;
    return arc;
  });

  return (
    <div className="flex items-center gap-5">
      <svg width="140" height="140" viewBox="0 0 140 140" className="flex-shrink-0">
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="white" strokeOpacity="0.05" strokeWidth="18" />
        {arcs.map((a, i) => (
          <circle key={i} cx={cx} cy={cy} r={R} fill="none"
            stroke={a.color} strokeWidth="18"
            strokeDasharray={`${a.dash} ${circ - a.dash}`}
            strokeDashoffset={-a.offset + circ * 0.25}
            strokeLinecap="round"
          />
        ))}
        <text x={cx} y={cy - 7} textAnchor="middle" fill="#e2c97e" fontSize="10" fontWeight="600">SPENT</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fill="white" fontSize="13" fontWeight="700">
          ₱{total >= 1000 ? `${(total / 1000).toFixed(1)}k` : total.toFixed(0)}
        </text>
      </svg>

      <div className="flex flex-col gap-2.5 flex-1 min-w-0">  
        {arcs.map((a, i) => (  
          <div key={i} className="flex items-center gap-2 min-w-0">  
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: a.color }} />  
            <span className="text-xs text-white/60 truncate">{a.name}</span>  
            <span className="text-xs font-semibold ml-auto flex-shrink-0" style={{ color: a.color }}>  
              {((a.value / total) * 100).toFixed(0)}%  
            </span>  
          </div>  
        ))}  
      </div>  
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [accounts, setAccounts] = useState([]);
  const [summary, setSummary] = useState({ income: 0, expense: 0, net: 0 });
  const [recent, setRecent] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');

  const navItems = [
    { path: '/dashboard', label: 'Overview', Icon: GridIcon },
    { path: '/accounts', label: 'Accounts', Icon: CardIcon },
    { path: '/transactions', label: 'Transactions', Icon: IncomeIcon },
  ];

  useEffect(() => { loadAll(); }, []);

  async function loadAll() {
    setLoading(true);
    try {
      const [accsRes, txRes] = await Promise.allSettled([
        apiRequest('/accounts'),
        apiRequest('/transactions?limit=5'),
      ]);

      if (accsRes.status === 'fulfilled') {  
        setAccounts(accsRes.value.accounts || []);  
      }  

      if (txRes.status === 'fulfilled') {  
        const txs = txRes.value.transactions || [];  
        setRecent(txs);  

        // Monthly summary  
        const now = new Date();  
        const thisMonth = txs.filter(t => {  
          const d = new Date(t.transaction_date);  
          return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();  
        });  
        const income  = thisMonth.filter(t => t.type === 'income').reduce((s, t) => s + +t.amount, 0);  
        const expense = thisMonth.filter(t => t.type === 'expense').reduce((s, t) => s + +t.amount, 0);  
        setSummary({ income, expense, net: income - expense });  

        // Category breakdown for donut  
        const catMap = {};  
        txs.filter(t => t.type === 'expense').forEach(t => {  
          const name = t.category_name || 'Other';  
          catMap[name] = (catMap[name] || 0) + +t.amount;  
        });  
        setCategories(  
          Object.entries(catMap).map(([name, value]) => ({ name, value })).slice(0, 5)  
        );  
      }  

      // Decode name from JWT payload  
      try {  
        const token = localStorage.getItem('token');  
        if (token) {  
          const payload = JSON.parse(atob(token.split('.')[1]));  
          setUserName(payload.name || '');  
        }  
      } catch {}  

    } finally {  
      setLoading(false);  
    }
  }

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/login');
  }

  const totalBalance = accounts.reduce((s, a) => s + +a.balance, 0);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  const currentLabel = navItems.find(n => n.path === location.pathname)?.label ?? 'Dashboard';

  return (
    <div className="flex min-h-screen bg-[#0d0d1a] text-white">

      {/* ── Sidebar ── */}  
      <aside className="w-[220px] flex-shrink-0 flex flex-col bg-[#111127] border-r border-white/5 px-4 py-6">  

        {/* Logo */}  
        <div className="flex items-center gap-2.5 mb-10 pl-1">  
          <div className="w-9 h-9 bg-[#1a1a2e] rounded-xl flex items-center justify-center border border-[#e2c97e]/20">  
            <span className="text-[#e2c97e] font-bold text-lg leading-none">₱</span>  
          </div>  
          <span className="font-bold text-[0.95rem] tracking-tight">PBTracker</span>  
        </div>  

        {/* Nav items */}  
        <nav className="flex flex-col gap-1">  
          {navItems.map(({ path, label, Icon: NavIcon }) => (  
            <button  
              key={path}  
              onClick={() => navigate(path)}  
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full text-left transition-all duration-150 ${
                location.pathname === path  
                  ? 'bg-[#e2c97e]/10 text-[#e2c97e]'  
                  : 'text-white/40 hover:text-white/70 hover:bg-white/5'
              }`}  
            >  
              <NavIcon />  
              {label}  
            </button>  
          ))}  
        </nav>  

        {/* Logout */}  
        <div className="mt-auto">  
          <button  
            onClick={handleLogout}  
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full text-left text-red-400/50 hover:text-red-400 hover:bg-red-400/5 transition-all duration-150"  
          >  
            <LogoutIcon />  
            Log out  
          </button>  
        </div>  
      </aside>  

      {/* ── Main content ── */}  
      <main className="flex-1 p-8 overflow-y-auto flex flex-col gap-6 min-w-0">  

        {/* Header */}  
        <div className="flex items-start justify-between gap-4">  
          <div>  
            <p className="text-sm text-white/40">{greeting}{userName ? `, ${userName}` : ''} 👋</p>  
            <h1 className="text-2xl font-bold tracking-tight mt-0.5">  
              {currentLabel}  
            </h1>  
          </div>  
          <button  
            onClick={() => alert('Add Transaction modal — build this next!')}  
            className="flex items-center gap-2 px-4 py-2.5 bg-[#e2c97e] text-[#0d0d1a] rounded-xl text-sm font-bold hover:bg-[#d4b86c] active:scale-95 transition-all duration-150 flex-shrink-0"  
          >  
            <PlusIcon />  
            Add Transaction  
          </button>  
        </div>  

        {/* ── OVERVIEW TAB ── */}  
        {location.pathname === '/dashboard' && (  
          <>  
            {/* Stat cards */}  
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">  

              {/* Balance */}  
              <div className="col-span-2 xl:col-span-1 bg-[#16162a] border border-white/5 rounded-2xl p-5 flex flex-col gap-3">  
                <div className="flex items-center justify-between">  
                  <p className="text-xs text-white/40 font-medium uppercase tracking-wider">Total Balance</p>  
                  <span className="text-[#e2c97e]/60"><WalletIcon /></span>  
                </div>  
                {loading  
                  ? <Skeleton className="h-9 w-36" />  
                  : <p className="text-3xl font-bold text-[#e2c97e] tracking-tight">  
                      ₱{totalBalance.toLocaleString('en-PH', { minimumFractionDigits: 2 })}  
                    </p>  
                }  
                <p className="text-xs text-white/30">  
                  {accounts.length} account{accounts.length !== 1 ? 's' : ''}  
                </p>  
              </div>  

              {/* Income */}  
              <div className="bg-[#16162a] border border-white/5 rounded-2xl p-5 flex flex-col gap-3">  
                <div className="flex items-center justify-between">  
                  <p className="text-xs text-white/40 font-medium uppercase tracking-wider">Income</p>  
                  <span className="text-green-400/60"><IncomeIcon /></span>  
                </div>  
                {loading  
                  ? <Skeleton className="h-8 w-28" />  
                  : <p className="text-2xl font-bold text-green-400 tracking-tight">  
                      +₱{summary.income.toLocaleString()}  
                    </p>  
                }  
                <p className="text-xs text-white/30">This month</p>  
              </div>  

              {/* Expenses */}  
              <div className="bg-[#16162a] border border-white/5 rounded-2xl p-5 flex flex-col gap-3">  
                <div className="flex items-center justify-between">  
                  <p className="text-xs text-white/40 font-medium uppercase tracking-wider">Expenses</p>  
                  <span className="text-red-400/60"><ExpenseIcon /></span>  
                </div>  
                {loading  
                  ? <Skeleton className="h-8 w-28" />  
                  : <p className="text-2xl font-bold text-red-400 tracking-tight">  
                      -₱{summary.expense.toLocaleString()}  
                    </p>  
                }  
                <p className="text-xs text-white/30">This month</p>  
              </div>  

              {/* Net */}  
              <div className="bg-[#16162a] border border-white/5 rounded-2xl p-5 flex flex-col gap-3">  
                <div className="flex items-center justify-between">  
                  <p className="text-xs text-white/40 font-medium uppercase tracking-wider">Net</p>  
                  <span className={summary.net >= 0 ? 'text-blue-400/60' : 'text-red-400/60'}>  
                    {summary.net >= 0 ? <IncomeIcon /> : <ExpenseIcon />}  
                  </span>  
                </div>  
                {loading  
                  ? <Skeleton className="h-8 w-28" />  
                  : <p className={`text-2xl font-bold tracking-tight ${summary.net >= 0 ? 'text-blue-400' : 'text-red-400'}`}>  
                      {summary.net >= 0 ? '+' : ''}₱{summary.net.toLocaleString()}  
                    </p>  
                }  
                <p className="text-xs text-white/30">  
                  {summary.net >= 0 ? '🎉 On track' : '⚠️ Over budget'}  
                </p>  
              </div>  
            </div>  

            {/* Accounts + Donut row */}  
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">  

              {/* Accounts */}  
              <div className="bg-[#16162a] border border-white/5 rounded-2xl p-5">  
                <div className="flex items-center justify-between mb-4">  
                  <h3 className="text-sm font-semibold">Your Accounts</h3>  
                  <button  
                    className="text-[#e2c97e] text-xs font-semibold hover:underline underline-offset-2"  
                    onClick={() => navigate('/accounts')}  
                  >  
                    View all →  
                  </button>  
                </div>  

                {loading ? (  
                  <div className="flex flex-col gap-3">  
                    {[1, 2, 3].map(i => <Skeleton key={i} className="h-12 w-full" />)}  
                  </div>  
                ) : accounts.length === 0 ? (  
                  <div className="flex flex-col items-center justify-center py-10 text-white/30 text-center">  
                    <span className="text-4xl mb-2">🏦</span>  
                    <p className="text-sm">No accounts yet</p>  
                    <p className="text-xs mt-1">Add your first account to get started</p>  
                  </div>  
                ) : (  
                  <div className="flex flex-col gap-2">  
                    {accounts.map(acc => (  
                      <div key={acc.id} className="flex items-center justify-between px-4 py-3 bg-white/[0.03] rounded-xl border border-white/[0.06]">  
                        <div className="flex items-center gap-3">  
                          <div className="w-9 h-9 bg-[#e2c97e]/10 rounded-lg flex items-center justify-center text-[#e2c97e]">  
                            <CardIcon />  
                          </div>  
                          <span className="text-sm font-medium">{acc.name}</span>  
                        </div>  
                        <span className={`text-sm font-bold ${+acc.balance >= 0 ? 'text-[#e2c97e]' : 'text-red-400'}`}>  
                          ₱{(+acc.balance).toLocaleString('en-PH', { minimumFractionDigits: 2 })}  
                        </span>  
                      </div>  
                    ))}  
                  </div>  
                )}  
              </div>  

              {/* Spending Donut */}  
              <div className="bg-[#16162a] border border-white/5 rounded-2xl p-5">  
                <h3 className="text-sm font-semibold mb-4">Spending Breakdown</h3>  
                {loading  
                  ? <Skeleton className="h-36 w-full" />  
                  : <DonutChart slices={categories} />  
                }  
              </div>  
            </div>  

            {/* Recent Transactions */}  
            <div className="bg-[#16162a] border border-white/5 rounded-2xl p-5">  
              <div className="flex items-center justify-between mb-4">  
                <h3 className="text-sm font-semibold">Recent Transactions</h3>  
                <button  
                  className="text-[#e2c97e] text-xs font-semibold hover:underline underline-offset-2"  
                  onClick={() => navigate('/transactions')}  
                >  
                  View all →  
                </button>  
              </div>  

              {loading ? (  
                <div className="flex flex-col gap-3">  
                  {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-14 w-full" />)}  
                </div>  
              ) : recent.length === 0 ? (  
                <div className="flex flex-col items-center justify-center py-12 text-white/30 text-center">  
                  <span className="text-5xl mb-3">📋</span>  
                  <p className="text-sm">No transactions yet</p>  
                  <p className="text-xs mt-1">Hit "Add Transaction" to record your first entry</p>  
                </div>  
              ) : (  
                <div className="flex flex-col gap-1.5">  
                  {recent.map(tx => (  
                    <div  
                      key={tx.id}  
                      className="flex items-center justify-between px-4 py-3 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.05] transition-colors duration-150 cursor-default"  
                    >  
                      <div className="flex items-center gap-3 min-w-0">  
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${  
                          tx.type === 'income'  
                            ? 'bg-green-400/10 text-green-400'  
                            : 'bg-red-400/10 text-red-400'  
                        }`}>  
                          {tx.type === 'income' ? <IncomeIcon /> : <ExpenseIcon />}  
                        </div>  
                        <div className="min-w-0">  
                          <p className="text-sm font-medium truncate">  
                            {tx.note || tx.category_name || 'Transaction'}  
                          </p>  
                          <p className="text-xs text-white/35 mt-0.5">  
                            {tx.category_name} · {new Date(tx.transaction_date).toLocaleDateString('en-PH', { month: 'short', day: 'numeric' })}  
                          </p>  
                        </div>  
                      </div>  

                      <div className="text-right flex-shrink-0 ml-4">  
                        <p className={`text-sm font-bold ${tx.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>  
                          {tx.type === 'income' ? '+' : '-'}₱{(+tx.amount).toLocaleString()}  
                        </p>  
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${  
                          tx.type === 'income'  
                            ? 'bg-green-400/10 text-green-400'  
                            : 'bg-red-400/10 text-red-400'  
                        }`}>  
                          {tx.type}  
                        </span>  
                      </div>  
                    </div>  
                  ))}  
                </div>  
              )}  
            </div>  
          </>  
        )}  

        {/* Placeholders for other routes - these will be replaced by actual route components */}  
        {location.pathname === '/accounts' && (  
          <div className="bg-[#16162a] border border-white/5 rounded-2xl p-16 flex flex-col items-center justify-center text-white/30 text-center">  
            <span className="text-5xl mb-3">🏦</span>  
            <p className="text-sm font-medium">Accounts page — coming soon</p>  
          </div>  
        )}  

        {location.pathname === '/transactions' && (  
          <div className="bg-[#16162a] border border-white/5 rounded-2xl p-16 flex flex-col items-center justify-center text-white/30 text-center">  
            <span className="text-5xl mb-3">📊</span>  
            <p className="text-sm font-medium">Transactions page — coming soon</p>  
          </div>  
        )}  
      </main>  
    </div>  
  );
}
