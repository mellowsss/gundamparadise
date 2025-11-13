# How to Update Existing Environment Variables in Vercel

If Vercel says "you already have one", the variables exist but might have wrong values.

## Steps to Update

### Option 1: Edit Existing Variables

1. Go to: https://vercel.com/mellowsss-projects/gundamparadise/settings/environment-variables
2. Find the variable you want to update (EDGEDB_INSTANCE or EDGEDB_SECRET_KEY)
3. Click the **three dots (⋯)** or **"Edit"** button next to it
4. Update the value
5. Click **"Save"**

### Option 2: Delete and Re-add

1. Go to Environment Variables page
2. Find the variable
3. Click **"Delete"** or the trash icon
4. Click **"Add New"** and add it again with the correct value

### Option 3: Check Current Values

1. Go to Environment Variables page
2. Check what values are currently set
3. If they're wrong, edit them
4. If they're correct, the issue might be elsewhere

## Your Correct Values Should Be:

**EDGEDB_INSTANCE:**
```
vercel-ubQaaA85poXwmK3TuMqcBWjX/edgedb-indigo-ball
```

**EDGEDB_SECRET_KEY:**
```
nbwt1_eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJlZGIuZC5hbGwiOnRydWUsImVkYi5pIjpbInZlcmNlbC11YlFhYUE4NXBvWHdtSzNUdU1xY0JXalgvZWRnZWRiLWluZGlnby1iYWxsIl0sImVkYi5yLmFsbCI6dHJ1ZSwiaWF0IjoxNzYzMDcyOTU4LCJpc3MiOiJhd3MuZWRnZWRiLmNsb3VkIiwianRpIjoiTWFxc0lNRGdFZkNGZ0ZlS2RROTBmZyIsInN1YiI6Ik1XUWVwTURnRWZDc01CLUlvZC1UVkEifQ.z_MdO5O6HUG9Ga3Bnmljz4qmXe6651NIQCwQuvq1_aSMgEGChA_950sjo7Qazrl5ZPQlCZpqoPXtDp1fvQHiSw
```

## After Updating

1. **Redeploy** the project
2. Go to **Deployments** → Click **"Redeploy"**
3. Make sure to uncheck **"Use existing Build Cache"** to force a fresh build
4. Wait for deployment to complete

## If You Can't Edit

- Make sure you have the right permissions
- Try deleting and re-adding
- Check if there are multiple environments (Production/Preview/Development) - you might need to update each one
