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

    const collectionItems = await edgedb.query(`
      SELECT CollectionItem {
        id,
        purchase_price,
        purchase_date,
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

    return NextResponse.json(collectionItems);
  } catch (error) {
    console.error('Error fetching collection:', error);
    return NextResponse.json(
      { error: 'Failed to fetch collection' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { kitId, purchasePrice, purchaseDate, notes } = body;

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
      SELECT CollectionItem
      FILTER .user.id = <uuid>$userId AND .kit.id = <uuid>$kitId
    `, { userId: user.id, kitId });

    let collectionItem;
    if (existing) {
      collectionItem = await edgedb.querySingle(`
        UPDATE CollectionItem
        FILTER .id = <uuid>$itemId
        SET {
          purchase_price := <optional float64>$purchasePrice,
          purchase_date := <optional datetime>$purchaseDate,
          notes := <optional str>$notes
        }
      `, {
        itemId: existing.id,
        purchasePrice: purchasePrice ? parseFloat(purchasePrice) : null,
        purchaseDate: purchaseDate ? new Date(purchaseDate) : null,
        notes: notes || null,
      });
    } else {
      collectionItem = await edgedb.querySingle(`
        INSERT CollectionItem {
          user := (SELECT User FILTER .id = <uuid>$userId),
          kit := (SELECT Kit FILTER .id = <uuid>$kitId),
          purchase_price := <optional float64>$purchasePrice,
          purchase_date := <optional datetime>$purchaseDate,
          notes := <optional str>$notes
        }
      `, {
        userId: user.id,
        kitId,
        purchasePrice: purchasePrice ? parseFloat(purchasePrice) : null,
        purchaseDate: purchaseDate ? new Date(purchaseDate) : null,
        notes: notes || null,
      });
    }

    return NextResponse.json(collectionItem, { status: 201 });
  } catch (error) {
    console.error('Error adding to collection:', error);
    return NextResponse.json(
      { error: 'Failed to add to collection' },
      { status: 500 }
    );
  }
}