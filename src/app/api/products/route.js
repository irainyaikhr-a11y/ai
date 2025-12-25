import { mockProducts, mockCategories } from '@/lib/mockData';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('category_id');
    const page = parseInt(searchParams.get('page') || '1');

    let filteredProducts = mockProducts;

    if (categoryId) {
        filteredProducts = mockProducts.filter(p => p.category_id === parseInt(categoryId));
    }

    return Response.json({
        data: filteredProducts,
        total: filteredProducts.length,
        page: page,
        per_page: 10
    });
}

export async function POST(request) {
    const body = await request.json();
    const newProduct = {
        id: mockProducts.length + 1,
        ...body,
        is_new: true
    };
    mockProducts.push(newProduct);
    return Response.json({ data: newProduct, message: 'Product created successfully' });
}
