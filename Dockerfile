# Stage 1: Build
FROM node:18-alpine as builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Update browserslist database
RUN npx browserslist@latest --update-db

# Build the application
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine

# Create directory for logs and set permissions
RUN mkdir -p /var/log/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chmod -R 755 /var/log/nginx

# Copy built assets from builder stage
COPY --from=builder /app/dist/mon-portfolio/browser /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Set proper permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chmod 644 /etc/nginx/conf.d/default.conf

# Create a non-root user to run the server
RUN adduser -D -H -u 101 -s /sbin/nologin nginx || true

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 