import { NextRequest, NextResponse } from 'next/server';
import { getWishlist, saveWishlist } from '@/lib/storage';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const wishlist = getWishlist();
    const filtered = wishlist.filter(item => item.kitId !== id);
    saveWishlist(filtered);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    return NextResponse.json(
      { error: 'Failed to remove from wishlist' },
      { status: 500 }
    );
  }
}