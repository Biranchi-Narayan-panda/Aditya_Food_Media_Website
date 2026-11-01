# Aditya Foods & Media — Production Website

Official bilingual web platform (Odia & English) for **Aditya Foods & Media**, showcasing premium dairy food processing and cinematic media production.

---

## 🚀 Quick Start on VPS (Docker & Docker Compose)

### 1. Prerequisites on your VPS
Ensure your VPS has Docker and Docker Compose installed:
```bash
# Ubuntu / Debian
sudo apt update && sudo apt install -y docker.io docker-compose-v2
sudo systemctl enable --now docker
```

---

### 2. Clone the Repository & Configure Environment
```bash
git clone <YOUR_GIT_REPO_URL>
cd Aditya_Food_Media_Website

# Copy example environment configuration
cp .env.example .env
```

If needed, adjust the port in `.env` (defaults to port `80`):
```env
PORT=80
```

---

### 3. Launch with Docker Compose
Run the following command to build and launch the container in detached mode:
```bash
docker compose up -d --build
```

Verify that the container is healthy and running:
```bash
docker compose ps
```

Visit `http://<YOUR_VPS_IP>` in your browser!

---

## 🛠️ Management & Maintenance Commands

| Action | Command |
| :--- | :--- |
| **View Live Logs** | `docker compose logs -f web` |
| **Restart Application** | `docker compose restart web` |
| **Stop Application** | `docker compose down` |
| **Rebuild After Code Update** | `git pull && docker compose up -d --build` |
| **Check Health Status** | `docker inspect --format='{{json .State.Health}}' aditya-food-media-web` |

---

## 🌐 Setting Up Free SSL (HTTPS) with Certbot / Nginx Reverse Proxy

If you point a domain (e.g. `adityafoodsandmedia.com`) to your VPS IP:

### Option A: Cloudflare (Recommended, Zero Setup)
1. Point your domain's DNS `A` record to your VPS IP.
2. Enable Cloudflare Proxy (Orange Cloud).
3. Set SSL/TLS mode to **Flexible** or **Full**. Done!

### Option B: Certbot with Host Nginx
If running Nginx directly on the VPS host as a reverse proxy:
1. Map the container port in `.env` to `PORT=3000`.
2. Configure host Nginx to proxy `http://127.0.0.1:3000`.
3. Run `sudo certbot --nginx -d yourdomain.com`.

---

## 📁 Project Architecture & Container Setup

- **Production Server:** High-performance `nginx:1.27-alpine` container serving pre-compiled static assets.
- **SPA Routing:** Configured with `try_files $uri $uri/ /index.html;` so page refreshes and direct URL navigation never throw 404 errors.
- **Asset Caching:** 1-year immutable caching for fingerprinted assets in `/assets/`.
- **Gzip Compression:** Enabled for JS, CSS, SVG, JSON, and HTML.
- **Health Check:** Integrated endpoint at `/healthz` for uptime monitoring and Docker auto-recovery.
- **Log Rotation:** Docker JSON logs limited to 10MB x 3 files to prevent VPS disk overflow.

