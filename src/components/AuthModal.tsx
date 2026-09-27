import React, { useState } from 'react';
import { Lock, UserCheck, ShieldCheck, X, LogOut, KeyRound } from 'lucide-react';
import { UserProfile } from '../types';
import { useLanguage } from '../i18n/context';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onLogin: (username: string, pass: string) => Promise<boolean>;
  onVerify2FA: (tempToken: string, code: string) => Promise<boolean>;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onVerify2FA,
  onLogout
}) => {
  const { t, language } = useLanguage();
  const [username, setUsername] = useState('enterprise_owner');
  const [password, setPassword] = useState('OwnerPass@2026!');
  const [totpCode, setTotpCode] = useState('');
  const [pending2FAToken, setPending2FAToken] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const demoAccounts = [
    { role: 'OWNER', user: 'enterprise_owner', pass: 'OwnerPass@2026!', label: language === 'vi' ? 'Chủ sở hữu hệ thống (Kiến trúc sư trưởng)' : 'System Owner (Chief Architect)' },
    { role: 'ADMIN', user: 'sys_admin', pass: 'AdminPass@2026!', label: language === 'vi' ? 'Quản trị viên hạ tầng' : 'Infrastructure Admin' },
    { role: 'OPERATOR', user: 'ops_agent', pass: 'OpsPass@2026!', label: language === 'vi' ? 'Kỹ sư vận hành Proxy' : 'Proxy Operations Engineer' },
    { role: 'VIEWER', user: 'audit_viewer', pass: 'ViewerPass@2026!', label: language === 'vi' ? 'Thanh tra kiểm toán & tuân thủ' : 'Compliance & Audit Inspector' }
  ];

  const handleSelectDemo = (acc: typeof demoAccounts[0]) => {
    setUsername(acc.user);
    setPassword(acc.pass);
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const success = await onLogin(username, password);
      if (success) {
        onClose();
      }
    } catch (err: any) {
      setErrorMessage(err.message || (language === 'vi' ? 'Đăng nhập không thành công' : 'Login failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 font-mono text-xs">
      <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-white text-sm">{t.authTitle}</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Session */}
        <div className="p-4 bg-slate-950/70 border-b border-slate-800 space-y-2">
          <span className="text-slate-400 text-[11px] block uppercase">{t.currentSession}:</span>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-white font-bold text-sm block">{currentUser.username}</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                {t.rolePrefix}: {currentUser.role}
              </span>
            </div>
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="px-3 py-1.5 rounded bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-700/60 text-xs font-semibold flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" /> {t.btnLogout}
            </button>
          </div>
        </div>

        {/* Quick Demo Switcher */}
        <div className="p-4 space-y-2 border-b border-slate-800">
          <span className="text-slate-400 text-[11px] block uppercase">{t.quickSwitchRole}:</span>
          <div className="grid grid-cols-2 gap-2">
            {demoAccounts.map(acc => (
              <button
                key={acc.role}
                type="button"
                onClick={() => handleSelectDemo(acc)}
                className={`p-2 rounded text-left border transition-all ${
                  username === acc.user
                    ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-xs">{acc.role}</div>
                <div className="text-[10px] text-slate-400 truncate">{acc.user}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3">
          {errorMessage && (
            <div className="p-2.5 rounded bg-rose-950/80 border border-rose-700 text-rose-300 text-xs">
              {errorMessage}
            </div>
          )}

          <div>
            <label className="text-slate-400 block mb-1">{t.usernameEmail}</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1">{t.passwordArgon}</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 focus:outline-none"
              required
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 disabled:opacity-50"
            >
              <KeyRound className="w-4 h-4" />
              {loading ? t.authenticating : t.btnSignIn}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
