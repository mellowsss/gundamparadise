import { NextRequest, NextResponse } from 'next/server';
import { checkEdgeDB } from '@/lib/edgedb-utils';
import { transformObject } from '@/lib/transform';

export async function GET(request: NextRequest) {
  try {
    const edgedb = checkEdgeDB();
    if (!edgedb) {
      return NextResponse.json({
        kits: [],
        total: 0,
        limit: 20,
        offset: 0,
      });
    }

    // Try to test connection first
    try {
      await edgedb.query('SELECT 1');
    } catch (connError) {
      console.warn('EdgeDB connection test failed:', connError);
      // Return empty result instead of crashing
      return NextResponse.json({
        kits: [],
        total: 0,
        limit: 20,
        offset: 0,
      });
    }

    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const grade = searchParams.get('grade') || '';
    const series = searchParams.get('series') || '';
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build EdgeQL query
    let query = `
      SELECT Kit {
        id,
        name,
        grade,
        series,
        scale,
        image_url,
        description,
        price_entries: {
          price,
          recorded_at
        } ORDER BY .recorded_at DESC LIMIT 1,
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
    `;

    const filters: string[] = [];
    if (search) {
      filters.push(`.name ILIKE '%${search}%'`);
    }
    if (grade) {
      filters.push(`.grade = '${grade}'`);
    }
    if (series) {
      filters.push(`.series = '${series}'`);
    }

    if (filters.length > 0) {
      query += ` FILTER ${filters.join(' AND ')}`;
    }

    query += ` ORDER BY .name ASC LIMIT ${limit} OFFSET ${offset}`;

    const kits = await edgedb.query(query);

    // Get total count
    let countQuery = `SELECT count(Kit)`;
    if (filters.length > 0) {
      countQuery += ` FILTER ${filters.join(' AND ')}`;
    }
    const total = await edgedb.querySingle(countQuery);

    // Calculate prices for each kit
    const kitsWithPrices = await Promise.all(
      kits.map(async (kit: any) => {
        const prices = await edgedb.query(`
          SELECT PriceEntry {
            price
          }
          FILTER .kit.id = <uuid>'${kit.id}'
          ORDER BY .recorded_at DESC
        `);

        const priceValues = prices.map((p: any) => p.price);
        const currentPrice = priceValues[0] || null;
        const averagePrice =
          priceValues.length > 0
            ? priceValues.reduce((sum: number, p: number) => sum + p, 0) / priceValues.length
            : null;

        return {
          ...kit,
          currentPrice,
          averagePrice,
          priceCount: priceValues.length,
        };
      })
    );

    return NextResponse.json({
      kits: transformObject(kitsWithPrices),
      total: Number(total),
      limit,
      offset,
    });
  } catch (error) {
    console.error('Error fetching kits:', error);
    return NextResponse.json(
      { error: 'Failed to fetch kits' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const edgedb = checkEdgeDB();
    if (!edgedb) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }

    const body = await request.json();
    const { name, grade, series, scale, releaseDate, imageUrl, description, storeLinks } = body;

    if (!name || !grade) {
      return NextResponse.json(
        { error: 'Name and grade are required' },
        { status: 400 }
      );
    }

    // Create kit
    const kit = await edgedb.querySingle(`
      INSERT Kit {
        name := <str>$name,
        grade := <str>$grade,
        series := <optional str>$series,
        scale := <optional str>$scale,
        release_date := <optional datetime>$releaseDate,
        image_url := <optional str>$imageUrl,
        description := <optional str>$description
      }
    `, {
      name,
      grade,
      series: series || null,
      scale: scale || null,
      releaseDate: releaseDate ? new Date(releaseDate) : null,
      imageUrl: imageUrl || null,
      description: description || null,
    });

    // Create store links if provided
    if (storeLinks && Array.isArray(storeLinks)) {
      const kitResult = kit as { id: string };
      for (const link of storeLinks) {
        // Find or create store
        let store = await edgedb.querySingle(`
          SELECT Store FILTER .name = <str>$name
        `, { name: link.storeName });

        if (!store) {
          store = await edgedb.querySingle(`
            INSERT Store {
              name := <str>$name,
              website := <str>$website
            }
          `, {
            name: link.storeName,
            website: link.storeWebsite || link.storeName,
          });
        }

        const storeResult = store as { id: string };

        // Create store link
        await edgedb.query(`
          INSERT StoreLink {
            kit := (SELECT Kit FILTER .id = <uuid>$kitId),
            store := (SELECT Store FILTER .id = <uuid>$storeId),
            url := <str>$url
          }
        `, {
          kitId: kitResult.id,
          storeId: storeResult.id,
          url: link.url,
        });
      }
    }

    return NextResponse.json(kit, { status: 201 });
  } catch (error) {
    console.error('Error creating kit:', error);
    return NextResponse.json(
      { error: 'Failed to create kit' },
      { status: 500 }
    );
  }
}