# Vercel Postgres Setup - Easiest Database for Vercel

Vercel Postgres is the **easiest** database to use on Vercel because:
- ✅ Built directly into Vercel
- ✅ No external service setup needed
- ✅ Automatic environment variables
- ✅ Works seamlessly with Prisma
- ✅ Free tier available

## Step-by-Step Setup

### 1. Create Vercel Postgres Database

1. Go to your Vercel project: https://vercel.com/mellowsss-projects/gundamparadise
2. Click on the **"Storage"** tab
3. Click **"Create Database"**
4. Select **"Postgres"**
5. Choose a name (e.g., `gundamparadise-db`)
6. Select a region (closest to you)
7. Click **"Create"**

### 2. Add Environment Variables

After creating the database, Vercel will automatically show you connection strings. Add these:

1. Go to **Settings** → **Environment Variables**
2. You'll see these variables from your Postgres database:
   - `POSTGRES_PRISMA_URL` (Connection pooling URL)
   - `POSTGRES_URL_NON_POOLING` (Direct connection URL)

3. Add these mappings:
   - **Key**: `DATABASE_URL`
   - **Value**: Copy the value from `POSTGRES_PRISMA_URL`
   - **Environments**: Check all (Production, Preview, Development)
   - Click **"Save"**

   - **Key**: `DIRECT_URL`
   - **Value**: Copy the value from `POSTGRES_URL_NON_POOLING`
   - **Environments**: Check all
   - Click **"Save"**

### 3. Deploy

1. Vercel will automatically redeploy when you add environment variables
2. Or manually trigger: Go to **Deployments** → Click **"Redeploy"**

### 4. Run Database Migrations

After the first deployment, the database tables will be created automatically by `prisma db push` in the build command.

If you need to run migrations manually:
```bash
npx vercel env pull .env.local
npx prisma db push
```

## That's It!

Your app now has a real database that:
- Persists data across deployments
- Works with all your API routes
- Stores kits, prices, wishlists, collections, and alerts
- Scales automatically with Vercel

## Alternative: Other Easy Databases

If you want alternatives:
- **Supabase** - Free PostgreSQL with great features
- **PlanetScale** - MySQL with branching (free tier)
- **Neon** - Serverless Postgres (free tier)

But **Vercel Postgres is the easiest** since it's built right into Vercel!
