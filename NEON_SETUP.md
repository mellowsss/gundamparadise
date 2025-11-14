# Neon Database Setup Guide

## ✅ Migration Complete!

Your app has been migrated from EdgeDB to **Neon (PostgreSQL)** with Prisma.

## What Changed

1. ✅ Removed EdgeDB dependencies
2. ✅ Updated all API routes to use Prisma
3. ✅ Created Prisma client utility
4. ✅ Updated build scripts
5. ✅ Sample data still works as fallback

## Setup Steps

### 1. Create Neon Database

1. Go to: https://neon.tech
2. Sign up / Log in
3. Create a new project
4. Copy your connection string

### 2. Set Environment Variables

**Local (.env.local):**
```env
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
DIRECT_URL="postgresql://user:password@host/database?sslmode=require"
```

**Vercel:**
1. Go to: https://vercel.com/mellowsss-projects/gundamparadise/settings/environment-variables
2. Add:
   - `DATABASE_URL` = Your Neon connection string
   - `DIRECT_URL` = Same as DATABASE_URL (for migrations)

### 3. Run Migrations

```bash
# Generate Prisma Client
npm run postinstall

# Push schema to database
npm run db:push

# Or create migration
npm run db:migrate
```

### 4. Seed Database (Optional)

```bash
npm run db:seed
```

## Prisma Commands

- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Create migration
- `npm run db:studio` - Open Prisma Studio (database GUI)

## Fallback Behavior

- If `DATABASE_URL` is not set, the app uses sample data
- All API routes gracefully fall back to sample data
- No errors or crashes - app works without database!

## Notes

- Neon is serverless PostgreSQL - perfect for Vercel
- Connection pooling is handled automatically
- No need for `DIRECT_URL` if you're not using migrations
- The app works immediately with sample data until you set up Neon

## Troubleshooting

**Build fails:**
- Make sure `prisma generate` runs (it's in `postinstall` script)
- Check that Prisma Client is generated: `node_modules/.prisma/client`

**Connection errors:**
- Verify `DATABASE_URL` is correct
- Check Neon dashboard - is database running?
- Ensure SSL mode is set: `?sslmode=require`

**Migration errors:**
- Use `db:push` for development (faster)
- Use `db:migrate` for production (better version control)

