import { NextResponse } from 'next/server';
import { mockProducts } from '@/lib/mockData';

export async function GET() {
    // Calculate real metrics from mock data
    const totalProducts = mockProducts.length;
    const newProducts = mockProducts.filter(p => p.is_new).length;

    // Mock logic for orders/revenue since we don't have persisted orders yet
    // We'll generate "believable" numbers for the demo
    const mockStats = {
        monthly_revenue: {
            value: 124500,
            change: 15.2,
            change_type: "positive"
        },
        total_orders: {
            value: 342,
            today: 12
        },
        total_products: {
            value: totalProducts,
            active: totalProducts
        },
        total_customers: {
            value: 128,
            new: 14
        }
    };

    return NextResponse.json(mockStats);
}
