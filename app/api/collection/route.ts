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

    const collectionItems = await db.collectionItem.findMany({
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

    return NextResponse.json(
      collectionItems.map((item: any) => ({
        id: item.id,
        purchasePrice: item.purchasePrice,
        purchaseDate: item.purchaseDate,
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
          storeLinks: item.kit.storeLinks.map((link: any) => ({
            id: link.id,
            url: link.url,
            store: {
              id: link.store.id,
              name: link.store.name,
              website: link.store.website,
            },
          })),
        },
      }))
    );
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
    const db = checkDatabase();
    if (!db) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }

    const body = await request.json();
    const { kitId, purchasePrice, purchaseDate, notes } = body;

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
    const existing = await db.collectionItem.findUnique({
      where: {
        userId_kitId: {
          userId: GUEST_USER_ID,
          kitId,
        },
      },
    });

    let collectionItem;
    if (existing) {
      collectionItem = await db.collectionItem.update({
        where: { id: existing.id },
        data: {
          purchasePrice: purchasePrice ? parseFloat(purchasePrice) : null,
          purchaseDate: purchaseDate ? new Date(purchaseDate) : null,
          notes: notes || null,
        },
      });
    } else {
      collectionItem = await db.collectionItem.create({
        data: {
          userId: GUEST_USER_ID,
          kitId,
          purchasePrice: purchasePrice ? parseFloat(purchasePrice) : null,
          purchaseDate: purchaseDate ? new Date(purchaseDate) : null,
          notes: notes || null,
        },
      });
    }

    return NextResponse.json(collectionItem, { status: 201 });
  } catch (error) {
    console.error('Error adding to collection:', error);
    return NextResponse.json(
      { error: 'Failed to add to collection' },
      { status: 500 }
    );
  }
}
