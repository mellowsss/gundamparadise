import { NextRequest, NextResponse } from 'next/server';
import { checkEdgeDB } from '@/lib/edgedb-utils';
import { transformObject } from '@/lib/transform';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const edgedb = checkEdgeDB();
    if (!edgedb) {
      return NextResponse.json([]);
    }

    const resolvedParams = await params;
    const { id } = resolvedParams;
    const days = parseInt(request.nextUrl.searchParams.get('days') || '30');

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const priceEntries = await edgedb.query(`
      SELECT PriceEntry {
        id,
        price,
        currency,
        in_stock,
        recorded_at
      }
      FILTER .kit.id = <uuid>$kitId
        AND .recorded_at >= <datetime>$startDate
      ORDER BY .recorded_at ASC
    `, {
      kitId: id,
      startDate: startDate.toISOString(),
    });

    return NextResponse.json(transformObject(priceEntries));
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

    const edgedb = checkEdgeDB();
    if (!edgedb) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }

    const priceEntry = await edgedb.querySingle(`
      INSERT PriceEntry {
        kit := (SELECT Kit FILTER .id = <uuid>$kitId),
        store := (SELECT Store FILTER .id = <uuid>$storeId) IF <bool>$hasStore ELSE <Store>{},
        price := <float64>$price,
        currency := <str>$currency,
        in_stock := <bool>$inStock
      }
    `, {
      kitId: id,
      storeId: storeId || null,
      hasStore: !!storeId,
      price: parseFloat(price),
      currency,
      inStock,
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