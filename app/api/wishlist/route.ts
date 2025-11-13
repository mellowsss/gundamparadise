import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma-client';

// For now, using a guest user ID. In production, this would come from authentication
const GUEST_USER_ID = 'guest-user-id';

export async function GET(request: NextRequest) {
  try {
    // Get or create guest user
    let user = await prisma.user.findUnique({
      where: { id: GUEST_USER_ID },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { id: GUEST_USER_ID },
      });
    }

    const wishlistItems = await prisma.wishlistItem.findMany({
      where: { userId: user.id },
      include: {
        kit: {
          include: {
            priceEntries: {
              orderBy: { recordedAt: 'desc' },
              take: 1,
            },
          },
        },
      },
      orderBy: { addedAt: 'desc' },
    });

    // Calculate current prices
    const itemsWithPrices = await Promise.all(
      wishlistItems.map(async (item) => {
        const prices = await prisma.priceEntry.findMany({
          where: { kitId: item.kitId },
          orderBy: { recordedAt: 'desc' },
        });

        const currentPrice = prices[0]?.price || null;
        const averagePrice =
          prices.length > 0
            ? prices.reduce((sum, p) => sum + p.price, 0) / prices.length
            : null;

        return {
          ...item,
          kit: {
            ...item.kit,
            currentPrice,
            averagePrice,
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
    const body = await request.json();
    const { kitId, targetPrice, notes } = body;

    if (!kitId) {
      return NextResponse.json(
        { error: 'Kit ID is required' },
        { status: 400 }
      );
    }

    // Get or create guest user
    let user = await prisma.user.findUnique({
      where: { id: GUEST_USER_ID },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { id: GUEST_USER_ID },
      });
    }

    const wishlistItem = await prisma.wishlistItem.upsert({
      where: {
        userId_kitId: {
          userId: user.id,
          kitId,
        },
      },
      update: {
        targetPrice: targetPrice ? parseFloat(targetPrice) : null,
        notes,
      },
      create: {
        userId: user.id,
        kitId,
        targetPrice: targetPrice ? parseFloat(targetPrice) : null,
        notes,
      },
    });

    return NextResponse.json(wishlistItem, { status: 201 });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    return NextResponse.json(
      { error: 'Failed to add to wishlist' },
      { status: 500 }
    );
  }
}
