import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma-client';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const kit = await prisma.kit.findUnique({
      where: { id },
      include: {
        priceEntries: {
          orderBy: { recordedAt: 'desc' },
          include: {
            kit: {
              select: { name: true },
            },
          },
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
    const prices = kit.priceEntries.map((pe) => pe.price);
    const currentPrice = prices[0] || null;
    const averagePrice =
      prices.length > 0
        ? prices.reduce((sum, p) => sum + p, 0) / prices.length
        : null;
    const minPrice = prices.length > 0 ? Math.min(...prices) : null;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : null;

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
