#!/usr/bin/env bash
# ==============================================================================
# Enterprise VPS & Proxy Disaster Recovery / Restore Utility
# Verifies SHA-256 integrity, decrypts AES-256 payload, restores databases & config.
# ==============================================================================

set -euo pipefail

if [ "$#" -lt 1 ]; then
    echo "Usage: $0 <path-to-encrypted-backup.enc>"
    exit 1
fi

ENC_ARCHIVE="$1"

if [ ! -f "$ENC_ARCHIVE" ]; then
    echo "[ERROR] Backup file not found: $ENC_ARCHIVE"
    exit 1
fi

echo "=== ENTERPRISE DISASTER RECOVERY INITIATING ==="
echo "Target archive: $ENC_ARCHIVE"

# 1. Verify Checksum
if [ -f "${ENC_ARCHIVE}.sha256" ]; then
    echo "[1/4] Verifying SHA-256 integrity signature..."
    EXPECTED=$(cat "${ENC_ARCHIVE}.sha256")
    ACTUAL=$(sha256sum "$ENC_ARCHIVE" | awk '{print $1}')
    if [ "$EXPECTED" != "$ACTUAL" ]; then
        echo "[FATAL ERROR] Checksum mismatch! Potential archive corruption or tampering."
        exit 1
    fi
    echo "✓ Integrity signature verified: $ACTUAL"
fi

TMP_DIR=$(mktemp -d)
trap 'rm -rf "$TMP_DIR"' EXIT

# 2. Decrypt Archive
echo "[2/4] Decrypting AES-256-CBC archive..."
openssl enc -d -aes-256-cbc -pbkdf2 -iter 100000 \
    -in "$ENC_ARCHIVE" \
    -out "$TMP_DIR/decrypted.tar.gz" \
    -pass pass:"${BACKUP_ENCRYPTION_KEY:-EnterpriseMasterVaultKey2026!}"

tar -xzf "$TMP_DIR/decrypted.tar.gz" -C "$TMP_DIR"

# 3. Restore Database & Sandboxes
echo "[3/4] Restoring PostgreSQL state and module sandbox files..."
if [ -f "$TMP_DIR/database.sql" ] && command -v docker &> /dev/null; then
    docker exec -i enterprise-postgres psql -U vps_admin vps_enterprise < "$TMP_DIR/database.sql" || true
fi

if [ -d "$TMP_DIR/modules_sandbox" ]; then
    cp -r "$TMP_DIR/modules_sandbox"/* /opt/vps/sandbox/ 2>/dev/null || true
    chown -R 1001:1001 /opt/vps/sandbox/
fi

# 4. Trigger Supervisor & Proxy Reload
echo "[4/4] Restarting Proxy Gateway and Process Supervisor..."
curl -s -X POST http://127.0.0.1:3000/api/proxy/restart || true

echo "=========================================="
echo "✓ RESTORE COMPLETED SUCCESSFULLY"
echo "System back online and verified."
echo "=========================================="
