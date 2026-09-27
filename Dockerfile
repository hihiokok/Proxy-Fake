# Enterprise Multi-Stage Hardened Dockerfile
# Builds frontend, compiles backend, and runs under non-root UID 1001

FROM node:22-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Install openssl for CA management and security tools
RUN apk add --no-cache openssl bash curl dumb-init

# Security: Create unprivileged user (UID 1001)
RUN addgroup -g 1001 -S vpsgroup && \
    adduser -u 1001 -S vpsuser -G vpsgroup

# Copy dependencies and built assets
COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.ts ./
COPY --from=builder /app/server ./server
COPY --from=builder /app/migrations ./migrations
COPY --from=builder /app/config ./config

# Create sandboxing directories with strict permissions
RUN mkdir -p /opt/vps/sandbox /opt/vps/ca-vault /opt/vps/backups && \
    chown -R vpsuser:vpsgroup /app /opt/vps && \
    chmod 750 /opt/vps/sandbox && \
    chmod 700 /opt/vps/ca-vault

USER vpsuser

EXPOSE 3000 8080 8443

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -fsS http://localhost:3000/health/live || exit 1

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node", "--loader", "tsx", "server.ts"]
