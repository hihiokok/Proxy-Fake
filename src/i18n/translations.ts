export type Language = 'vi' | 'en';

export interface Translations {
  // Brand & Header
  brandTitle: string;
  brandTag: string;
  brandSubtitle: string;
  streamLive: string;
  connecting: string;
  quickRefreshTooltip: string;
  rolePrefix: string;
  languageSelect: string;

  // Nav tabs
  navOverview: string;
  navProxy: string;
  navModules: string;
  navCA: string;
  navPerformance: string;
  navSecurity: string;
  navBackup: string;
  navDeployment: string;

  // Overview
  vpsTitle: string;
  statusOnline: string;
  statusDegraded: string;
  cpu: string;
  ram: string;
  disk: string;
  network: string;
  uptime: string;
  proxy: string;
  connection: string;
  latency: string;
  modules: string;
  running: string;
  stopped: string;
  proxyAclBtn: string;
  runnerBtn: string;

  caVaultTitle: string;
  caValidityTag: string;
  subjectCn: string;
  algorithm: string;
  notBefore: string;
  notAfter: string;
  fingerprint: string;
  caProtectionTitle: string;
  caProtectionDesc: string;
  downloadCaBtn: string;
  hierarchyBtn: string;

  presetRecoveryTitle: string;
  handshakeLatency: string;
  requestsPerSec: string;
  watchdogRecovery: string;
  watchdogActive: string;
  crashBackoffCircuit: string;
  crashBackoffDesc: string;
  securitySandbox: string;
  nonRootUser: string;
  zeroDowntimeReload: string;
  tunePresets: string;

  cpuCores: string;
  platform: string;
  kernel: string;
  proxyPools: string;
  errorRate: string;
  securityAudit: string;
  activeWorkersTitle: string;
  manageModulesLink: string;

  // Proxy Tab
  proxyGatewayTitle: string;
  dualStack: string;
  dualStackSub: string;
  reloadZeroDowntime: string;
  simulateCrash: string;
  simulateCrashTest: string;
  resetCircuitBreaker: string;
  tabLiveSessions: string;
  tabIpAcls: string;
  tabWatchdog: string;
  tabArchitecture: string;
  liveSessions: string;
  ipAllowDeny: string;
  watchdogHealing: string;
  architectureTopology: string;
  totalActive: string;
  bandwidth: string;
  avgLatency: string;
  poolInfo: string;
  sessionId: string;
  clientIpStack: string;
  protocol: string;
  targetEndpoint: string;
  authIdentity: string;
  trafficInOut: string;
  latencyCol: string;
  statusCol: string;
  colSessionId: string;
  colClientIp: string;
  colProtocol: string;
  colTarget: string;
  colAuthUser: string;
  colTraffic: string;
  colLatency: string;
  colStatus: string;
  ipAllowlistTitle: string;
  ipAllowlistDesc: string;
  allowlistDesc: string;
  ipDenylistTitle: string;
  ipDenylistDesc: string;
  denylistDesc: string;
  btnAdd: string;
  btnBlock: string;
  addRuleBtn: string;
  blockRuleBtn: string;
  rulesCount: string;
  watchdogTitle: string;
  watchdogSubtitle: string;
  circuitBreakerArmed: string;
  recoveryStatus: string;
  totalCrashCount: string;
  consecutiveFailures: string;
  lastRecoveryAction: string;
  selfHealingPipeline: string;
  selfHealingNote: string;
  watchdogNote: string;
  step1: string;
  step2: string;
  step3: string;
  step4: string;
  step5: string;
  step6: string;
  archTitle: string;
  archDesc: string;
  archTopologyDesc: string;
  archClient: string;
  archTlsGateway: string;
  archAuthAcl: string;
  archProxyGateway: string;
  archConnManager: string;
  archTargetNetwork: string;
  flowClient: string;
  flowClientDesc: string;
  flowTlsGateway: string;
  flowTlsGatewayDesc: string;
  flowAuthAcl: string;
  flowAuthAclDesc: string;
  flowProxyGateway: string;
  flowProxyGatewayDesc: string;
  flowConnectionManager: string;
  flowConnectionManagerDesc: string;
  flowTargetNetwork: string;
  flowTargetNetworkDesc: string;

  // Modules Tab
  processRunnerTitle: string;
  processRunnerSubtitle: string;
  createModuleBtn: string;
  modulesHeaderTitle: string;
  modulesHeaderSubtitle: string;
  createNewModuleBtn: string;
  startWorkerBtn: string;
  pauseBtn: string;
  stopBtn: string;
  restartBtn: string;
  logsBtn: string;
  editBtn: string;
  testCrashBtn: string;
  deleteTooltip: string;
  moduleUptime: string;
  moduleRestarts: string;
  moduleExitCode: string;
  moduleUser: string;
  cpuUsageQuota: string;
  ramUsageQuota: string;
  cpuQuota: string;
  ramQuota: string;
  networkPolicy: string;
  sandboxPath: string;
  btnPause: string;
  btnStop: string;
  btnRestart: string;
  btnStart: string;
  btnLogs: string;
  btnEdit: string;
  btnCrashTest: string;
  moduleName: string;
  runtimeLanguage: string;
  description: string;
  sandboxResourceQuotas: string;
  maxCpuLimit: string;
  maxRamLimit: string;
  scriptContent: string;
  logsModalTitle: string;
  noLogsYet: string;
  modalCloseBtn: string;
  createModalTitle: string;
  editModalTitle: string;
  moduleNameLabel: string;
  moduleLangLabel: string;
  moduleDescLabel: string;
  resourceQuotasTitle: string;
  cpuLimitLabel: string;
  ramLimitLabel: string;
  netPolicyLabel: string;
  scriptContentLabel: string;
  cancelBtn: string;
  saveChangesBtn: string;
  createModuleSubmitBtn: string;

  // Internal CA Tab
  caCardTitle: string;
  caCardSubtitle: string;
  caStatus: string;
  caValidity: string;
  caCreated: string;
  caExpires: string;
  caAlgorithm: string;
  caHash: string;
  sha256Fingerprint: string;
  pkiCertHierarchy: string;
  threeTierChain: string;
  hierarchyDesc: string;
  serverCertTitle: string;
  daysRemaining: string;
  noClientRedownload: string;
  rotateLeafCert: string;
  trustStoreGuideTitle: string;
  trustStoreGuideDesc: string;
  caHeaderTitle: string;
  caHeaderSubtitle: string;
  ca50yBadge: string;
  caBoxTitle: string;
  caBoxStatus: string;
  caBoxValidity: string;
  caBoxCreated: string;
  caBoxExpires: string;
  caBoxAlgorithm: string;
  caBoxHash: string;
  caBoxDownloadBtn: string;
  caBoxCopyFingerprintBtn: string;
  caBoxCopied: string;
  caBoxViewDetailsBtn: string;
  hierarchyTitle: string;
  hierarchySubtitle: string;
  rootCaLevelTitle: string;
  intermediateCaLevelTitle: string;
  serverCertLevelTitle: string;
  rotateLeafCertBtn: string;
  rotatingBtn: string;
  rotateNote: string;
  trustStoreTitle: string;
  trustStoreDesc: string;
  caModalTitle: string;
  caModalSecurityGuarantee: string;
  caModalGuaranteeDesc: string;

  // Performance Tab
  performanceTitle: string;
  performanceSubtitle: string;
  perfHeaderTitle: string;
  perfHeaderSubtitle: string;
  activePresetLabel: string;
  cpuUtilization: string;
  ramAllocation: string;
  storageVolume: string;
  networkLatency: string;
  selectPresetTitle: string;
  zeroDowntimeReconfig: string;
  clickToApply: string;
  activePresetBadge: string;
  activePresetTag: string;
  cpuModel: string;
  occupancy: string;
  free: string;
  maxConns: string;
  threadQuota: string;
  bufferStrategy: string;
  hardwareGroundingTitle: string;
  hardwareGroundingDesc: string;
  strictHardwareNoticeTitle: string;
  strictHardwareNoticeDesc: string;
  presetEconomyTag: string;
  presetEconomyDesc: string;
  presetBalancedTag: string;
  presetBalancedDesc: string;
  presetPerfTag: string;
  presetPerfDesc: string;
  presetEnterpriseTag: string;
  presetEnterpriseDesc: string;

