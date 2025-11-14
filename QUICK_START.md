# 🚀 Quick Start - Your Database is Ready!

## ✅ Database Status

Your Neon database is **fully set up and ready to use**!

- ✅ Schema pushed to database
- ✅ All tables created
- ✅ Connection tested and working

## Local Development

### 1. Create `.env.local` file

Create this file in your project root:

```env
DATABASE_URL="postgresql://neondb_owner:npg_Scfnkp69xAOz@ep-weathered-voice-a4gehxi1-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"
```

### 2. Start the app

```bash
npm run dev
```

Visit: `http://localhost:3000/search`

The app will now use your Neon database!

## Vercel Deployment

### Add Environment Variables

1. Go to: https://vercel.com/mellowsss-projects/gundamparadise/settings/environment-variables

2. Add **DATABASE_URL**:
   ```
   postgresql://neondb_owner:npg_Scfnkp69xAOz@ep-weathered-voice-a4gehxi1-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```

3. Set for: **Production**, **Preview**, **Development**

4. Click **Save**

5. **Redeploy** your project

## Test Your Database

### Option 1: Prisma Studio (Visual Database Browser)

```bash
DATABASE_URL="postgresql://neondb_owner:npg_Scfnkp69xAOz@ep-weathered-voice-a4gehxi1-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require" npx prisma studio
```

Opens at: `http://localhost:5555`

### Option 2: Test API

```bash
# Start dev server
npm run dev

# In another terminal, test the API
curl http://localhost:3000/api/kits
```

## What's Ready

- ✅ **User** table - for guest users
- ✅ **Kit** table - for Gundam kits
- ✅ **Store** table - for store information
- ✅ **StoreLink** table - links between kits and stores
- ✅ **PriceEntry** table - price history tracking
- ✅ **WishlistItem** table - user wishlists
- ✅ **CollectionItem** table - user collections
- ✅ **PriceAlert** table - price alerts

## Next Steps

1. **Add some kits** - Use the API or Prisma Studio
2. **Test the app** - Everything should work with real data
3. **Deploy to Vercel** - Add the environment variable and redeploy

## Troubleshooting

**"Cannot connect to database"**
- Check `.env.local` exists and has correct DATABASE_URL
- Restart dev server after creating `.env.local`

**"Table does not exist"**
- Run: `npm run db:push` to sync schema

**"Sample data showing instead of database"**
- Check DATABASE_URL is set correctly
- Check database is accessible (try Prisma Studio)

Your database is ready to go! 🎉

