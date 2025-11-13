const { PrismaClient } = require('../node_modules/.prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create stores
  const stores = await Promise.all([
    prisma.store.upsert({
      where: { name: 'HobbyLink Japan' },
      update: {},
      create: {
        name: 'HobbyLink Japan',
        website: 'https://www.hlj.com',
      },
    }),
    prisma.store.upsert({
      where: { name: 'USA Gundam Store' },
      update: {},
      create: {
        name: 'USA Gundam Store',
        website: 'https://www.usagundamstore.com',
      },
    }),
    prisma.store.upsert({
      where: { name: 'BigBadToyStore' },
      update: {},
      create: {
        name: 'BigBadToyStore',
        website: 'https://www.bigbadtoystore.com',
      },
    }),
  ]);

  // Create sample kits
  const kits = await Promise.all([
    prisma.kit.upsert({
      where: { id: 'kit-1' },
      update: {},
      create: {
        id: 'kit-1',
        name: 'RX-78-2 Gundam',
        grade: 'MG',
        series: 'UC',
        scale: '1/100',
        description: 'The original Mobile Suit Gundam in Master Grade',
      },
    }),
    prisma.kit.upsert({
      where: { id: 'kit-2' },
      update: {},
      create: {
        id: 'kit-2',
        name: 'Wing Gundam Zero',
        grade: 'RG',
        series: 'Wing',
        scale: '1/144',
        description: 'Real Grade Wing Gundam Zero',
      },
    }),
    prisma.kit.upsert({
      where: { id: 'kit-3' },
      update: {},
      create: {
        id: 'kit-3',
        name: 'Unicorn Gundam',
        grade: 'PG',
        series: 'UC',
        scale: '1/60',
        description: 'Perfect Grade Unicorn Gundam with LED',
      },
    }),
    prisma.kit.upsert({
      where: { id: 'kit-4' },
      update: {},
      create: {
        id: 'kit-4',
        name: 'Barbatos Lupus',
        grade: 'HG',
        series: 'IBO',
        scale: '1/144',
        description: 'High Grade Barbatos Lupus from Iron-Blooded Orphans',
      },
    }),
    prisma.kit.upsert({
      where: { id: 'kit-5' },
      update: {},
      create: {
        id: 'kit-5',
        name: 'Freedom Gundam',
        grade: 'MG',
        series: 'SEED',
        scale: '1/100',
        description: 'Master Grade Freedom Gundam',
      },
    }),
  ]);

  // Create store links
  for (const kit of kits) {
    for (const store of stores) {
      await prisma.storeLink.upsert({
        where: {
          kitId_storeId: {
            kitId: kit.id,
            storeId: store.id,
          },
        },
        update: {},
        create: {
          kitId: kit.id,
          storeId: store.id,
          url: `${store.website}/products/${kit.id}`,
        },
      });
    }
  }

  // Create sample price entries
  const now = new Date();
  for (const kit of kits) {
    // Create price history for the last 30 days
    for (let i = 0; i < 30; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      // Random price between $20 and $200
      const basePrice = kit.grade === 'PG' ? 150 : kit.grade === 'MG' ? 50 : kit.grade === 'RG' ? 30 : 20;
      const price = basePrice + (Math.random() * 20 - 10);
      
      await prisma.priceEntry.create({
        data: {
          kitId: kit.id,
          storeId: stores[Math.floor(Math.random() * stores.length)].id,
          price: Math.round(price * 100) / 100,
          recordedAt: date,
          inStock: Math.random() > 0.3, // 70% chance of being in stock
        },
      });
    }
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
