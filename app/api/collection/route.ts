import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma-client';

const GUEST_USER_ID = 'guest-user-id';

export async function GET(request: NextRequest) {
  try {
    let user = await prisma.user.findUnique({
      where: { id: GUEST_USER_ID },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { id: GUEST_USER_ID },
      });
    }

    const collectionItems = await prisma.collectionItem.findMany({
      where: { userId: user.id },
      include: {
        kit: {
          include: {
            storeLinks: {
              include: {
                store: true,
              },
            },
          },
        },
      },
      orderBy: { addedAt: 'desc' },
    });

    return NextResponse.json(collectionItems);
  } catch (error) {
    console.error('Error fetching collection:', error);
    return NextResponse.json(
      { error: 'Failed to fetch collection' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { kitId, purchasePrice, purchaseDate, notes } = body;

    if (!kitId) {
      return NextResponse.json(
        { error: 'Kit ID is required' },
        { status: 400 }
      );
    }

    let user = await prisma.user.findUnique({
      where: { id: GUEST_USER_ID },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { id: GUEST_USER_ID },
      });
    }

    const collectionItem = await prisma.collectionItem.upsert({
      where: {
        userId_kitId: {
          userId: user.id,
          kitId,
        },
      },
      update: {
        purchasePrice: purchasePrice ? parseFloat(purchasePrice) : null,
        purchaseDate: purchaseDate ? new Date(purchaseDate) : null,
        notes,
      },
      create: {
        userId: user.id,
        kitId,
        purchasePrice: purchasePrice ? parseFloat(purchasePrice) : null,
        purchaseDate: purchaseDate ? new Date(purchaseDate) : null,
        notes,
      },
    });

    return NextResponse.json(collectionItem, { status: 201 });
  } catch (error) {
    console.error('Error adding to collection:', error);
    return NextResponse.json(
      { error: 'Failed to add to collection' },
      { status: 500 }
    );
  }
}