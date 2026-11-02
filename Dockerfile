# ==============================================================
# Stage 1: Build Frontend Assets
# ==============================================================
FROM node:22-alpine AS builder

WORKDIR /app

ENV npm_config_legacy_peer_deps=true

COPY package.json package-lock.json* .npmrc* ./
RUN npm install

ARG VITE_EMAILJS_SERVICE_ID
ARG VITE_EMAILJS_TEMPLATE_ID
ARG VITE_EMAILJS_PUBLIC_KEY

ENV VITE_EMAILJS_SERVICE_ID=$VITE_EMAILJS_SERVICE_ID
ENV VITE_EMAILJS_TEMPLATE_ID=$VITE_EMAILJS_TEMPLATE_ID
ENV VITE_EMAILJS_PUBLIC_KEY=$VITE_EMAILJS_PUBLIC_KEY

COPY . .
RUN npm run build

# ==============================================================
# Stage 2: Production Nginx High-Performance Web Server
# ==============================================================
FROM nginx:1.27-alpine AS runner

RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]
