import { NextRequest, NextResponse } from 'next/server';
import { getKits } from '@/lib/storage';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const grade = searchParams.get('grade') || '';
    const series = searchParams.get('series') || '';
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    const allKits = getKits(search, grade, series);
    const kits = allKits.slice(offset, offset + limit);

    return NextResponse.json({
      kits,
      total: allKits.length,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Error fetching kits:', error);
    return NextResponse.json(
      { error: 'Failed to fetch kits' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // Creating kits not supported without database
  return NextResponse.json(
    { error: 'Kit creation not available without database' },
    { status: 501 }
  );
}