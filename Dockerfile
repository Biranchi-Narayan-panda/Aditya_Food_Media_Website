# ==============================================================
# Stage 1: Build Frontend Assets
# ==============================================================
FROM node:22-alpine AS builder

WORKDIR /app

# Configure npm
ENV npm_config_legacy_peer_deps=true

# Copy package manifests and npm configuration
COPY package.json package-lock.json* .npmrc* ./

# Install dependencies for building
RUN npm install

# Build arguments for client environment variables (baked at build time by Vite)
ARG VITE_EMAILJS_SERVICE_ID
ARG VITE_EMAILJS_TEMPLATE_ID
ARG VITE_EMAILJS_PUBLIC_KEY

ENV VITE_EMAILJS_SERVICE_ID=$VITE_EMAILJS_SERVICE_ID
ENV VITE_EMAILJS_TEMPLATE_ID=$VITE_EMAILJS_TEMPLATE_ID
ENV VITE_EMAILJS_PUBLIC_KEY=$VITE_EMAILJS_PUBLIC_KEY

# Copy project source files
COPY . .

# Build production bundle into /app/dist
RUN npm run build

# ==============================================================
# Stage 2: Production Nginx High-Performance Web Server
# ==============================================================
FROM nginx:1.27-alpine AS runner

# Remove default configurations and assets
RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/default.conf

# Copy custom production Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled SPA bundle from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose HTTP port 80
EXPOSE 80

# Health check to ensure web server is responding
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/healthz || exit 1

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]

