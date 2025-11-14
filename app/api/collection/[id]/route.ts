import { NextRequest, NextResponse } from 'next/server';
import { checkEdgeDB } from '@/lib/edgedb-utils';

const GUEST_USER_ID = '00000000-0000-0000-0000-000000000000';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const edgedb = checkEdgeDB();
    if (!edgedb) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }

    const resolvedParams = await params;
    const { id } = resolvedParams;

    await edgedb.query(`
      DELETE CollectionItem
      FILTER .user.id = <uuid>$userId AND .kit.id = <uuid>$kitId
    `, {
      userId: GUEST_USER_ID,
      kitId: id,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing from collection:', error);
    return NextResponse.json(
      { error: 'Failed to remove from collection' },
      { status: 500 }
    );
  }
}