import { NextRequest, NextResponse } from 'next/server';
import { getCollection, saveCollection, getKitById } from '@/lib/storage';

export async function GET(request: NextRequest) {
  try {
    const collectionItems = getCollection();
    
    // Enrich with kit data
    const itemsWithKits = collectionItems.map(item => ({
      ...item,
      kit: getKitById(item.kitId) || {
        id: item.kitId,
        name: 'Unknown Kit',
        grade: 'N/A',
      },
    }));

    return NextResponse.json(itemsWithKits);
  } catch (error) {
    console.error('Error fetching collection:', error);
    return NextResponse.json(
      { error: 'Failed to fetch collection' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { kitId, purchasePrice, purchaseDate, notes } = body;

    if (!kitId) {
      return NextResponse.json(
        { error: 'Kit ID is required' },
        { status: 400 }
      );
    }

    const collection = getCollection();
    const existingIndex = collection.findIndex(item => item.kitId === kitId);

    const collectionItem = {
      id: existingIndex >= 0 ? collection[existingIndex].id : `coll-${Date.now()}`,
      kitId,
      purchasePrice: purchasePrice ? parseFloat(purchasePrice) : null,
      purchaseDate: purchaseDate || null,
      notes,
      addedAt: existingIndex >= 0 ? collection[existingIndex].addedAt : new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      collection[existingIndex] = collectionItem;
    } else {
      collection.push(collectionItem);
    }

    saveCollection(collection);

    return NextResponse.json(collectionItem, { status: 201 });
  } catch (error) {
    console.error('Error adding to collection:', error);
    return NextResponse.json(
      { error: 'Failed to add to collection' },
      { status: 500 }
    );
  }
}