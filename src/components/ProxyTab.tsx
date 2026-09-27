import React, { useState } from 'react';
import { 
  Zap, 
  Shield, 
  Globe, 
  Activity, 
  RefreshCw, 
  AlertTriangle, 
  Server, 
  Lock, 
  Layers,
  Plus,
  Trash2,
  Play
} from 'lucide-react';
import { ProxyStatus, ProxySession } from '../types';
import { useLanguage } from '../i18n/context';

interface ProxyTabProps {
  proxy: ProxyStatus | null;
  connections: ProxySession[];
  onRestartProxy: () => void;
  onSimulateCrash: () => void;
  onResetRecovery: () => void;
  onUpdateConfig: (config: any) => void;
}

export const ProxyTab: React.FC<ProxyTabProps> = ({
  proxy,
  connections,
  onRestartProxy,
  onSimulateCrash,
  onResetRecovery,
  onUpdateConfig
}) => {
  const { t, language } = useLanguage();
  const [activeSubTab, setActiveSubTab] = useState<'sessions' | 'acls' | 'watchdog' | 'architecture'>('sessions');
  const [newAllowIp, setNewAllowIp] = useState('');
  const [newDenyIp, setNewDenyIp] = useState('');

  const [allowList, setAllowList] = useState<string[]>([
    '10.0.0.0/8',
    '172.16.0.0/12',
    '192.168.0.0/16',
    '127.0.0.1/32'
  ]);
  const [denyList, setDenyList] = useState<string[]>([
    '198.51.100.23',
    '203.0.113.88'
  ]);

  const handleAddAllow = () => {
    if (newAllowIp.trim()) {
      const updated = [...allowList, newAllowIp.trim()];
      setAllowList(updated);
      setNewAllowIp('');
      onUpdateConfig({ allowedIPs: updated });
    }
  };

  const handleRemoveAllow = (ip: string) => {
    const updated = allowList.filter(i => i !== ip);
    setAllowList(updated);
    onUpdateConfig({ allowedIPs: updated });
  };

  const handleAddDeny = () => {
    if (newDenyIp.trim()) {
      const updated = [...denyList, newDenyIp.trim()];
      setDenyList(updated);
      setNewDenyIp('');
      onUpdateConfig({ deniedIPs: updated });
    }
  };

  const handleRemoveDeny = (ip: string) => {
    const updated = denyList.filter(i => i !== ip);
    setDenyList(updated);
    onUpdateConfig({ deniedIPs: updated });
  };

  const isOnline = proxy?.status === 'ONLINE';
  const isBackoff = proxy?.status === 'BACKOFF';

  return (
    <div className="space-y-6">
      {/* Top Proxy Health & Recovery Banner */}
      <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono ${
        isOnline 
          ? 'bg-slate-900/90 border-emerald-500/40 text-slate-100'
          : isBackoff
          ? 'bg-rose-950/60 border-rose-500/50 text-rose-200'
          : 'bg-amber-950/60 border-amber-500/50 text-amber-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            isOnline ? 'bg-emerald-950 border border-emerald-500/50 text-emerald-400' : 'bg-rose-950 text-rose-400'
          }`}>
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-white">{t.proxyGatewayTitle}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                isOnline ? 'bg-emerald-950 text-emerald-400 border border-emerald-500' : 'bg-rose-950 text-rose-400 border border-rose-500'
              }`}>
                ● {proxy?.status || 'ONLINE'}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {t.dualStack} IPv4 ({proxy?.ipv4 || '192.168.1.100'}) & IPv6 ({proxy?.ipv6?.substring(0, 16) || '2001:db8...'}...)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onRestartProxy}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
            {t.reloadZeroDowntime}
          </button>
          <button
            onClick={onSimulateCrash}
            title={language === 'vi' ? 'Mô phỏng sự cố proxy đột ngột để kiểm tra tự phục hồi watchdog' : 'Simulates unexpected proxy crash to verify watchdog auto-recovery'}
            className="px-3 py-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 border border-rose-700/60 text-xs font-semibold text-rose-300 flex items-center gap-1.5 transition-all"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            {t.simulateCrash}
          </button>
          {proxy?.recovery.consecutiveFailures && proxy.recovery.consecutiveFailures > 0 ? (
            <button
              onClick={onResetRecovery}
              className="px-3 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-700 text-xs font-semibold text-cyan-300 transition-all"
            >
              {t.resetCircuitBreaker}
            </button>
          ) : null}
        </div>
      </div>

      {/* Sub tabs navigation */}
      <div className="flex gap-2 border-b border-slate-800 pb-2 overflow-x-auto text-xs font-mono">
        <button
          onClick={() => setActiveSubTab('sessions')}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            activeSubTab === 'sessions'
              ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40 font-bold'
              : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          {t.liveSessions} ({connections.length})
        </button>
        <button
          onClick={() => setActiveSubTab('acls')}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            activeSubTab === 'acls'
              ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40 font-bold'
              : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          {t.ipAllowDeny}
        </button>
        <button
          onClick={() => setActiveSubTab('watchdog')}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            activeSubTab === 'watchdog'
              ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40 font-bold'
              : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          {t.watchdogHealing}
        </button>
        <button
          onClick={() => setActiveSubTab('architecture')}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            activeSubTab === 'architecture'
              ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40 font-bold'
              : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          {t.architectureTopology}
        </button>
      </div>

      {/* SUBTAB 1: Active Sessions */}
      {activeSubTab === 'sessions' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-2xl font-mono">
          <div className="p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-4">
              <span className="text-slate-400">{t.totalActive}: <strong className="text-white">{connections.length}</strong></span>
              <span className="text-slate-400">{t.bandwidth}: <strong className="text-emerald-400">{proxy?.bandwidthUsageMbps || '1.8'} Mbps</strong></span>
              <span className="text-slate-400">{t.avgLatency}: <strong className="text-cyan-400">{proxy?.averageLatencyMs || 28} ms</strong></span>
            </div>
            <div className="text-slate-400 text-[11px]">
              Keep-Alive Pool: 64 active | TCP Keepalive Timeout: 65s
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/70 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">{t.sessionId}</th>
                  <th className="px-4 py-3">{t.clientIpStack}</th>
                  <th className="px-4 py-3">{t.protocol}</th>
                  <th className="px-4 py-3">{t.targetEndpoint}</th>
                  <th className="px-4 py-3">{t.authIdentity}</th>
                  <th className="px-4 py-3">{t.trafficInOut}</th>
                  <th className="px-4 py-3">{t.latency}</th>
                  <th className="px-4 py-3">{t.statusCol}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {connections.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-6 text-center text-slate-500">
                      {language === 'vi' ? 'Không có phiên kết nối đang hoạt động' : 'No active sessions currently streaming'}
                    </td>
                  </tr>
                ) : (
                  connections.map(c => (
                    <tr key={c.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-4 py-3 font-semibold text-white">{c.id}</td>
                      <td className="px-4 py-3">
                        <div>{c.clientIp}</div>
                        <span className="text-[10px] text-slate-500 font-semibold">{c.ipVersion}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400 text-[10px] border border-cyan-800/40">
                          {c.protocol}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-300">
                        {c.targetHost}:{c.targetPort}
                      </td>
                      <td className="px-4 py-3 text-slate-400">{c.authenticatedUser}</td>
                      <td className="px-4 py-3 text-[11px]">
                        ↓ {(c.bytesIn / 1024).toFixed(1)} KB / ↑ {(c.bytesOut / 1024).toFixed(1)} KB
                      </td>
                      <td className="px-4 py-3 text-cyan-400 font-bold">{c.latencyMs} ms</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-semibold border border-emerald-700/50">
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBTAB 2: IP Allowlist & Denylist */}
      {activeSubTab === 'acls' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          {/* Allowlist */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-white">{t.ipAllowlistTitle}</h3>
              </div>
              <span className="text-slate-400 text-[11px]">{allowList.length} {t.rulesCount}</span>
            </div>
            <p className="text-slate-400 text-[11px] my-3">
              {t.allowlistDesc}
            </p>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newAllowIp}
                onChange={e => setNewAllowIp(e.target.value)}
                placeholder="e.g. 192.168.1.0/24"
                className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-emerald-500 focus:outline-none"
              />
              <button
                onClick={handleAddAllow}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> {t.btnAdd}
              </button>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {allowList.map(ip => (
                <div key={ip} className="flex items-center justify-between p-2 rounded bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-200">{ip}</span>
                  <button
                    onClick={() => handleRemoveAllow(ip)}
                    className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Denylist */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <h3 className="font-bold text-white">{t.ipDenylistTitle}</h3>
              </div>
              <span className="text-slate-400 text-[11px]">{denyList.length} {t.rulesCount}</span>
            </div>
            <p className="text-slate-400 text-[11px] my-3">
              {t.denylistDesc}
            </p>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newDenyIp}
                onChange={e => setNewDenyIp(e.target.value)}
                placeholder="e.g. 198.51.100.23"
                className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-rose-500 focus:outline-none"
              />
              <button
                onClick={handleAddDeny}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> {t.btnBlock}
              </button>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {denyList.map(ip => (
                <div key={ip} className="flex items-center justify-between p-2 rounded bg-slate-950/70 border border-slate-800">
                  <span className="text-rose-300">{ip}</span>
                  <button
                    onClick={() => handleRemoveDeny(ip)}
                    className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: Automatic Recovery Watchdog */}
      {activeSubTab === 'watchdog' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-2xl font-mono text-xs space-y-4">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">{t.watchdogTitle}</h3>
              <p className="text-slate-400 text-[11px]">{t.watchdogSubtitle}</p>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-700">
              {t.circuitBreakerArmed}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{t.recoveryStatus}</span>
              <span className="text-base font-bold text-emerald-400">{proxy?.recovery.status || 'ONLINE'}</span>
            </div>
            <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{t.totalCrashCount}</span>
              <span className="text-base font-bold text-white">{proxy?.recovery.crashCount || 0}</span>
            </div>
            <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{t.consecutiveFailures}</span>
              <span className={`text-base font-bold ${(proxy?.recovery.consecutiveFailures || 0) > 2 ? 'text-rose-400' : 'text-slate-300'}`}>
                {proxy?.recovery.consecutiveFailures || 0} / 5
              </span>
            </div>
            <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{t.lastRecoveryAction}</span>
              <span className="text-xs text-slate-300 truncate block">
                {proxy?.recovery.lastRestartTimestamp ? new Date(proxy.recovery.lastRestartTimestamp).toLocaleTimeString() : (language === 'vi' ? 'Chuẩn mực ổn định' : 'Baseline')}
              </span>
            </div>
          </div>

          {/* Workflow Diagram */}
          <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-[11px] space-y-2">
            <h4 className="font-bold text-slate-300 uppercase tracking-wider">{t.selfHealingPipeline}</h4>
            <div className="flex flex-wrap items-center gap-2 text-slate-400">
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-white font-semibold">{t.step1}</span>
              <span>→</span>
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-white font-semibold">{t.step2}</span>
              <span>→</span>
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-white font-semibold">{t.step3}</span>
              <span>→</span>
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-white font-semibold">{t.step4}</span>
              <span>→</span>
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-white font-semibold">{t.step5}</span>
              <span>→</span>
              <span className="px-2 py-1 rounded bg-emerald-950 border border-emerald-600 text-emerald-400 font-bold">{t.step6}</span>
            </div>
            <div className="mt-2 text-rose-300 text-[10px]">
              {t.watchdogNote}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 4: Architecture Flow */}
      {activeSubTab === 'architecture' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-2xl font-mono text-xs">
          <h3 className="font-bold text-white mb-2">{t.architectureTopology}</h3>
          <p className="text-slate-400 text-xs mb-4">
            {t.archTopologyDesc}
          </p>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-white">{t.flowClient}</span>
                <p className="text-[11px] text-slate-400">{t.flowClientDesc}</p>
              </div>
              <span className="text-[10px] text-cyan-400">Ingress</span>
            </div>
            <div className="text-center text-slate-600 font-bold">↓</div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-emerald-400">{t.flowTlsGateway}</span>
                <p className="text-[11px] text-slate-400">{t.flowTlsGatewayDesc}</p>
              </div>
              <span className="text-[10px] text-emerald-400">Port 443 / 8443</span>
            </div>
            <div className="text-center text-slate-600 font-bold">↓</div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-cyan-400">{t.flowAuthAcl}</span>
                <p className="text-[11px] text-slate-400">{t.flowAuthAclDesc}</p>
              </div>
              <span className="text-[10px] text-cyan-400">RBAC Gate</span>
            </div>
            <div className="text-center text-slate-600 font-bold">↓</div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-amber-400">{t.flowProxyGateway}</span>
                <p className="text-[11px] text-slate-400">{t.flowProxyGatewayDesc}</p>
              </div>
              <span className="text-[10px] text-amber-400">Routing</span>
            </div>
            <div className="text-center text-slate-600 font-bold">↓</div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-purple-400">{t.flowConnectionManager}</span>
                <p className="text-[11px] text-slate-400">{t.flowConnectionManagerDesc}</p>
              </div>
              <span className="text-[10px] text-purple-400">Pool (64 Keep-Alive)</span>
            </div>
            <div className="text-center text-slate-600 font-bold">↓</div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-white">{t.flowTargetNetwork}</span>
                <p className="text-[11px] text-slate-400">{t.flowTargetNetworkDesc}</p>
              </div>
              <span className="text-[10px] text-emerald-400">Egress</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
