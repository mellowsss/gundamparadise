# Deploying Gundam Paradise to Vercel

This guide will help you deploy Gundam Paradise to Vercel.

## Prerequisites

- A Vercel account (sign up at [vercel.com](https://vercel.com))
- A GitHub account (for connecting your repository)

## Option 1: Deploy with Vercel Postgres (Recommended)

### Step 1: Push your code to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Create a Vercel Postgres Database

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project (or create a new one)
3. Go to the **Storage** tab
4. Click **Create Database** → Select **Postgres**
5. Choose a name and region, then click **Create**

### Step 3: Update Prisma Schema for Postgres

Update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("POSTGRES_PRISMA_URL")
  directUrl = env("POSTGRES_URL_NON_POOLING")
}
```

### Step 4: Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New Project**
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings
5. Add environment variables:
   - `POSTGRES_PRISMA_URL` (from your Vercel Postgres database)
   - `POSTGRES_URL_NON_POOLING` (from your Vercel Postgres database)
   - `DATABASE_URL` (same as POSTGRES_PRISMA_URL for compatibility)
6. Click **Deploy**

### Step 5: Run Database Migrations

After deployment, run migrations:

```bash
# Using Vercel CLI
npx vercel env pull .env.local
npx prisma migrate deploy
```

Or use the Vercel dashboard to run migrations via the terminal.

## Option 2: Deploy with External Database (PlanetScale, Supabase, etc.)

### Step 1-2: Same as above

### Step 3: Update Prisma Schema

```prisma
datasource db {
  provider = "postgresql"  // or "mysql" for PlanetScale
  url      = env("DATABASE_URL")
}
```

### Step 4: Add Environment Variables in Vercel

In your Vercel project settings, add:
- `DATABASE_URL` - Your database connection string

### Step 5: Deploy

Follow the same deployment steps as Option 1.

## Option 3: Quick Deploy (SQLite - Not Recommended for Production)

⚠️ **Note**: SQLite doesn't work well on Vercel's serverless functions. Use this only for testing.

If you want to try it anyway:

1. Deploy to Vercel
2. The database file won't persist between deployments
3. Consider using a cloud storage solution or switch to Postgres

## Post-Deployment

1. **Run Migrations**: After first deployment, run `prisma migrate deploy`
2. **Seed Database** (optional): Run your seed script if needed
3. **Set up Custom Domain** (optional): Add your domain in Vercel project settings

## Environment Variables

Make sure these are set in Vercel:

- `DATABASE_URL` - Database connection string
- `POSTGRES_PRISMA_URL` - (If using Vercel Postgres)
- `POSTGRES_URL_NON_POOLING` - (If using Vercel Postgres)

## Troubleshooting

### Build Fails

- Check that `prisma generate` runs in the build process
- Verify all environment variables are set
- Check build logs in Vercel dashboard

### Database Connection Issues

- Verify DATABASE_URL is correct
- Check database is accessible from Vercel's IP ranges
- For Vercel Postgres, ensure you're using the connection pooling URL

### Prisma Client Not Found

- Ensure `postinstall` script runs: `"postinstall": "prisma generate"`
- Check that Prisma generates during build

## Quick Deploy Button

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/gundamparadise)

Replace `yourusername` with your GitHub username.
