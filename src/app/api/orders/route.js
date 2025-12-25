// Mock Orders API

const mockOrders = [];

export async function GET() {
    return Response.json({
        data: mockOrders,
        total: mockOrders.length
    });
}
