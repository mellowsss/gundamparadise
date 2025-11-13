import { PrismaClient } from '@prisma/client';

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
        description: 'The original Mobile Suit Gundam in Master Grade. A highly detailed model kit with excellent articulation and accessories.',
        imageUrl: 'https://images.unsplash.com/photo-1606166188517-4a8c8c8c8c8c?w=800&h=800&fit=crop',
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
        description: 'Real Grade Wing Gundam Zero with incredible detail and poseability in a compact 1/144 scale.',
        imageUrl: 'https://images.unsplash.com/photo-1606166188517-4a8c8c8c8c8c?w=800&h=800&fit=crop',
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
        description: 'Perfect Grade Unicorn Gundam with LED lighting system. The ultimate Gunpla experience with incredible detail.',
        imageUrl: 'https://images.unsplash.com/photo-1606166188517-4a8c8c8c8c8c?w=800&h=800&fit=crop',
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
        description: 'High Grade Barbatos Lupus from Iron-Blooded Orphans. Great value with excellent articulation.',
        imageUrl: 'https://images.unsplash.com/photo-1606166188517-4a8c8c8c8c8c?w=800&h=800&fit=crop',
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
        description: 'Master Grade Freedom Gundam from Gundam SEED. Features full burst mode and detailed inner frame.',
        imageUrl: 'https://images.unsplash.com/photo-1606166188517-4a8c8c8c8c8c?w=800&h=800&fit=crop',
      },
    }),
  ]);

  // Create store links
  const storeLinksData = [
    { kitId: 'kit-1', storeName: 'HobbyLink Japan', url: 'https://www.hlj.com/search/go?w=RX-78-2+Gundam+MG' },
    { kitId: 'kit-1', storeName: 'USA Gundam Store', url: 'https://www.usagundamstore.com/search?q=RX-78-2+MG' },
    { kitId: 'kit-1', storeName: 'BigBadToyStore', url: 'https://www.bigbadtoystore.com/Search?SearchText=RX-78-2+MG' },
    { kitId: 'kit-2', storeName: 'HobbyLink Japan', url: 'https://www.hlj.com/search/go?w=Wing+Gundam+Zero+RG' },
    { kitId: 'kit-2', storeName: 'USA Gundam Store', url: 'https://www.usagundamstore.com/search?q=Wing+Gundam+Zero+RG' },
    { kitId: 'kit-3', storeName: 'HobbyLink Japan', url: 'https://www.hlj.com/search/go?w=Unicorn+Gundam+PG' },
    { kitId: 'kit-3', storeName: 'USA Gundam Store', url: 'https://www.usagundamstore.com/search?q=Unicorn+Gundam+PG' },
    { kitId: 'kit-3', storeName: 'BigBadToyStore', url: 'https://www.bigbadtoystore.com/Search?SearchText=Unicorn+Gundam+PG' },
    { kitId: 'kit-4', storeName: 'HobbyLink Japan', url: 'https://www.hlj.com/search/go?w=Barbatos+Lupus+HG' },
    { kitId: 'kit-4', storeName: 'USA Gundam Store', url: 'https://www.usagundamstore.com/search?q=Barbatos+Lupus+HG' },
    { kitId: 'kit-5', storeName: 'HobbyLink Japan', url: 'https://www.hlj.com/search/go?w=Freedom+Gundam+MG' },
    { kitId: 'kit-5', storeName: 'USA Gundam Store', url: 'https://www.usagundamstore.com/search?q=Freedom+Gundam+MG' },
    { kitId: 'kit-5', storeName: 'BigBadToyStore', url: 'https://www.bigbadtoystore.com/Search?SearchText=Freedom+Gundam+MG' },
  ];

  for (const linkData of storeLinksData) {
    const store = stores.find(s => s.name === linkData.storeName);
    if (store) {
      await prisma.storeLink.upsert({
        where: {
          kitId_storeId: {
            kitId: linkData.kitId,
            storeId: store.id,
          },
        },
        update: {
          url: linkData.url,
        },
        create: {
          kitId: linkData.kitId,
          storeId: store.id,
          url: linkData.url,
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
      
      // Base price by grade
      const basePrice = kit.grade === 'PG' ? 189.99 : 
                       kit.grade === 'MG' ? 45.99 : 
                       kit.grade === 'RG' ? 28.99 : 18.99;
      const price = basePrice + (Math.random() * 5 - 2.5);
      
      const randomStore = stores[Math.floor(Math.random() * stores.length)];
      
      await prisma.priceEntry.create({
        data: {
          kitId: kit.id,
          storeId: randomStore.id,
          price: Math.round(price * 100) / 100,
          recordedAt: date,
          inStock: Math.random() > 0.3,
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
