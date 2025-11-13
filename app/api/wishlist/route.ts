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

    const wishlistItems = await edgedb.query(`
      SELECT WishlistItem {
        id,
        target_price,
        notes,
        added_at,
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
      ORDER BY .added_at DESC
    `, { userId: user.id });

    // Calculate current prices
    const itemsWithPrices = await Promise.all(
      wishlistItems.map(async (item: any) => {
        const prices = await edgedb.query(`
          SELECT PriceEntry {
            price
          }
          FILTER .kit.id = <uuid>$kitId
          ORDER BY .recorded_at DESC
        `, { kitId: item.kit.id });

        const priceValues = prices.map((p: any) => p.price);
        const currentPrice = priceValues[0] || null;
        const averagePrice =
          priceValues.length > 0
            ? priceValues.reduce((sum: number, p: number) => sum + p, 0) / priceValues.length
            : null;

        return {
          ...item,
          kit: {
            ...item.kit,
            currentPrice,
            averagePrice,
          },
        };
      })
    );

    return NextResponse.json(itemsWithPrices);
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    return NextResponse.json(
      { error: 'Failed to fetch wishlist' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { kitId, targetPrice, notes } = body;

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

    // Check if item already exists
    const existing = await edgedb.querySingle(`
      SELECT WishlistItem
      FILTER .user.id = <uuid>$userId AND .kit.id = <uuid>$kitId
    `, { userId: user.id, kitId });

    let wishlistItem;
    if (existing) {
      wishlistItem = await edgedb.querySingle(`
        UPDATE WishlistItem
        FILTER .id = <uuid>$itemId
        SET {
          target_price := <optional float64>$targetPrice,
          notes := <optional str>$notes
        }
      `, {
        itemId: existing.id,
        targetPrice: targetPrice ? parseFloat(targetPrice) : null,
        notes: notes || null,
      });
    } else {
      wishlistItem = await edgedb.querySingle(`
        INSERT WishlistItem {
          user := (SELECT User FILTER .id = <uuid>$userId),
          kit := (SELECT Kit FILTER .id = <uuid>$kitId),
          target_price := <optional float64>$targetPrice,
          notes := <optional str>$notes
        }
      `, {
        userId: user.id,
        kitId,
        targetPrice: targetPrice ? parseFloat(targetPrice) : null,
        notes: notes || null,
      });
    }

    return NextResponse.json(wishlistItem, { status: 201 });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    return NextResponse.json(
      { error: 'Failed to add to wishlist' },
      { status: 500 }
    );
  }
}