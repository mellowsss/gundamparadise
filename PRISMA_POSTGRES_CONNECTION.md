# How to Connect Prisma to Postgres on Vercel

## Step 1: Create Vercel Postgres Database

1. Go to your Vercel project: https://vercel.com/mellowsss-projects/gundamparadise
2. Click on the **"Storage"** tab (in the left sidebar)
3. Click **"Create Database"** button
4. Select **"Postgres"**
5. Fill in:
   - **Name**: `gundamparadise-db` (or any name you like)
   - **Region**: Choose closest to you
6. Click **"Create"**

## Step 2: Get Connection Strings

After creating the database, Vercel will show you connection strings. You'll see:

- `POSTGRES_PRISMA_URL` - This is for connection pooling (use this for `DATABASE_URL`)
- `POSTGRES_URL_NON_POOLING` - This is for direct connections (use this for `DIRECT_URL`)

## Step 3: Add Environment Variables in Vercel

1. In your Vercel project, go to **Settings** → **Environment Variables**
2. Click **"Add New"**

### Add DATABASE_URL:
- **Key**: `DATABASE_URL`
- **Value**: Copy the entire `POSTGRES_PRISMA_URL` value from your database
- **Environments**: ✅ Production, ✅ Preview, ✅ Development
- Click **"Save"**

### Add DIRECT_URL:
- **Key**: `DIRECT_URL`
- **Value**: Copy the entire `POSTGRES_URL_NON_POOLING` value from your database
- **Environments**: ✅ Production, ✅ Preview, ✅ Development
- Click **"Save"**

## Step 4: Your Prisma Schema is Already Configured!

Your `prisma/schema.prisma` is already set up correctly:

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

This will automatically use the environment variables you just added!

## Step 5: Deploy

1. Vercel will automatically redeploy when you add environment variables
2. Or manually trigger: Go to **Deployments** → Click **"Redeploy"**
3. The build will:
   - Generate Prisma Client
   - Create all database tables (`prisma db push`)
   - Build your Next.js app

## Step 6: Seed Database (Optional)

After deployment, you can add sample data:

1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Link project: `vercel link`
4. Pull env vars: `vercel env pull .env.local`
5. Run seed: `npx prisma db seed`

Or you can add kits manually through the app!

## Verify Connection

After deployment:
1. Visit your app: `gundamparadise.vercel.app`
2. Go to `/search` - you should see kits (after seeding)
3. Check Vercel logs if there are any errors

## Troubleshooting

**Build fails?**
- Check that `DATABASE_URL` and `DIRECT_URL` are set correctly
- Verify the database is created and running
- Check build logs in Vercel

**Database connection errors?**
- Make sure both environment variables are added
- Verify they're added to all environments
- Check that the database is in the same region as your deployment

**Tables not created?**
- The build command runs `prisma db push` which creates tables
- Check build logs to see if it succeeded
- You can manually run migrations if needed

## That's It!

Your Prisma Postgres connection is now set up! The app will automatically connect to your database on every deployment.
