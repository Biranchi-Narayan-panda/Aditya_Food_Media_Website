# Aditya Foods & Media — Production VPS Deployment & Domain Guide

This comprehensive, step-by-step guide walks you through deploying the **Aditya Foods & Media** web application to your VPS (`179.197.253.67`) and attaching your official domain **`adityafoodsandmedia.com`** with free SSL (HTTPS).

---

## 📋 Table of Contents
1. [Server & Domain Summary](#1-server--domain-summary)
2. [How to Connect `adityafoodsandmedia.com` to your VPS](#2-how-to-connect-adityafoodsandmediacom-to-your-vps)
   - [Method 1: Cloudflare (Recommended — 1-Click Free SSL & CDN)](#method-1-cloudflare-recommended--1-click-free-ssl--cdn)
   - [Method 2: Direct DNS Pointing + Certbot SSL on VPS](#method-2-direct-dns-pointing--certbot-ssl-on-vps)
3. [EmailJS Allowed Domains Whitelist](#3-emailjs-allowed-domains-whitelist)
4. [VPS Deployment & Operations](#4-vps-deployment--operations)
   - [Clone & Run with Docker Compose](#clone--run-with-docker-compose)
   - [Updating Website Code](#updating-website-code)
   - [Monitoring & Health Check](#monitoring--health-check)
5. [Troubleshooting & FAQs](#5-troubleshooting--faqs)

---

## 1. Server & Domain Summary

| Property | Value |
| :--- | :--- |
| **Official Domain** | `adityafoodsandmedia.com` |
| **WWW Subdomain** | `www.adityafoodsandmedia.com` |
| **VPS IP Address** | `179.197.253.67` |
| **Web Container** | `aditya-food-media-web` (Nginx 1.27 Alpine) |
| **Open Ports** | `80` (HTTP), `443` (HTTPS) |
| **Enquiry Recipient** | `adityafoodsandmedia.it@gmail.com` |

---

## 2. How to Connect `adityafoodsandmedia.com` to your VPS

Choose either **Method 1** (simplest, takes 3 minutes, automatic SSL) or **Method 2** (manual Certbot on server).

---

### Method 1: Cloudflare (Recommended — 1-Click Free SSL & CDN)

Cloudflare provides free SSL certificates, DDoS protection, and global CDN caching with zero server configuration.

#### Step 1: Add your domain to Cloudflare
1. Go to [https://dash.cloudflare.com/](https://dash.cloudflare.com/) and create a free account or log in.
2. Click **Add a Site** and enter:
   ```text
   adityafoodsandmedia.com
   ```
3. Select the **Free** plan.

#### Step 2: Configure DNS Records in Cloudflare
Add these two DNS records in your Cloudflare DNS tab:

| Type | Name | Content / Target | Proxy status | TTL |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `@` | `179.197.253.67` | **Proxied** (Orange cloud ON) | Auto |
| **CNAME** | `www` | `adityafoodsandmedia.com` | **Proxied** (Orange cloud ON) | Auto |

#### Step 3: Update Nameservers at your Domain Registrar
1. Cloudflare will give you two custom nameservers (e.g., `aria.ns.cloudflare.com` and `noah.ns.cloudflare.com`).
2. Log into where you bought the domain (Hostinger, GoDaddy, Namecheap, etc.).
3. Open **DNS / Nameservers** for `adityafoodsandmedia.com`.
4. Change nameservers from default to the two Cloudflare nameservers provided.
5. Save changes (DNS propagation usually takes 5 to 15 minutes).

#### Step 4: Enable Automatic SSL in Cloudflare
1. In Cloudflare, go to **SSL/TLS** -> **Overview**.
2. Set SSL/TLS encryption mode to **Full** (or **Flexible**).
3. Go to **SSL/TLS** -> **Edge Certificates** and turn ON **Always Use HTTPS**.

✅ **Done!** Visiting `https://adityafoodsandmedia.com` will now load your site with a trusted green lock SSL!

---

### Method 2: Direct DNS Pointing + Certbot SSL on VPS

If you prefer pointing DNS directly in your domain registrar without Cloudflare:

#### Step 1: Add DNS Records in your Domain Registrar (Hostinger / GoDaddy / Namecheap)
In your domain provider's DNS Management panel, add:

| Record Type | Host / Name | Points to / Value | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `@` (or blank) | `179.197.253.67` | 300 (or Auto) |
| **CNAME** | `www` | `adityafoodsandmedia.com` | 300 (or Auto) |

*(Wait ~5–10 minutes for DNS to propagate. You can verify by running `ping adityafoodsandmedia.com` in your terminal to see if it resolves to `179.197.253.67`).*

#### Step 2: Set Port to 3000 for Docker on VPS
To allow the host Certbot Nginx to manage SSL on ports 80/443, update the port in your project `.env`:

```bash
cd /opt/Aditya_Food_Media_Website
nano .env
```
Change `PORT=80` to:
```env
PORT=3000
```
Save with `Ctrl + O`, `Enter`, and exit with `Ctrl + X`. Restart container:
```bash
docker compose up -d
```

#### Step 3: Install Nginx & Certbot on the VPS
Run on your VPS:
```bash
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx
```

#### Step 4: Create Reverse Proxy Configuration
Create the Nginx site configuration file:
```bash
sudo nano /etc/nginx/sites-available/adityafoodsandmedia.com
```
Paste this configuration:
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name adityafoodsandmedia.com www.adityafoodsandmedia.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
Save (`Ctrl + O`, `Enter`) and exit (`Ctrl + X`).

#### Step 5: Enable Site and Generate Let's Encrypt SSL Certificate
```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/adityafoodsandmedia.com /etc/nginx/sites-enabled/

# Test Nginx syntax and reload
sudo nginx -t && sudo systemctl reload nginx

# Request Let's Encrypt SSL
sudo certbot --nginx -d adityafoodsandmedia.com -d www.adityafoodsandmedia.com --agree-tos --email adityafoodsandmedia.it@gmail.com --redirect
```

Certbot will automatically install the SSL certificates and configure auto-renewal!

---

## 3. EmailJS Allowed Domains Whitelist

*(Crucial: Prevent inquiry submissions from being rejected with a 403 Forbidden error)*

1. Log in to [https://dashboard.emailjs.com/](https://dashboard.emailjs.com/).
2. Click **Account** (bottom-left gear icon) -> **Security**.
3. Under **Allowed Domains / Origins**, add all your URL variants:
   - `https://adityafoodsandmedia.com`
   - `https://www.adityafoodsandmedia.com`
   - `http://179.197.253.67`
   - `https://179.197.253.67`
4. Click **Save Changes**.

---

## 4. VPS Deployment & Operations

### Clone & Run with Docker Compose

On your VPS terminal (`root@srv2114122`):
```bash
# 1. Clone repository
cd /opt
git clone https://github.com/Biranchi-Narayan-panda/Aditya_Food_Media_Website.git
cd Aditya_Food_Media_Website

# 2. Setup environment variables
cp .env.example .env

# 3. Open firewall ports
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw reload

# 4. Build and start containers
docker compose up -d --build
```

### Updating Website Code
When you push code changes to GitHub, update your VPS in seconds:
```bash
cd /opt/Aditya_Food_Media_Website
git pull origin main
docker compose up -d --build
```

### Monitoring & Health Check
```bash
# View container status
docker compose ps

# View live application logs
docker compose logs -f web

# Test internal healthcheck
curl -I http://localhost/healthz
```

---

## 5. Troubleshooting & FAQs

### Q1: How do I verify if my domain points to my VPS?
Run this command from any computer:
```bash
nslookup adityafoodsandmedia.com
```
It should return `179.197.253.67` (or Cloudflare proxy IPs if using Cloudflare).

### Q2: What if I get 404 when clicking a page and refreshing (e.g., `/contact`)?
This is automatically handled by the custom [`nginx.conf`](./nginx.conf):
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```
All routes seamlessly fall back to React's client-side router.

### Q3: How do I stop or restart the website?
```bash
# Restart
docker compose restart web

# Stop
docker compose down

# Start
docker compose up -d
```
