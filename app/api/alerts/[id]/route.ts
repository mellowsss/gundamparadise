import { NextRequest, NextResponse } from 'next/server';
import { getAlerts, saveAlerts } from '@/lib/storage';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const alerts = getAlerts();
    const filtered = alerts.filter(alert => alert.id !== id);
    saveAlerts(filtered);

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

    const alerts = getAlerts();
    const alert = alerts.find(a => a.id === id);
    
    if (!alert) {
      return NextResponse.json({ error: 'Alert not found' }, { status: 404 });
    }

    alert.isActive = isActive;
    saveAlerts(alerts);

    return NextResponse.json(alert);
  } catch (error) {
    console.error('Error updating alert:', error);
    return NextResponse.json(
      { error: 'Failed to update alert' },
      { status: 500 }
    );
  }
}