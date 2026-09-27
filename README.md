# Enterprise VPS & Proxy Control Suite (1000 KWD Tier-1 Edition)

An enterprise-grade, high-availability management platform for Linux VPS infrastructure, TLS Reverse Proxying, Dual-Stack IPv4/IPv6 connections, 50-Year Internal Root CA Trust Anchor, Sandboxed Code/Module Supervision, and 24/7 Auto-Recovery.

---

## 1. Key Features

- **50-Year Internal Root CA**:
  - Validity: 2026-09-26 to 2076-09-26 (RSA-4096 / SHA-256).
  - 3-tier certificate hierarchy: Root CA -> Intermediate CA -> Short-lived auto-rotating Server Leaf Certificates.
  - Public Root Certificate download directly from the dashboard; private key strictly protected (0600) and never exported.
- **Process Supervisor & Sandboxed Module Runner**:
  - Sandboxed execution (filesystem isolation, CPU quota %, RAM limits, process limit, network policy, timeout).
  - Lifecycle commands: `START`, `STOP`, `RESTART`, `PAUSE`, `LOG`, `EDIT`, `DELETE`.
  - Crash detection, auto-restart watchdog, bounded retry limits, exponential backoff, and admin alerting.
  - Zero-root policy: All code execution runs under unprivileged `vpsuser:vpsgroup` (UID 1001).
- **Proxy Gateway & Connection Manager**:
  - Dual-stack IPv4 & IPv6 support.
  - HTTP/HTTPS and TCP connection proxying with keep-alive and connection pooling.
  - IP Allowlist / Denylist management, bandwidth monitoring, and per-user connection throttling.
  - Automatic self-recovery watchdog with failure circuit breakers.
- **Real-Time Performance Manager**:
  - Real hardware telemetry (Node.js `os` CPU cores, true RAM allocation, disk, network, requests/sec, latency).
  - Performance presets: `ECONOMY`, `BALANCED`, `PERFORMANCE`, `ENTERPRISE` (tunes kernel socket queue, thread pools, and buffers within real hardware limits).
- **Security Center**:
  - Non-scoring objective technical audit of 12 enterprise controls (Firewall, TLS 1.2/1.3, Auth, Rate Limiting, Headers, File Isolation, Process Isolation, DB Security, Encrypted Backups, Audit Logs, CA Protection, SSH Hardening).
- **Audit Trail**:
  - Tamper-evident structured JSON logging (`timestamp`, `user_id`, `action`, `ip`, `resource`, `result`).
  - Automatic masking of passwords, tokens, and private keys.
- **Backup & Disaster Recovery**:
  - Automated Daily/Weekly/Monthly schedules.
  - AES-256-GCM encrypted snapshot creation with SHA-256 checksum verification.

---

## 2. Architecture Overview

```
                      [ External Client ]
                               │
                               ▼
                   [ Port 443 / TLS 1.3 ]
                               │
                       [ TLS Gateway ]
                               │
                     [ Authentication ]
                               │
                      [ Proxy Gateway ]
                               │
                   [ Connection Manager ]
                               │
                   [ Target Network / Modules ]
```

---

## 3. Quick Deployment

```bash
# Clone and enter directory
chmod +x install.sh update.sh backup.sh restore.sh healthcheck.sh security-check.sh

# Run automated 15-step enterprise installer
./install.sh
```

### Docker Compose Run:
```bash
docker-compose up -d --build
```

---

## 4. API Reference

- `GET /health` - Overall subsystem health status
- `GET /health/live` - Container liveness probe
- `GET /health/ready` - Traffic readiness check
- `GET /api/vps/status` - Real hardware CPU, RAM, disk, and load averages
- `GET /api/proxy/status` - Proxy status, active connections, latency, bandwidth
- `GET /api/ca/info` - Internal CA hierarchy, validity, and fingerprint
- `GET /api/ca/download/root-ca` - Download public 50-year Root CA (.crt)
- `POST /api/ca/rotate-server-cert` - Rotate leaf certificate without replacing root
- `GET /api/modules` - List all supervised sandboxed modules
- `POST /api/modules/:id/action` - Execute START / STOP / RESTART / PAUSE
- `GET /api/security/audit` - Technical 12-point security compliance
- `GET /api/audit/logs` - Query structured audit records
- `POST /api/backup/now` - Create on-demand encrypted backup
- `POST /api/backup/restore` - Restore system state from snapshot
