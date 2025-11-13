import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma-client';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    
    if (!id) {
      return NextResponse.json({ error: 'Kit ID is required' }, { status: 400 });
    }

    const kit = await prisma.kit.findUnique({
      where: { id },
      include: {
        priceEntries: {
          orderBy: { recordedAt: 'desc' },
          take: 10,
        },
        storeLinks: {
          include: {
            store: true,
          },
        },
      },
    });

    if (!kit) {
      return NextResponse.json({ error: 'Kit not found' }, { status: 404 });
    }

    // Calculate price statistics
    const prices = await prisma.priceEntry.findMany({
      where: { kitId: kit.id },
    });

    const priceValues = prices.map((pe) => pe.price);
    const currentPrice = priceValues[0] || null;
    const averagePrice =
      priceValues.length > 0
        ? priceValues.reduce((sum, p) => sum + p, 0) / priceValues.length
        : null;
    const minPrice = priceValues.length > 0 ? Math.min(...priceValues) : null;
    const maxPrice = priceValues.length > 0 ? Math.max(...priceValues) : null;

    return NextResponse.json({
      ...kit,
      currentPrice,
      averagePrice,
      minPrice,
      maxPrice,
    });
  } catch (error) {
    console.error('Error fetching kit:', error);
    return NextResponse.json(
      { error: 'Failed to fetch kit' },
      { status: 500 }
    );
  }
}