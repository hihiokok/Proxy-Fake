import React, { useState } from 'react';
import { 
  HardDrive, 
  Download, 
  RotateCcw, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  Play, 
  Lock, 
  Layers, 
  FileCheck 
} from 'lucide-react';
import { BackupArchive } from '../types';
import { useLanguage } from '../i18n/context';

interface BackupTabProps {
  backups: BackupArchive[];
  schedule: { enabled: boolean; type: string; nextRun: string };
  onCreateBackupNow: (type: 'MANUAL' | 'DAILY' | 'WEEKLY' | 'MONTHLY') => void;
  onVerifyBackup: (id: string) => void;
  onRestoreBackup: (id: string) => void;
}

export const BackupTab: React.FC<BackupTabProps> = ({
  backups,
  schedule,
  onCreateBackupNow,
  onVerifyBackup,
  onRestoreBackup
}) => {
  const { t, language } = useLanguage();
  const [selectedBackupToRestore, setSelectedBackupToRestore] = useState<BackupArchive | null>(null);
  const [confirmInput, setConfirmInput] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateNow = async () => {
    setIsCreating(true);
    await onCreateBackupNow('MANUAL');
    setIsCreating(false);
  };

  const handleConfirmRestore = () => {
    if (selectedBackupToRestore && confirmInput === 'RESTORE') {
      onRestoreBackup(selectedBackupToRestore.id);
      setSelectedBackupToRestore(null);
      setConfirmInput('');
    }
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Top Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-emerald-400" />
            <h2 className="font-bold text-white text-base">{t.backupTitle}</h2>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            {t.backupSubtitle}
          </p>
        </div>

        <button
          onClick={handleCreateNow}
          disabled={isCreating}
          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-600/20 transition-all disabled:opacity-50 self-start sm:self-auto"
        >
          <Play className="w-3.5 h-3.5" />
          {isCreating ? t.creatingSnapshot : t.btnBackupNow}
        </button>
      </div>

      {/* Schedule & Encryption Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-xl">
          <div className="flex justify-between items-center text-slate-400 mb-1">
            <span>{t.autoCadence}</span>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-base font-bold text-white mt-1">{t.dailyWeeklyMonthly}</div>
          <p className="text-slate-400 text-[11px] mt-2">
            {t.nextSnapshotScheduled}: <strong className="text-cyan-400">{schedule.nextRun}</strong>
          </p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-xl">
          <div className="flex justify-between items-center text-slate-400 mb-1">
            <span>{t.encryptionSpec}</span>
            <Lock className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-base font-bold text-emerald-400 mt-1">AES-256-GCM + PBKDF2</div>
          <p className="text-slate-400 text-[11px] mt-2">
            {t.privateKeysExcluded}
          </p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-xl">
          <div className="flex justify-between items-center text-slate-400 mb-1">
            <span>{t.componentsBackedUp}</span>
            <Layers className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-base font-bold text-white mt-1">{t.fiveCoreSubsystems}</div>
          <p className="text-slate-400 text-[11px] mt-2">
            {t.subsystemsDesc}
          </p>
        </div>
      </div>

      {/* Backups List */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/70">
          <h3 className="font-bold text-white text-sm">{t.availableSnapshots} ({backups.length})</h3>
          <span className="text-[11px] text-slate-400">{t.sha256VerifiedStorage}</span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {backups.length === 0 ? (
            <div className="p-6 text-center text-slate-500">
              {language === 'vi' ? 'Chưa có bản sao lưu nào. Hãy bấm "SAO LƯU NGAY".' : 'No backups available yet. Click "BACKUP NOW" to create one.'}
            </div>
          ) : (
            backups.map(b => (
              <div key={b.id} className="p-4 hover:bg-slate-800/30 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-white text-sm">{b.name}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-400 text-[10px] border border-slate-700">
                      {b.scheduleType}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] border border-emerald-700/60 font-semibold">
                      {b.encryptionAlgorithm}
                    </span>
                    {b.verified && (
                      <span className="flex items-center gap-1 text-[11px] text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {language === 'vi' ? 'ĐÃ KIỂM TRA TOÀN VẸN' : 'VERIFIED'}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-400 text-xs pt-1">
                    <span>{t.createdAt}: <strong className="text-slate-200">{b.createdAt.replace('T', ' ').substring(0, 19)}</strong></span>
                    <span>{t.size}: <strong className="text-slate-200">{(b.sizeBytes / (1024 * 1024)).toFixed(1)} MB</strong></span>
                    <span className="truncate max-w-[280px]">{t.checksum}: <code className="text-slate-300 text-[11px]">{b.sha256Checksum}</code></span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {b.includedComponents.map((c, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions: VERIFY BACKUP, RESTORE */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onVerifyBackup(b.id)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold text-xs border border-slate-700 flex items-center gap-1.5 transition-colors"
                  >
                    <FileCheck className="w-3.5 h-3.5" /> {t.btnVerifyBackup}
                  </button>

                  <button
                    onClick={() => {
                      setSelectedBackupToRestore(b);
                      setConfirmInput('');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-amber-950/80 hover:bg-amber-900 border border-amber-700/60 text-amber-300 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> {t.btnRestore}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* RESTORE CONFIRMATION MODAL */}
      {selectedBackupToRestore && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 font-mono text-xs">
          <div className="bg-slate-900 border border-amber-500/50 rounded-xl w-full max-w-md overflow-hidden shadow-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 text-amber-400">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-bold text-white text-sm">{language === 'vi' ? 'XÁC NHẬN PHỤC HỒI HỆ THỐNG' : 'CONFIRM DISASTER RECOVERY RESTORE'}</h3>
            </div>

            <p className="text-slate-300 leading-relaxed">
              {language === 'vi' 
                ? <>Khôi phục từ bản sao lưu <strong className="text-white">{selectedBackupToRestore.name}</strong> sẽ ghi đè trạng thái cơ sở dữ liệu hiện tại và tải lại toàn bộ script trong sandbox.</>
                : <>Restoring from <strong className="text-white">{selectedBackupToRestore.name}</strong> will overwrite current database state and reload all sandboxed module scripts.</>}
            </p>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1 text-[11px]">
              <div>Checksum: <code className="text-emerald-400 break-all">{selectedBackupToRestore.sha256Checksum}</code></div>
              <div>Dung lượng: <strong>{(selectedBackupToRestore.sizeBytes / (1024 * 1024)).toFixed(1)} MB</strong></div>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">
                {language === 'vi' ? <>Nhập chữ <strong>RESTORE</strong> để xác nhận:</> : <>Type <strong>RESTORE</strong> to confirm:</>}
              </label>
              <input
                type="text"
                value={confirmInput}
                onChange={e => setConfirmInput(e.target.value)}
                placeholder="RESTORE"
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedBackupToRestore(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
              >
                {t.btnCancel}
              </button>
              <button
                onClick={handleConfirmRestore}
                disabled={confirmInput !== 'RESTORE'}
                className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold disabled:opacity-40"
              >
                {language === 'vi' ? 'Xác nhận khôi phục' : 'Confirm System Restore'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
