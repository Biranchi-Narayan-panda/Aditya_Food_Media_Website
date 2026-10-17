# Aditya Foods & Media — Hostinger Deployment & Operational Checklist

Use this step-by-step checklist to deploy the web application to Hostinger shared web hosting without errors or downtime.

---

## 1. Pre-Deployment Preparation

- [ ] **Run the local production build:**
  ```bash
  npm run build
  ```
- [ ] **Inspect the generated `dist/` directory:**
  Ensure the following files and folders exist inside `/dist`:
  - `index.html`
  - `.htaccess` *(Ensure hidden files starting with a dot are visible on your computer)*
  - `favicon.svg`
  - `assets/` (contains `.js`, `.css`, and `.webp` chunks)

---

## 2. Hostinger Upload Procedure (Step-by-Step)

1. **Log in to Hostinger hPanel:**
   - Go to [https://hpanel.hostinger.com](https://hpanel.hostinger.com).
   - Click on **Websites** in the navigation bar.
   - Click **Manage** next to your domain (e.g., `adityafoodsandmedia.com`).

2. **Access the File Manager:**
   - In the sidebar or search bar, open **File Manager** (Files -> File Manager).
   - Alternatively, connect via SFTP / FTP using FileZilla with the FTP credentials found under **FTP Accounts**.

3. **Open the Web Root (`public_html`):**
   - Double-click and open the `public_html/` directory.
   - If there is a default Hostinger `default.php` file, delete or move it.

4. **Upload the Contents of `dist/`:**
   - **CRITICAL:** Upload the files and folders located **INSIDE** `dist/` directly into `public_html/`.
   - Do **NOT** upload the `dist` folder itself as a subdirectory.
   - The result in `public_html/` must look like:
     ```text
     public_html/
     ├── .htaccess
     ├── index.html
     ├── favicon.svg
     └── assets/
         ├── index-*.js
         ├── index-*.css
         ├── aditya_main_logo-*.webp
         ├── aditya_foods_emblem-*.webp
         └── ... (other chunks)
     ```

---

## 3. External Service Whitelisting (Crucial Step)

### EmailJS Origin Whitelist
1. Log in to [EmailJS Dashboard](https://dashboard.emailjs.com/).
2. Click on **Account** (bottom-left) -> **Security**.
3. Scroll down to **Allowed Domains**.
4. Add your exact production domain URL(s):
   - `https://yourdomain.com`
   - `https://www.yourdomain.com`
5. Click **Save Changes**.
*(Failure to perform this step will cause EmailJS to reject form submissions with a 403 Forbidden error).*

---

## 4. Post-Deployment Smoke Test (Verification)

Once uploaded, open your website in an Incognito / Private browser window and execute these checks:

1. **Homepage Paint:**
   - Verify that the homepage loads with the Odia language headline and brand logo.
2. **Direct URL Navigation & Refresh:**
   - In your browser address bar, visit `https://yourdomain.com/foods/products` directly.
   - Press **F5 (Refresh)**.
   - *Pass Criteria:* The Dairy Products page loads correctly without a 404 Not Found error.
3. **Subpage Navigation:**
   - Visit `https://yourdomain.com/media/videos` and click on a comedy video card.
   - Verify that the 90-second preview modal plays the video and shows the "Watch Full Video on YouTube" button.
4. **Live Enquiry Test:**
   - Navigate to `https://yourdomain.com/contact`.
   - Fill in your own name, valid email, phone number, and a test message.
   - Click **Submit Enquiry**.
   - *Pass Criteria:*
     - A green success message appears displaying a unique reference number (e.g., `AFM-20261017-XXXX`).
     - Check `adityafoodsandmedia.it@gmail.com` inbox for the automated notification email.
5. **Language Switcher Test:**
   - Click the language badge in the top navbar to toggle between **ଓଡ଼ିଆ (Odia)** and **English**.
   - Verify that navigation items and product names switch instantaneously.

---

## 5. Rollback Procedure

If any issue arises post-upload:
1. **Immediate Rollback:**
   - Keep a copy of your previous working `public_html/` backup in a folder named `backup_public_html/` on Hostinger.
   - In File Manager, delete the current contents of `public_html/` and restore your backup files.
2. **Git Rollback in Workspace:**
   - To return to the initial state before this audit, run:
     ```bash
     git checkout master
     ```
   - All audit fixes are safely isolated on the `audit-fixes` branch.
