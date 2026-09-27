import React, { useState } from 'react';
import { 
  Key, 
  Download, 
  Copy, 
  Check, 
  ShieldCheck, 
  RotateCw, 
  AlertCircle, 
  ExternalLink,
  Layers,
  Lock,
  Calendar,
  X
} from 'lucide-react';
import { CAHierarchy } from '../types';
import { useLanguage } from '../i18n/context';

interface InternalCATabProps {
  ca: CAHierarchy | null;
  onDownloadRootCA: () => void;
  onRotateLeafCert: () => void;
}

export const InternalCATab: React.FC<InternalCATabProps> = ({
  ca,
  onDownloadRootCA,
  onRotateLeafCert
}) => {
  const { t, language } = useLanguage();
  const [copiedFingerprint, setCopiedFingerprint] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [rotating, setRotating] = useState(false);

  const root = ca?.rootCA;
  const inter = ca?.intermediateCA;
  const leaf = ca?.serverCertificate;

  const handleCopyFingerprint = () => {
    if (root?.fingerprintSha256) {
      navigator.clipboard.writeText(root.fingerprintSha256);
      setCopiedFingerprint(true);
      setTimeout(() => setCopiedFingerprint(false), 2500);
    }
  };

  const handleRotate = async () => {
    setRotating(true);
    await onRotateLeafCert();
    setRotating(false);
  };

  return (
    <div className="space-y-6 font-mono">
      {/* Top Description */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-emerald-400" />
            <h2 className="font-bold text-white text-base">{t.caCardTitle}</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {t.caCardSubtitle}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/50 font-bold">
            {language === 'vi' ? 'THỜI HẠN: 50 NĂM (2026 – 2076)' : 'VALIDITY: 50 YEARS (2026 – 2076)'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* EXACT REQUIREMENT 5 SPECIFICATION ASCII BOX */}
        <div className="bg-slate-950 border-2 border-emerald-500/50 rounded-xl p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            {/* Box Header */}
            <div className="text-center pb-3 border-b-2 border-emerald-500/30">
              <span className="text-sm font-bold tracking-widest text-emerald-400 uppercase">
                INTERNAL CA
              </span>
            </div>

            {/* Box Key-Value Body */}
            <div className="py-4 space-y-2 text-xs divide-y divide-slate-800/80">
              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-400">{t.caStatus}</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {root?.status || 'ACTIVE'}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-400">{t.caValidity}</span>
                <span className="text-white font-bold">{root?.validityYears || 50} {language === 'vi' ? 'NĂM' : 'YEARS'}</span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-400">{t.caCreated}</span>
                <span className="text-slate-200">{root?.notBefore || '2026-09-26'}</span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-400">{t.caExpires}</span>
                <span className="text-amber-400 font-bold">{root?.notAfter || '2076-09-26'}</span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-400">{t.caAlgorithm}</span>
                <span className="text-emerald-400 font-bold">{root?.algorithm || 'RSA-4096'}</span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-400">{t.caHash}</span>
                <span className="text-cyan-400 font-bold">{root?.hashAlgorithm || 'SHA-256'}</span>
              </div>

              <div className="flex flex-col pt-2 gap-1">
                <span className="text-slate-400">{t.sha256Fingerprint}</span>
                <span className="text-[11px] text-cyan-300 break-all bg-slate-900/80 p-2 rounded border border-slate-800">
                  {root?.fingerprintSha256 || 'AA:BB:CC:DD:...'}
                </span>
              </div>
            </div>
          </div>

          {/* Three Standard Buttons from Prompt */}
          <div className="pt-4 border-t-2 border-emerald-500/30 space-y-2">
            <button
              onClick={onDownloadRootCA}
              className="w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all uppercase tracking-wider"
            >
              <Download className="w-4 h-4" /> [ DOWNLOAD CA ]
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleCopyFingerprint}
                className="py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center justify-center gap-1.5 transition-all"
              >
                {copiedFingerprint ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedFingerprint ? (language === 'vi' ? 'ĐÃ SAO CHÉP!' : 'COPIED!') : '[ COPY FINGERPRINT ]'}
              </button>

              <button
                onClick={() => setDetailsModalOpen(true)}
                className="py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 font-semibold text-xs border border-slate-700 flex items-center justify-center gap-1.5 transition-all"
              >
                [ VIEW DETAILS ]
              </button>
            </div>
          </div>
        </div>

        {/* 6. CERTIFICATE HIERARCHY TREE */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <h3 className="font-bold text-white text-xs uppercase tracking-wider">{t.pkiCertHierarchy}</h3>
              </div>
              <span className="text-[11px] text-slate-400">{t.threeTierChain}</span>
            </div>

            <p className="text-slate-400 text-xs my-3">
              {t.hierarchyDesc}
            </p>

            <div className="space-y-3">
              {/* Level 1: Root CA */}
              <div className="p-3 rounded-lg bg-slate-950 border border-emerald-500/40 text-xs">
                <div className="flex items-center justify-between font-bold text-emerald-400">
                  <span>ROOT CA ({language === 'vi' ? '50 NĂM' : '50 YEARS'})</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-600">ANCHOR</span>
                </div>
                <div className="text-slate-300 mt-1">{root?.commonName}</div>
                <div className="text-slate-500 text-[10px] mt-0.5">{language === 'vi' ? 'Hết hạn: 2076-09-26 | Private Key: POSIX 0600 cô lập' : 'Expires: 2076-09-26 | Private Key Mode: POSIX 0600'}</div>
              </div>

              <div className="flex justify-center text-slate-600">│</div>

              {/* Level 2: Intermediate CA */}
              <div className="p-3 rounded-lg bg-slate-950 border border-cyan-500/40 text-xs">
                <div className="flex items-center justify-between font-bold text-cyan-400">
                  <span>INTERMEDIATE CA ({language === 'vi' ? '10 NĂM' : '10 YEARS'})</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-600">ONLINE SIGNER</span>
                </div>
                <div className="text-slate-300 mt-1">{inter?.commonName}</div>
                <div className="text-slate-500 text-[10px] mt-0.5">{language === 'vi' ? 'Hết hạn: 2036-09-26 | Tự động gia hạn: CÓ' : 'Expires: 2036-09-26 | Auto-renews: YES'}</div>
              </div>

              <div className="flex justify-center text-slate-600">│</div>

              {/* Level 3: Leaf Server TLS Certificate */}
              <div className="p-3 rounded-lg bg-slate-950 border border-amber-500/40 text-xs">
                <div className="flex items-center justify-between font-bold text-amber-400">
                  <span>{t.serverCertTitle}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 border border-amber-600">{language === 'vi' ? '90 NGÀY' : '90 DAYS'}</span>
                </div>
                <div className="text-slate-300 mt-1">{leaf?.commonName}</div>
                <div className="flex items-center justify-between text-[11px] mt-1 text-slate-400">
                  <span>{language === 'vi' ? 'Hết hạn' : 'Expires'}: {leaf?.notAfter}</span>
                  <span className="text-emerald-400 font-bold">{leaf?.daysUntilExpiry} {t.daysRemaining}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
            <span className="text-[11px] text-slate-400">{t.noClientRedownload}</span>
            <button
              onClick={handleRotate}
              disabled={rotating}
              className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 disabled:opacity-50"
            >
              <RotateCw className={`w-3.5 h-3.5 ${rotating ? 'animate-spin' : ''}`} />
              {t.rotateLeafCert}
            </button>
          </div>
        </div>
      </div>

      {/* Security & Installation Guide Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-xl text-xs space-y-3">
        <h3 className="font-bold text-white text-sm flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          {t.trustStoreGuideTitle}
        </h3>
        <p className="text-slate-400">
          {t.trustStoreGuideDesc}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-slate-300 font-bold block mb-1">Debian / Ubuntu / Docker:</span>
            <code className="text-emerald-400 text-[11px] block select-all">
              sudo cp enterprise-root-ca-50yr.crt /usr/local/share/ca-certificates/<br />
              sudo update-ca-certificates
            </code>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-slate-300 font-bold block mb-1">cURL / Node.js CLI:</span>
            <code className="text-cyan-400 text-[11px] block select-all">
              curl --cacert enterprise-root-ca-50yr.crt https://gateway.vps.enterprise.internal:8443
            </code>
          </div>
        </div>
      </div>

      {/* DETAILS MODAL */}
      {detailsModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-white text-sm">{language === 'vi' ? 'CHI TIẾT CHỨNG CHỈ X.509 ROOT CA' : 'INTERNAL CA X.509 CERTIFICATE DETAILS'}</h3>
              </div>
              <button
                onClick={() => setDetailsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto flex-1 space-y-4 text-slate-300">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1.5">
                <span className="text-emerald-400 font-bold block uppercase">{language === 'vi' ? 'Thông tin chứng chỉ Root' : 'Root Certificate Descriptor'}</span>
                <div>Subject: <strong className="text-white">C=KW, ST=Capital, L=Kuwait City, O=Enterprise Tier-1, CN=Enterprise Global VPS Root CA G1</strong></div>
                <div>Serial Number: <strong className="text-slate-200">{root?.serialNumber}</strong></div>
                <div>Key Size: <strong className="text-slate-200">RSA 4096-bit (Prime 2048 modulus)</strong></div>
                <div>Signature Algorithm: <strong className="text-slate-200">sha256WithRSAEncryption</strong></div>
                <div>Basic Constraints: <strong className="text-emerald-400">CA:TRUE, pathlen:1</strong></div>
                <div>Key Usage: <strong className="text-slate-200">Digital Signature, Certificate Sign, CRL Sign</strong></div>
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1.5">
                <span className="text-cyan-400 font-bold block uppercase">{language === 'vi' ? 'Tên miền SAN của chứng chỉ máy chủ' : 'Leaf Certificate SAN Domains'}</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {leaf?.sanDomains.map(san => (
                    <span key={san} className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 text-[11px] border border-slate-700">
                      DNS:{san}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-[11px]">
                <strong className="block mb-0.5">{language === 'vi' ? 'Cam kết bảo mật tuyệt đối:' : 'Strict Security Guarantee:'}</strong>
                {language === 'vi' 
                  ? 'Khóa riêng (Private Key) được bảo vệ phân quyền POSIX chmod 0600 trên máy chủ, không bao giờ xuất hiện trong mã nguồn Git, Docker image hay tệp tải về phía người dùng.' 
                  : 'Private key material is isolated under chmod 0600 on server filesystem and never included in Git commits, Docker build layers, or client downloads.'}
              </div>
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end">
              <button
                onClick={() => setDetailsModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold"
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
