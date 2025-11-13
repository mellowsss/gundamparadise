# Add Environment Variables to Vercel - Step by Step

## Your EdgeDB Credentials

From your EdgeDB dashboard, you have:
- **EDGEDB_INSTANCE**: `vercel-ubQaaA85poXwmK3TuMqcBWjX/edgedb-indigo-ball`
- **EDGEDB_SECRET_KEY**: `nbwt1_eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJlZGIuZC5hbGwiOnRydWUsImVkYi5pIjpbInZlcmNlbC11YlFhYUE4NXBvWHdtSzNUdU1xY0JXalgvZWRnZWRiLWluZGlnby1iYWxsIl0sImVkYi5yLmFsbCI6dHJ1ZSwiaWF0IjoxNzYzMDcyOTU4LCJpc3MiOiJhd3MuZWRnZWRiLmNsb3VkIiwianRpIjoiTWFxc0lNRGdFZkNGZ0ZlS2RROTBmZyIsInN1YiI6Ik1XUWVwTURnRWZDc01CLUlvZC1UVkEifQ.z_MdO5O6HUG9Ga3Bnmljz4qmXe6651NIQCwQuvq1_aSMgEGChA_950sjo7Qazrl5ZPQlCZpqoPXtDp1fvQHiSw`

## Steps to Add in Vercel

### 1. Go to Environment Variables
Visit: https://vercel.com/mellowsss-projects/gundamparadise/settings/environment-variables

### 2. Add EDGEDB_INSTANCE
1. Click **"Add New"**
2. **Key**: `EDGEDB_INSTANCE`
3. **Value**: `vercel-ubQaaA85poXwmK3TuMqcBWjX/edgedb-indigo-ball`
4. **Environments**: Check ALL three:
   - ✅ Production
   - ✅ Preview
   - ✅ Development
5. Click **"Save"**

### 3. Add EDGEDB_SECRET_KEY
1. Click **"Add New"** again
2. **Key**: `EDGEDB_SECRET_KEY`
3. **Value**: `nbwt1_eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJlZGIuZC5hbGwiOnRydWUsImVkYi5pIjpbInZlcmNlbC11YlFhYUE4NXBvWHdtSzNUdU1xY0JXalgvZWRnZWRiLWluZGlnby1iYWxsIl0sImVkYi5yLmFsbCI6dHJ1ZSwiaWF0IjoxNzYzMDcyOTU4LCJpc3MiOiJhd3MuZWRnZWRiLmNsb3VkIiwianRpIjoiTWFxc0lNRGdFZkNGZ0ZlS2RROTBmZyIsInN1YiI6Ik1XUWVwTURnRWZDc01CLUlvZC1UVkEifQ.z_MdO5O6HUG9Ga3Bnmljz4qmXe6651NIQCwQuvq1_aSMgEGChA_950sjo7Qazrl5ZPQlCZpqoPXtDp1fvQHiSw`
4. **Environments**: Check ALL three:
   - ✅ Production
   - ✅ Preview
   - ✅ Development
5. Click **"Save"**

### 4. Redeploy
After adding the variables, Vercel will automatically redeploy. Or:
1. Go to **Deployments** tab
2. Click **"Redeploy"** on the latest deployment
3. Select **"Use existing Build Cache"** = No (to force fresh build)
4. Click **"Redeploy"**

## ✅ After Adding Variables

1. Wait for deployment to complete (1-2 minutes)
2. Visit: `gundamparadise.vercel.app`
3. The app should load! 🎉

## 🔍 If Still 404

1. Check deployment logs for errors
2. Verify variables are saved correctly
3. Make sure they're added to ALL environments
4. Try clearing cache and redeploying
