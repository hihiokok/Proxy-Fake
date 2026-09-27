import React from 'react';
import { 
  Server, 
  ShieldCheck, 
  Cpu, 
  Key, 
  Terminal, 
  HardDrive, 
  Lock, 
  Zap, 
  Activity, 
  Menu, 
  X,
  UserCheck,
  RefreshCw,
  Globe
} from 'lucide-react';
import { NavigationTab, UserProfile } from '../types';
import { useLanguage } from '../i18n/context';

interface HeaderProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  currentUser: UserProfile;
  onOpenAuth: () => void;
  isWsConnected: boolean;
  onQuickRefresh: () => void;
  isRefreshing: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onOpenAuth,
  isWsConnected,
  onQuickRefresh,
  isRefreshing
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'overview', label: t.navOverview, icon: <Server className="w-4 h-4" /> },
    { id: 'proxy', label: t.navProxy, icon: <Zap className="w-4 h-4" /> },
    { id: 'modules', label: t.navModules, icon: <Terminal className="w-4 h-4" /> },
    { id: 'ca', label: t.navCA, icon: <Key className="w-4 h-4" />, badge: '50Y' },
    { id: 'performance', label: t.navPerformance, icon: <Cpu className="w-4 h-4" /> },
    { id: 'security', label: t.navSecurity, icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'backup', label: t.navBackup, icon: <HardDrive className="w-4 h-4" /> },
    { id: 'deployment', label: t.navDeployment, icon: <Activity className="w-4 h-4" /> },
  ];

  return (
    <header className="bg-slate-950 border-b border-slate-800 sticky top-0 z-40 text-slate-100 shadow-xl">
      {/* Top Banner & Status bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Tier Positioning */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 flex items-center justify-center shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400/30">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold tracking-tight text-lg text-white">{t.brandTitle}</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 font-semibold tracking-wider">
                  {t.brandTag}
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">{t.brandSubtitle}</p>
            </div>
          </div>

          {/* Right Status Indicators */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Selector Switcher */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs font-mono">
              <button
                onClick={() => setLanguage('vi')}
                className={`flex items-center gap-1 px-2 py-1 rounded transition-all ${
                  language === 'vi'
                    ? 'bg-emerald-600 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Tiếng Việt"
              >
                <span>🇻🇳</span>
                <span className="hidden sm:inline">Tiếng Việt</span>
                <span className="sm:hidden">VI</span>
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`flex items-center gap-1 px-2 py-1 rounded transition-all ${
                  language === 'en'
                    ? 'bg-emerald-600 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="English"
              >
                <span>🇬🇧</span>
                <span className="hidden sm:inline">English</span>
                <span className="sm:hidden">EN</span>
              </button>
            </div>

            {/* Live WebSocket Indicator */}
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono">
              <span className={`w-2 h-2 rounded-full ${isWsConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span className={isWsConnected ? 'text-emerald-400' : 'text-amber-400'}>
                {isWsConnected ? t.streamLive : t.connecting}
              </span>
            </div>

            {/* Quick Refresh */}
            <button
              onClick={onQuickRefresh}
              disabled={isRefreshing}
              title={t.quickRefreshTooltip}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-emerald-400' : ''}`} />
            </button>

            {/* Current User Session */}
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all text-xs font-mono"
            >
              <UserCheck className="w-4 h-4 text-cyan-400" />
              <span className="font-semibold text-slate-200 hidden sm:inline">{currentUser.username}</span>
              <span className="px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 text-[10px] border border-cyan-800/60">
                {currentUser.role}
              </span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <div className="hidden lg:flex items-center gap-1 overflow-x-auto py-1 scrollbar-none border-t border-slate-900">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-md whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30 shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-700/50">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 pt-2 pb-4 space-y-1">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30 font-semibold'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-700/50">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
