# How to Check EdgeDB Connection

## Method 1: Using Gel CLI (Command Line)

Test the connection directly:

```bash
source "/Users/yousif/Library/Application Support/edgedb/env"
export EDGEDB_INSTANCE="vercel-ubQaaA85poXwmK3TuMqcBWjX/edgedb-indigo-ball"
export EDGEDB_SECRET_KEY="nbwt1_eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9..."
gel query "SELECT 1"
```

If it returns `1`, you're connected! ✅

## Method 2: Check Database Tables

See if your tables exist:

```bash
source "/Users/yousif/Library/Application Support/edgedb/env"
export EDGEDB_INSTANCE="vercel-ubQaaA85poXwmK3TuMqcBWjX/edgedb-indigo-ball"
export EDGEDB_SECRET_KEY="nbwt1_eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9..."
gel query "SELECT count(User)"
gel query "SELECT count(Kit)"
gel query "SELECT count(Store)"
```

## Method 3: Test via Local API

1. Start your dev server:
```bash
npm run dev
```

2. Test the API endpoints:
```bash
# Test kits endpoint
curl http://localhost:3000/api/kits

# Test collection endpoint
curl http://localhost:3000/api/collection

# Test wishlist endpoint
curl http://localhost:3000/api/wishlist
```

If you get JSON responses (even empty arrays), the connection works! ✅

## Method 4: Check in Browser

1. Start dev server: `npm run dev`
2. Visit: http://localhost:3000
3. Try:
   - Go to `/search` - should load (even if no kits)
   - Go to `/wishlist` - should load
   - Go to `/collection` - should load
   - Go to `/stats` - should load

If pages load without errors, EdgeDB is connected! ✅

## Method 5: Check Vercel Deployment

After deploying to Vercel:

1. Go to your Vercel project
2. Check **Deployments** → **Logs**
3. Look for any EdgeDB connection errors
4. Visit your live site: `gundamparadise.vercel.app`
5. Test the pages - if they work, connection is good! ✅

## Troubleshooting

**Connection fails?**
- Check environment variables are set correctly
- Verify `EDGEDB_INSTANCE` and `EDGEDB_SECRET_KEY` are correct
- Make sure EdgeDB instance is running

**API returns errors?**
- Check browser console for errors
- Check terminal/server logs
- Verify schema is deployed (run `gel migrate`)

**Tables don't exist?**
- Run: `gel migrate` to apply schema
- Check: `gel query "SELECT count(Kit)"` should work
