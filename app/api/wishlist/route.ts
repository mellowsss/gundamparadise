import { NextRequest, NextResponse } from 'next/server';
import { checkDatabase } from '@/lib/db-utils';

const GUEST_USER_ID = '00000000-0000-0000-0000-000000000000';

export async function GET(request: NextRequest) {
  try {
    const db = checkDatabase();
    if (!db) {
      return NextResponse.json([]);
    }

    // Get or create guest user
    let user = await db.user.findUnique({
      where: { id: GUEST_USER_ID },
    });

    if (!user) {
      user = await db.user.create({
        data: { id: GUEST_USER_ID },
      });
    }

    const wishlistItems = await db.wishlistItem.findMany({
      where: { userId: GUEST_USER_ID },
      include: {
        kit: {
          include: {
            storeLinks: {
              include: { store: true },
              where: { isActive: true },
            },
          },
        },
      },
      orderBy: { addedAt: 'desc' },
    });

    // Calculate current prices
    const itemsWithPrices = await Promise.all(
      wishlistItems.map(async (item) => {
        const prices = await db.priceEntry.findMany({
          where: { kitId: item.kitId },
          orderBy: { recordedAt: 'desc' },
          select: { price: true },
        });

        const priceValues = prices.map((p) => p.price);
        const currentPrice = priceValues[0] || null;
        const averagePrice =
          priceValues.length > 0
            ? priceValues.reduce((sum, p) => sum + p, 0) / priceValues.length
            : null;

        return {
          id: item.id,
          targetPrice: item.targetPrice,
          notes: item.notes,
          addedAt: item.addedAt,
          kit: {
            id: item.kit.id,
            name: item.kit.name,
            grade: item.kit.grade,
            series: item.kit.series,
            scale: item.kit.scale,
            imageUrl: item.kit.imageUrl,
            description: item.kit.description,
            currentPrice,
            averagePrice,
            storeLinks: item.kit.storeLinks.map((link) => ({
              id: link.id,
              url: link.url,
              store: {
                id: link.store.id,
                name: link.store.name,
                website: link.store.website,
              },
            })),
          },
        };
      })
    );

    return NextResponse.json(itemsWithPrices);
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    return NextResponse.json(
      { error: 'Failed to fetch wishlist' },
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
    const { kitId, targetPrice, notes } = body;

    if (!kitId) {
      return NextResponse.json(
        { error: 'Kit ID is required' },
        { status: 400 }
      );
    }

    // Get or create guest user
    let user = await db.user.findUnique({
      where: { id: GUEST_USER_ID },
    });

    if (!user) {
      user = await db.user.create({
        data: { id: GUEST_USER_ID },
      });
    }

    // Check if item already exists
    const existing = await db.wishlistItem.findUnique({
      where: {
        userId_kitId: {
          userId: GUEST_USER_ID,
          kitId,
        },
      },
    });

    let wishlistItem;
    if (existing) {
      wishlistItem = await db.wishlistItem.update({
        where: { id: existing.id },
        data: {
          targetPrice: targetPrice ? parseFloat(targetPrice) : null,
          notes: notes || null,
        },
      });
    } else {
      wishlistItem = await db.wishlistItem.create({
        data: {
          userId: GUEST_USER_ID,
          kitId,
          targetPrice: targetPrice ? parseFloat(targetPrice) : null,
          notes: notes || null,
        },
      });
    }

    return NextResponse.json(wishlistItem, { status: 201 });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    return NextResponse.json(
      { error: 'Failed to add to wishlist' },
      { status: 500 }
    );
  }
}
