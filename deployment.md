# Aditya Foods & Media — Production VPS Deployment Guide

This comprehensive, step-by-step guide walks you through deploying the **Aditya Foods & Media** web application to any Virtual Private Server (VPS) (e.g., DigitalOcean, Hetzner, AWS EC2, Linode/Akamai, Hostinger VPS, Vultr) using Docker and Docker Compose.

---

## 📋 Table of Contents
1. [Architecture Overview](#1-architecture-overview)
2. [VPS Prerequisites & Firewall Setup](#2-vps-prerequisites--firewall-setup)
3. [Step-by-Step Deployment Instructions](#3-step-by-step-deployment-instructions)
   - [Step 1: Connect to your VPS via SSH](#step-1-connect-to-your-vps-via-ssh)
   - [Step 2: Install Docker & Docker Compose](#step-2-install-docker--docker-compose)
   - [Step 3: Clone / Upload the Codebase](#step-3-clone--upload-the-codebase)
   - [Step 4: Configure Production Environment (`.env`)](#step-4-configure-production-environment-env)
   - [Step 5: Whitelist Domain in EmailJS Dashboard](#step-5-whitelist-domain-in-emailjs-dashboard)
   - [Step 6: Build and Launch Containers](#step-6-build-and-launch-containers)
   - [Step 7: Verify Deployment & Health Check](#step-7-verify-deployment--health-check)
4. [Domain & Free SSL (HTTPS) Configuration](#4-domain--free-ssl-https-configuration)
   - [Option A: Cloudflare Proxy (Recommended - Easiest)](#option-a-cloudflare-proxy-recommended---easiest)
   - [Option B: Certbot & Host Nginx Reverse Proxy](#option-b-certbot--host-nginx-reverse-proxy)
5. [Operational Commands (Day-2 Operations)](#5-operational-commands-day-2-operations)
6. [Troubleshooting & FAQs](#6-troubleshooting--faqs)

---

## 1. Architecture Overview

- **Frontend:** React 19.0.1, Vite 8, Tailwind CSS v4, TypeScript
- **Web Server:** Multi-stage `nginx:1.27-alpine` Docker container
- **Routing:** SPA fallback routing (`try_files $uri $uri/ /index.html;`) ensures deep links (`/foods/products`, `/contact`, `/media/videos`) work without 404 errors on page refresh.
- **Performance:** Pre-compressed Gzip assets, 1-year immutable caching on `/assets/*`, zero caching on `index.html`.
- **Form & Email Dispatch:** Client-side EmailJS integration delivering notifications directly to `adityafoodsandmedia.it@gmail.com` with operational metadata logged to Firebase Firestore.
- **Container Footprint:** ~25MB image size, consumes ~15–25MB RAM under production load.

---

## 2. VPS Prerequisites & Firewall Setup

### Recommended Server Specs
- **OS:** Ubuntu 22.04 LTS / Ubuntu 24.04 LTS or Debian 12
- **Hardware:** Minimum 1 vCPU, 1 GB RAM (Works comfortably on a \$4–\$6/mo VPS)
- **Disk:** At least 5 GB free disk space

### Configure VPS Firewall (UFW)
Open standard web and SSH ports before launching:

```bash
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
sudo ufw status
```

---

## 3. Step-by-Step Deployment Instructions

### Step 1: Connect to your VPS via SSH
Open your terminal on your computer and connect to the VPS:
```bash
ssh root@<YOUR_VPS_IP>
# Or if using a non-root user:
# ssh ubuntu@<YOUR_VPS_IP>
```

---

### Step 2: Install Docker & Docker Compose
If Docker is not already installed on your VPS, install the official Docker package:

```bash
# Update package repositories
sudo apt update && sudo apt upgrade -y

# Install Docker and the Docker Compose plugin
sudo apt install -y docker.io docker-compose-v2 curl git

# Enable and start Docker service
sudo systemctl enable --now docker

# Verify installation
docker --version
docker compose version
```

*(Optional for non-root users)*: Add your current user to the `docker` group so you don't need `sudo` for Docker commands:
```bash
sudo usermod -aG docker $USER
newgrp docker
```

---

### Step 3: Clone / Upload the Codebase

#### Option A: Clone from Git (Recommended)
```bash
cd /var/www || cd ~
git clone <YOUR_GIT_REPOSITORY_URL> aditya-food-media
cd aditya-food-media
```

#### Option B: Upload via SCP / rsync from your local machine
If your code is only stored locally, upload it using `rsync` or `scp`:
```bash
# Run this from your local computer:
rsync -avz --exclude 'node_modules' --exclude '.git' --exclude 'dist' ./ root@<YOUR_VPS_IP>:/var/www/aditya-food-media/
```

---

### Step 4: Configure Production Environment (`.env`)
Inside the project directory on your VPS, create your `.env` file from the provided `.env.example`:

```bash
cd /var/www/aditya-food-media
cp .env.example .env
nano .env
```

Verify or update the variables in `.env`:
```env
# Port to expose on VPS (default: 80)
PORT=80

# Environment
NODE_ENV=production

# EmailJS Configuration (Enquiry notifications to adityafoodsandmedia.it@gmail.com)
VITE_EMAILJS_SERVICE_ID="service_8t9hii7"
VITE_EMAILJS_TEMPLATE_ID="template_5cr2p9r"
VITE_EMAILJS_PUBLIC_KEY="NRR8qm8gASuExLMKY"
```
Press `Ctrl+O` then `Enter` to save, and `Ctrl+X` to exit nano.

---

### Step 5: Whitelist Domain in EmailJS Dashboard
*(Crucial Step to prevent 403 Forbidden errors when submitting forms)*

1. Log into your [EmailJS Dashboard](https://dashboard.emailjs.com/).
2. Navigate to **Account** (gear icon in bottom left) -> **Security**.
3. Under **Allowed Domains / Origins**, add your VPS domain or IP:
   - `https://yourdomain.com`
   - `https://www.yourdomain.com`
   - `http://<YOUR_VPS_IP>` *(for testing before linking your domain)*
4. Click **Save Changes**.

---

### Step 6: Build and Launch Containers
Run the Docker Compose command to build the production image and start the container in background (detached) mode:

```bash
docker compose up -d --build
```

**What happens during this command:**
1. A Node 22 Alpine builder image installs dependencies with legacy peer dependency resolution.
2. Vite compiles and tree-shakes all TypeScript and React assets into `/dist`.
3. The built files are transferred to a lightweight Nginx 1.27 Alpine runtime container.
4. Nginx binds to the specified port (`80`) with SPA rewrite rules and automatic restart policy (`unless-stopped`).

---

### Step 7: Verify Deployment & Health Check

1. **Check running containers:**
   ```bash
   docker compose ps
   ```
   *Expected output:* The container `aditya-food-media-web` shows status `Up` and `(healthy)`.

2. **Test the internal health endpoint:**
   ```bash
   curl -I http://localhost/healthz
   ```
   *Expected response:* `HTTP/1.1 200 OK`

3. **Check container logs:**
   ```bash
   docker compose logs -f web
   ```

4. **Test in Browser:**
   Open `http://<YOUR_VPS_IP>` in your browser. Verify the Odia homepage loads smoothly.

---

## 4. Domain & Free SSL (HTTPS) Configuration

To attach your custom domain (e.g., `adityafoodsandmedia.com`) with secure HTTPS:

### Option A: Cloudflare Proxy (Recommended - Easiest)
1. In your domain registrar (GoDaddy, Namecheap, Hostinger, etc.), point nameservers to Cloudflare.
2. In Cloudflare DNS records, add:
   - **Type:** `A` | **Name:** `@` | **IPv4:** `<YOUR_VPS_IP>` | **Proxy status:** Proxied (Orange Cloud)
   - **Type:** `CNAME` | **Name:** `www` | **Target:** `@` | **Proxy status:** Proxied (Orange Cloud)
3. In Cloudflare Dashboard -> **SSL/TLS**:
   - Set encryption mode to **Full** or **Flexible**.
   - Enable **Always Use HTTPS**.
4. Your website is now protected with global CDN caching, DDoS protection, and free SSL!

---

### Option B: Certbot & Host Nginx Reverse Proxy
If you want Let's Encrypt SSL certificates managed directly on the VPS host:

1. In `.env`, change the exposed port so the container does not conflict with host port 80:
   ```env
   PORT=3000
   ```
2. Restart the container on port 3000:
   ```bash
   docker compose up -d
   ```
3. Install Nginx and Certbot on the VPS:
   ```bash
   sudo apt install -y nginx certbot python3-certbot-nginx
   ```
4. Create an Nginx site configuration (`/etc/nginx/sites-available/aditya`):
   ```nginx
   server {
       server_name yourdomain.com www.yourdomain.com;

       location / {
           proxy_pass http://127.0.0.1:3000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```
5. Enable the site and request SSL certificate:
   ```bash
   sudo ln -s /etc/nginx/sites-available/aditya /etc/nginx/sites-enabled/
   sudo nginx -t && sudo systemctl reload nginx
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

---

## 5. Operational Commands (Day-2 Operations)

| Task | Command |
| :--- | :--- |
| **Pull updates & zero-downtime rebuild** | `git pull && docker compose up -d --build` |
| **View live logs** | `docker compose logs -f web` |
| **Check container resource consumption** | `docker stats aditya-food-media-web` |
| **Restart container** | `docker compose restart web` |
| **Stop container** | `docker compose down` |
| **Remove unused Docker images & cache** | `docker image prune -f` |

---

## 6. Troubleshooting & FAQs

### Q1: Error "bind: address already in use" on Port 80
**Cause:** Another web server (such as Apache or an existing Nginx instance) is running on the VPS.
**Solution:**
Find what is using port 80:
```bash
sudo lsof -i :80
# Or
sudo ss -tulpn | grep :80
```
- If an unused Nginx or Apache is running: `sudo systemctl stop nginx && sudo systemctl disable nginx`
- Or change `PORT=8080` in `.env` and run `docker compose up -d`.

### Q2: 404 Not Found error when refreshing direct URLs (e.g. `/contact`)
**Status:** **Protected by design.**
Our custom [`nginx.conf`](./nginx.conf) includes:
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```
This automatically routes all clean SPA URLs back to React's client-side router.

### Q3: Contact form enquiry fails with "Email failed"
1. Verify the client device has an active internet connection.
2. Ensure you have added your VPS IP or live domain to the **Allowed Domains** in the [EmailJS Dashboard](https://dashboard.emailjs.com/).
3. Check browser developer console (`F12` -> `Console`) for any blocked cross-origin requests.

### Q4: Does the container survive VPS reboots?
**Yes.** The `restart: unless-stopped` directive in `docker-compose.yml` ensures Docker automatically restarts the container upon server reboot.

