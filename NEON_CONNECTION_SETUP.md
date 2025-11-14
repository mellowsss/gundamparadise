# Neon Database Connection Setup

## ✅ Your Neon Database is Ready!

Your connection strings have been configured. Here's how to set it up:

## Local Setup

### 1. Create `.env.local` file

Create a file named `.env.local` in the project root with:

```env
DATABASE_URL="postgresql://neondb_owner:npg_Scfnkp69xAOz@ep-weathered-voice-a4gehxi1-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"
DIRECT_URL="postgresql://neondb_owner:npg_Scfnkp69xAOz@ep-weathered-voice-a4gehxi1.us-east-1.aws.neon.tech/neondb?sslmode=require"
```

### 2. Push Schema to Database

```bash
npm run db:push
```

Or manually:
```bash
DATABASE_URL="postgresql://neondb_owner:npg_Scfnkp69xAOz@ep-weathered-voice-a4gehxi1-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require" npx prisma db push
```

### 3. Verify Connection

```bash
npm run dev
```

Visit `http://localhost:3000/search` - you should see the database working (or sample data if empty).

## Vercel Setup

### 1. Add Environment Variables

Go to: https://vercel.com/mellowsss-projects/gundamparadise/settings/environment-variables

Add these variables:

**DATABASE_URL** (Pooled - for queries):
```
postgresql://neondb_owner:npg_Scfnkp69xAOz@ep-weathered-voice-a4gehxi1-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
```

**DIRECT_URL** (Non-pooled - for migrations):
```
postgresql://neondb_owner:npg_Scfnkp69xAOz@ep-weathered-voice-a4gehxi1.us-east-1.aws.neon.tech/neondb?sslmode=require
```

**Important:**
- Set for **ALL environments**: Production, Preview, Development
- Click **Save** after adding each variable

### 2. Redeploy

After adding variables:
1. Go to **Deployments** tab
2. Click **Redeploy** on latest deployment
3. Or push a new commit to trigger auto-deploy

## Connection Strings Explained

- **DATABASE_URL** (with `-pooler`): Use for regular queries - faster, connection pooling
- **DIRECT_URL** (without `-pooler`): Use for migrations - direct connection

## Verify It's Working

1. **Local**: Check that API returns data from database (not sample data)
2. **Vercel**: Visit `https://gundamparadise.vercel.app/api/kits`
3. **Check logs**: No connection errors in Vercel function logs

## Troubleshooting

**"Environment variable not found"**
- Make sure `.env.local` exists (not `.env`)
- Restart dev server after creating `.env.local`

**"Connection refused"**
- Check Neon dashboard - is database running?
- Verify connection string is correct
- Check SSL mode: `?sslmode=require`

**"Schema not found"**
- Run `npm run db:push` to create tables
- Check Prisma Studio: `npm run db:studio`

## Next Steps

1. ✅ Create `.env.local` with DATABASE_URL
2. ✅ Run `npm run db:push` to create tables
3. ✅ Add variables to Vercel
4. ✅ Redeploy on Vercel
5. 🎉 Your app is connected to Neon!

