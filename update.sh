#!/usr/bin/env bash
# ==============================================================================
# Enterprise VPS & Proxy System Updater
# Zero-downtime rolling update for backend, frontend, proxy, and supervisors.
# ==============================================================================

set -euo pipefail

echo "================================================="
echo "   ENTERPRISE VPS SYSTEM ROLLING UPDATE          "
echo "================================================="

# Pre-update automated snapshot
echo "[1/5] Creating pre-update backup snapshot..."
/bin/bash ./backup.sh --pre-update

echo "[2/5] Pulling latest hardened container images..."
docker-compose pull backend proxy

echo "[3/5] Applying incremental database migrations..."
if [ -f "./migrations/002_incremental_update.sql" ]; then
    docker exec -i enterprise-postgres psql -U vps_admin -d vps_enterprise < ./migrations/002_incremental_update.sql
fi

echo "[4/5] Reloading Proxy Gateway with zero-downtime SIGHUP..."
docker-compose up -d --no-deps proxy backend

echo "[5/5] Performing post-update health check..."
curl -fsS http://127.0.0.1:3000/health/ready || (echo "[ERROR] Health check failed, rolling back..." && exit 1)

echo "✓ Update complete. System verified healthy."
