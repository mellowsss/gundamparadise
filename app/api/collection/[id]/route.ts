import { NextRequest, NextResponse } from 'next/server';
import { getCollection, saveCollection } from '@/lib/storage';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const collection = getCollection();
    const filtered = collection.filter(item => item.kitId !== id);
    saveCollection(filtered);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing from collection:', error);
    return NextResponse.json(
      { error: 'Failed to remove from collection' },
      { status: 500 }
    );
  }
}