  // Security Tab
  securityTitle: string;
  securitySubtitle: string;
  secHeaderTitle: string;
  secHeaderSubtitle: string;
  twelvePointChecklist: string;
  tab12PointChecklist: string;
  auditTrail: string;
  tabAuditTrail: string;
  securityStatusVerified: string;
  status12Of12Verified: string;
  enterpriseComplianceStandard: string;
  standard1000KwdCompliance: string;
  technicalRule: string;
  technicalRuleLabel: string;
  searchPlaceholder: string;
  exportJson: string;
  exportJsonBtn: string;
  timestampUtc: string;
  userIdentity: string;
  actionCol: string;
  callerIp: string;
  targetResource: string;
  resultCol: string;
  inspectCol: string;
  colTimestamp: string;
  colUser: string;
  colAction: string;
  colCallerIp: string;
  colTargetResource: string;
  colResult: string;
  colInspect: string;
  auditInspectorTitle: string;
  btnClose: string;

  // Backup Tab
  backupTitle: string;
  backupSubtitle: string;
  backupHeaderTitle: string;
  backupHeaderSubtitle: string;
  btnBackupNow: string;
  backupNowBtn: string;
  creatingSnapshot: string;
  creatingSnapshotBtn: string;
  autoCadence: string;
  automatedCadence: string;
  dailyWeeklyMonthly: string;
  encryptionSpec: string;
  componentsBackedUp: string;
  fiveCoreSubsystems: string;
  subsystemsDesc: string;
  nextSnapshotScheduled: string;
  privateKeysExcluded: string;
  availableSnapshots: string;
  availableSnapshotsTitle: string;
  sha256VerifiedStorage: string;
  sha256Verified: string;
  createdAt: string;
  size: string;
  checksum: string;
  btnVerifyBackup: string;
  verifyBackupBtn: string;
  btnRestore: string;
  restoreBtn: string;
  confirmRestoreTitle: string;
  confirmRestoreWarning: string;
  typeRestoreToConfirm: string;
  confirmRestoreActionBtn: string;
  btnCancel: string;

  // Deployment & Health Tab
  healthTitle: string;
  healthSubtitle: string;
  healthHeaderTitle: string;
  healthHeaderSubtitle: string;
  healthEndpointsTitle: string;
  standardHealthEndpoints: string;
  subsystemsMatrixTitle: string;
  subsystemsMatrix: string;
  deploymentScriptsTitle: string;
  prodScriptsTitle: string;
  copyScriptBtn: string;
  copiedScriptBtn: string;

  // Auth Modal
  authTitle: string;
  authModalTitle: string;
  currentSession: string;
  currentActiveSession: string;
  btnLogout: string;
  logoutBtn: string;
  quickSwitchRole: string;
  usernameEmail: string;
  usernameLabel: string;
  passwordArgon: string;
  passwordLabel: string;
  authenticating: string;
  authenticatingBtn: string;
  btnSignIn: string;
  signInBtn: string;

  // Footer & Common
  footerBrand: string;
  footerRootCa: string;
  footerUid: string;
  footerSecurity: string;
}

