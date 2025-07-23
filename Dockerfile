# Stage 1: Build
FROM node:18-alpine as builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with cache optimization
RUN npm ci --only=production --no-audit --no-fund

# Copy source code
COPY . .

# Build the application with memory optimization
RUN NODE_OPTIONS="--max_old_space_size=1024" npm run build

# Stage 2: Serve
FROM nginx:alpine

# Install wget for health checks
RUN apk add --no-cache wget

# Copy built assets from builder stage
COPY --from=builder /app/dist/mon-portfolio/browser /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Set proper permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 
