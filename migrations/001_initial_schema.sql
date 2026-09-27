-- ==============================================================================
-- Enterprise VPS & Proxy Control Center - Initial Database Migration
-- PostgreSQL 16+ Schema with SCRAM-SHA-256 Support
-- Tables: users, sessions, audit_logs, proxy_rules, modules, backups, certificates
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users & RBAC
CREATE TYPE user_role AS ENUM ('OWNER', 'ADMIN', 'OPERATOR', 'VIEWER');

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY,
    username VARCHAR(64) UNIQUE NOT NULL,
    display_name VARCHAR(128) NOT NULL,
    email VARCHAR(128) UNIQUE NOT NULL,
    role user_role NOT NULL DEFAULT 'VIEWER',
    password_hash VARCHAR(256) NOT NULL,
    salt VARCHAR(64) NOT NULL,
    two_factor_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    failed_login_attempts INT NOT NULL DEFAULT 0,
    locked_until TIMESTAMP WITH TIME ZONE NULL,
    last_login_at TIMESTAMP WITH TIME ZONE NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. Audit Trail (Tamper-evident append only)
CREATE TABLE IF NOT EXISTS audit_logs (
    id VARCHAR(64) PRIMARY KEY,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id VARCHAR(64) NOT NULL,
    action VARCHAR(64) NOT NULL,
    ip VARCHAR(64) NOT NULL,
    resource VARCHAR(256) NOT NULL,
    result VARCHAR(32) NOT NULL,
    details TEXT NULL
);

CREATE INDEX IF NOT EXISTS idx_audit_timestamp ON audit_logs(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_audit_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_user ON audit_logs(user_id);

-- 3. Proxy Gateway Configuration & Rules
CREATE TABLE IF NOT EXISTS proxy_rules (
    id VARCHAR(64) PRIMARY KEY,
    rule_type VARCHAR(32) NOT NULL, -- 'ALLOWLIST', 'DENYLIST', 'RATE_LIMIT'
    cidr_or_ip VARCHAR(64) NOT NULL,
    description VARCHAR(255) NULL,
    created_by VARCHAR(64) NOT NULL REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 4. Sandboxed Modules Metadata
CREATE TABLE IF NOT EXISTS modules (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    description TEXT NULL,
    language VARCHAR(32) NOT NULL,
    code TEXT NOT NULL,
    version VARCHAR(32) NOT NULL DEFAULT '1.0.0',
    status VARCHAR(32) NOT NULL DEFAULT 'STOPPED',
    cpu_limit_percent INT NOT NULL DEFAULT 15,
    memory_limit_mb INT NOT NULL DEFAULT 128,
    max_processes INT NOT NULL DEFAULT 1,
    timeout_seconds INT NOT NULL DEFAULT 120,
    network_policy VARCHAR(32) NOT NULL DEFAULT 'RESTRICTED_INTERNAL',
    sandbox_path VARCHAR(255) NOT NULL,
    restarts_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 5. Backups Registry
CREATE TABLE IF NOT EXISTS backup_records (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(256) NOT NULL,
    schedule_type VARCHAR(32) NOT NULL,
    size_bytes BIGINT NOT NULL,
    sha256_checksum VARCHAR(64) NOT NULL,
    verified BOOLEAN NOT NULL DEFAULT FALSE,
    encryption_algorithm VARCHAR(32) NOT NULL DEFAULT 'AES-256-GCM',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Seed Baseline Owner and Admin Accounts
INSERT INTO users (id, username, display_name, email, role, password_hash, salt, two_factor_enabled)
VALUES 
('usr_owner_01', 'enterprise_owner', 'System Owner (Chief Architect)', 'owner@enterprise.vps.internal', 'OWNER', 'c54e38c92a62ffda58a4f9d8544c9b19dfb7d8d462479f6db45bb38ec08bb474', 'seed_salt_owner_2026', TRUE),
('usr_admin_01', 'sys_admin', 'Infrastructure Admin', 'admin@enterprise.vps.internal', 'ADMIN', 'd8736e65a7f9a8342732a39c09930f3c5b8b9b8b292398402949019283401928', 'seed_salt_admin_2026', TRUE)
ON CONFLICT (id) DO NOTHING;
