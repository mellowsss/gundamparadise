import { NextRequest, NextResponse } from 'next/server';
import { checkDatabase } from '@/lib/db-utils';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const db = checkDatabase();
    if (!db) {
      return NextResponse.json([]);
    }

    const resolvedParams = await params;
    const { id } = resolvedParams;
    const days = parseInt(request.nextUrl.searchParams.get('days') || '30');

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const priceEntries = await db.priceEntry.findMany({
      where: {
        kitId: id,
        recordedAt: { gte: startDate },
      },
      orderBy: { recordedAt: 'asc' },
      select: {
        id: true,
        price: true,
        currency: true,
        inStock: true,
        recordedAt: true,
      },
    });

    return NextResponse.json(priceEntries);
  } catch (error) {
    console.error('Error fetching price history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch price history' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const db = checkDatabase();
    if (!db) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }

    const resolvedParams = await params;
    const { id } = resolvedParams;
    const body = await request.json();
    const { price, storeId, currency = 'USD', inStock = true } = body;

    if (!price) {
      return NextResponse.json(
        { error: 'Price is required' },
        { status: 400 }
      );
    }

    const priceEntry = await db.priceEntry.create({
      data: {
        kitId: id,
        storeId: storeId || null,
        price: parseFloat(price),
        currency,
        inStock,
      },
    });

    return NextResponse.json(priceEntry, { status: 201 });
  } catch (error) {
    console.error('Error creating price entry:', error);
    return NextResponse.json(
      { error: 'Failed to create price entry' },
      { status: 500 }
    );
  }
}
