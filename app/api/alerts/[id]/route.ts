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
      DELETE PriceAlert
      FILTER .id = <uuid>$alertId
    `, {
      alertId: id,
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
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const body = await request.json();
    const { isActive } = body;

    const alert = await edgedb.querySingle(`
      UPDATE PriceAlert
      FILTER .id = <uuid>$alertId
      SET {
        is_active := <bool>$isActive
      }
    `, {
      alertId: id,
      isActive: isActive !== undefined ? isActive : true,
    });

    if (!alert) {
      return NextResponse.json({ error: 'Alert not found' }, { status: 404 });
    }

    return NextResponse.json(alert);
  } catch (error) {
    console.error('Error updating alert:', error);
    return NextResponse.json(
      { error: 'Failed to update alert' },
      { status: 500 }
    );
  }
}