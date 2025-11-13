import { NextRequest, NextResponse } from 'next/server';
import { getKitById } from '@/lib/storage';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const kit = getKitById(id);

    if (!kit) {
      return NextResponse.json({ error: 'Kit not found' }, { status: 404 });
    }

    // Generate mock price history
    const days = parseInt(request.nextUrl.searchParams.get('days') || '30');
    const priceEntries = [];
    const now = new Date();
    
    for (let i = 0; i < days; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const price = kit.currentPrice + (Math.random() * 5 - 2.5);
      
      priceEntries.push({
        id: `price-${i}`,
        kitId: id,
        price: Math.round(price * 100) / 100,
        recordedAt: date.toISOString(),
        inStock: Math.random() > 0.3,
      });
    }

    return NextResponse.json(priceEntries.reverse());
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
  // Price entry creation not supported without database
  return NextResponse.json(
    { error: 'Price entry creation not available without database' },
    { status: 501 }
  );
}