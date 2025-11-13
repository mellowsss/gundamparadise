// Quick test script to check EdgeDB connection
// Run: node test-connection.js

const { createClient } = require('edgedb');

async function testConnection() {
  try {
    const client = createClient({
      instance: process.env.EDGEDB_INSTANCE,
      secretKey: process.env.EDGEDB_SECRET_KEY,
    });

    console.log('🔌 Testing EdgeDB connection...\n');

    // Test 1: Basic connection
    const result = await client.querySingle('SELECT 1');
    console.log('✅ Connection test:', result === 1 ? 'SUCCESS' : 'FAILED');

    // Test 2: Check tables exist
    const userCount = await client.querySingle('SELECT count(User)');
    const kitCount = await client.querySingle('SELECT count(Kit)');
    const storeCount = await client.querySingle('SELECT count(Store)');

    console.log('\n📊 Database Tables:');
    console.log(`   Users: ${userCount}`);
    console.log(`   Kits: ${kitCount}`);
    console.log(`   Stores: ${storeCount}`);

    // Test 3: Check schema
    const schema = await client.query(`
      SELECT schema::ObjectType {
        name
      }
      FILTER .name IN {'default::User', 'default::Kit', 'default::Store'}
    `);
    console.log('\n📋 Schema Types Found:', schema.length);

    console.log('\n✅ All tests passed! EdgeDB is connected and working.');
    
    await client.close();
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    process.exit(1);
  }
}

testConnection();
