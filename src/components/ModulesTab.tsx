import React, { useState } from 'react';
import { 
  Terminal, 
  Play, 
  Square, 
  RefreshCw, 
  Pause, 
  FileText, 
  Edit3, 
  Trash2, 
  Plus, 
  AlertTriangle, 
  ShieldCheck, 
  Cpu, 
  HardDrive,
  CheckCircle2,
  Clock,
  X
} from 'lucide-react';
import { SupervisedModule } from '../types';
import { useLanguage } from '../i18n/context';

interface ModulesTabProps {
  modules: SupervisedModule[];
  onModuleAction: (id: string, action: 'START' | 'STOP' | 'RESTART' | 'PAUSE' | 'SIMULATE_CRASH') => void;
  onCreateModule: (moduleData: Partial<SupervisedModule>) => void;
  onEditModule: (id: string, moduleData: Partial<SupervisedModule>) => void;
  onDeleteModule: (id: string) => void;
}

export const ModulesTab: React.FC<ModulesTabProps> = ({
  modules,
  onModuleAction,
  onCreateModule,
  onEditModule,
  onDeleteModule
}) => {
  const { t, language } = useLanguage();
  const [selectedModule, setSelectedModule] = useState<SupervisedModule | null>(null);
  const [viewLogsModule, setViewLogsModule] = useState<SupervisedModule | null>(null);
  const [editModuleModal, setEditModuleModal] = useState<SupervisedModule | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // New module state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    language: 'nodejs' as 'nodejs' | 'python' | 'bash' | 'go',
    code: '',
    cpuLimitPercent: 15,
    memoryLimitMb: 128,
    networkPolicy: 'RESTRICTED_INTERNAL' as 'ALLOW_ALL' | 'RESTRICTED_INTERNAL' | 'ISOLATED_NO_NET'
  });

  const handleOpenEdit = (mod: SupervisedModule) => {
    setEditModuleModal(mod);
    setFormData({
      name: mod.name,
      description: mod.description,
      language: mod.language,
      code: mod.code,
      cpuLimitPercent: mod.limits.cpuLimitPercent,
      memoryLimitMb: mod.limits.memoryLimitMb,
      networkPolicy: mod.limits.networkPolicy
    });
  };

  const handleSaveEdit = () => {
    if (editModuleModal) {
      onEditModule(editModuleModal.id, {
        name: formData.name,
        description: formData.description,
        code: formData.code,
        limits: {
          ...editModuleModal.limits,
          cpuLimitPercent: Number(formData.cpuLimitPercent),
          memoryLimitMb: Number(formData.memoryLimitMb),
          networkPolicy: formData.networkPolicy
        }
      });
      setEditModuleModal(null);
    }
  };

  const handleSaveCreate = () => {
    if (formData.name.trim()) {
      onCreateModule({
        name: formData.name,
        description: formData.description,
        language: formData.language,
        code: formData.code || '// Sandboxed Worker Script\nconsole.log("Worker initialized.");',
        limits: {
          cpuLimitPercent: Number(formData.cpuLimitPercent),
          memoryLimitMb: Number(formData.memoryLimitMb),
          maxProcesses: 1,
          timeoutSeconds: 120,
          networkPolicy: formData.networkPolicy,
          filesystemSandboxPath: `/opt/vps/sandbox/${formData.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`
        }
      });
      setIsCreatingNew(false);
      setFormData({
        name: '',
        description: '',
        language: 'nodejs',
        code: '',
        cpuLimitPercent: 15,
        memoryLimitMb: 128,
        networkPolicy: 'RESTRICTED_INTERNAL'
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Creator */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono">
        <div>
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-emerald-400" />
            <h2 className="font-bold text-white text-base">{t.processRunnerTitle}</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {t.processRunnerSubtitle}
          </p>
        </div>

        <button
          onClick={() => {
            setFormData({
              name: 'Worker ' + (modules.length + 1),
              description: 'Custom sandboxed worker script',
              language: 'nodejs',
              code: '// Sandboxed Node.js Worker\nconsole.log("Worker task started in sandbox UID 1001");',
              cpuLimitPercent: 15,
              memoryLimitMb: 128,
              networkPolicy: 'RESTRICTED_INTERNAL'
            });
            setIsCreatingNew(true);
          }}
          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-600/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> {t.createModuleBtn}
        </button>
      </div>

      {/* Modules List */}
      <div className="grid grid-cols-1 gap-4 font-mono">
        {modules.length === 0 ? (
          <div className="p-8 text-center text-slate-500 bg-slate-900/50 rounded-xl border border-slate-800">
            {language === 'vi' ? 'Chưa có module nào. Hãy tạo module đầu tiên.' : 'No modules configured. Create your first sandboxed module.'}
          </div>
        ) : (
          modules.map(mod => {
            const isRunning = mod.status === 'RUNNING';
            const isBackoff = mod.status === 'BACKOFF';
            const isPaused = mod.status === 'PAUSED';

            return (
              <div
                key={mod.id}
                className={`bg-slate-900/90 border rounded-xl p-5 shadow-xl transition-all ${
                  isRunning 
                    ? 'border-slate-800 hover:border-emerald-500/40' 
                    : isBackoff
                    ? 'border-rose-800/80 bg-rose-950/20'
                    : 'border-slate-800/80'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Info block */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-white text-sm">{mod.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                        {mod.language}
                      </span>
                      <span className="text-[10px] text-slate-500">v{mod.version}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                        isRunning
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-600'
                          : isBackoff
                          ? 'bg-rose-950 text-rose-400 border border-rose-600 animate-pulse'
                          : isPaused
                          ? 'bg-amber-950 text-amber-400 border border-amber-600'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}>
                        ● {mod.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-1">{mod.description}</p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 pt-1">
                      <span>PID: <strong className="text-slate-200">{mod.pid || '—'}</strong></span>
                      <span>{t.moduleUptime}: <strong className="text-slate-200">{mod.uptimeSeconds}s</strong></span>
                      <span>{t.moduleRestarts}: <strong className="text-slate-200">{mod.restartsCount}</strong></span>
                      <span>{t.moduleExitCode}: <strong className="text-slate-200">{mod.lastExitCode ?? 'None'}</strong></span>
                      <span>{t.moduleUser}: <strong className="text-emerald-400">{mod.runAsUser}</strong></span>
                    </div>

                    {/* Sandboxed Resource Limits Gauges */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px]">
                      <div className="bg-slate-950/70 p-2 rounded border border-slate-800">
                        <span className="text-slate-400 block">{t.cpuUsageQuota}</span>
                        <span className="text-emerald-400 font-bold">{mod.resourceUsage.cpuPercent}%</span>
                        <span className="text-slate-500"> / max {mod.limits.cpuLimitPercent}%</span>
                      </div>

                      <div className="bg-slate-950/70 p-2 rounded border border-slate-800">
                        <span className="text-slate-400 block">{t.ramUsageQuota}</span>
                        <span className="text-cyan-400 font-bold">{mod.resourceUsage.memoryMb} MB</span>
                        <span className="text-slate-500"> / max {mod.limits.memoryLimitMb} MB</span>
                      </div>

                      <div className="bg-slate-950/70 p-2 rounded border border-slate-800">
                        <span className="text-slate-400 block">{t.networkPolicy}</span>
                        <span className="text-slate-200 font-semibold truncate block">{mod.limits.networkPolicy}</span>
                      </div>

                      <div className="bg-slate-950/70 p-2 rounded border border-slate-800">
                        <span className="text-slate-400 block">{t.sandboxPath}</span>
                        <span className="text-slate-400 truncate block text-[10px]" title={mod.limits.filesystemSandboxPath}>
                          {mod.limits.filesystemSandboxPath}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Operations Toolbar */}
                  <div className="flex flex-wrap lg:flex-col gap-1.5 shrink-0 justify-end">
                    <div className="flex gap-1.5">
                      {isRunning ? (
                        <>
                          <button
                            onClick={() => onModuleAction(mod.id, 'PAUSE')}
                            title="PAUSE"
                            className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs flex items-center gap-1 border border-slate-700"
                          >
                            <Pause className="w-3.5 h-3.5" /> {t.btnPause}
                          </button>
                          <button
                            onClick={() => onModuleAction(mod.id, 'STOP')}
                            title="STOP"
                            className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-rose-400 text-xs flex items-center gap-1 border border-slate-700"
                          >
                            <Square className="w-3.5 h-3.5" /> {t.btnStop}
                          </button>
                          <button
                            onClick={() => onModuleAction(mod.id, 'RESTART')}
                            title="RESTART"
                            className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs flex items-center gap-1 border border-slate-700"
                          >
                            <RefreshCw className="w-3.5 h-3.5" /> {t.btnRestart}
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => onModuleAction(mod.id, 'START')}
                          title="START"
                          className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 shadow-md shadow-emerald-600/20"
                        >
                          <Play className="w-3.5 h-3.5" /> {t.btnStart}
                        </button>
                      )}
                    </div>

                    <div className="flex gap-1.5">
                      <button
                        onClick={() => setViewLogsModule(mod)}
                        className="px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 border border-slate-700"
                      >
                        <FileText className="w-3.5 h-3.5" /> {t.btnLogs} ({mod.logs.length})
                      </button>
                      <button
                        onClick={() => handleOpenEdit(mod)}
                        className="px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 border border-slate-700"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> {t.btnEdit}
                      </button>
                      {isRunning && (
                        <button
                          onClick={() => onModuleAction(mod.id, 'SIMULATE_CRASH')}
                          title={language === 'vi' ? 'Mô phỏng sập tiến trình (Exit 137) để kiểm tra tự phục hồi' : 'Simulate crash (Exit code 137) to test watchdog self-recovery'}
                          className="px-2 py-1 rounded bg-rose-950/60 hover:bg-rose-900 border border-rose-800/70 text-rose-300 text-[11px] flex items-center gap-1"
                        >
                          <AlertTriangle className="w-3 h-3" /> {t.btnCrashTest}
                        </button>
                      )}
                      <button
                        onClick={() => onDeleteModule(mod.id)}
                        className="px-2 py-1 rounded bg-slate-800/80 hover:bg-rose-950 hover:text-rose-400 text-slate-400 text-xs border border-slate-700 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* MODAL 1: Real-Time Log Viewer */}
      {viewLogsModule && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-white text-sm">{language === 'vi' ? 'NHẬT KÝ SANDBOX:' : 'SANDBOX LOGS:'} {viewLogsModule.name}</h3>
              </div>
              <button
                onClick={() => setViewLogsModule(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 bg-black/90 space-y-1.5 text-slate-300 select-text font-mono">
              {viewLogsModule.logs.length === 0 ? (
                <div className="text-slate-500 py-8 text-center">{language === 'vi' ? 'Chưa có nhật ký nào được ghi lại.' : 'No logs generated yet.'}</div>
              ) : (
                viewLogsModule.logs.map((log, i) => (
                  <div key={i} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-slate-500 shrink-0">[{log.timestamp.split('T')[1]?.replace('Z', '') || ''}]</span>
                    <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold shrink-0 ${
                      log.level === 'ERROR' ? 'bg-rose-950 text-rose-400' :
                      log.level === 'WARN' ? 'bg-amber-950 text-amber-400' :
                      'bg-slate-800 text-emerald-400'
                    }`}>
                      {log.level}
                    </span>
                    <span className={log.level === 'ERROR' ? 'text-rose-300' : 'text-slate-200'}>
                      {log.message}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="p-3 border-t border-slate-800 bg-slate-950 flex justify-between items-center text-[11px] text-slate-400">
              <span>Path: {viewLogsModule.limits.filesystemSandboxPath}/stdout.log</span>
              <button
                onClick={() => setViewLogsModule(null)}
                className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200"
              >
                {t.btnClose}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Create / Edit Module Code & Sandbox Quotas */}
      {(editModuleModal || isCreatingNew) && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-white text-sm">
                  {isCreatingNew ? (language === 'vi' ? 'TẠO MODULE SANDBOX MỚI' : 'CREATE SANDBOXED MODULE') : `${language === 'vi' ? 'CHỈNH SỬA MODULE:' : 'EDIT MODULE:'} ${editModuleModal?.name}`}
                </h3>
              </div>
              <button
                onClick={() => {
                  setEditModuleModal(null);
                  setIsCreatingNew(false);
                }}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto flex-1 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">{t.moduleName}</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 focus:outline-none"
                    placeholder="e.g. Proxy Session Cleaner"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">{t.runtimeLanguage}</label>
                  <select
                    value={formData.language}
                    onChange={e => setFormData({ ...formData, language: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="nodejs">Node.js (v22 Engine)</option>
                    <option value="python">Python 3.12 (Isolated venv)</option>
                    <option value="bash">Bash / Shell (Sandboxed)</option>
                    <option value="go">Go 1.22 Runtime</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">{t.description}</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 focus:outline-none"
                  placeholder="Module functional responsibilities..."
                />
              </div>

              {/* Resource Quotas */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-3">
                <span className="font-bold text-slate-300 block text-[11px] uppercase tracking-wider">
                  {t.sandboxResourceQuotas}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-slate-400 block text-[11px] mb-1">{t.maxCpuLimit}</label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={formData.cpuLimitPercent}
                      onChange={e => setFormData({ ...formData, cpuLimitPercent: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block text-[11px] mb-1">{t.maxRamLimit}</label>
                    <input
                      type="number"
                      min="16"
                      max="4096"
                      value={formData.memoryLimitMb}
                      onChange={e => setFormData({ ...formData, memoryLimitMb: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block text-[11px] mb-1">{t.networkPolicy}</label>
                    <select
                      value={formData.networkPolicy}
                      onChange={e => setFormData({ ...formData, networkPolicy: e.target.value as any })}
                      className="w-full px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-white"
                    >
                      <option value="RESTRICTED_INTERNAL">{language === 'vi' ? 'Chỉ nội bộ VPS' : 'Restricted Internal Only'}</option>
                      <option value="ALLOW_ALL">{language === 'vi' ? 'Cho phép kết nối Internet' : 'Allow Outbound Internet'}</option>
                      <option value="ISOLATED_NO_NET">{language === 'vi' ? 'Cách ly hoàn toàn (Không mạng)' : 'Isolated (Zero Network)'}</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Code Box */}
              <div>
                <label className="text-slate-400 block mb-1">{t.scriptContent}</label>
                <textarea
                  value={formData.code}
                  onChange={e => setFormData({ ...formData, code: e.target.value })}
                  rows={10}
                  className="w-full p-3 rounded-lg bg-black border border-slate-800 text-emerald-400 font-mono text-xs focus:border-emerald-500 focus:outline-none"
                  placeholder="// Enter code here..."
                />
              </div>
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end gap-2">
              <button
                onClick={() => {
                  setEditModuleModal(null);
                  setIsCreatingNew(false);
                }}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
              >
                {t.btnCancel}
              </button>
              <button
                onClick={isCreatingNew ? handleSaveCreate : handleSaveEdit}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-600/20"
              >
                {isCreatingNew ? (language === 'vi' ? 'Khởi tạo Module' : 'Create Sandboxed Module') : (language === 'vi' ? 'Lưu thay đổi' : 'Save Changes')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
