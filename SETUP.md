# 🚀 ERONII - Formex Construction Website Setup Guide

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v18.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Git** - [Download here](https://git-scm.com/)

## 🔧 Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/DRDE-EZ/ERONII.git
cd ERONII
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Configuration

**CRITICAL:** You need to create environment files with the correct configuration.

#### Create `.env.local` file:
Create a new file called `.env.local` in the root directory and add:

```bash
# Local Development Environment
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_WIX_CLIENT_ID=cbf77863-cedf-4588-b7a8-fc430cf6a816
NEXT_PUBLIC_WIX_SITE_ID=4b296c48-4a6b-4db1-9813-d74e37a5e3ea
WIX_API_KEY=IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcImQ2ZGEwZGZmLWExYzEtNDc2My1iNzJmLTNmMDYxMTUxMmQzNlwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcImIyMTg2NmRiLWU4NjItNDM5NC04MDI2LWZmNzA3YzI3YjIxZVwifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCIzMGYwM2NlZC1jZjc4LTQ1ZjYtOTMxMS0yZjQxYmMzNGE3M2ZcIn19IiwiaWF0IjoxNzYxMTUwNzA4fQ.dktz1mD2SoaNwmzGkhjieqPDzjaNaOwSxzr7QeJ3Cr4sqts5NKs9QkkBoS5RXEMlRMUDzvgePIKTH0LKBXVDzqXvyS5KT6U21_J1baJoxl5A8VM6oiz7AKxzkjWP2vokoJX156USQfE8KVMSLplU6sTtxYgeJMoisH87y9iAf7NmNMSG3odUrPwoRB-LcYd2n44TBIVT_noKQJ_TYAyzH1PzJ-q9Aw3s4DmSgchb0tbodkWCWAVTmhUSOVxASF1GWhwOR4reJvTQNyQsQfzmjH1n87jCa7oVDE5qvFlmlHIFT7sBinxzn4kE6aRvbR5-dssLMgj0pIg_lvOC3rfAEg
```

#### Alternative: Copy from example
If there's an `.env.example` file, copy it:
```bash
cp .env.example .env.local
```

### 4. Start Development Server
```bash
npm run dev
# or
yarn dev
```

The application should now be available at `http://localhost:3000` (or `http://localhost:3001` if 3000 is in use).

## 🚨 Troubleshooting Common Issues

### Issue 1: "500 Internal Server Error"
**Cause:** Missing or incorrect environment variables

**Solution:**
1. Ensure `.env.local` file exists in the root directory
2. Verify all environment variables are correctly set
3. Restart the development server after creating/modifying environment files

### Issue 2: "Module not found" errors
**Cause:** Dependencies not installed

**Solution:**
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue 3: "Port already in use"
**Cause:** Another application is using port 3000

**Solution:**
- The app will automatically use port 3001 or another available port
- Or stop the application using port 3000

### Issue 4: TypeScript errors
**Cause:** Type checking issues

**Solution:**
```bash
# Run type checking
npm run type-check
# or build to see all errors
npm run build
```

### Issue 5: "Cannot find module" for @wix packages
**Cause:** Wix SDK packages not properly installed

**Solution:**
```bash
npm install @wix/sdk @wix/stores @wix/ecom @wix/reviews @wix/members @wix/media @wix/redirects
```

## 🔑 Environment Variables Explained

- `NEXT_PUBLIC_BASE_URL`: Your application's URL (localhost for development)
- `NEXT_PUBLIC_WIX_CLIENT_ID`: Wix application client ID
- `NEXT_PUBLIC_WIX_SITE_ID`: Wix site identifier
- `WIX_API_KEY`: Server-side API key for Wix services (keep secure!)

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

## 📱 Development Notes

- The application uses Next.js 15 with App Router
- Styling is done with Tailwind CSS
- State management uses React Query (TanStack Query)
- Wix API integration for products, cart, and user management

## 🤝 Getting Help

If you encounter issues:

1. Check this README first
2. Ensure all environment variables are correctly set
3. Try clearing node_modules and reinstalling dependencies
4. Check the console for specific error messages
5. Contact the project maintainer with specific error details

## 🚀 Production Deployment

For production deployment (Vercel, Netlify, etc.):

1. Set environment variables in your deployment platform
2. Update `NEXT_PUBLIC_BASE_URL` to your production domain
3. Ensure `WIX_API_KEY` is securely stored as a server-side environment variable

---

**Last Updated:** November 1, 2025
**Project:** ERONII - Formex Construction & Wholesale Website