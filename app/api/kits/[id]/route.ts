import { NextRequest, NextResponse } from 'next/server';
import { edgedb } from '@/lib/edgedb-client';
import { transformObject } from '@/lib/transform';

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

    const kit = await edgedb.querySingle(`
      SELECT Kit {
        id,
        name,
        grade,
        series,
        scale,
        image_url,
        description,
        price_entries: {
          id,
          price,
          recorded_at
        } ORDER BY .recorded_at DESC LIMIT 10,
        store_links: {
          id,
          url,
          is_active,
          store: {
            id,
            name,
            website
          }
        }
      }
      FILTER .id = <uuid>$id
    `, { id });

    if (!kit) {
      return NextResponse.json({ error: 'Kit not found' }, { status: 404 });
    }

    // Calculate price statistics
    const prices = await edgedb.query(`
      SELECT PriceEntry {
        price
      }
      FILTER .kit.id = <uuid>$kitId
    `, { kitId: id });

    const priceValues = prices.map((p: any) => p.price);
    const currentPrice = priceValues[0] || null;
    const averagePrice =
      priceValues.length > 0
        ? priceValues.reduce((sum: number, p: number) => sum + p, 0) / priceValues.length
        : null;
    const minPrice = priceValues.length > 0 ? Math.min(...priceValues) : null;
    const maxPrice = priceValues.length > 0 ? Math.max(...priceValues) : null;

    return NextResponse.json(transformObject({
      ...kit,
      currentPrice,
      averagePrice,
      minPrice,
      maxPrice,
    }));
  } catch (error) {
    console.error('Error fetching kit:', error);
    return NextResponse.json(
      { error: 'Failed to fetch kit' },
      { status: 500 }
    );
  }
}