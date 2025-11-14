import { NextRequest, NextResponse } from 'next/server';
import { checkDatabase } from '@/lib/db-utils';
import { fetchAllGundams } from '@/lib/gundam-api';

const GUEST_USER_ID = '00000000-0000-0000-0000-000000000000';

export async function GET(request: NextRequest) {
  try {
    const db = checkDatabase();
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const grade = searchParams.get('grade') || '';
    const series = searchParams.get('series') || '';
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    // If database is available, try to use it first
    if (db) {
      try {
        const where: any = {};
        if (search) {
          where.name = { contains: search, mode: 'insensitive' };
        }
        if (grade) {
          where.grade = grade;
        }
        if (series) {
          where.series = series;
        }

        const [kits, total] = await Promise.all([
          db.kit.findMany({
            where,
            take: limit,
            skip: offset,
            orderBy: { name: 'asc' },
            include: {
              storeLinks: {
                include: { store: true },
                where: { isActive: true },
              },
              priceEntries: {
                orderBy: { recordedAt: 'desc' },
                take: 1,
              },
            },
          }),
          db.kit.count({ where }),
        ]);

        // Calculate prices for each kit
        const kitsWithPrices = await Promise.all(
          kits.map(async (kit: any) => {
            const prices = await db.priceEntry.findMany({
              where: { kitId: kit.id },
              orderBy: { recordedAt: 'desc' },
              select: { price: true },
            });

            const priceValues = prices.map((p: any) => p.price);
            const currentPrice = priceValues[0] || null;
            const averagePrice =
              priceValues.length > 0
                ? priceValues.reduce((sum: number, p: number) => sum + p, 0) / priceValues.length
                : null;

            return {
              id: kit.id,
              name: kit.name,
              grade: kit.grade,
              series: kit.series,
              scale: kit.scale,
              imageUrl: kit.imageUrl,
              description: kit.description,
              currentPrice,
              averagePrice,
              storeLinks: kit.storeLinks.map((link: any) => ({
                id: link.id,
                url: link.url,
                store: {
                  id: link.store.id,
                  name: link.store.name,
                  website: link.store.website,
                },
              })),
            };
          })
        );

        // If we have results from database, return them
        if (kitsWithPrices.length > 0) {
          return NextResponse.json({
            kits: kitsWithPrices,
            total,
            limit,
            offset,
          });
        }
      } catch (dbError) {
        console.error('Database error, falling back to API:', dbError);
        // Fall through to API fetch
      }
    }

    // Fetch from Gundam API
    const allKits = await fetchAllGundams(search || undefined, grade || undefined, series || undefined);
    
    // Apply pagination
    const paginatedKits = allKits.slice(offset, offset + limit);

    return NextResponse.json({
      kits: paginatedKits,
      total: allKits.length,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Error fetching kits:', error);
    return NextResponse.json(
      { error: 'Failed to fetch kits', kits: [], total: 0, limit: 20, offset: 0 },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = checkDatabase();
    if (!db) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }

    const body = await request.json();
    const { name, grade, series, scale, releaseDate, imageUrl, description, storeLinks } = body;

    if (!name || !grade) {
      return NextResponse.json(
        { error: 'Name and grade are required' },
        { status: 400 }
      );
    }

    // Create kit
    const kit = await db.kit.create({
      data: {
        name,
        grade,
        series: series || null,
        scale: scale || null,
        releaseDate: releaseDate ? new Date(releaseDate) : null,
        imageUrl: imageUrl || null,
        description: description || null,
      },
    });

    // Create store links if provided
    if (storeLinks && Array.isArray(storeLinks)) {
      for (const link of storeLinks) {
        // Find or create store
        let store = await db.store.findUnique({
          where: { name: link.storeName },
        });

        if (!store) {
          store = await db.store.create({
            data: {
              name: link.storeName,
              website: link.storeWebsite || link.storeName,
            },
          });
        }

        // Create store link
        await db.storeLink.create({
          data: {
            kitId: kit.id,
            storeId: store.id,
            url: link.url,
          },
        });
      }
    }

    return NextResponse.json(kit, { status: 201 });
  } catch (error) {
    console.error('Error creating kit:', error);
    return NextResponse.json(
      { error: 'Failed to create kit' },
      { status: 500 }
    );
  }
}
