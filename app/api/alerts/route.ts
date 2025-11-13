import { NextRequest, NextResponse } from 'next/server';
import { edgedb } from '@/lib/edgedb-client';

const GUEST_USER_ID = '00000000-0000-0000-0000-000000000000';

export async function GET(request: NextRequest) {
  try {
    // Get or create guest user
    let user = await edgedb.querySingle(`
      SELECT User FILTER .id = <uuid>$userId
    `, { userId: GUEST_USER_ID });

    if (!user) {
      user = await edgedb.querySingle(`
        INSERT User {
          id := <uuid>$userId
        }
      `, { userId: GUEST_USER_ID });
    }

    const alerts = await edgedb.query(`
      SELECT PriceAlert {
        id,
        target_price,
        alert_type,
        is_active,
        created_at,
        triggered_at,
        kit: {
          id,
          name,
          grade,
          series,
          scale,
          image_url,
          description,
          store_links: {
            id,
            url,
            store: {
              id,
              name,
              website
            }
          }
        }
      }
      FILTER .user.id = <uuid>$userId
      ORDER BY .created_at DESC
    `, { userId: user.id });

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

    // Get or create guest user
    let user = await edgedb.querySingle(`
      SELECT User FILTER .id = <uuid>$userId
    `, { userId: GUEST_USER_ID });

    if (!user) {
      user = await edgedb.querySingle(`
        INSERT User {
          id := <uuid>$userId
        }
      `, { userId: GUEST_USER_ID });
    }

    const alert = await edgedb.querySingle(`
      INSERT PriceAlert {
        user := (SELECT User FILTER .id = <uuid>$userId),
        kit := (SELECT Kit FILTER .id = <uuid>$kitId),
        target_price := <optional float64>$targetPrice,
        alert_type := <str>$alertType
      }
    `, {
      userId: user.id,
      kitId,
      targetPrice: targetPrice ? parseFloat(targetPrice) : null,
      alertType,
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