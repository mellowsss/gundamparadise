import { NextRequest, NextResponse } from 'next/server';
import { getKitById } from '@/lib/storage';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    
    if (!id) {
      return NextResponse.json({ error: 'Kit ID is required' }, { status: 400 });
    }

    const kit = getKitById(id);

    if (!kit) {
      return NextResponse.json({ error: 'Kit not found' }, { status: 404 });
    }

    return NextResponse.json(kit);
  } catch (error) {
    console.error('Error fetching kit:', error);
    return NextResponse.json(
      { error: 'Failed to fetch kit' },
      { status: 500 }
    );
  }
}