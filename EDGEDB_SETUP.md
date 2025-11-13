# EdgeDB Setup for Vercel

## Environment Variables

Add these to Vercel:

1. Go to: https://vercel.com/mellowsss-projects/gundamparadise
2. Go to **Settings** → **Environment Variables**
3. Add these variables:

### EDGEDB_INSTANCE
- **Key**: `EDGEDB_INSTANCE`
- **Value**: `vercel-ubQaaA85poXwmK3TuMqcBWjX/edgedb-indigo-ball`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

### EDGEDB_SECRET_KEY
- **Key**: `EDGEDB_SECRET_KEY`
- **Value**: `nbwt1_eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJlZGIuZC5hbGwiOnRydWUsImVkYi5pIjpbInZlcmNlbC11YlFhYUE4NXBvWHdtSzNUdU1xY0JXalgvZWRnZWRiLWluZGlnby1iYWxsIl0sImVkYi5yLmFsbCI6dHJ1ZSwiaWF0IjoxNzYzMDcyOTU4LCJpc3MiOiJhd3MuZWRnZWRiLmNsb3VkIiwianRpIjoiTWFxc0lNRGdFZkNGZ0ZlS2RROTBmZyIsInN1YiI6Ik1XUWVwTURnRWZDc01CLUlvZC1UVkEifQ.z_MdO5O6HUG9Ga3Bnmljz4qmXe6651NIQCwQuvq1_aSMgEGChA_950sjo7Qazrl5ZPQlCZpqoPXtDp1fvQHiSw`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

## EdgeDB Connection

EdgeDB automatically uses these environment variables when you create a client. The client will connect to your EdgeDB instance.

## Next Steps

1. Deploy schema: `edgedb migration create` and `edgedb migrate`
2. Update API routes to use EdgeDB instead of Prisma
3. Deploy to Vercel

## Note

EdgeDB uses a different query language (EdgeQL) than Prisma. You'll need to update your API routes to use EdgeDB queries instead of Prisma queries.
