import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma-client';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const grade = searchParams.get('grade') || '';
    const series = searchParams.get('series') || '';
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    const where: any = {};
    
    if (search) {
      where.name = {
        contains: search,
        mode: 'insensitive',
      };
    }
    
    if (grade) {
      where.grade = grade;
    }
    
    if (series) {
      where.series = series;
    }

    const [kits, total] = await Promise.all([
      prisma.kit.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: { name: 'asc' },
        include: {
          priceEntries: {
            orderBy: { recordedAt: 'desc' },
            take: 1,
          },
          storeLinks: {
            include: {
              store: true,
            },
          },
        },
      }),
      prisma.kit.count({ where }),
    ]);

    // Calculate current price and average price for each kit
    const kitsWithPrices = await Promise.all(
      kits.map(async (kit) => {
        const prices = await prisma.priceEntry.findMany({
          where: { kitId: kit.id },
          orderBy: { recordedAt: 'desc' },
        });

        const currentPrice = prices[0]?.price || null;
        const averagePrice =
          prices.length > 0
            ? prices.reduce((sum, p) => sum + p.price, 0) / prices.length
            : null;

        return {
          ...kit,
          currentPrice,
          averagePrice,
          priceCount: prices.length,
        };
      })
    );

    return NextResponse.json({
      kits: kitsWithPrices,
      total,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Error fetching kits:', error);
    return NextResponse.json(
      { error: 'Failed to fetch kits' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, grade, series, scale, releaseDate, imageUrl, description, storeLinks } = body;

    if (!name || !grade) {
      return NextResponse.json(
        { error: 'Name and grade are required' },
        { status: 400 }
      );
    }

    const kit = await prisma.kit.create({
      data: {
        name,
        grade,
        series,
        scale,
        releaseDate: releaseDate ? new Date(releaseDate) : null,
        imageUrl,
        description,
      },
    });

    // Create store links if provided
    if (storeLinks && Array.isArray(storeLinks)) {
      for (const link of storeLinks) {
        // Find or create store
        let store = await prisma.store.findUnique({
          where: { name: link.storeName },
        });

        if (!store) {
          store = await prisma.store.create({
            data: {
              name: link.storeName,
              website: link.storeWebsite || link.storeName,
            },
          });
        }

        // Create store link
        await prisma.storeLink.create({
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