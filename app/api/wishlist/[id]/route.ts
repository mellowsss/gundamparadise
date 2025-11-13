import { NextRequest, NextResponse } from 'next/server';
import { edgedb } from '@/lib/edgedb-client';

const GUEST_USER_ID = '00000000-0000-0000-0000-000000000000';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    await edgedb.query(`
      DELETE WishlistItem
      FILTER .user.id = <uuid>$userId AND .kit.id = <uuid>$kitId
    `, {
      userId: GUEST_USER_ID,
      kitId: id,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    return NextResponse.json(
      { error: 'Failed to remove from wishlist' },
      { status: 500 }
    );
  }
}