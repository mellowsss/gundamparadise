# Vercel Postgres Quick Setup

## Step 1: Create Vercel Postgres Database

1. Go to: https://vercel.com/mellowsss-projects/gundamparadise
2. Click **"Storage"** tab (left sidebar)
3. Click **"Create Database"**
4. Select **"Postgres"**
5. Name it: `gundamparadise-db` (or any name)
6. Choose a region
7. Click **"Create"**

## Step 2: Add Environment Variables

After creating the database, Vercel automatically shows you connection strings. Add these:

### Add DATABASE_URL:
1. Go to **Settings** → **Environment Variables**
2. Click **"Add New"**
3. **Key**: `DATABASE_URL`
4. **Value**: Copy from `POSTGRES_PRISMA_URL` (shown in your database)
5. **Environments**: ✅ Production, ✅ Preview, ✅ Development
6. Click **"Save"**

### Add DIRECT_URL:
1. Click **"Add New"** again
2. **Key**: `DIRECT_URL`
3. **Value**: Copy from `POSTGRES_URL_NON_POOLING` (shown in your database)
4. **Environments**: ✅ Production, ✅ Preview, ✅ Development
5. Click **"Save"**

## Step 3: Deploy

Vercel will automatically redeploy when you add the variables. The build will:
- ✅ Generate Prisma Client
- ✅ Create all database tables
- ✅ Build your app

## Step 4: Seed Database (Optional)

After deployment, add sample kits:

1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Link project: `vercel link`
4. Pull env vars: `vercel env pull .env.local`
5. Run seed: `npx prisma db seed`

## That's It!

Your app is now connected to Vercel Postgres! 🎉

## Why Vercel Postgres?

- ✅ Built into Vercel (no external setup)
- ✅ Automatic environment variables
- ✅ Free tier available
- ✅ Works perfectly with Prisma
- ✅ No need for Prisma Accelerate
