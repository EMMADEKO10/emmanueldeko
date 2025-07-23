# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --no-audit --no-fund

# Copy source code
COPY . .

# Build the Angular application (both browser and server)
RUN NODE_OPTIONS="--max_old_space_size=1024" npm run build

# Stage 2: Production Server
FROM node:18-alpine AS production

WORKDIR /app

# Install curl for health checks
RUN apk add --no-cache curl

# Install only production dependencies
COPY package*.json ./
RUN npm ci --only=production --no-audit --no-fund

# Install dotenv for environment variables
RUN npm install dotenv

# Copy built application from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.ts ./server.ts

# Copy API files
COPY --from=builder /app/src/api ./src/api

# Create a simple startup script
RUN echo '#!/bin/sh' > start.sh && \
    echo 'echo "Starting server with OpenAI support..."' >> start.sh && \
    echo 'echo "OPENAI_API_KEY configured: $([ -n "$OPENAI_API_KEY" ] && echo "Yes" || echo "No")"' >> start.sh && \
    echo 'node server.ts' >> start.sh && \
    chmod +x start.sh

# Expose port 30 (matching Coolify configuration)
EXPOSE 30

# Health check using curl
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:30/health || exit 1

# Start the Node.js server
CMD ["./start.sh"] 
