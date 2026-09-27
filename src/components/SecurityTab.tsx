import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Download, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  Filter,
  Eye,
  X
} from 'lucide-react';
import { SecurityCheckItem, AuditRecord } from '../types';
import { useLanguage } from '../i18n/context';

interface SecurityTabProps {
  checklist: SecurityCheckItem[];
  auditLogs: AuditRecord[];
  onExportAuditLogs: () => void;
  onFilterAuditLogs: (action: string, query: string) => void;
}

export const SecurityTab: React.FC<SecurityTabProps> = ({
  checklist,
  auditLogs,
  onExportAuditLogs,
  onFilterAuditLogs
}) => {
  const { t, language } = useLanguage();
  const [activeView, setActiveView] = useState<'checklist' | 'audit'>('checklist');
  const [selectedActionFilter, setSelectedActionFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectRecord, setInspectRecord] = useState<AuditRecord | null>(null);

  const handleActionChange = (action: string) => {
    setSelectedActionFilter(action);
    onFilterAuditLogs(action, searchQuery);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    onFilterAuditLogs(selectedActionFilter, query);
  };

  const actionsList = [
    'ALL',
    'LOGIN',
    'LOGOUT',
    'START',
    'STOP',
    'RESTART',
    'PROXY CHANGE',
    'CA DOWNLOAD',
    'CONFIG CHANGE',
    'BACKUP',
    'RESTORE',
    'CRASH_DETECTED',
    'AUTO_RECOVERY'
  ];

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Top Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="font-bold text-white text-base">{t.securityTitle}</h2>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            {t.securitySubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('checklist')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeView === 'checklist'
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/50 font-bold'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {t.twelvePointChecklist} ({checklist.length})
          </button>
          <button
            onClick={() => setActiveView('audit')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeView === 'audit'
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/50 font-bold'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {t.auditTrail} ({auditLogs.length})
          </button>
        </div>
      </div>

      {/* VIEW 1: TECHNICAL CHECKLIST */}
      {activeView === 'checklist' && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span className="font-bold text-white text-sm">{t.securityStatusVerified}</span>
            </div>
            <span className="text-[11px] text-slate-400">{t.enterpriseComplianceStandard}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {checklist.map(item => (
              <div
                key={item.id}
                className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                      {item.category}
                    </span>
                    <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {language === 'vi' ? 'ĐÃ ĐẠT' : 'VERIFIED'}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-sm mb-1">{item.name}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed mb-3">{item.details}</p>
                </div>

                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-slate-500 text-[10px] block">{t.technicalRule}:</span>
                  <code className="text-emerald-400 text-[11px] truncate block" title={item.technicalRule}>
                    {item.technicalRule}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: AUDIT LOG */}
      {activeView === 'audit' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
          {/* Controls Bar */}
          <div className="p-4 border-b border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-slate-950/70">
            <div className="flex flex-wrap items-center gap-2 flex-1">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => handleSearchChange(e.target.value)}
                  placeholder={language === 'vi' ? 'Tìm người dùng, tài nguyên, IP...' : 'Search user, resource, IP...'}
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white focus:border-emerald-500 focus:outline-none text-xs"
                />
              </div>

              <select
                value={selectedActionFilter}
                onChange={e => handleActionChange(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:border-emerald-500 focus:outline-none"
              >
                {actionsList.map(a => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            <button
              onClick={onExportAuditLogs}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all self-start lg:self-auto"
            >
              <Download className="w-3.5 h-3.5" /> {t.exportJson}
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto max-h-[600px]">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3">{t.timestampUtc}</th>
                  <th className="px-4 py-3">{t.userIdentity}</th>
                  <th className="px-4 py-3">{t.actionCol}</th>
                  <th className="px-4 py-3">{t.callerIp}</th>
                  <th className="px-4 py-3">{t.targetResource}</th>
                  <th className="px-4 py-3">{t.resultCol}</th>
                  <th className="px-4 py-3 text-right">{t.inspectCol}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {auditLogs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-6 text-center text-slate-500">
                      {language === 'vi' ? 'Không tìm thấy bản ghi nhật ký phù hợp' : 'No audit records match the query.'}
                    </td>
                  </tr>
                ) : (
                  auditLogs.map(log => (
                    <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-4 py-3 text-slate-400 whitespace-nowrap">
                        {log.timestamp.replace('T', ' ').substring(0, 19)}
                      </td>
                      <td className="px-4 py-3 font-semibold text-white">{log.user_id}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          log.action.includes('CRASH') ? 'bg-rose-950 text-rose-400' :
                          log.action.includes('RESTART') ? 'bg-cyan-950 text-cyan-400' :
                          log.action.includes('LOGIN') ? 'bg-blue-950 text-blue-400' :
                          log.action.includes('BACKUP') ? 'bg-purple-950 text-purple-400' :
                          'bg-slate-800 text-emerald-400'
                        }`}>
                          {log.action}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-400">{log.ip}</td>
                      <td className="px-4 py-3 text-slate-300 max-w-[200px] truncate" title={log.resource}>
                        {log.resource}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                          log.result === 'success' ? 'text-emerald-400' : 'text-rose-400'
                        }`}>
                          {log.result.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => setInspectRecord(log)}
                          className="text-slate-400 hover:text-white p-1"
                          title="View JSON Record"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* JSON Record Inspector Modal */}
      {inspectRecord && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <span className="font-bold text-white">{language === 'vi' ? 'BẢN GHI AUDIT LOG CHI TIẾT' : 'AUDIT RECORD INSPECTOR'}</span>
              <button onClick={() => setInspectRecord(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 bg-black/90 overflow-y-auto max-h-[70vh]">
              <pre className="text-emerald-400 whitespace-pre-wrap select-text">
                {JSON.stringify(inspectRecord, null, 2)}
              </pre>
            </div>
            <div className="p-3 border-t border-slate-800 bg-slate-950 flex justify-end">
              <button
                onClick={() => setInspectRecord(null)}
                className="px-4 py-1.5 rounded bg-slate-800 text-white"
              >
                {t.btnClose}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
