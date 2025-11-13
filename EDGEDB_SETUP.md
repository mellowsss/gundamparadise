# EdgeDB Setup for Vercel - Complete Guide

## ✅ Step 1: Add Environment Variables in Vercel

1. Go to: https://vercel.com/mellowsss-projects/gundamparadise
2. Go to **Settings** → **Environment Variables**
3. Add these variables:

### EDGEDB_INSTANCE
- **Key**: `EDGEDB_INSTANCE`
- **Value**: `vercel-ubQaaA85poXwmK3TuMqcBWjX/edgedb-indigo-ball`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development
- Click **"Save"**

### EDGEDB_SECRET_KEY
- **Key**: `EDGEDB_SECRET_KEY`
- **Value**: `nbwt1_eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJlZGIuZC5hbGwiOnRydWUsImVkYi5pIjpbInZlcmNlbC11YlFhYUE4NXBvWHdtSzNUdU1xY0JXalgvZWRnZWRiLWluZGlnby1iYWxsIl0sImVkYi5yLmFsbCI6dHJ1ZSwiaWF0IjoxNzYzMDcyOTU4LCJpc3MiOiJhd3MuZWRnZWRiLmNsb3VkIiwianRpIjoiTWFxc0lNRGdFZkNGZ0ZlS2RROTBmZyIsInN1YiI6Ik1XUWVwTURnRWZDc01CLUlvZC1UVkEifQ.z_MdO5O6HUG9Ga3Bnmljz4qmXe6651NIQCwQuvq1_aSMgEGChA_950sjo7Qazrl5ZPQlCZpqoPXtDp1fvQHiSw`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development
- Click **"Save"**

## ✅ Step 2: Deploy Schema to EdgeDB

After adding environment variables, you need to deploy the schema:

1. Install EdgeDB CLI: `npm install -g edgedb`
2. Link to your instance:
   ```bash
   export EDGEDB_INSTANCE="vercel-ubQaaA85poXwmK3TuMqcBWjX/edgedb-indigo-ball"
   export EDGEDB_SECRET_KEY="nbwt1_eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9..."
   ```
3. Create migration:
   ```bash
   edgedb migration create
   ```
4. Apply migration:
   ```bash
   edgedb migrate
   ```

Or use the EdgeDB Cloud dashboard to apply the schema from `edgedb/schema.esdl`.

## ✅ Step 3: Deploy to Vercel

Vercel will automatically redeploy when you add environment variables. The build will:
- ✅ Install dependencies
- ✅ Build Next.js app
- ✅ Connect to EdgeDB

## ✅ Step 4: Seed Database (Optional)

After deployment, you can add sample data by running EdgeQL queries through the EdgeDB dashboard or CLI.

## 🎉 That's It!

Your app is now using EdgeDB! All API routes have been converted to use EdgeQL queries.

## Notes

- EdgeDB uses EdgeQL (not SQL or Prisma)
- All API routes are already converted
- The schema is in `edgedb/schema.esdl`
- EdgeDB client automatically uses environment variables
