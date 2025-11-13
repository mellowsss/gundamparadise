# Vercel Deployment Setup Guide

Follow these steps to deploy Gundam Paradise to Vercel.

## Step 1: Connect GitHub Repository

1. Go to your Vercel project: https://vercel.com/mellowsss-projects/gundamparadise
2. Click **"Connect Git"** or **"Settings"** → **"Git"**
3. Connect your GitHub repository: `mellowsss/gundamparadise`
4. Select the `main` branch

## Step 2: Create Vercel Postgres Database

1. In your Vercel project dashboard, go to the **"Storage"** tab
2. Click **"Create Database"**
3. Select **"Postgres"**
4. Choose a name (e.g., `gundamparadise-db`)
5. Select a region closest to you
6. Click **"Create"**

## Step 3: Add Environment Variables

After creating the Postgres database, Vercel will automatically provide connection strings. Add these environment variables in your Vercel project:

1. Go to **Settings** → **Environment Variables**
2. Add the following variables (they should be auto-populated from your Postgres database):

   - `DATABASE_URL` - Use the `POSTGRES_PRISMA_URL` from your database
   - `DIRECT_URL` - Use the `POSTGRES_URL_NON_POOLING` from your database

   Or if Vercel provides these directly:
   - `POSTGRES_PRISMA_URL` → Set as `DATABASE_URL`
   - `POSTGRES_URL_NON_POOLING` → Set as `DIRECT_URL`

## Step 4: Deploy

1. Go to the **"Deployments"** tab
2. If you haven't deployed yet, Vercel should automatically trigger a deployment when you connect Git
3. Or manually trigger: Click **"Redeploy"** or push a new commit

## Step 5: Run Database Migrations

After the first deployment:

### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Pull environment variables
vercel env pull .env.local

# Run migrations
npx prisma migrate deploy
```

### Option B: Using Vercel Dashboard

1. Go to your project dashboard
2. Click on the latest deployment
3. Open the **"Functions"** tab or use the **"Terminal"** feature
4. Run: `npx prisma migrate deploy`

### Option C: Using Vercel's Build Command

The migrations will run automatically if you add this to your build command. Update `vercel.json`:

```json
{
  "buildCommand": "prisma migrate deploy && npm run build"
}
```

## Step 6: Verify Deployment

1. Visit your deployment URL (e.g., `gundamparadise.vercel.app`)
2. Check that the app loads correctly
3. Test the search functionality
4. Try adding items to wishlist/collection

## Troubleshooting

### Build Fails with Prisma Errors

- Make sure `DATABASE_URL` and `DIRECT_URL` are set correctly
- Check that Prisma generates during build (should happen automatically via `postinstall` script)
- Verify the database is accessible

### Database Connection Errors

- Verify environment variables are set in Vercel
- Check that the Postgres database is created and running
- Ensure `DIRECT_URL` is set (required for migrations)

### Migration Errors

- Run `npx prisma migrate deploy` manually
- Check that your database schema matches the migrations
- You may need to reset the database if there are conflicts

## Next Steps

After successful deployment:

1. **Set up Custom Domain** (optional):
   - Go to **Settings** → **Domains**
   - Add your custom domain

2. **Enable Analytics** (optional):
   - Go to **Analytics** tab
   - Enable Vercel Analytics

3. **Monitor Performance**:
   - Check the **Speed Insights** tab
   - Review **Logs** for any errors

## Support

If you encounter issues:
- Check Vercel deployment logs
- Review Prisma migration status
- Verify environment variables are set correctly
