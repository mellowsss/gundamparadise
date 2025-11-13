import { NextRequest, NextResponse } from 'next/server';
import { getWishlist, saveWishlist, getKitById } from '@/lib/storage';

export async function GET(request: NextRequest) {
  try {
    const wishlistItems = getWishlist();
    
    // Enrich with kit data
    const itemsWithKits = wishlistItems.map(item => ({
      ...item,
      kit: getKitById(item.kitId) || {
        id: item.kitId,
        name: 'Unknown Kit',
        grade: 'N/A',
      },
    }));

    return NextResponse.json(itemsWithKits);
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

    const wishlist = getWishlist();
    const existingIndex = wishlist.findIndex(item => item.kitId === kitId);

    const wishlistItem = {
      id: existingIndex >= 0 ? wishlist[existingIndex].id : `wish-${Date.now()}`,
      kitId,
      targetPrice: targetPrice ? parseFloat(targetPrice) : null,
      notes,
      addedAt: existingIndex >= 0 ? wishlist[existingIndex].addedAt : new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      wishlist[existingIndex] = wishlistItem;
    } else {
      wishlist.push(wishlistItem);
    }

    saveWishlist(wishlist);

    return NextResponse.json(wishlistItem, { status: 201 });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    return NextResponse.json(
      { error: 'Failed to add to wishlist' },
      { status: 500 }
    );
  }
}