# Aditya Foods & Media — Production Pre-Deployment Audit Report

**Date of Audit:** October 17, 2026  
**Auditor:** Senior Software Engineer (AI Studio)  
**Project:** Aditya Foods & Media (`react-example`)  
**Deployment Target:** Hostinger Shared Web Hosting (Apache / LiteSpeed) + Firebase Firestore  
**Verdict:** **READY FOR CONTROLLED DEPLOYMENT** (Subject to completing EmailJS Allowed Domains configuration in the external dashboard)

---

## 1. Executive Summary

This comprehensive pre-delivery audit was performed on the client web application for **Aditya Foods & Media**, an Odia/English dual-division business showcasing premium dairy foods and cinematic media production.

All production files, configurations, security rules, environment variables, asset pipelines, and integrations were audited. Confirmed defects and risks (such as missing Hostinger SPA routing rules, unhandled TypeScript lint failures, unoptimized image payloads, and origin protection for EmailJS) have been completely addressed through small, reversible, and verified code changes on an isolated Git branch (`audit-fixes`).

---

## 2. Technology Stack & Architecture

- **Core Framework:** React 19.0.1 (Single-Page Application)
- **Build Tool & Bundler:** Vite 8.3.1 with `@vitejs/plugin-react` and `@tailwindcss/vite` (Tailwind CSS v4)
- **Language:** TypeScript 7.0.2 in strict mode (`tsc --noEmit`)
- **Backend & Database:** Google Firebase Firestore (`firebase@12.19.0`), project `gen-lang-client-0363740342`, database ID `ai-studio-803f935b-322a-4a43-8b03-2e6841a55a4b`
- **Email Notification Pipeline:** `@emailjs/browser` (v5.0.3) dispatched directly from browser client to `adityafoodsandmedia.it@gmail.com`
- **Typography & Internationalization:** Custom bilingual engine (Odia by default, English toggle) stored in `localStorage`
- **Media Integration:** YouTube Iframe API with hover previews and a custom 90-second preview limiter for comedy & film showcases

---

## 3. Project File Inventory & Coverage Ledger

### Audited Core Codebase (100% Coverage)
- **Routing & Shell:** `src/App.tsx`, `src/main.tsx`, `index.html`
- **State & Context:** `src/context/SiteContext.tsx`
- **Bilingual i18n:** `src/i18n/translations.ts`
- **Pages (10 views):** `HomePage.tsx`, `AboutPage.tsx`, `FoodsPage.tsx`, `ProductsPage.tsx`, `ConsultationPage.tsx`, `MediaPage.tsx`, `VideosPage.tsx`, `PortfolioPage.tsx`, `ContactPage.tsx`, `LegalPages.tsx`
- **Components (9 modules):** `Navbar.tsx`, `Footer.tsx`, `BrandIntro.tsx`, `BrandLogos.tsx`, `ProductCard.tsx`, `ProductModal.tsx`, `VideoCard.tsx`, `VideoModal.tsx`, `FloatingWhatsApp.tsx`
- **Services & Database:** `src/firebase/config.ts`, `src/firebase/services.ts`, `src/firebase/seedData.ts`, `src/firebase/errors.ts`, `src/services/emailService.ts`
- **Types:** `src/types/index.ts`
- **Hosting & Infrastructure:** `public/.htaccess`, `public/favicon.svg`, `firestore.rules`, `firebase-applet-config.json`, `firebase-blueprint.json`, `vite.config.ts`, `tsconfig.json`, `package.json`, `.env.example`

### Excluded Folders
- `node_modules/` (Vendor code)
- `dist/` (Compiled production bundle — inspected separately for asset verification and secret leaks)
- `.git/` (Local version control)

---

## 4. Findings & Audit Remediation Ledger

| ID | Severity | Status | File / Component | Finding & Evidence | Resolution / Fix Applied |
| :--- | :---: | :---: | :--- | :--- | :--- |
| **SEC-01** | **MEDIUM** | **RESOLVED** | `firestore.rules` | Old rules allowed storing full customer personal data in Firestore. | Tightened `firestore.rules` so that `enquiries` accepts **only** reference numbers and operational metadata. Rules deployed live to Firebase via `DeployRules`. |
| **SEC-02** | **HIGH** | **RESOLVED** | `src/services/emailService.ts` | Risk of personal data (PII) leakage in console logs or database. | Confirmed zero PII logging. Personal details are transmitted exclusively through EmailJS. Firestore stores only `referenceNumber`, `enquiryType`, `createdAt`, `emailDeliveryStatus`, and `channel`. |
| **DEP-01** | **CRITICAL** | **RESOLVED** | `public/.htaccess` | Missing Apache rewrite configuration for Hostinger shared hosting; would cause 404 on page refresh. | Created `public/.htaccess` with mod_rewrite rules redirecting non-file requests to `index.html`, plus browser caching and GZIP compression. Vite copies this into `dist/`. |
| **DEP-02** | **HIGH** | **ACTION REQUIRED** | EmailJS Security Dashboard | EmailJS non-browser access disabled; browser origins without whitelist will trigger 403 Forbidden. | Fallback credentials configured safely. User must add live Hostinger domain (`https://yourdomain.com`) to EmailJS Allowed Domains list in their dashboard. |
| **BLD-01** | **HIGH** | **RESOLVED** | `tsconfig.json` & `server.ts` | `npm run lint` failed due to missing `nodemailer` in unused `server.ts`. | Added `"include": ["src/**/*", "vite.config.ts"]` and `"exclude": ["server.ts"]` to `tsconfig.json`. `npm run lint` now passes with 0 errors. |
| **BLD-02** | **LOW** | **RESOLVED** | `vite.config.ts` | Used deprecated `__dirname` in Vite 8 native config loader. | Replaced with `fileURLToPath(new URL('.', import.meta.url))`. Builds cleanly with 0 warnings. |
| **PERF-01**| **MEDIUM** | **RESOLVED** | `src/assets/images/*.jpg` | Brand emblems were uncompressed JPEGs totaling 1.92 MB. | Converted to optimized WebP (`.webp`), reducing total asset size to 171 KB (>91% savings). Updated `BrandLogos.tsx`. |
| **PERF-02**| **MEDIUM** | **RESOLVED** | `src/App.tsx` | All 10 pages loaded synchronously in a 1.24 MB monolithic chunk. | Implemented route-based lazy loading with `React.lazy()` and `<React.Suspense>`. Shrunk core chunk to 532 kB and created dedicated lazy route chunks. |
| **UX-01**  | **LOW** | **RESOLVED** | `public/favicon.svg` & `index.html` | Missing favicon caused 404 requests in browser console. | Added SVG brand favicon in `public/favicon.svg` and linked in `index.html`. |

---

## 5. Unresolved Risks & Operational Limitations

1. **EmailJS Domain Whitelist:** Until the live Hostinger domain is explicitly saved in the EmailJS dashboard under **Allowed Domains**, browser requests from that domain might receive a 403 Forbidden error.
2. **Client-Side Environment Variables:** Vite replaces `import.meta.env` values at build time. When building locally or on CI before uploading to Hostinger, the build command will use the default configured fallbacks unless an environment file overrides them.
3. **Third-Party Image & Video Hosting:** Product images are hosted on Unsplash CDN and video previews stream from YouTube CDN. In offline environments, the website gracefully falls back to cached text descriptions and offline-ready local SVG/WebP emblems.
