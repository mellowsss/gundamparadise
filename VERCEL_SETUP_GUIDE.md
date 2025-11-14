# Vercel Setup Guide - Fresh Project

## When Creating New Vercel Project

### 1. Framework Preset
**Select: `Next.js`** ✅

Vercel should auto-detect it, but if asked:
- Framework Preset: **Next.js**
- Build Command: Leave empty (auto-detected)
- Output Directory: Leave empty (auto-detected)
- Install Command: `npm install` (default)

### 2. Root Directory
- **Root Directory**: `.` (root) or leave empty

### 3. Environment Variables (Optional)
You don't need to add any environment variables right now. The app works with sample data.

If you want to use a database later:
- `DATABASE_URL` = Your Neon PostgreSQL connection string

### 4. Build Settings
Vercel will automatically:
- ✅ Detect Next.js
- ✅ Use `next build` as build command
- ✅ Install dependencies with `npm install`
- ✅ Deploy from root directory

### 5. After Deployment
1. Wait for build to complete
2. Check build logs - should show:
   ```
   Route (app)
   ┌ ○ /
   ├ ○ /search
   ├ ○ /wishlist
   ...
   ```
3. Visit your site URL

## Quick Checklist

- [ ] Framework: **Next.js**
- [ ] Root Directory: `.` (root)
- [ ] Build Command: Leave empty (auto)
- [ ] Output Directory: Leave empty (auto)
- [ ] Environment Variables: None needed (optional: DATABASE_URL)
- [ ] Node.js Version: 18.x or 20.x (auto)

## That's It!

The app will work immediately with sample data. No database setup required!

