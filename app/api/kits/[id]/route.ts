import { NextRequest, NextResponse } from 'next/server';
import { checkDatabase } from '@/lib/db-utils';

export async function GET(
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
    
    if (!id) {
      return NextResponse.json({ error: 'Kit ID is required' }, { status: 400 });
    }

    const kit = await db.kit.findUnique({
      where: { id },
      include: {
        priceEntries: {
          orderBy: { recordedAt: 'desc' },
          take: 10,
        },
        storeLinks: {
          include: { store: true },
          where: { isActive: true },
        },
      },
    });

    if (!kit) {
      return NextResponse.json({ error: 'Kit not found' }, { status: 404 });
    }

    // Calculate price statistics
    const prices = await db.priceEntry.findMany({
      where: { kitId: id },
      select: { price: true },
    });

    const priceValues = prices.map((p: any) => p.price);
    const currentPrice = priceValues[0] || null;
    const averagePrice =
      priceValues.length > 0
        ? priceValues.reduce((sum: number, p: number) => sum + p, 0) / priceValues.length
        : null;
    const minPrice = priceValues.length > 0 ? Math.min(...priceValues) : null;
    const maxPrice = priceValues.length > 0 ? Math.max(...priceValues) : null;

    return NextResponse.json({
      id: kit.id,
      name: kit.name,
      grade: kit.grade,
      series: kit.series,
      scale: kit.scale,
      imageUrl: kit.imageUrl,
      description: kit.description,
      currentPrice,
      averagePrice,
      minPrice,
      maxPrice,
      priceEntries: kit.priceEntries.map((entry: any) => ({
        id: entry.id,
        price: entry.price,
        recordedAt: entry.recordedAt,
      })),
      storeLinks: kit.storeLinks.map((link: any) => ({
        id: link.id,
        url: link.url,
        isActive: link.isActive,
        store: {
          id: link.store.id,
          name: link.store.name,
          website: link.store.website,
        },
      })),
    });
  } catch (error) {
    console.error('Error fetching kit:', error);
    return NextResponse.json(
      { error: 'Failed to fetch kit' },
      { status: 500 }
    );
  }
}