export const translations: Record<Language, Translations> = {
  vi: {
    // Brand & Header
    brandTitle: 'TRUNG TÂM ĐIỀU KHIỂN VPS & PROXY ENTERPRISE',
    brandTag: 'TIÊU CHUẨN 1000 KWD',
    brandSubtitle: 'Hạ tầng Proxy VPS Linux 64-bit Tự phục hồi & Bảo mật 24/7',
    streamLive: 'STREAM TRỰC TIẾP',
    connecting: 'ĐANG KẾT NỐI...',
    quickRefreshTooltip: 'Làm mới telemetry ngay lập tức',
    rolePrefix: 'VAI TRÒ',
    languageSelect: 'Ngôn ngữ',

    // Nav tabs
    navOverview: 'Tổng quan',
    navProxy: 'Proxy & Gateway',
    navModules: 'Runner & Tiến trình',
    navCA: 'Root CA 50 năm',
    navPerformance: 'Hiệu năng',
    navSecurity: 'Bảo mật & Kiểm toán',
    navBackup: 'Sao lưu & Phục hồi',
    navDeployment: 'Triển khai & Sức khỏe',

    // Overview
    vpsTitle: 'VPS ENTERPRISE',
    statusOnline: 'HOẠT ĐỘNG',
    statusDegraded: 'SUY GIẢM',
    cpu: 'CPU',
    ram: 'RAM',
    disk: 'Ổ ĐĨA',
    network: 'MẠNG',
    uptime: 'UPTIME',
    proxy: 'PROXY',
    connection: 'KẾT NỐI',
    latency: 'ĐỘ TRỄ',
    modules: 'MODULES',
    running: 'ĐANG CHẠY',
    stopped: 'DỪNG',
    proxyAclBtn: 'Quản lý Proxy & ACL',
    runnerBtn: 'Mở Script Runner',

    caVaultTitle: 'KHO CHỨNG CHỈ NỘI BỘ (INTERNAL CA)',
    caValidityTag: 'HỢP LỆ 50 NĂM',
    subjectCn: 'Tên định danh CN',
    algorithm: 'Thuật toán khóa',
    notBefore: 'Khởi tạo',
    notAfter: 'Hết hạn',
    fingerprint: 'Mã băm SHA-256',
    caProtectionTitle: 'Bảo vệ Root CA cô lập:',
    caProtectionDesc: 'Khóa bí mật được bảo vệ nghiêm ngặt bằng quyền POSIX chmod 0600 trên máy chủ, không tải lên giao diện và không nằm trong image container.',
    downloadCaBtn: 'TẢI CHỨNG CHỈ ROOT CA',
    hierarchyBtn: 'Xem cây phân cấp PKI',

    presetRecoveryTitle: 'CẤU HÌNH HIỆU NĂNG & TỰ PHỤC HỒI',
    handshakeLatency: 'Bắt tay trung bình',
    requestsPerSec: 'Yêu cầu / giây',
    watchdogRecovery: 'Mạch tự phục hồi Watchdog',
    watchdogActive: 'HOẠT ĐỘNG (NGĂN VÒNG LẶP)',
    crashBackoffCircuit: 'Cơ chế ngắt mạch tự động (Circuit Breaker):',
    crashBackoffDesc: 'Nếu tiến trình proxy gặp sự cố liên tiếp 5 lần, watchdog kích hoạt trạng thái BACKOFF (chờ 120s) và gửi cảnh báo quản trị, tuyệt đối không restart vô tận gây quá tải CPU.',
    securitySandbox: 'Cách ly Sandbox POSIX',
    nonRootUser: 'Tài khoản không đặc quyền (UID 1001)',
    zeroDowntimeReload: 'Tải lại không gián đoạn',
    tunePresets: 'Điều chỉnh cấu hình hiệu năng',

    cpuCores: 'Nhân CPU',
    platform: 'Nền tảng',
    kernel: 'Nhân Kernel',
    proxyPools: 'Keep-Alive Pool',
    errorRate: 'Tỷ lệ lỗi',
    securityAudit: 'Kiểm toán bảo mật',
    activeWorkersTitle: 'Tiến trình Worker đang chạy',
    manageModulesLink: 'Quản lý tất cả tiến trình →',

    // Proxy Tab
    proxyGatewayTitle: 'PROXY GATEWAY & BỘ KẾT THÚC TLS',
    dualStack: 'Hỗ trợ đồng thời',
    dualStackSub: 'Hỗ trợ ngăn xếp kép IPv4 & IPv6 với quản lý kết nối TCP tối ưu.',
    reloadZeroDowntime: 'Tải lại không gián đoạn',
    simulateCrash: 'Thử nghiệm sập proxy',
    simulateCrashTest: 'Mô phỏng sập proxy',
    resetCircuitBreaker: 'Đặt lại Circuit Breaker',
    tabLiveSessions: 'Phiên trực tiếp',
    tabIpAcls: 'Danh sách Cho phép & Chặn IP',
    tabWatchdog: 'Tự phục hồi Watchdog',
    tabArchitecture: 'Sơ đồ luồng kết nối',
    liveSessions: 'Phiên kết nối',
    ipAllowDeny: 'Danh sách Allow/Deny IP',
    watchdogHealing: 'Tự phục hồi Watchdog',
    architectureTopology: 'SƠ ĐỒ KIẾN TRÚC PROXY ENTERPRISE',
    totalActive: 'Tổng đang mở',
    bandwidth: 'Băng thông',
    avgLatency: 'Độ trễ trung bình',
    poolInfo: 'Pool Keep-Alive: 64 active | Thời gian chờ TCP: 65s',
    sessionId: 'Mã phiên',
    clientIpStack: 'IP máy khách & Stack',
    protocol: 'Giao thức',
    targetEndpoint: 'Điểm đích',
    authIdentity: 'Danh tính xác thực',
    trafficInOut: 'Lưu lượng Vào/Ra',
    latencyCol: 'Độ trễ',
    statusCol: 'Trạng thái',
    colSessionId: 'Mã phiên',
    colClientIp: 'IP máy khách',
    colProtocol: 'Giao thức',
    colTarget: 'Điểm đích',
    colAuthUser: 'Người dùng',
    colTraffic: 'Lưu lượng',
    colLatency: 'Độ trễ',
    colStatus: 'Trạng thái',
    ipAllowlistTitle: 'DANH SÁCH CHO PHÉP IP (CIDR)',
    ipAllowlistDesc: 'Chỉ các địa chỉ IP hoặc dải mạng được phê duyệt mới có thể bắt tay proxy. Nghiêm cấm hoàn toàn open proxy công khai.',
    allowlistDesc: 'Chỉ các IP/subnet được phê duyệt mới được phép kết nối qua proxy. Nghiêm cấm chế độ open proxy.',
    ipDenylistTitle: 'DANH SÁCH CHẶN IP (DROP)',
    ipDenylistDesc: 'Các gói tin từ danh sách này sẽ bị kernel firewall loại bỏ ngay lập tức trước khi bắt tay TCP.',
    denylistDesc: 'Gói tin từ các địa chỉ này bị nftables loại bỏ ngay lập tức trước khi bắt tay TCP.',
    btnAdd: 'Thêm',
    btnBlock: 'Chặn',
    addRuleBtn: 'Thêm quy tắc',
    blockRuleBtn: 'Chặn IP',
    rulesCount: 'quy tắc',
    watchdogTitle: 'HỆ THỐNG TỰ PHỤC HỒI & MẠCH BẢO VỆ WATCHDOG',
    watchdogSubtitle: 'Chính sách cam kết không lặp vô hạn với thuật toán exponential backoff.',
    circuitBreakerArmed: 'BẢO VỆ MẠCH ĐANG BẬT',
    recoveryStatus: 'Trạng thái phục hồi',
    totalCrashCount: 'Tổng số lần sập',
    consecutiveFailures: 'Lỗi liên tiếp',
    lastRecoveryAction: 'Hành động gần nhất',
    selfHealingPipeline: 'Quy trình tự phục hồi tự động',
    selfHealingNote: '* Nếu vượt quá ngưỡng 5 lần sập liên tiếp, hệ thống chuyển sang chế độ FAILED → BACKOFF (120s) và gửi cảnh báo tới Quản trị viên.',
    watchdogNote: '* Nếu vượt quá 5 lần sự cố liên tiếp: chuyển sang chế độ FAILED → BACKOFF (120s) → BÁO ĐỘNG QUẢN TRỊ VIÊN. Không restart vô tận.',
    step1: '1. SỰ CỐ (CRASH)',
    step2: '2. PHÁT HIỆN',
    step3: '3. GHI AUDIT LOG',
    step4: '4. TỰ RESTART',
    step5: '5. HEALTH CHECK',
    step6: '6. HOẠT ĐỘNG (ONLINE)',
    archTitle: 'SƠ ĐỒ KIẾN TRÚC PROXY ENTERPRISE',
    archDesc: 'Luồng vận hành đạt chuẩn: Bảo mật nhiều lớp từ ngõ vào đến mạng đích.',
    archTopologyDesc: 'Luồng dữ liệu chuẩn: Bảo mật phân lớp nghiêm ngặt từ luồng vào đến mạng đích.',
    archClient: 'Khách hàng (Client)',
    archTlsGateway: 'Cổng TLS Gateway',
    archAuthAcl: 'Xác thực & Kiểm soát truy cập ACL',
    archProxyGateway: 'Cổng điều hướng Proxy Gateway',
    archConnManager: 'Bộ quản lý kết nối Connection Manager',
    archTargetNetwork: 'Mạng đích & Module Sandbox',
    flowClient: 'Khách hàng (Client)',
    flowClientDesc: 'Client HTTPS / TCP bên ngoài qua giao thức IPv4 & IPv6',
    flowTlsGateway: 'Cổng bảo mật TLS Gateway',
    flowTlsGatewayDesc: 'Bắt buộc TLS 1.2 / TLS 1.3 với gốc xác thực tin cậy Root CA 50 năm',
    flowAuthAcl: 'Xác thực danh tính & ACL',
    flowAuthAclDesc: 'Kiểm tra Token/Mật khẩu, lọc IP Allowlist, giới hạn tần suất token-bucket',
    flowProxyGateway: 'Proxy Gateway thông lượng cao',
    flowProxyGatewayDesc: 'Định tuyến proxy tốc độ cao với hạn ngạch kết nối riêng theo từng người dùng',
    flowConnectionManager: 'Bộ quản trị kết nối (Connection Manager)',
    flowConnectionManagerDesc: 'Nhóm kết nối TCP keep-alive, tự thử lại có giới hạn (tối đa 3 lần), timeout socket',
    flowTargetNetwork: 'Mạng đích & Module Sandbox',
    flowTargetNetworkDesc: 'Máy chủ thượng nguồn đích hoặc worker xử lý nội bộ chạy quyền không đặc quyền',

    // Modules Tab
    processRunnerTitle: 'TIẾN TRÌNH THỰC THI & GIÁM SÁT SANDBOX',
    processRunnerSubtitle: 'Cô lập tập tin POSIX, giới hạn CPU/RAM, watchdog theo dõi PID và tài khoản không đặc quyền (UID 1001).',
    createModuleBtn: 'Tạo Module Mới',
    modulesHeaderTitle: 'TIẾN TRÌNH THỰC THI & GIÁM SÁT SANDBOX',
    modulesHeaderSubtitle: 'Cách ly môi trường POSIX, hạn ngạch CPU, giới hạn bộ nhớ, giám sát PID và chạy dưới người dùng không đặc quyền (UID 1001).',
    createNewModuleBtn: 'Tạo Module Mới',
    startWorkerBtn: 'Khởi chạy Worker',
    pauseBtn: 'Tạm dừng',
    stopBtn: 'Dừng',
    restartBtn: 'Khởi động lại',
    logsBtn: 'Nhật ký',
    editBtn: 'Chỉnh sửa',
    testCrashBtn: 'Thử nghiệm lỗi',
    deleteTooltip: 'Xóa module này',
    moduleUptime: 'Thời gian chạy',
    moduleRestarts: 'Số lần khởi động lại',
    moduleExitCode: 'Mã thoát',
    moduleUser: 'Người dùng chạy',
    cpuUsageQuota: 'Mức dùng CPU / Hạn ngạch',
    ramUsageQuota: 'Mức dùng RAM / Hạn ngạch',
    cpuQuota: 'Mức dùng CPU / Hạn mức',
    ramQuota: 'Mức dùng RAM / Hạn mức',
    networkPolicy: 'Chính sách mạng',
    sandboxPath: 'Đường dẫn Sandbox',
    btnPause: 'Tạm dừng',
    btnStop: 'Dừng',
    btnRestart: 'Khởi động lại',
    btnStart: 'Bắt đầu Worker',
    btnLogs: 'Nhật ký',
    btnEdit: 'Sửa',
    btnCrashTest: 'Thử sập',
    moduleName: 'Tên Module',
    runtimeLanguage: 'Ngôn ngữ thực thi',
    description: 'Mô tả tính năng',
    sandboxResourceQuotas: 'HẠN NGẠCH TÀI NGUYÊN SANDBOX (CGROUPS V2)',
    maxCpuLimit: 'Giới hạn CPU tối đa (%)',
    maxRamLimit: 'Giới hạn RAM tối đa (MB)',
    scriptContent: 'Nội dung script thực thi',
    logsModalTitle: 'NHẬT KÝ SANDBOX',
    noLogsYet: 'Chưa có nhật ký nào được ghi nhận.',
    modalCloseBtn: 'Đóng',
    createModalTitle: 'TẠO MODULE SANDBOX MỚI',
    editModalTitle: 'CHỈNH SỬA MODULE',
    moduleNameLabel: 'Tên Module',
    moduleLangLabel: 'Ngôn ngữ môi trường',
    moduleDescLabel: 'Mô tả',
    resourceQuotasTitle: 'HẠN MỨC TÀI NGUYÊN SANDBOX (CGROUPS V2)',
    cpuLimitLabel: 'Giới hạn CPU (%)',
    ramLimitLabel: 'Giới hạn RAM (MB)',
    netPolicyLabel: 'Chính sách mạng',
    scriptContentLabel: 'Nội dung script có thể thực thi',
    cancelBtn: 'Hủy bỏ',
    saveChangesBtn: 'Lưu thay đổi',
    createModuleSubmitBtn: 'Tạo Module Sandbox',

    // Internal CA Tab
    caCardTitle: 'GỐC TIN CẬY NỘI BỘ & ROOT CA 50 NĂM',
    caCardSubtitle: 'Hạ tầng khóa công khai (PKI) riêng biệt thiết kế cho hệ thống VPS tự vận hành 24/7.',
    caStatus: 'Trạng thái',
    caValidity: 'Thời hạn',
    caCreated: 'Khởi tạo',
    caExpires: 'Hết hạn',
    caAlgorithm: 'Thuật toán',
    caHash: 'Hàm băm',
    sha256Fingerprint: 'Mã băm vân tay SHA-256:',
    pkiCertHierarchy: 'CÂY PHÂN CẤP CHỨNG CHỈ PKI',
    threeTierChain: 'Chuỗi tin cậy 3 tầng',
    hierarchyDesc: 'Root CA được bảo vệ nghiêm ngặt chỉ dùng để ký Intermediate CA. Mọi kết nối dịch vụ sử dụng chứng chỉ máy chủ thời hạn ngắn tự động luân chuyển mỗi 90 ngày.',
    serverCertTitle: 'CHỨNG CHỈ MÁY CHỦ & PROXY',
    daysRemaining: 'Ngày còn lại',
    noClientRedownload: 'Người dùng không cần tải lại Root CA khi luân chuyển chứng chỉ máy chủ.',
    rotateLeafCert: 'Luân chuyển chứng chỉ ngay',
    trustStoreGuideTitle: 'HƯỚNG DẪN CÀI ĐẶT TRUST STORE VÀO HỆ ĐIỀU HÀNH',
    trustStoreGuideDesc: 'Cài đặt chứng chỉ Root CA 50 năm vào hệ thống máy khách để xác thực TLS proxy mà không bị cảnh báo trình duyệt:',
    caHeaderTitle: 'GỐC TIN CẬY NỘI BỘ & ROOT CA 50 NĂM',
    caHeaderSubtitle: 'Hạ tầng khóa công khai riêng (PKI) thiết kế tối ưu cho cụm VPS hoạt động độc lập 24/7.',
    ca50yBadge: 'THỜI HẠN: 50 NĂM (2026 – 2076)',
    caBoxTitle: 'INTERNAL CA',
    caBoxStatus: 'Trạng thái',
    caBoxValidity: 'Thời hạn',
    caBoxCreated: 'Ngày tạo',
    caBoxExpires: 'Ngày hết hạn',
    caBoxAlgorithm: 'Thuật toán',
    caBoxHash: 'Thuật toán băm',
    caBoxDownloadBtn: '[ TẢI CHỨNG CHỈ CA ]',
    caBoxCopyFingerprintBtn: '[ SAO CHÉP MÃ VÂN TAY ]',
    caBoxCopied: 'ĐÃ SAO CHÉP!',
    caBoxViewDetailsBtn: '[ XEM CHI TIẾT ]',
    hierarchyTitle: 'CÂY PHÂN CẤP CHỨNG CHỈ PKI',
    hierarchySubtitle: 'Chuỗi tin cậy 3 tầng',
    rootCaLevelTitle: 'ROOT CA (50 NĂM)',
    intermediateCaLevelTitle: 'INTERMEDIATE CA (10 NĂM)',
    serverCertLevelTitle: 'CHỨNG CHỈ MÁY CHỦ & PROXY',
    rotateLeafCertBtn: 'Luân chuyển chứng chỉ máy chủ ngay',
    rotatingBtn: 'Đang luân chuyển...',
    rotateNote: 'Không cần tải lại chứng chỉ Root CA khi chứng chỉ dịch vụ được làm mới.',
    trustStoreTitle: 'LỆNH TÍCH HỢP TRUST STORE HỆ THỐNG',
    trustStoreDesc: 'Cài đặt Root CA công khai vào máy khách để tin cậy TLS proxy mà không hiện cảnh báo trình duyệt:',
    caModalTitle: 'CHI TIẾT CHỨNG CHỈ X.509 CỦA INTERNAL CA',
    caModalSecurityGuarantee: 'Cam kết bảo mật tuyệt đối:',
    caModalGuaranteeDesc: 'Khóa bí mật được phân quyền POSIX 0600 nghiêm ngặt trên hệ thống tệp và không bao giờ xuất hiện trong Git, Docker image hay bản tải về.',

    // Performance Tab
    performanceTitle: 'QUẢN TRỊ HIỆU NĂNG & ĐO ĐẠC TELEMETRY',
    performanceSubtitle: 'Giám sát phần cứng thực tế không phóng đại số liệu ảo. Các cấu hình tối ưu socket và kernel trong giới hạn VPS thực tế.',
    perfHeaderTitle: 'QUẢN TRỊ HIỆU NĂNG & TELEMETRY',
    perfHeaderSubtitle: 'Giám sát phần cứng thực tế không có số liệu giả lập. Các cấu hình tối ưu hóa tài nguyên trong giới hạn thực của máy chủ VPS.',
    activePresetLabel: 'Cấu hình đang kích hoạt',
    cpuUtilization: 'MỨC DÙNG CPU',
    ramAllocation: 'PHÂN BỔ BỘ NHỚ RAM',
    storageVolume: 'DUNG LƯỢNG LƯU TRỮ',
    networkLatency: 'MẠNG & ĐỘ TRỄ',
    selectPresetTitle: 'CHỌN CẤU HÌNH HIỆU NĂNG',
    zeroDowntimeReconfig: 'Tái cấu hình không gián đoạn dịch vụ',
    clickToApply: 'Nhấn để áp dụng',
    activePresetBadge: 'CẤU HÌNH HIỆN TẠI',
    activePresetTag: 'CẤU HÌNH ĐANG KÍCH HOẠT',
    cpuModel: 'Kiến trúc',
    occupancy: 'Mức dùng',
    free: 'Trống',
    maxConns: 'Kết nối tối đa',
    threadQuota: 'Hạn mức luồng',
    bufferStrategy: 'Chiến lược bộ đệm',
    hardwareGroundingTitle: 'Chính sách gắn liền phần cứng vật lý',
    hardwareGroundingDesc: 'Cấu hình ENTERPRISE tự động tinh chỉnh bộ đệm Linux kernel TCP, bộ hẹn giờ keep-alive và affinity tiến trình. Toàn bộ thông số hoạt động tuyệt đối trong giới hạn phần cứng thực.',
    strictHardwareNoticeTitle: 'Chính sách gắn chặt với phần cứng thực',
    strictHardwareNoticeDesc: 'Cấu hình ENTERPRISE tự động điều chỉnh bộ đệm TCP kernel Linux, bộ hẹn giờ keep-alive và affinity luồng, tuân thủ nghiêm ngặt số nhân và dung lượng bộ nhớ thực của máy chủ VPS.',
    presetEconomyTag: 'Tiết kiệm tài nguyên',
    presetEconomyDesc: 'Giảm thiểu chu kỳ CPU, thu nhỏ bộ đệm chờ, giới hạn nhóm worker cho các máy ảo cấu hình thấp.',
    presetBalancedTag: 'Mặc định Production',
    presetBalancedDesc: 'Cân bằng tối ưu tỷ lệ 1:1 giữa băng thông và mức chiếm dụng bộ nhớ RAM cho môi trường sản xuất thông thường.',
    presetPerfTag: 'Băng thông cao',
    presetPerfDesc: 'Phân bổ sẵn socket tích cực và nhóm luồng xử lý cao phục vụ các tải proxy API lưu lượng đột biến.',
    presetEnterpriseTag: 'Chuẩn Doanh nghiệp 1000 KWD',
    presetEnterpriseDesc: 'Tăng tốc kernel zero-copy io_uring, ưu tiên định tuyến realtime, tuyệt đối tuân thủ giới hạn phần cứng thực tế.',

    // Security Tab
    securityTitle: 'TRUNG TÂM BẢO MẬT & KIỂM TOÁN TẬP TRUNG',
    securitySubtitle: 'Xác minh kỹ thuật khách quan theo 12 tiêu chuẩn chuẩn doanh nghiệp và chuỗi kiểm toán append-only.',
    secHeaderTitle: 'TRUNG TÂM AN NINH & KHO LƯU TRỮ KIỂM TOÁN',
    secHeaderSubtitle: 'Kiểm tra kỹ thuật khách quan 12 tiêu chuẩn doanh nghiệp và nhật ký kiểm toán không thể sửa đổi.',
    twelvePointChecklist: 'Danh mục 12 tiêu chuẩn',
    tab12PointChecklist: 'Danh mục 12 tiêu chuẩn',
    auditTrail: 'Nhật ký kiểm toán',
    tabAuditTrail: 'Nhật ký kiểm toán',
    securityStatusVerified: 'TRẠNG THÁI AN NINH: 12 TRÊN 12 TIÊU CHUẨN ĐẠT YÊU CẦU',
    status12Of12Verified: 'TRẠNG THÁI AN NINH: 12 TRÊN 12 TIÊU CHUẨN ĐẠT YÊU CẦU',
    enterpriseComplianceStandard: 'Tiêu chuẩn: Tuân thủ Doanh nghiệp Cấp cao (1000 KWD)',
    standard1000KwdCompliance: 'Tiêu chuẩn: Tuân thủ Doanh nghiệp Cấp cao (1000 KWD)',
    technicalRule: 'Quy tắc kỹ thuật',
    technicalRuleLabel: 'Quy tắc kỹ thuật:',
    searchPlaceholder: 'Tìm kiếm người dùng, tài nguyên, địa chỉ IP...',
    exportJson: 'Xuất JSON',
    exportJsonBtn: 'Xuất JSON',
    timestampUtc: 'Thời gian (UTC)',
    userIdentity: 'Người dùng / Danh tính',
    actionCol: 'Hành động',
    callerIp: 'IP người gọi',
    targetResource: 'Tài nguyên tác động',
    resultCol: 'Kết quả',
    inspectCol: 'Chi tiết',
    colTimestamp: 'Thời gian (UTC)',
    colUser: 'Người dùng',
    colAction: 'Hành động',
    colCallerIp: 'IP gọi',
    colTargetResource: 'Tài nguyên',
    colResult: 'Kết quả',
    colInspect: 'Xem',
    auditInspectorTitle: 'BẢN GHI AUDIT LOG CHI TIẾT',
    btnClose: 'Đóng',

    // Backup Tab
    backupTitle: 'PHỤC HỒI THẢM HỌA & BẢN SAO LƯU MÃ HÓA',
    backupSubtitle: 'Lưu trữ điểm thời gian mã hóa AES-256-GCM kèm chữ ký xác thực toàn vẹn SHA-256.',
    backupHeaderTitle: 'PHỤC HỒI THẢM HỌA & BẢN SAO LƯU MÃ HÓA',
    backupHeaderSubtitle: 'Lưu trữ điểm thời gian mã hóa AES-256-GCM kèm chữ ký xác thực toàn vẹn SHA-256.',
    btnBackupNow: 'SAO LƯU NGAY',
    backupNowBtn: 'SAO LƯU NGAY',
    creatingSnapshot: 'ĐANG TẠO BẢN SAO LƯU...',
    creatingSnapshotBtn: 'ĐANG TẠO BẢN SAO LƯU...',
    autoCadence: 'CHU KỲ TỰ ĐỘNG',
    automatedCadence: 'CHU KỲ TỰ ĐỘNG',
    dailyWeeklyMonthly: 'Hàng ngày / Hàng tuần / Hàng tháng',
    encryptionSpec: 'TIÊU CHUẨN MÃ HÓA',
    componentsBackedUp: 'THÀNH PHẦN SAO LƯU',
    fiveCoreSubsystems: '5 Hệ thống con cốt lõi',
    subsystemsDesc: 'PostgreSQL DB, trạng thái Redis, mã Module, proxy ACL và chứng chỉ CA.',
    nextSnapshotScheduled: 'Lần sao lưu tiếp theo dự kiến:',
    privateKeysExcluded: 'Khóa bí mật chưa mã hóa được loại trừ nghiêm ngặt khỏi tệp lưu.',
    availableSnapshots: 'DANH SÁCH BẢN SAO LƯU',
    availableSnapshotsTitle: 'DANH SÁCH BẢN SAO LƯU KHẢ DỤNG',
    sha256VerifiedStorage: 'Lưu trữ xác thực chữ ký SHA-256',
    sha256Verified: 'Lưu trữ đã kiểm tra SHA-256',
    createdAt: 'Khởi tạo',
    size: 'Dung lượng',
    checksum: 'Mã băm',
    btnVerifyBackup: 'KIỂM TRA TOÀN VẸN',
    verifyBackupBtn: 'KIỂM TRA BẢN SAO LƯU',
    btnRestore: 'KHÔI PHỤC',
    restoreBtn: 'KHÔI PHỤC',
    confirmRestoreTitle: 'XÁC NHẬN KHÔI PHỤC HỆ THỐNG',
    confirmRestoreWarning: 'Khôi phục từ bản sao lưu này sẽ ghi đè trạng thái cơ sở dữ liệu hiện tại và nạp lại toàn bộ script trong sandbox.',
    typeRestoreToConfirm: 'Nhập RESTORE để xác nhận:',
    confirmRestoreActionBtn: 'Xác nhận khôi phục hệ thống',
    btnCancel: 'Hủy bỏ',

    // Deployment & Health Tab
    healthTitle: 'SỨC KHỎE HỆ THỐNG & TỰ ĐỘNG HÓA TRIỂN KHAI',
    healthSubtitle: 'Theo dõi trực tiếp các endpoint kiểm tra sức khỏe và các script triển khai production sẵn sàng sao chép.',
    healthHeaderTitle: 'SỨC KHỎE HỆ THỐNG CON & TỰ ĐỘNG HÓA TRIỂN KHAI',
    healthHeaderSubtitle: 'Theo dõi trực tiếp các endpoint sức khỏe và script triển khai production có thể sao chép ngay.',
    healthEndpointsTitle: 'CÁC ENDPOINT SỨC KHỎE TIÊU CHUẨN (YÊU CẦU 12)',
    standardHealthEndpoints: 'CÁC ENDPOINT SỨC KHỎE TIÊU CHUẨN (YÊU CẦU 12)',
    subsystemsMatrixTitle: 'MA TRẬN HỆ THỐNG CON NỘI BỘ',
    subsystemsMatrix: 'MA TRẬN TRẠNG THÁI CÁC THÀNH PHẦN NỘI BỘ',
    deploymentScriptsTitle: 'SCRIPT VẬN HÀNH & TỆP CẤU HÌNH DOCKER',
    prodScriptsTitle: 'KỊCH BẢN SẢN XUẤT & CẤU HÌNH DOCKER (YÊU CẦU 18)',
    copyScriptBtn: 'Sao chép mã',
    copiedScriptBtn: 'ĐÃ SAO CHÉP MÃ',

    // Auth Modal
    authTitle: 'XÁC THỰC & PHÂN QUYỀN RBAC',
    authModalTitle: 'XÁC THỰC DANH TÍNH & PHÂN QUYỀN RBAC',
    currentSession: 'Phiên làm việc hiện tại',
    currentActiveSession: 'Phiên đăng nhập hiện tại:',
    btnLogout: 'Đăng xuất',
    logoutBtn: 'Đăng xuất',
    quickSwitchRole: 'Chuyển nhanh vai trò kiểm thử',
    usernameEmail: 'Tên người dùng / Email',
    usernameLabel: 'Tên đăng nhập / Email',
    passwordArgon: 'Mật khẩu (Băm Argon2id)',
    passwordLabel: 'Mật khẩu (Argon2id)',
    authenticating: 'Đang xác thực...',
    authenticatingBtn: 'Đang kiểm tra thông tin...',
    btnSignIn: 'Đăng nhập với danh tính đã chọn',
    signInBtn: 'Đăng nhập với danh tính đã chọn',

    // Footer & Common
    footerBrand: 'HỆ THỐNG VPS ENTERPRISE TIER-1 (ĐỊNH VỊ 1000 KWD)',
    footerRootCa: 'Root CA: 50 năm (2026-2076)',
    footerUid: 'UID: 1001 (Không đặc quyền)',
    footerSecurity: 'An ninh: 12/12 ĐẠT CHUẨN'
  },
  en: {
    // Brand & Header
    brandTitle: 'ENTERPRISE VPS & PROXY CONTROL CENTER',
    brandTag: '1000 KWD TIER-1 SPEC',
    brandSubtitle: 'Autonomous 64-bit Linux VPS Fleet, Hardened TLS & 24/7 Watchdog',
    streamLive: 'STREAM LIVE',
    connecting: 'CONNECTING...',
    quickRefreshTooltip: 'Instant telemetry refresh',
    rolePrefix: 'ROLE',
    languageSelect: 'Language',

    // Nav tabs
    navOverview: 'Overview',
    navProxy: 'Proxy & Gateway',
    navModules: 'Runner & Modules',
    navCA: 'Internal CA 50Y',
    navPerformance: 'Performance',
    navSecurity: 'Security & Audit',
    navBackup: 'Disaster Recovery',
    navDeployment: 'Health & Deploy',

    // Overview
    vpsTitle: 'VPS ENTERPRISE',
    statusOnline: 'ONLINE',
    statusDegraded: 'DEGRADED',
    cpu: 'CPU',
    ram: 'RAM',
    disk: 'DISK',
    network: 'NETWORK',
    uptime: 'UPTIME',
    proxy: 'PROXY',
    connection: 'CONNECTION',
    latency: 'LATENCY',
    modules: 'MODULES',
    running: 'RUNNING',
    stopped: 'STOPPED',
    proxyAclBtn: 'Manage Proxy & ACLs',
    runnerBtn: 'Open Script Runner',

    caVaultTitle: 'INTERNAL TRUST VAULT (CA)',
    caValidityTag: '50 YEARS VALIDITY',
    subjectCn: 'Subject Common Name',
    algorithm: 'Key Algorithm',
    notBefore: 'Created (Not Before)',
    notAfter: 'Expires (Not After)',
    fingerprint: 'SHA-256 Fingerprint',
    caProtectionTitle: 'Root CA Protection Guarantee:',
    caProtectionDesc: 'Private keys are isolated strictly under POSIX chmod 0600 on server filesystem and never included in Git commits, Docker build layers, or client downloads.',
    downloadCaBtn: 'DOWNLOAD ROOT CA',
    hierarchyBtn: 'View Certificate Hierarchy',

    presetRecoveryTitle: 'PERFORMANCE & SELF-HEALING AUTOMATION',
    handshakeLatency: 'Average Handshake',
    requestsPerSec: 'Requests / Sec',
    watchdogRecovery: 'Self-Healing Watchdog',
    watchdogActive: 'ACTIVE (LOOP-FREE)',
    crashBackoffCircuit: 'Watchdog Circuit Breaker Guarantee:',
    crashBackoffDesc: 'If the proxy crashes consecutively 5 times, watchdog enters BACKOFF mode (120s pause) and dispatches an admin alert. It never restarts in an infinite loop that starves the VPS.',
    securitySandbox: 'POSIX Sandbox Isolation',
    nonRootUser: 'Unprivileged User (UID 1001)',
    zeroDowntimeReload: 'Zero-Downtime Reload',
    tunePresets: 'Tune Performance Presets',

    cpuCores: 'CPU Cores',
    platform: 'Platform',
    kernel: 'Kernel',
    proxyPools: 'Keep-Alive Pool',
    errorRate: 'Error Rate',
    securityAudit: 'Security Audit',
    activeWorkersTitle: 'Active Sandboxed Workers',
    manageModulesLink: 'Manage All Sandboxed Modules →',

    // Proxy Tab
    proxyGatewayTitle: 'PROXY GATEWAY & TLS TERMINATOR',
    dualStack: 'Dual Stack',
    dualStackSub: 'Dual-Stack IPv4 & IPv6 with high-throughput TCP connection management.',
    reloadZeroDowntime: 'Zero-Downtime Reload',
    simulateCrash: 'Simulate Crash Test',
    simulateCrashTest: 'Simulate Crash Test',
    resetCircuitBreaker: 'Reset Circuit Breaker',
    tabLiveSessions: 'Live Sessions',
    tabIpAcls: 'IP Allowlist & Denylist',
    tabWatchdog: 'Watchdog Self-Healing',
    tabArchitecture: 'Architecture Flow',
    liveSessions: 'Live Sessions',
    ipAllowDeny: 'IP Allowlist & Denylist',
    watchdogHealing: 'Watchdog Self-Healing',
    architectureTopology: 'ENTERPRISE PROXY ARCHITECTURE TOPOLOGY',
    totalActive: 'Total Active',
    bandwidth: 'Bandwidth',
    avgLatency: 'Avg Latency',
    poolInfo: 'Keep-Alive Pool: 64 active | TCP Keepalive Timeout: 65s',
    sessionId: 'Session ID',
    clientIpStack: 'Client IP & Stack',
    protocol: 'Protocol',
    targetEndpoint: 'Target Endpoint',
    authIdentity: 'Auth Identity',
    trafficInOut: 'Traffic In/Out',
    latencyCol: 'Latency',
    statusCol: 'Status',
    colSessionId: 'Session ID',
    colClientIp: 'Client IP & Stack',
    colProtocol: 'Protocol',
    colTarget: 'Target Endpoint',
    colAuthUser: 'Auth Identity',
    colTraffic: 'Traffic In/Out',
    colLatency: 'Latency',
    colStatus: 'Status',
    ipAllowlistTitle: 'IP ALLOWLIST (CIDR)',
    ipAllowlistDesc: 'Only authorized client IPs/subnets can initiate connections through this proxy. Open proxy mode is strictly prohibited.',
    allowlistDesc: 'Only authorized client IPs/subnets can initiate connections through this proxy. Open proxy mode is strictly prohibited.',
    ipDenylistTitle: 'IP DENYLIST (DROP)',
    ipDenylistDesc: 'Packets from these addresses will be immediately dropped by nftables / kernel firewall before TCP handshake.',
    denylistDesc: 'Packets from these addresses will be immediately dropped by nftables / kernel firewall before TCP handshake.',
    btnAdd: 'Add',
    btnBlock: 'Block',
    addRuleBtn: 'Add Rule',
    blockRuleBtn: 'Block',
    rulesCount: 'Rules',
    watchdogTitle: 'AUTOMATIC RECOVERY & WATCHDOG CIRCUIT',
    watchdogSubtitle: 'Guaranteed zero-infinite loop policy with exponential backoff.',
    circuitBreakerArmed: 'CIRCUIT BREAKER ARMED',
    recoveryStatus: 'Recovery Status',
    totalCrashCount: 'Total Crash Count',
    consecutiveFailures: 'Consecutive Failures',
    lastRecoveryAction: 'Last Recovery Action',
    selfHealingPipeline: 'Self-Healing Pipeline',
    selfHealingNote: '* If consecutive crash limit is exceeded (5 crashes): Pipeline switches to FAILED → BACKOFF (120s) → ALERT ADMIN. Does not restart infinitely.',
    watchdogNote: '* If consecutive crash limit is exceeded (5 crashes): Pipeline switches to FAILED → BACKOFF (120s) → ALERT ADMIN. Does not restart infinitely.',
    step1: '1. CRASH',
    step2: '2. DETECT',
    step3: '3. LOG AUDIT',
    step4: '4. AUTO-RESTART',
    step5: '5. HEALTH CHECK',
    step6: '6. ONLINE',
    archTitle: 'ENTERPRISE PROXY ARCHITECTURE TOPOLOGY',
    archDesc: 'Production flow fulfilling Requirement 2: Strict layered security from ingress to target networks.',
    archTopologyDesc: 'Production flow fulfilling Requirement 2: Strict layered security from ingress to target networks.',
    archClient: 'Client',
    archTlsGateway: 'TLS Gateway',
    archAuthAcl: 'Authentication & ACL',
    archProxyGateway: 'Proxy Gateway',
    archConnManager: 'Connection Manager',
    archTargetNetwork: 'Target Network & Sandboxed Modules',
    flowClient: 'Client',
    flowClientDesc: 'External HTTPS / TCP Client over IPv4 & IPv6',
    flowTlsGateway: 'TLS Gateway',
    flowTlsGatewayDesc: 'TLS 1.2 / TLS 1.3 Strict Terminator with 50-Year Root CA Trust',
    flowAuthAcl: 'Authentication & ACL',
    flowAuthAclDesc: 'Token/Credential check, IP Allowlist verification, rate-limiter token bucket',
    flowProxyGateway: 'Proxy Gateway',
    flowProxyGatewayDesc: 'High-throughput reverse proxy routing with per-user connection quotas',
    flowConnectionManager: 'Connection Manager',
    flowConnectionManagerDesc: 'TCP keep-alive pooling, retry policy (max 3), socket timeouts',
    flowTargetNetwork: 'Target Network & Sandboxed Modules',
    flowTargetNetworkDesc: 'Destination upstream servers or unprivileged local sandboxed workers',

    // Modules Tab
    processRunnerTitle: 'SANDBOXED PROCESS RUNNER & SUPERVISOR',
    processRunnerSubtitle: 'POSIX sandbox isolation, CPU quotas, memory limits, PID watchdog, and unprivileged user (UID 1001).',
    createModuleBtn: 'Create New Module',
    modulesHeaderTitle: 'SANDBOXED PROCESS RUNNER & SUPERVISOR',
    modulesHeaderSubtitle: 'POSIX sandbox isolation, CPU quotas, memory limits, PID watchdog, and unprivileged user (UID 1001).',
    createNewModuleBtn: 'Create New Module',
    startWorkerBtn: 'Start Worker',
    pauseBtn: 'Pause',
    stopBtn: 'Stop',
    restartBtn: 'Restart',
    logsBtn: 'Logs',
    editBtn: 'Edit',
    testCrashBtn: 'Test Crash',
    deleteTooltip: 'Delete module',
    moduleUptime: 'Uptime',
    moduleRestarts: 'Restarts',
    moduleExitCode: 'Exit Code',
    moduleUser: 'User',
    cpuUsageQuota: 'CPU Usage / Quota',
    ramUsageQuota: 'RAM Usage / Quota',
    cpuQuota: 'CPU Usage / Quota',
    ramQuota: 'RAM Usage / Quota',
    networkPolicy: 'Network Policy',
    sandboxPath: 'Sandbox Path',
    btnPause: 'Pause',
    btnStop: 'Stop',
    btnRestart: 'Restart',
    btnStart: 'Start Worker',
    btnLogs: 'Logs',
    btnEdit: 'Edit',
    btnCrashTest: 'Test Crash',
    moduleName: 'Module Name',
    runtimeLanguage: 'Runtime Language',
    description: 'Description',
    sandboxResourceQuotas: 'SANDBOX RESOURCE QUOTAS (CGROUPS V2)',
    maxCpuLimit: 'Max CPU Limit (%)',
    maxRamLimit: 'Max RAM Limit (MB)',
    scriptContent: 'Executable Script Content',
    logsModalTitle: 'SANDBOX LOGS',
    noLogsYet: 'No logs generated yet.',
    modalCloseBtn: 'Close',
    createModalTitle: 'CREATE SANDBOXED MODULE',
    editModalTitle: 'EDIT MODULE',
    moduleNameLabel: 'Module Name',
    moduleLangLabel: 'Runtime Language',
    moduleDescLabel: 'Description',
    resourceQuotasTitle: 'Sandbox Resource Quotas (cgroups v2)',
    cpuLimitLabel: 'Max CPU Limit (%)',
    ramLimitLabel: 'Max RAM Limit (MB)',
    netPolicyLabel: 'Network Policy',
    scriptContentLabel: 'Executable Script Content',
    cancelBtn: 'Cancel',
    saveChangesBtn: 'Save Changes',
    createModuleSubmitBtn: 'Create Sandboxed Module',

    // Internal CA Tab
    caCardTitle: 'INTERNAL TRUST ANCHOR & 50-YEAR ROOT CA',
    caCardSubtitle: 'Dedicated private Public Key Infrastructure (PKI) designed for 24/7 autonomous VPS fleet operations.',
    caStatus: 'Status',
    caValidity: 'Validity',
    caCreated: 'Created',
    caExpires: 'Expires',
    caAlgorithm: 'Algorithm',
    caHash: 'Hash',
    sha256Fingerprint: 'SHA-256 Fingerprint:',
    pkiCertHierarchy: 'PKI CERTIFICATE HIERARCHY',
    threeTierChain: '3-Tier Trust Chain',
    hierarchyDesc: 'Root CA is strictly reserved for signing Intermediate CAs. Service connections use short-lived leaf certificates that rotate automatically every 90 days.',
    serverCertTitle: 'SERVER & PROXY CERTIFICATE',
    daysRemaining: 'Days Remaining',
    noClientRedownload: 'No client re-download needed on rotation.',
    rotateLeafCert: 'Rotate Leaf Cert Now',
    trustStoreGuideTitle: 'TRUST STORE INTEGRATION COMMANDS',
    trustStoreGuideDesc: 'Install the public 50-year Root CA on client machines to verify proxy TLS certificates without browser warnings:',
    caHeaderTitle: 'INTERNAL TRUST ANCHOR & 50-YEAR ROOT CA',
    caHeaderSubtitle: 'Dedicated private Public Key Infrastructure (PKI) designed for 24/7 autonomous VPS fleet operations.',
    ca50yBadge: 'VALIDITY: 50 YEARS (2026 – 2076)',
    caBoxTitle: 'INTERNAL CA',
    caBoxStatus: 'Status',
    caBoxValidity: 'Validity',
    caBoxCreated: 'Created',
    caBoxExpires: 'Expires',
    caBoxAlgorithm: 'Algorithm',
    caBoxHash: 'Hash',
    caBoxDownloadBtn: '[ DOWNLOAD CA ]',
    caBoxCopyFingerprintBtn: '[ COPY FINGERPRINT ]',
    caBoxCopied: 'COPIED!',
    caBoxViewDetailsBtn: '[ VIEW DETAILS ]',
    hierarchyTitle: 'PKI CERTIFICATE HIERARCHY',
    hierarchySubtitle: '3-Tier Trust Chain',
    rootCaLevelTitle: 'ROOT CA (50 YEARS)',
    intermediateCaLevelTitle: 'INTERMEDIATE CA (10 YEARS)',
    serverCertLevelTitle: 'SERVER & PROXY CERTIFICATE',
    rotateLeafCertBtn: 'Rotate Leaf Cert Now',
    rotatingBtn: 'Rotating...',
    rotateNote: 'No client re-download needed on rotation.',
    trustStoreTitle: 'TRUST STORE INTEGRATION COMMANDS',
    trustStoreDesc: 'Install the public 50-year Root CA on client machines to verify proxy TLS certificates without browser warnings:',
    caModalTitle: 'INTERNAL CA X.509 CERTIFICATE DETAILS',
    caModalSecurityGuarantee: 'Strict Security Guarantee:',
    caModalGuaranteeDesc: 'Private key material is isolated under chmod 0600 on server filesystem and never included in Git commits, Docker build layers, or client downloads.',

    // Performance Tab
    performanceTitle: 'PERFORMANCE MANAGER & TELEMETRY',
    performanceSubtitle: 'Real hardware monitoring without artificial inflation. Presets optimize kernel and socket allocations within true VPS constraints.',
    perfHeaderTitle: 'PERFORMANCE MANAGER & TELEMETRY',
    perfHeaderSubtitle: 'Real hardware monitoring without artificial inflation. Presets optimize kernel and socket allocations within true VPS constraints.',
    activePresetLabel: 'Active Preset',
    cpuUtilization: 'CPU UTILIZATION',
    ramAllocation: 'RAM ALLOCATION',
    storageVolume: 'STORAGE VOLUME',
    networkLatency: 'NETWORK & LATENCY',
    selectPresetTitle: 'SELECT PERFORMANCE PRESET',
    zeroDowntimeReconfig: 'Zero-downtime reconfiguration',
    clickToApply: 'Click to Apply',
    activePresetBadge: 'ACTIVE PRESET',
    activePresetTag: 'ACTIVE PRESET',
    cpuModel: 'Model',
    occupancy: 'Occupancy',
    free: 'Free',
    maxConns: 'Max Conns',
    threadQuota: 'Thread Quota',
    bufferStrategy: 'Buffer Strategy',
    hardwareGroundingTitle: 'Strict Hardware Grounding Policy',
    hardwareGroundingDesc: 'The ENTERPRISE preset dynamically configures Linux kernel TCP buffers, keep-alive timers, and task affinity. It strictly operates within actual physical processor cores and memory limits reported by the Linux host kernel.',
    strictHardwareNoticeTitle: 'Strict Hardware Grounding Policy',
    strictHardwareNoticeDesc: 'The ENTERPRISE preset dynamically configures Linux kernel TCP buffers, keep-alive timers, and task affinity. It strictly operates within actual physical processor cores and memory limits reported by the Linux host kernel.',
    presetEconomyTag: 'Resource Saver',
    presetEconomyDesc: 'Minimizes CPU cycle usage, reduces idle buffers, and limits worker pool for low-spec virtual instances.',
    presetBalancedTag: 'Default Production',
    presetBalancedDesc: 'Optimal 1:1 throughput and memory footprint balance for standard production operations.',
    presetPerfTag: 'High Throughput',
    presetPerfDesc: 'Aggressive socket pre-allocation and thread pooling for bursty API proxying workloads.',
    presetEnterpriseTag: '1000 KWD Tier-1 Tuned',
    presetEnterpriseDesc: 'Full kernel zero-copy io_uring acceleration, real-time priority affinity, bounded strictly by real hardware.',

    // Security Tab
    securityTitle: 'SECURITY CENTER & AUDIT VAULT',
    securitySubtitle: 'Objective technical verification of 12 enterprise standards and append-only audit trail.',
    secHeaderTitle: 'SECURITY CENTER & AUDIT VAULT',
    secHeaderSubtitle: 'Objective technical verification of 12 enterprise standards and append-only audit trail.',
    twelvePointChecklist: '12-Point Checklist',
    tab12PointChecklist: '12-Point Checklist',
    auditTrail: 'Audit Trail',
    tabAuditTrail: 'Audit Trail',
    securityStatusVerified: 'SECURITY STATUS: 12 OF 12 VERIFIED',
    status12Of12Verified: 'SECURITY STATUS: 12 OF 12 VERIFIED',
    enterpriseComplianceStandard: 'Standard: 1000 KWD Enterprise Compliance',
    standard1000KwdCompliance: 'Standard: 1000 KWD Enterprise Compliance',
    technicalRule: 'Technical Rule',
    technicalRuleLabel: 'Technical Rule:',
    searchPlaceholder: 'Search user, resource, IP...',
    exportJson: 'Export JSON',
    exportJsonBtn: 'Export JSON',
    timestampUtc: 'Timestamp (UTC)',
    userIdentity: 'User / Identity',
    actionCol: 'Action',
    callerIp: 'Caller IP',
    targetResource: 'Target Resource',
    resultCol: 'Result',
    inspectCol: 'Inspect',
    colTimestamp: 'Timestamp (UTC)',
    colUser: 'User / Identity',
    colAction: 'Action',
    colCallerIp: 'Caller IP',
    colTargetResource: 'Target Resource',
    colResult: 'Result',
    colInspect: 'Inspect',
    auditInspectorTitle: 'AUDIT RECORD INSPECTOR',
    btnClose: 'Close',

    // Backup Tab
    backupTitle: 'DISASTER RECOVERY & ENCRYPTED SNAPSHOTS',
    backupSubtitle: 'AES-256-GCM encrypted point-in-time archives with SHA-256 integrity signatures.',
    backupHeaderTitle: 'DISASTER RECOVERY & ENCRYPTED SNAPSHOTS',
    backupHeaderSubtitle: 'AES-256-GCM encrypted point-in-time archives with SHA-256 integrity signatures.',
    btnBackupNow: 'BACKUP NOW',
    backupNowBtn: 'BACKUP NOW',
    creatingSnapshot: 'CREATING SNAPSHOT...',
    creatingSnapshotBtn: 'CREATING SNAPSHOT...',
    autoCadence: 'AUTOMATED CADENCE',
    automatedCadence: 'AUTOMATED CADENCE',
    dailyWeeklyMonthly: 'Daily / Weekly / Monthly',
    encryptionSpec: 'ENCRYPTION SPEC',
    componentsBackedUp: 'COMPONENTS BACKED UP',
    fiveCoreSubsystems: '5 Core Subsystems',
    subsystemsDesc: 'Postgres DB, Redis state, Module code, Proxy ACLs, CA Certs.',
    nextSnapshotScheduled: 'Next snapshot scheduled for:',
    privateKeysExcluded: 'Private keys strictly excluded from unencrypted archives.',
    availableSnapshots: 'AVAILABLE RECOVERY SNAPSHOTS',
    availableSnapshotsTitle: 'AVAILABLE RECOVERY SNAPSHOTS',
    sha256VerifiedStorage: 'SHA-256 Verified Storage',
    sha256Verified: 'SHA-256 Verified Storage',
    createdAt: 'Created',
    size: 'Size',
    checksum: 'Checksum',
    btnVerifyBackup: 'VERIFY BACKUP',
    verifyBackupBtn: 'VERIFY BACKUP',
    btnRestore: 'RESTORE',
    restoreBtn: 'RESTORE',
    confirmRestoreTitle: 'CONFIRM DISASTER RECOVERY RESTORE',
    confirmRestoreWarning: 'Restoring from this snapshot will overwrite current database state and reload all sandboxed module scripts.',
    typeRestoreToConfirm: 'Type RESTORE to confirm:',
    confirmRestoreActionBtn: 'Confirm System Restore',
    btnCancel: 'Cancel',

    // Deployment & Health Tab
    healthTitle: 'SUBSYSTEM HEALTH & DEPLOYMENT AUTOMATION',
    healthSubtitle: 'Real-time status of health endpoints and copyable production deployment scripts.',
    healthHeaderTitle: 'SUBSYSTEM HEALTH & DEPLOYMENT AUTOMATION',
    healthHeaderSubtitle: 'Real-time status of health endpoints and copyable production deployment scripts.',
    healthEndpointsTitle: 'STANDARDIZED HEALTH ENDPOINTS (Requirement 12)',
    standardHealthEndpoints: 'STANDARDIZED HEALTH ENDPOINTS (Requirement 12)',
    subsystemsMatrixTitle: 'INTERNAL SUBSYSTEMS MATRIX',
    subsystemsMatrix: 'INTERNAL SUBSYSTEMS MATRIX',
    deploymentScriptsTitle: 'PRODUCTION SCRIPTS & DOCKER MANIFESTS (Requirement 18)',
    prodScriptsTitle: 'PRODUCTION SCRIPTS & DOCKER MANIFESTS (Requirement 18)',
    copyScriptBtn: 'Copy Script',
    copiedScriptBtn: 'COPIED SCRIPT',

    // Auth Modal
    authTitle: 'AUTHENTICATION & RBAC ROLES',
    authModalTitle: 'AUTHENTICATION & RBAC ROLES',
    currentSession: 'Current Active Session',
    currentActiveSession: 'Current Active Session:',
    btnLogout: 'Logout',
    logoutBtn: 'Logout',
    quickSwitchRole: 'Quick Switch Enterprise Role:',
    usernameEmail: 'Username / Email',
    usernameLabel: 'Username / Email',
    passwordArgon: 'Password (Argon2id)',
    passwordLabel: 'Password (Argon2id)',
    authenticating: 'Authenticating...',
    authenticatingBtn: 'Authenticating...',
    btnSignIn: 'Sign In With Selected Identity',
    signInBtn: 'Sign In With Selected Identity',

    // Footer & Common
    footerBrand: 'ENTERPRISE VPS SYSTEM TIER-1 (1000 KWD SPECIFICATION)',
    footerRootCa: 'Root CA: 50Y (2026-2076)',
    footerUid: 'UID: 1001 (Non-root)',
    footerSecurity: 'Security: 12/12 PASS'
  }
};
