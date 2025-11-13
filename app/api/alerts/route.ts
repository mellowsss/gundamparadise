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

    const alerts = await prisma.priceAlert.findMany({
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
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(alerts);
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
    const body = await request.json();
    const { kitId, targetPrice, alertType = 'price_drop' } = body;

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

    const alert = await prisma.priceAlert.create({
      data: {
        userId: user.id,
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
