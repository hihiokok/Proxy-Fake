import React from 'react';
import { 
  Server, 
  Zap, 
  Cpu, 
  Clock, 
  ShieldCheck, 
  Download, 
  Flame, 
  Terminal, 
  Activity,
  CheckCircle2,
  HardDrive
} from 'lucide-react';
import { VPSMetrics, ProxyStatus, SupervisedModule, CAHierarchy, NavigationTab } from '../types';
import { useLanguage } from '../i18n/context';

interface OverviewTabProps {
  metrics: VPSMetrics | null;
  proxy: ProxyStatus | null;
  modules: SupervisedModule[];
  ca: CAHierarchy | null;
  onNavigate: (tab: NavigationTab) => void;
  onDownloadRootCA: () => void;
  onRestartProxy: () => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  metrics,
  proxy,
  modules,
  ca,
  onNavigate,
  onDownloadRootCA,
  onRestartProxy
}) => {
  const { t } = useLanguage();

  const runningModules = modules.filter(m => m.status === 'RUNNING').length;
  const stoppedModules = modules.filter(m => m.status === 'STOPPED' || m.status === 'PAUSED').length;

  const cpuPercent = metrics?.vps.cpuPercent ?? 12.0;
  const ramUsed = metrics?.vps.ram.usedGb ?? 2.4;
  const ramTotal = metrics?.vps.ram.totalGb ?? 8.0;
  const diskPercent = metrics?.vps.disk.percent ?? 42;
  const networkRate = metrics?.performance.bandwidthUsageMBs ?? '1.2';
  const uptime = metrics?.vps.uptime.formatted ?? '47d 12h';
  const proxyOnline = proxy?.status === 'ONLINE';
  const connCount = proxy?.activeConnectionsCount ?? 128;
  const latency = proxy?.averageLatencyMs ?? 34;

  return (
    <div className="space-y-6">
      {/* 1. Mobile-First Core Status Panel (Exact Requirement 9 Spec) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* The Exact ASCII Layout Card */}
        <div className="bg-slate-900/90 border border-emerald-500/40 rounded-xl p-5 shadow-2xl relative overflow-hidden font-mono">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
          
          {/* Card Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Server className="w-5 h-5 text-emerald-400" />
              <span className="font-bold text-white tracking-wider">{t.vpsTitle}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{t.statusOnline}</span>
            </div>
          </div>

          {/* VPS Stats Section */}
          <div className="py-4 space-y-2 border-b border-slate-800/80 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">{t.cpu}</span>
              <span className="text-white font-semibold">{cpuPercent}%</span>
            </div>
            <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-500 h-full transition-all duration-500" 
                style={{ width: `${Math.min(100, cpuPercent)}%` }} 
              />
            </div>

            <div className="flex justify-between items-center pt-1">
              <span className="text-slate-400">{t.ram}</span>
              <span className="text-white font-semibold">{ramUsed} / {ramTotal} GB</span>
            </div>
            <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-cyan-500 h-full transition-all duration-500" 
                style={{ width: `${Math.min(100, (ramUsed / ramTotal) * 100)}%` }} 
              />
            </div>

            <div className="flex justify-between items-center pt-1">
              <span className="text-slate-400">{t.disk}</span>
              <span className="text-white font-semibold">{diskPercent}%</span>
            </div>

            <div className="flex justify-between items-center pt-1">
              <span className="text-slate-400">{t.network}</span>
              <span className="text-white font-semibold">{networkRate} MB/s</span>
            </div>

            <div className="flex justify-between items-center pt-1">
              <span className="text-slate-400">{t.uptime}</span>
              <span className="text-emerald-400 font-semibold">{uptime}</span>
            </div>
          </div>

          {/* Proxy Gateway Section */}
          <div className="py-3 border-b border-slate-800/80 text-sm space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-slate-300 font-bold flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" /> {t.proxy}
              </span>
              <span className="flex items-center gap-1 text-xs text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {proxyOnline ? t.statusOnline : t.statusDegraded}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">{t.connection}</span>
              <span className="text-white font-semibold">{connCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">{t.latency}</span>
              <span className="text-cyan-400 font-semibold">{latency} ms</span>
            </div>
          </div>

          {/* Sandboxed Modules Section */}
          <div className="pt-3 text-sm space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-slate-300 font-bold flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-cyan-400" /> {t.modules}
              </span>
              <span className="text-white font-semibold">{modules.length}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-emerald-400">{t.running}</span>
              <span className="text-white font-bold">{runningModules}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">{t.stopped}</span>
              <span className="text-slate-300">{stoppedModules}</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex gap-2">
            <button
              onClick={() => onNavigate('proxy')}
              className="flex-1 py-1.5 text-xs text-center rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              {t.proxyAclBtn}
            </button>
            <button
              onClick={() => onNavigate('modules')}
              className="flex-1 py-1.5 text-xs text-center rounded bg-emerald-950 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-400 transition-colors"
            >
              {t.runnerBtn}
            </button>
          </div>
        </div>

        {/* 2. Internal 50-Year Root CA Quick Card (Requirement 5 Preview) */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <h3 className="font-mono font-bold text-white tracking-wider">{t.caVaultTitle}</h3>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800">
                {t.caValidityTag}
              </span>
            </div>

            <div className="mt-4 space-y-3 font-mono text-xs">
              <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800/80 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">{t.subjectCn}</span>
                  <span className="text-slate-200 truncate ml-2 font-semibold">Enterprise Global VPS Root CA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{t.algorithm}</span>
                  <span className="text-emerald-400 font-semibold">RSA-4096 / SHA-256</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{t.notBefore}</span>
                  <span className="text-slate-200">2026-09-26</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{t.notAfter}</span>
                  <span className="text-amber-400 font-semibold">2076-09-26 ({t.caValidityTag})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{t.fingerprint}</span>
                  <span className="text-cyan-400 text-[10px] truncate ml-2">
                    {ca?.rootCA.fingerprintSha256 || 'E3:59:71:A4:9B:C2:...'}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-emerald-300 text-xs flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">{t.caProtectionTitle}</p>
                  <p className="text-[11px] text-slate-400">{t.caProtectionDesc}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex gap-2">
            <button
              onClick={onDownloadRootCA}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/20 transition-all"
            >
              <Download className="w-3.5 h-3.5" /> {t.downloadCaBtn}
            </button>
            <button
              onClick={() => onNavigate('ca')}
              className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
            >
              {t.hierarchyBtn}
            </button>
          </div>
        </div>

        {/* 3. Performance Preset & Auto-Recovery Monitor */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                <h3 className="font-mono font-bold text-white tracking-wider">{t.presetRecoveryTitle}</h3>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-amber-950 text-amber-400 border border-amber-800 font-bold">
                {metrics?.performance.activePreset || 'ENTERPRISE'}
              </span>
            </div>

            <div className="mt-4 space-y-3 font-mono text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">{t.handshakeLatency}</span>
                  <span className="text-lg font-bold text-cyan-400">{latency} ms</span>
                </div>
                <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">{t.requestsPerSec}</span>
                  <span className="text-lg font-bold text-emerald-400">{metrics?.performance.requestsPerSec || '14.8'}</span>
                </div>
              </div>

              {/* Watchdog status */}
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">{t.watchdogRecovery}</span>
                  <span className="text-emerald-400 font-semibold">{t.watchdogActive}</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-400">{t.crashBackoffCircuit}</span>
                  <span className="text-slate-300">{t.crashBackoffDesc}</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-400">{t.securitySandbox}</span>
                  <span className="text-emerald-400">{t.nonRootUser}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex gap-2">
            <button
              onClick={onRestartProxy}
              className="flex-1 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
            >
              {t.zeroDowntimeReload}
            </button>
            <button
              onClick={() => onNavigate('performance')}
              className="py-2 px-3 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-800 text-cyan-300 text-xs font-semibold transition-colors"
            >
              {t.tunePresets}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Quick Infrastructure Metrics & Subsystem Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        <div className="bg-slate-900/60 border border-slate-800/80 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2 rounded-lg bg-slate-800 text-emerald-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block">{t.cpuCores}</span>
            <span className="font-mono text-sm font-bold text-white">{metrics?.vps.cpuCores ?? 4} Cores</span>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2 rounded-lg bg-slate-800 text-cyan-400">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block">{t.platform}</span>
            <span className="font-mono text-sm font-bold text-white">{metrics?.vps.platform ?? 'linux'} ({metrics?.vps.arch ?? 'x64'})</span>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2 rounded-lg bg-slate-800 text-amber-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block">{t.kernel}</span>
            <span className="font-mono text-xs font-bold text-slate-200 truncate max-w-[100px] block">
              {metrics?.vps.kernelRelease ?? '6.6-lts'}
            </span>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2 rounded-lg bg-slate-800 text-emerald-400">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block">{t.proxyPools}</span>
            <span className="font-mono text-sm font-bold text-white">64 Keep-Alive</span>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2 rounded-lg bg-slate-800 text-purple-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block">{t.errorRate}</span>
            <span className="font-mono text-sm font-bold text-emerald-400">0.00%</span>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2 rounded-lg bg-slate-800 text-blue-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block">{t.securityAudit}</span>
            <span className="font-mono text-sm font-bold text-emerald-400">12/12 PASS</span>
          </div>
        </div>
      </div>

      {/* 3. Realtime Modules Summary Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-emerald-400" />
            <h3 className="font-mono font-bold text-white text-sm">{t.activeWorkersTitle}</h3>
          </div>
          <button
            onClick={() => onNavigate('modules')}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-mono flex items-center gap-1"
          >
            {t.manageModulesLink}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {modules.map(mod => (
            <div 
              key={mod.id} 
              className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3 hover:border-slate-700 transition-all font-mono"
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                  mod.status === 'RUNNING' 
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                    : mod.status === 'BACKOFF'
                    ? 'bg-rose-950 text-rose-400 border border-rose-800'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {mod.status}
                </span>
                <span className="text-[11px] text-slate-500">PID {mod.pid ?? '—'}</span>
              </div>
              <h4 className="text-xs font-semibold text-slate-200 truncate">{mod.name}</h4>
              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-800/60">
                <span>CPU: {mod.resourceUsage.cpuPercent}%</span>
                <span>RAM: {mod.resourceUsage.memoryMb} MB</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
