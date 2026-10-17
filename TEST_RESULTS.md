# Aditya Foods & Media — Test Results & Verification Log

**Date:** October 17, 2026  
**Environment:** Linux container (Node.js v22, Vite 8.3.1, TypeScript 7.0.2)  
**Branch:** `audit-fixes`  
**Git Checkpoint:** `631c191`

---

## 1. Automated Test Execution Summary

| Test Scenario | Command Executed | Outcome | Notes / Details |
| :--- | :--- | :---: | :--- |
| **TypeScript Compilation & Static Analysis** | `npm run lint` (`tsc --noEmit`) | **PASS** | 0 errors. All production files in `src/` and `vite.config.ts` type-check cleanly. `server.ts` safely excluded. |
| **Vite Production Bundling** | `npm run build` (`vite build`) | **PASS** | Completed in 1.32s. Output: `dist/index.html`, `dist/.htaccess`, `dist/favicon.svg`, and chunked `dist/assets/`. |
| **Vite Local Production Preview** | `npm run preview -- --port 4173` | **PASS** | HTTP HEAD request to `http://localhost:4173/` returned `HTTP/1.1 200 OK`. |
| **Live Development Server** | `curl -I http://localhost:3000/` | **PASS** | Active on port 3000, returning `HTTP/1.1 200 OK`. |
| **Firestore Query Services** | Automated TSX harness querying `fetchProducts`, `fetchVideos`, `fetchPortfolio`, `fetchSiteSettings` | **PASS** | Verified all 4 read functions resolve cleanly with resilient fallbacks. |
| **Enquiry Reference Generator** | Automated unit test for `generateEnquiryReference()` | **PASS** | Verified generated format strictly adheres to `AFM-YYYYMMDD-[A-Z0-9]{4}`. |
| **Anti-Spam & Form Validation** | Automated TSX harness testing `validateEnquiryInput()` | **PASS** | Successfully trapped honeypot bot inputs, rejected invalid emails, and enforced length limits on name/phone/message. |
| **External YouTube Assets** | Automated HTTP HEAD check for 5 video URLs, thumbnails, and channel | **PASS** | All 5 YouTube video IDs and `i.ytimg.com` thumbnails returned `200 OK`. |
| **External CDN Photos** | Automated HTTP HEAD check for Unsplash product photos | **PASS** | All 9 Unsplash images returned `200 OK`. |
| **Hostinger `.htaccess` Copy** | Automated verification of `dist/.htaccess` presence and contents | **PASS** | Verified `dist/.htaccess` exists and contains mod_rewrite rules for Apache/LiteSpeed SPA routing. |

---

## 2. Security & Privacy Verification

| Boundary | Mechanism | Verification Result |
| :--- | :--- | :---: |
| **No PII in Database** | `src/services/emailService.ts` (`recordMetadataInFirebase`) | **PASS** — Verified that only `referenceNumber`, `enquiryType`, `createdAt`, `emailDeliveryStatus`, and `channel` are written to Firestore. Visitor name, email, phone, and message are never written. |
| **Firestore Security Rules** | `firestore.rules` deployed via `fax.DeployRules` RPC | **PASS** — Verified public read-only access for catalogs (`products`, `videos`, `portfolio`, `settings`). `enquiries` is restricted to `create` only with strict metadata size and format constraints. All other collections denied. |
| **Zero Secret Exposure** | Repository-wide regex audit | **PASS** — No private keys, passwords, service accounts, or secret tokens exist in the repository or compiled bundle. |
| **Safe Environment Fallbacks** | `src/services/emailService.ts` | **PASS** — Safe fallback function `getEnvVar` handles runtime environment variables without crashing if `.env` is absent. |

---

## 3. Explicit List of Checks NOT Run / Requiring Manual Verification

The following checks cannot be executed in this automated sandbox and require manual testing by the site owner:

1. **Physical Email Inbox Delivery:**
   - *Status:* **NOT TESTED INBOX DELIVERY**
   - *Reason:* Automated environments must not send synthetic spam emails to live business inboxes.
   - *Manual Action:* Submit one test enquiry from the Contact page once deployed and confirm that `adityafoodsandmedia.it@gmail.com` receives the email with all filled fields.
2. **EmailJS Domain Whitelist Validation:**
   - *Status:* **BLOCKED (Requires User Action in External Dashboard)**
   - *Reason:* EmailJS dashboard access requires the user's private login credentials.
   - *Manual Action:* Add your production domain (`https://yourdomain.com`) to **Account** > **Security** > **Allowed Domains** in the EmailJS dashboard.
3. **Physical Mobile Device Hardware Testing:**
   - *Status:* **NOT TESTED ON PHYSICAL HARDWARE**
   - *Reason:* Verified responsive viewport emulation; physical touch screen testing on iOS Safari / Android Chrome should be confirmed post-deployment.
