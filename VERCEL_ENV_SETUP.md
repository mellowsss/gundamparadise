# Vercel Environment Variables Setup for Neon

## Required Environment Variables

Add these to your Vercel project:

1. Go to: https://vercel.com/mellowsss-projects/gundamparadise/settings/environment-variables

2. Add these variables:

### Primary Database Connection (Pooled - Recommended)
```
DATABASE_URL=postgresql://neondb_owner:npg_Scfnkp69xAOz@ep-weathered-voice-a4gehxi1-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
```

### Direct Connection (For Migrations)
```
DIRECT_URL=postgresql://neondb_owner:npg_Scfnkp69xAOz@ep-weathered-voice-a4gehxi1.us-east-1.aws.neon.tech/neondb?sslmode=require
```

## Important Notes

- **DATABASE_URL**: Use the pooled connection (with `-pooler` in hostname) for regular queries
- **DIRECT_URL**: Use the non-pooled connection (without `-pooler`) for migrations
- Set both for **ALL environments**: Production, Preview, Development
- After adding, **redeploy** your project

## After Adding Variables

1. Vercel will automatically redeploy
2. Or manually click "Redeploy" in the deployments tab
3. The app will connect to your Neon database!

## Verify Connection

After deployment, check:
- API routes work: `https://gundamparadise.vercel.app/api/kits`
- Data persists (not using sample data)
- No connection errors in Vercel logs

