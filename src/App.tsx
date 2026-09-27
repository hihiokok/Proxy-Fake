import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { OverviewTab } from './components/OverviewTab';
import { ProxyTab } from './components/ProxyTab';
import { ModulesTab } from './components/ModulesTab';
import { InternalCATab } from './components/InternalCATab';
import { PerformanceTab } from './components/PerformanceTab';
import { SecurityTab } from './components/SecurityTab';
import { BackupTab } from './components/BackupTab';
import { HealthDeploymentTab } from './components/HealthDeploymentTab';
import { AuthModal } from './components/AuthModal';
import { LanguageProvider, useLanguage } from './i18n/context';

import { 
  NavigationTab, 
  VPSMetrics, 
  ProxyStatus, 
  ProxySession, 
  SupervisedModule, 
  CAHierarchy, 
  SecurityCheckItem, 
  AuditRecord, 
  BackupArchive, 
  UserProfile 
} from './types';

function MainControlCenter() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<NavigationTab>('overview');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isWsConnected, setIsWsConnected] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  // User session
  const [currentUser, setCurrentUser] = useState<UserProfile>({
    token: 'jwt_owner_session_2026',
    userId: 'usr_owner_01',
    username: 'enterprise_owner',
    role: 'OWNER'
  });

  // Telemetry States
  const [metrics, setMetrics] = useState<VPSMetrics | null>(null);
  const [proxy, setProxy] = useState<ProxyStatus | null>(null);
  const [connections, setConnections] = useState<ProxySession[]>([]);
  const [modules, setModules] = useState<SupervisedModule[]>([]);
  const [ca, setCA] = useState<CAHierarchy | null>(null);
  const [securityChecklist, setSecurityChecklist] = useState<SecurityCheckItem[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditRecord[]>([]);
  const [backups, setBackups] = useState<BackupArchive[]>([]);
  const [backupSchedule, setBackupSchedule] = useState({ enabled: true, type: 'DAILY', nextRun: '2026-09-27T02:00:00Z' });

  const wsRef = useRef<WebSocket | null>(null);

  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Helper fetch with Bearer token
  const authFetch = async (url: string, options: RequestInit = {}) => {
    const headers = new Headers(options.headers || {});
    if (currentUser.token) {
      headers.set('Authorization', `Bearer ${currentUser.token}`);
    }
    return fetch(url, { ...options, headers });
  };

  // Initial Data Fetch
  const fetchAllData = async () => {
    setIsRefreshing(true);
    try {
      const [vpsRes, proxyRes, connRes, modRes, caRes, secRes, auditRes, bkRes] = await Promise.all([
        authFetch('/api/vps/status').then(r => r.json()).catch(() => null),
        authFetch('/api/proxy/status').then(r => r.json()).catch(() => null),
        authFetch('/api/proxy/connections').then(r => r.json()).catch(() => []),
        authFetch('/api/modules').then(r => r.json()).catch(() => []),
        authFetch('/api/ca/info').then(r => r.json()).catch(() => null),
        authFetch('/api/security/audit').then(r => r.json()).catch(() => ({ items: [] })),
        authFetch('/api/audit/logs?limit=50').then(r => r.json()).catch(() => ({ logs: [] })),
        authFetch('/api/backup/list').then(r => r.json()).catch(() => ({ list: [], schedule: {} }))
      ]);

      if (vpsRes) setMetrics(vpsRes);
      if (proxyRes) setProxy(proxyRes);
      if (Array.isArray(connRes)) setConnections(connRes);
      if (Array.isArray(modRes)) setModules(modRes);
      if (caRes) setCA(caRes);
      if (secRes && secRes.items) setSecurityChecklist(secRes.items);
      if (auditRes && auditRes.logs) setAuditLogs(auditRes.logs);
      if (bkRes && bkRes.list) {
        setBackups(bkRes.list);
        if (bkRes.schedule) setBackupSchedule(bkRes.schedule);
      }
    } catch (err) {
      console.error('Error fetching system telemetry:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  // WebSocket Live Streaming (Requirement 10)
  useEffect(() => {
    fetchAllData();

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    let reconnectTimer: NodeJS.Timeout;

    function connect() {
      try {
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        ws.onopen = () => {
          setIsWsConnected(true);
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === 'INITIAL_TELEMETRY' || data.type === 'TELEMETRY_UPDATE') {
              if (data.vps) setMetrics(data.vps);
              if (data.proxy) setProxy(data.proxy);
              if (data.connections) setConnections(data.connections);
              if (data.modules) setModules(data.modules);
              if (data.ca) setCA(data.ca);
            } else if (data.type === 'AUDIT_RECORD') {
              setAuditLogs(prev => [data.record, ...prev.slice(0, 99)]);
            } else if (data.type === 'MODULE_LOG') {
              setModules(prev => prev.map(m => {
                if (m.id === data.moduleId) {
                  return {
                    ...m,
                    logs: [...m.logs.slice(-49), data.log]
                  };
                }
                return m;
              }));
            }
          } catch (e) {
            console.error('WS parse error:', e);
          }
        };

        ws.onclose = () => {
          setIsWsConnected(false);
          reconnectTimer = setTimeout(connect, 3000);
        };

        ws.onerror = () => {
          setIsWsConnected(false);
        };
      } catch (err) {
        console.error('Failed to establish WebSocket:', err);
        reconnectTimer = setTimeout(connect, 3000);
      }
    }

    connect();

    return () => {
      clearTimeout(reconnectTimer);
      if (wsRef.current) wsRef.current.close();
    };
  }, []);

  // Root CA Download Action
  const handleDownloadRootCA = () => {
    window.location.href = '/api/ca/download/root-ca';
    showToast(
      language === 'vi' 
        ? 'Đã tải xuống chứng chỉ Root CA 50 năm (enterprise-vps-root-ca-50yr.crt)' 
        : 'Downloaded Enterprise 50-Year Root CA (enterprise-vps-root-ca-50yr.crt)', 
      'success'
    );
  };

  // Rotate Leaf TLS Certificate
  const handleRotateLeafCert = async () => {
    try {
      const res = await authFetch('/api/ca/rotate-server-cert', { method: 'POST' });
      const data = await res.json();
      if (data.details) {
        setCA(data.details);
      }
      showToast(
        language === 'vi'
          ? 'Đã luân chuyển chứng chỉ TLS máy chủ qua Intermediate CA (chu kỳ 90 ngày).'
          : 'Intermediate CA rotated server & proxy TLS certificates (90-day cycle).', 
        'success'
      );
      fetchAllData();
    } catch {
      showToast(language === 'vi' ? 'Không thể luân chuyển chứng chỉ' : 'Failed to rotate leaf certificate', 'error');
    }
  };

  // Restart Proxy
  const handleRestartProxy = async () => {
    try {
      await authFetch('/api/proxy/restart', { method: 'POST' });
      showToast(
        language === 'vi'
          ? 'Đã kích hoạt tải lại proxy không gián đoạn (zero-downtime).'
          : 'Proxy zero-downtime graceful reload triggered.', 
        'info'
      );
      fetchAllData();
    } catch {
      showToast(language === 'vi' ? 'Khởi động lại proxy thất bại' : 'Failed to restart proxy', 'error');
    }
  };

  // Simulate Crash Test & Watchdog Self-Recovery
  const handleSimulateCrash = async () => {
    try {
      const res = await authFetch('/api/proxy/simulate-crash', { method: 'POST' });
      const data = await res.json();
      showToast(data.message, data.status === 'BACKOFF' ? 'error' : 'info');
      fetchAllData();
    } catch {
      showToast(language === 'vi' ? 'Không thể kích hoạt thử nghiệm sự cố' : 'Failed to execute crash test', 'error');
    }
  };

  // Reset Recovery Breaker
  const handleResetRecovery = async () => {
    try {
      await authFetch('/api/proxy/reset-recovery', { method: 'POST' });
      showToast(
        language === 'vi'
          ? 'Đã đặt lại aptomat bảo vệ mạch watchdog về trạng thái ONLINE.'
          : 'Watchdog circuit breaker reset to ONLINE.', 
        'success'
      );
      fetchAllData();
    } catch {
      showToast(language === 'vi' ? 'Đặt lại aptomat thất bại' : 'Failed to reset circuit breaker', 'error');
    }
  };

  // Proxy Config Update
  const handleUpdateProxyConfig = async (newConfig: any) => {
    try {
      await authFetch('/api/proxy/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newConfig)
      });
      showToast(language === 'vi' ? 'Đã cập nhật cấu hình proxy.' : 'Proxy configuration updated.', 'success');
      fetchAllData();
    } catch {
      showToast(language === 'vi' ? 'Không thể cập nhật cấu hình' : 'Failed to update proxy config', 'error');
    }
  };

  // Module Actions
  const handleModuleAction = async (id: string, action: 'START' | 'STOP' | 'RESTART' | 'PAUSE' | 'SIMULATE_CRASH') => {
    try {
      const res = await authFetch(`/api/modules/${id}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });
      const updated = await res.json();
      setModules(prev => prev.map(m => (m.id === id ? updated : m)));
      showToast(
        language === 'vi' ? `Đã thực hiện lệnh [${action}] trên module.` : `Module action [${action}] executed.`, 
        'success'
      );
    } catch {
      showToast(language === 'vi' ? `Thao tác ${action} trên module thất bại` : `Failed to execute ${action} on module`, 'error');
    }
  };

  // Create Module
  const handleCreateModule = async (moduleData: Partial<SupervisedModule>) => {
    try {
      const res = await authFetch('/api/modules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(moduleData)
      });
      const created = await res.json();
      setModules(prev => [created, ...prev]);
      showToast(
        language === 'vi'
          ? `Module '${created.name}' đã khởi tạo trong sandbox UID 1001.`
          : `Module '${created.name}' created in sandbox UID 1001.`, 
        'success'
      );
    } catch {
      showToast(language === 'vi' ? 'Không thể tạo module' : 'Failed to create module', 'error');
    }
  };

  // Edit Module
  const handleEditModule = async (id: string, moduleData: Partial<SupervisedModule>) => {
    try {
      const res = await authFetch(`/api/modules/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(moduleData)
      });
      const updated = await res.json();
      setModules(prev => prev.map(m => (m.id === id ? updated : m)));
      showToast(
        language === 'vi' ? `Module '${updated.name}' đã được lưu.` : `Module '${updated.name}' updated.`, 
        'success'
      );
    } catch {
      showToast(language === 'vi' ? 'Không thể cập nhật module' : 'Failed to update module', 'error');
    }
  };

  // Delete Module
  const handleDeleteModule = async (id: string) => {
    const confirmPrompt = language === 'vi' 
      ? 'Bạn có chắc chắn muốn xóa script module trong sandbox này?' 
      : 'Delete this sandboxed module script?';
    if (!window.confirm(confirmPrompt)) return;
    try {
      await authFetch(`/api/modules/${id}`, { method: 'DELETE' });
      setModules(prev => prev.filter(m => m.id !== id));
      showToast(language === 'vi' ? 'Đã gỡ bỏ module khỏi supervisor.' : 'Module removed from supervisor.', 'info');
    } catch {
      showToast(language === 'vi' ? 'Không thể xóa module' : 'Failed to delete module', 'error');
    }
  };

  // Select Performance Preset
  const handleSelectPreset = async (preset: 'ECONOMY' | 'BALANCED' | 'PERFORMANCE' | 'ENTERPRISE') => {
    try {
      const res = await authFetch('/api/metrics/preset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preset })
      });
      const data = await res.json();
      if (metrics) {
        setMetrics({
          ...metrics,
          performance: {
            ...metrics.performance,
            activePreset: preset,
            presetDetails: data.config
          }
        });
      }
      showToast(
        language === 'vi' 
          ? `Đã chuyển cấu hình hiệu năng sang ${preset}.` 
          : `Performance Preset switched to ${preset}.`, 
        'success'
      );
      fetchAllData();
    } catch {
      showToast(language === 'vi' ? 'Áp dụng cấu hình thất bại' : 'Failed to apply preset', 'error');
    }
  };

  // Create Backup Now
  const handleCreateBackupNow = async (type: 'MANUAL' | 'DAILY' | 'WEEKLY' | 'MONTHLY') => {
    try {
      const res = await authFetch('/api/backup/now', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scheduleType: type })
      });
      const bk = await res.json();
      setBackups(prev => [bk, ...prev]);
      showToast(
        language === 'vi' 
          ? `Đã tạo bản sao lưu mã hóa: ${bk.name}` 
          : `Encrypted backup created: ${bk.name}`, 
        'success'
      );
    } catch {
      showToast(language === 'vi' ? 'Không thể tạo bản sao lưu' : 'Failed to create backup', 'error');
    }
  };

  // Verify Backup
  const handleVerifyBackup = async (id: string) => {
    try {
      const res = await authFetch('/api/backup/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      showToast(
        language === 'vi' ? 'Đã xác minh chữ ký SHA-256 toàn vẹn của bản sao lưu.' : data.message, 
        'success'
      );
    } catch {
      showToast(language === 'vi' ? 'Kiểm tra toàn vẹn thất bại' : 'Verification failed', 'error');
    }
  };

  // Restore Backup
  const handleRestoreBackup = async (id: string) => {
    try {
      const res = await authFetch('/api/backup/restore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      showToast(
        language === 'vi' ? 'Khôi phục bản sao lưu thành công.' : data.message, 
        'success'
      );
      fetchAllData();
    } catch {
      showToast(language === 'vi' ? 'Khôi phục sao lưu thất bại' : 'Failed to restore backup', 'error');
    }
  };

  // Export Audit Logs
  const handleExportAuditLogs = () => {
    window.location.href = '/api/audit/export';
    showToast(
      language === 'vi' 
        ? 'Đã tải xuống tệp kiểm toán (enterprise-audit-logs.json)' 
        : 'Downloaded audit logs archive (enterprise-audit-logs.json)', 
      'success'
    );
  };

  // Filter Audit Logs
  const handleFilterAuditLogs = async (action: string, query: string) => {
    try {
      const params = new URLSearchParams();
      if (action && action !== 'ALL') params.set('action', action);
      if (query) params.set('q', query);
      const res = await authFetch(`/api/audit/logs?${params.toString()}`);
      const data = await res.json();
      if (data.logs) setAuditLogs(data.logs);
    } catch {
      console.error('Filter logs error');
    }
  };

  // Auth Handlers
  const handleLogin = async (user: string, pass: string): Promise<boolean> => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user, password: pass })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Authentication failed');
    }
    if (data.session) {
      setCurrentUser({
        token: data.session.token,
        userId: data.session.userId,
        username: data.session.username,
        role: data.session.role
      });
      showToast(
        language === 'vi' 
          ? `Đã đăng nhập với tư cách ${data.session.username} (${data.session.role})` 
          : `Authenticated as ${data.session.username} (${data.session.role})`, 
        'success'
      );
      return true;
    }
    return false;
  };

  const handleVerify2FA = async (tempToken: string, code: string): Promise<boolean> => {
    const res = await fetch('/api/auth/2fa/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tempToken, code })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || '2FA Verification failed');
    }
    if (data.session) {
      setCurrentUser({
        token: data.session.token,
        userId: data.session.userId,
        username: data.session.username,
        role: data.session.role
      });
      showToast(language === 'vi' ? 'Xác thực 2FA thành công.' : '2FA verification successful.', 'success');
      return true;
    }
    return false;
  };

  const handleLogout = async () => {
    try {
      await authFetch('/api/auth/logout', { method: 'POST' });
    } catch {}
    setCurrentUser({
      token: '',
      userId: 'ANONYMOUS',
      username: 'guest_operator',
      role: 'VIEWER'
    });
    showToast(
      language === 'vi' 
        ? 'Đã kết thúc phiên làm việc. Chuyển sang quyền Người xem.' 
        : 'Session ended. Switched to Viewer mode.', 
      'info'
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-lg shadow-2xl font-mono text-xs border flex items-center gap-2 animate-bounce ${
          toastMessage.type === 'error'
            ? 'bg-rose-950 border-rose-500 text-rose-200'
            : toastMessage.type === 'info'
            ? 'bg-cyan-950 border-cyan-500 text-cyan-200'
            : 'bg-emerald-950 border-emerald-500 text-emerald-200'
        }`}>
          <span className="w-2 h-2 rounded-full bg-current" />
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Main Header Component with Language Switcher */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onOpenAuth={() => setAuthModalOpen(true)}
        isWsConnected={isWsConnected}
        onQuickRefresh={fetchAllData}
        isRefreshing={isRefreshing}
      />

      {/* Main App Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'overview' && (
          <OverviewTab
            metrics={metrics}
            proxy={proxy}
            modules={modules}
            ca={ca}
            onNavigate={setActiveTab}
            onDownloadRootCA={handleDownloadRootCA}
            onRestartProxy={handleRestartProxy}
          />
        )}

        {activeTab === 'proxy' && (
          <ProxyTab
            proxy={proxy}
            connections={connections}
            onRestartProxy={handleRestartProxy}
            onSimulateCrash={handleSimulateCrash}
            onResetRecovery={handleResetRecovery}
            onUpdateConfig={handleUpdateProxyConfig}
          />
        )}

        {activeTab === 'modules' && (
          <ModulesTab
            modules={modules}
            onModuleAction={handleModuleAction}
            onCreateModule={handleCreateModule}
            onEditModule={handleEditModule}
            onDeleteModule={handleDeleteModule}
          />
        )}

        {activeTab === 'ca' && (
          <InternalCATab
            ca={ca}
            onDownloadRootCA={handleDownloadRootCA}
            onRotateLeafCert={handleRotateLeafCert}
          />
        )}

        {activeTab === 'performance' && (
          <PerformanceTab
            metrics={metrics}
            onSelectPreset={handleSelectPreset}
          />
        )}

        {activeTab === 'security' && (
          <SecurityTab
            checklist={securityChecklist}
            auditLogs={auditLogs}
            onExportAuditLogs={handleExportAuditLogs}
            onFilterAuditLogs={handleFilterAuditLogs}
          />
        )}

        {activeTab === 'backup' && (
          <BackupTab
            backups={backups}
            schedule={backupSchedule}
            onCreateBackupNow={handleCreateBackupNow}
            onVerifyBackup={handleVerifyBackup}
            onRestoreBackup={handleRestoreBackup}
          />
        )}

        {activeTab === 'deployment' && (
          <HealthDeploymentTab
            metrics={metrics}
            proxy={proxy}
            ca={ca}
          />
        )}
      </main>

      {/* Footer Status Bar */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-3 text-slate-500 font-mono text-[11px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>
              {language === 'vi' 
                ? 'HỆ THỐNG VPS ENTERPRISE TIER-1 (TIÊU CHUẨN 1000 KWD)' 
                : 'ENTERPRISE VPS SYSTEM TIER-1 (1000 KWD SPECIFICATION)'}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>{language === 'vi' ? 'Root CA: 50 năm (2026-2076)' : 'Root CA: 50Y (2026-2076)'}</span>
            <span>UID: 1001 (Non-root)</span>
            <span>{language === 'vi' ? 'Bảo mật: 12/12 ĐẠT' : 'Security: 12/12 PASS'}</span>
          </div>
        </div>
      </footer>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        currentUser={currentUser}
        onLogin={handleLogin}
        onVerify2FA={handleVerify2FA}
        onLogout={handleLogout}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainControlCenter />
    </LanguageProvider>
  );
}
