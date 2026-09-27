export type NavigationTab = 
  | 'overview' 
  | 'proxy' 
  | 'modules' 
  | 'ca' 
  | 'performance' 
  | 'security' 
  | 'backup' 
  | 'deployment';

export interface VPSMetrics {
  vps: {
    hostname: string;
    platform: string;
    arch: string;
    kernelRelease: string;
    cpuModel: string;
    cpuCores: number;
    cpuPercent: number;
    ram: {
      totalGb: number;
      usedGb: number;
      freeGb: number;
      percent: number;
    };
    disk: {
      totalGb: number;
      usedGb: number;
      percent: number;
    };
    uptime: {
      seconds: number;
      formatted: string;
    };
    loadAverage: number[];
    status: 'ONLINE' | 'DEGRADED' | 'OFFLINE';
  };
  performance: {
    activePreset: 'ECONOMY' | 'BALANCED' | 'PERFORMANCE' | 'ENTERPRISE';
    presetDetails: {
      name: string;
      description: string;
      workerThreads: number;
      connectionPoolMax: number;
      tcpKeepAliveMs: number;
      bufferAllocPolicy: string;
      cpuThrottlePriority: string;
      ioRingQueueDepth: number;
    };
    requestsPerSec: number;
    errorRatePercent: number;
    averageLatencyMs: number;
    bandwidthUsageMBs: string;
    activeProcessesCount: number;
  };
}

export interface ProxySession {
  id: string;
  clientIp: string;
  protocol: 'HTTP' | 'HTTPS' | 'TCP';
  ipVersion: 'IPv4' | 'IPv6';
  targetHost: string;
  targetPort: number;
  authenticatedUser: string;
  bytesIn: number;
  bytesOut: number;
  durationSeconds: number;
  status: 'ACTIVE' | 'IDLE' | 'CLOSING';
  latencyMs: number;
  keepAlive: boolean;
}

export interface ProxyStatus {
  status: 'ONLINE' | 'DEGRADED' | 'RESTARTING' | 'BACKOFF' | 'FAILED';
  enabled: boolean;
  activeConnectionsCount: number;
  maxConnections: number;
  averageLatencyMs: number;
  bandwidthUsageMbps: string;
  requestsPerSecond: string;
  totalBytesIn: number;
  totalBytesOut: number;
  totalRequestsServed: number;
  ipv4: string;
  ipv6: string;
  recovery: {
    status: string;
    crashCount: number;
    lastCrashTimestamp: string | null;
    lastRestartTimestamp: string | null;
    consecutiveFailures: number;
    backoffSeconds: number;
    adminAlertDispatched: boolean;
  };
  pools: {
    keepAlivePoolSize: number;
    idlePooledConnections: number;
    activePooledConnections: number;
  };
}

export interface SupervisedModule {
  id: string;
  name: string;
  description: string;
  language: 'nodejs' | 'python' | 'bash' | 'go';
  code: string;
  version: string;
  status: 'RUNNING' | 'STOPPED' | 'PAUSED' | 'CRASHED' | 'BACKOFF';
  pid: number | null;
  uptimeSeconds: number;
  restartsCount: number;
  maxRestartsBeforeBackoff: number;
  consecutiveCrashes: number;
  backoffRemainingSeconds: number;
  lastExitCode: number | null;
  lastStartedAt: string | null;
  lastStoppedAt: string | null;
  resourceUsage: {
    cpuPercent: number;
    memoryMb: number;
  };
  limits: {
    cpuLimitPercent: number;
    memoryLimitMb: number;
    maxProcesses: number;
    timeoutSeconds: number;
    networkPolicy: 'ALLOW_ALL' | 'RESTRICTED_INTERNAL' | 'ISOLATED_NO_NET';
    filesystemSandboxPath: string;
  };
  logs: { timestamp: string; level: 'INFO' | 'WARN' | 'ERROR'; message: string }[];
  runAsUser: string;
}

export interface CAHierarchy {
  rootCA: {
    type: string;
    commonName: string;
    serialNumber: string;
    validityYears: number;
    notBefore: string;
    notAfter: string;
    algorithm: string;
    hashAlgorithm: string;
    keySize: number;
    fingerprintSha256: string;
    status: string;
    issuer: string;
    autoRenew: boolean;
    daysUntilExpiry: number;
    securityLevel: string;
  };
  intermediateCA: {
    type: string;
    commonName: string;
    serialNumber: string;
    validityYears: number;
    notBefore: string;
    notAfter: string;
    algorithm: string;
    hashAlgorithm: string;
    keySize: number;
    fingerprintSha256: string;
    status: string;
    issuer: string;
    autoRenew: boolean;
    daysUntilExpiry: number;
  };
  serverCertificate: {
    type: string;
    commonName: string;
    serialNumber: string;
    validityDays: number;
    notBefore: string;
    notAfter: string;
    algorithm: string;
    hashAlgorithm: string;
    fingerprintSha256: string;
    status: string;
    issuer: string;
    autoRenew: boolean;
    daysUntilExpiry: number;
    sanDomains: string[];
  };
}

export interface AuditRecord {
  id: string;
  timestamp: string;
  user_id: string;
  action: string;
  ip: string;
  resource: string;
  result: 'success' | 'failure';
  details?: string;
}

export interface SecurityCheckItem {
  id: string;
  name: string;
  category: 'NETWORK' | 'CRYPTO' | 'ACCESS' | 'SYSTEM' | 'STORAGE';
  status: 'VERIFIED' | 'ATTENTION' | 'DISABLED';
  verifiedAt: string;
  details: string;
  technicalRule: string;
}

export interface BackupArchive {
  id: string;
  name: string;
  scheduleType: string;
  createdAt: string;
  sizeBytes: number;
  sha256Checksum: string;
  verified: boolean;
  verifiedAt: string | null;
  encryptionAlgorithm: string;
  includedComponents: string[];
  status: string;
}

export interface UserProfile {
  token: string;
  userId: string;
  username: string;
  role: 'OWNER' | 'ADMIN' | 'OPERATOR' | 'VIEWER';
}
