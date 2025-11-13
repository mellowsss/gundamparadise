import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma-client';

const GUEST_USER_ID = 'guest-user-id';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const user = await prisma.user.findUnique({
      where: { id: GUEST_USER_ID },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    await prisma.wishlistItem.deleteMany({
      where: {
        userId: user.id,
        kitId: id,
      },
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
