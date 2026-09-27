#!/usr/bin/env bash
# ==============================================================================
# Enterprise Subsystem Health Check Utility
# Validates CPU, RAM, Disk, PostgreSQL, Redis, Proxy, Supervisor, and TLS CA.
# ==============================================================================

set -euo pipefail

PASS=0
FAIL=0

check() {
    local name="$1"
    local command="$2"
    echo -n "Checking $name... "
    if eval "$command" &> /dev/null; then
        echo -e "\033[0;32m[HEALTHY]\033[0m"
        PASS=$((PASS + 1))
    else
        echo -e "\033[0;31m[UNHEALTHY]\033[0m"
        FAIL=$((FAIL + 1))
    fi
}

echo "=== ENTERPRISE SUBSYSTEM HEALTH CHECK ==="

check "HTTP Health Liveness (/health/live)" "curl -fsS http://127.0.0.1:3000/health/live"
check "HTTP Readiness (/health/ready)" "curl -fsS http://127.0.0.1:3000/health/ready"
check "VPS Telemetry API (/api/vps/status)" "curl -fsS http://127.0.0.1:3000/api/vps/status"
check "Proxy Gateway API (/api/proxy/status)" "curl -fsS http://127.0.0.1:3000/api/proxy/status"
check "Process Supervisor API (/api/modules)" "curl -fsS http://127.0.0.1:3000/api/modules"
check "Internal 50-Year CA Status (/api/ca/info)" "curl -fsS http://127.0.0.1:3000/api/ca/info"
check "Audit Log Trail (/api/audit/logs)" "curl -fsS http://127.0.0.1:3000/api/audit/logs"

echo "-----------------------------------------"
echo "Results: $PASS Healthy, $FAIL Unhealthy"
if [ "$FAIL" -gt 0 ]; then
    exit 1
fi
exit 0
