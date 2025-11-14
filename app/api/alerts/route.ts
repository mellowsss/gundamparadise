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

    const alerts = await db.priceAlert.findMany({
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
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(
      alerts.map((alert) => ({
        id: alert.id,
        targetPrice: alert.targetPrice,
        alertType: alert.alertType,
        isActive: alert.isActive,
        createdAt: alert.createdAt,
        triggeredAt: alert.triggeredAt,
        kit: {
          id: alert.kit.id,
          name: alert.kit.name,
          grade: alert.kit.grade,
          series: alert.kit.series,
          scale: alert.kit.scale,
          imageUrl: alert.kit.imageUrl,
          description: alert.kit.description,
          storeLinks: alert.kit.storeLinks.map((link) => ({
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
    console.error('Error fetching alerts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch alerts' },
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
    const { kitId, targetPrice, alertType = 'price_drop' } = body;

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

    const alert = await db.priceAlert.create({
      data: {
        userId: GUEST_USER_ID,
        kitId,
        targetPrice: targetPrice ? parseFloat(targetPrice) : null,
        alertType,
      },
    });

    return NextResponse.json(alert, { status: 201 });
  } catch (error) {
    console.error('Error creating alert:', error);
    return NextResponse.json(
      { error: 'Failed to create alert' },
      { status: 500 }
    );
  }
}
