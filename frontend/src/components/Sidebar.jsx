// components/Sidebar.jsx
import { GridIcon, CardIcon, IncomeIcon, LogoutIcon, XIcon } from './Icons';

const navItems = [
  { path: '/dashboard', label: 'Overview', Icon: GridIcon },
  { path: '/accounts', label: 'Accounts', Icon: CardIcon },
  { path: '/transactions', label: 'Transactions', Icon: IncomeIcon },
];

export default function Sidebar({ currentPath, onNavigate, onLogout, onClose }) {
  return (
    <aside className="w-[240px] sm:w-[220px] h-full flex flex-col bg-[#111127] border-r border-white/5 px-4 py-6">
      {/* Close button - Mobile only */}
      <button
        onClick={onClose}
        className="lg:hidden absolute top-4 right-4 p-1 text-white/40 hover:text-white"
      >
        <XIcon />
      </button>

      {/* Logo */}
      <div className="flex items-center gap-2.5 mb-8 sm:mb-10 pl-1">
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
            onClick={() => onNavigate(path)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full text-left transition-all duration-150 ${
              currentPath === path
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
          onClick={onLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full text-left text-red-400/50 hover:text-red-400 hover:bg-red-400/5 transition-all duration-150"
        >
          <LogoutIcon />
          Log out
        </button>
      </div>
    </aside>
  );
}
