import { NextRequest, NextResponse } from 'next/server';
import { getAlerts, saveAlerts, getKitById } from '@/lib/storage';

export async function GET(request: NextRequest) {
  try {
    const alerts = getAlerts();
    
    // Enrich with kit data
    const alertsWithKits = alerts.map(alert => ({
      ...alert,
      kit: getKitById(alert.kitId) || {
        id: alert.kitId,
        name: 'Unknown Kit',
        grade: 'N/A',
      },
    }));

    return NextResponse.json(alertsWithKits);
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch alerts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { kitId, targetPrice, alertType = 'price_drop' } = body;

    if (!kitId) {
      return NextResponse.json(
        { error: 'Kit ID is required' },
        { status: 400 }
      );
    }

    const alerts = getAlerts();
    const alert = {
      id: `alert-${Date.now()}`,
      kitId,
      targetPrice: targetPrice ? parseFloat(targetPrice) : null,
      alertType,
      isActive: true,
      createdAt: new Date().toISOString(),
      triggeredAt: null,
    };

    alerts.push(alert);
    saveAlerts(alerts);

    return NextResponse.json(alert, { status: 201 });
  } catch (error) {
    console.error('Error creating alert:', error);
    return NextResponse.json(
      { error: 'Failed to create alert' },
      { status: 500 }
    );
  }
}