# Complete Vercel 404 Fix Guide

## Step-by-Step Fix in Vercel Dashboard

### Step 1: Check Build Logs

1. Go to: https://vercel.com/mellowsss-projects/gundamparadise
2. Click on the **latest deployment**
3. Check the **"Build Logs"** tab
4. Look for:
   - ❌ **Build errors** (red)
   - ⚠️ **Warnings** (yellow)
   - ✅ **"Route (app)"** section - should show all routes

**What to look for:**
```
Route (app)
┌ ○ /
├ ○ /search
├ ○ /wishlist
...
```

If routes are missing, there's a build issue.

### Step 2: Check Function Logs (Runtime Errors)

1. In the deployment, go to **"Functions"** tab
2. Click on the function for `/` (root route)
3. Check **"Logs"** tab
4. Look for runtime errors when accessing the page

**Common errors:**
- `DATABASE_URL` not found
- Prisma client not generated
- Module not found errors

### Step 3: Add Environment Variables

1. Go to: https://vercel.com/mellowsss-projects/gundamparadise/settings/environment-variables

2. **Add DATABASE_URL** (even if empty, app will use sample data):
   ```
   DATABASE_URL=postgresql://neondb_owner:npg_Scfnkp69xAOz@ep-weathered-voice-a4gehxi1-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```

3. **Important Settings:**
   - ✅ Set for: **Production**, **Preview**, **Development**
   - ✅ Click **"Save"** after each variable

### Step 4: Check Build Settings

1. Go to: **Settings** → **General**
2. Check **"Build Command"**: Should be `npm run vercel-build` or empty (auto-detected)
3. Check **"Output Directory"**: Should be empty or `.next`
4. Check **"Install Command"**: Should be `npm install`

### Step 5: Clear Build Cache and Redeploy

1. Go to **Deployments** tab
2. Click **"..."** (three dots) on latest deployment
3. Click **"Redeploy"**
4. **IMPORTANT**: Uncheck **"Use existing Build Cache"**
5. Click **"Redeploy"**

### Step 6: Check Project Settings

1. Go to: **Settings** → **General**
2. **Framework Preset**: Should be **"Next.js"** (auto-detected)
3. **Node.js Version**: Should be **18.x** or **20.x**
4. **Root Directory**: Should be **"."** (root)

### Step 7: Verify Build Output

After redeploy, check the build logs for:

```
✓ Compiled successfully
Route (app)
┌ ○ /
├ ○ /search
├ ○ /wishlist
├ ○ /collection
├ ○ /stats
...
```

If you see this, routes are generated correctly.

### Step 8: Test Direct API Access

Try accessing these URLs directly:

1. **API**: `https://gundamparadise.vercel.app/api/kits`
   - Should return JSON (even if empty)
   - If this works, API is fine

2. **Home**: `https://gundamparadise.vercel.app/`
   - Should show home page
   - If 404, check function logs

### Step 9: Check Runtime Logs

1. Go to **Deployments** → Latest deployment
2. Click **"Functions"** tab
3. Click on the function for `/`
4. Check **"Logs"** tab
5. Try accessing the page and watch for errors

**Common runtime errors:**
- `PrismaClient is not configured` → Add DATABASE_URL
- `Cannot find module` → Build cache issue
- `TypeError` → Check function logs

### Step 10: Force Fresh Build

If nothing works:

1. Go to **Settings** → **General**
2. Scroll to **"Danger Zone"**
3. Click **"Clear Build Cache"**
4. Go back to **Deployments**
5. Click **"Redeploy"** (without cache)

## Quick Checklist

- [ ] Build succeeds (check build logs)
- [ ] Routes are generated (check build output)
- [ ] DATABASE_URL is set (optional - app works without it)
- [ ] No runtime errors (check function logs)
- [ ] Build cache cleared
- [ ] Fresh redeploy done

## If Still 404 After All Steps

1. **Check the exact URL**: Make sure you're visiting the correct domain
2. **Check DNS**: Verify domain is pointing to Vercel
3. **Check deployment status**: Is it "Ready" or "Error"?
4. **Contact Vercel support**: If build succeeds but routes don't work

## Most Common Cause

**Missing DATABASE_URL causing Prisma to fail at runtime**

Even though the app works without it, Prisma might be trying to connect during build/runtime.

**Solution**: Add DATABASE_URL environment variable (even if you don't use it yet).

