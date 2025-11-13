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

    await prisma.priceAlert.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting alert:', error);
    return NextResponse.json(
      { error: 'Failed to delete alert' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { isActive } = body;

    const alert = await prisma.priceAlert.update({
      where: { id },
      data: { isActive },
    });

    return NextResponse.json(alert);
  } catch (error) {
    console.error('Error updating alert:', error);
    return NextResponse.json(
      { error: 'Failed to update alert' },
      { status: 500 }
    );
  }
}
