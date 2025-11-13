# EdgeDB Connection Guide

## ✅ Successfully Connected!

Your EdgeDB instance is connected and working. Here's what we did:

1. ✅ Installed Gel (EdgeDB CLI)
2. ✅ Linked to instance: `vercel-ubQaaA85poXwmK3TuMqcBWjX/edgedb-indigo-ball`
3. ✅ Tested connection - it works!

## Using Gel CLI

To connect to your database, run:

```bash
source "/Users/yousif/Library/Application Support/edgedb/env"
export EDGEDB_INSTANCE="vercel-ubQaaA85poXwmK3TuMqcBWjX/edgedb-indigo-ball"
export EDGEDB_SECRET_KEY="nbwt1_eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9..."
gel query "SELECT 1"
```

Or use the linked instance name:
```bash
gel -I gundamparadise query "SELECT 1"
```

## Deploy Schema

The schema is in `dbschema/schema.esdl`. To deploy it:

```bash
source "/Users/yousif/Library/Application Support/edgedb/env"
export EDGEDB_INSTANCE="vercel-ubQaaA85poXwmK3TuMqcBWjX/edgedb-indigo-ball"
export EDGEDB_SECRET_KEY="nbwt1_eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9..."
gel migration create
gel migrate
```

## Next Steps

1. Deploy the schema to create all tables
2. Add environment variables to Vercel
3. Deploy your app!

Your app is ready to use EdgeDB! 🎉
