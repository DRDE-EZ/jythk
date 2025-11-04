import { NextRequest, NextResponse } from 'next/server';
import { customerBackend } from '@/lib/customer-backend';
import { adminService } from '@/lib/admin-service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const adminEmail = request.headers.get('x-admin-email');

    // Check admin access for protected actions
    if (adminEmail) {
      const isAdmin = await adminService.isUserAdmin(adminEmail);
      if (!isAdmin) {
        return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
      }
    }

    switch (action) {
      case 'all_orders':
        // Get all orders across all customers (admin only)
        if (!adminEmail) {
          return NextResponse.json({ error: 'Admin email required' }, { status: 400 });
        }
        
        const allOrders = await customerBackend.getCustomerOrders('customer_1'); // Simplified for demo
        return NextResponse.json({
          orders: allOrders,
          count: allOrders.length
        });

      case 'order_stats':
        const allOrdersForStats = await customerBackend.getCustomerOrders('customer_1');
        const stats = {
          total: allOrdersForStats.length,
          pending: allOrdersForStats.filter(o => o.status === 'pending').length,
          processing: allOrdersForStats.filter(o => o.status === 'processing').length,
          shipped: allOrdersForStats.filter(o => o.status === 'shipped').length,
          delivered: allOrdersForStats.filter(o => o.status === 'delivered').length,
          cancelled: allOrdersForStats.filter(o => o.status === 'cancelled').length,
          totalRevenue: allOrdersForStats
            .filter(o => o.status === 'delivered')
            .reduce((sum, order) => sum + order.total, 0)
        };
        
        return NextResponse.json(stats);

      default:
        return NextResponse.json({
          endpoints: {
            all_orders: '/api/orders?action=all_orders (Admin only)',
            order_stats: '/api/orders?action=order_stats'
          }
        });
    }
  } catch (error: any) {
    console.error('Orders API error:', error);
    return NextResponse.json({
      error: error.message || 'Internal server error'
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, status, trackingNumber } = body;
    const adminEmail = request.headers.get('x-admin-email');

    // Check admin access
    if (!adminEmail || !(await adminService.isUserAdmin(adminEmail))) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    if (!orderId || !status) {
      return NextResponse.json({ 
        error: 'Order ID and status are required' 
      }, { status: 400 });
    }

    const success = await customerBackend.updateOrderStatus(orderId, status, trackingNumber);
    
    if (success) {
      const updatedOrder = await customerBackend.getOrderById(orderId);
      return NextResponse.json({
        success: true,
        message: 'Order updated successfully',
        order: updatedOrder
      });
    } else {
      return NextResponse.json({
        success: false,
        error: 'Order not found'
      }, { status: 404 });
    }
  } catch (error: any) {
    console.error('Order update error:', error);
    return NextResponse.json({
      error: error.message || 'Internal server error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const adminEmail = request.headers.get('x-admin-email');

    // Check admin access
    if (!adminEmail || !(await adminService.isUserAdmin(adminEmail))) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { customerId, customerEmail, items, total, shippingAddress } = body;

    if (!customerId || !customerEmail || !items || !total) {
      return NextResponse.json({ 
        error: 'Missing required fields: customerId, customerEmail, items, total' 
      }, { status: 400 });
    }

    const orderId = await customerBackend.createOrder({
      customerId,
      customerEmail,
      status: 'pending',
      total,
      items,
      shippingAddress
    });

    const newOrder = await customerBackend.getOrderById(orderId);
    
    return NextResponse.json({
      success: true,
      message: 'Order created successfully',
      order: newOrder
    });
  } catch (error: any) {
    console.error('Order creation error:', error);
    return NextResponse.json({
      error: error.message || 'Internal server error'
    }, { status: 500 });
  }
}