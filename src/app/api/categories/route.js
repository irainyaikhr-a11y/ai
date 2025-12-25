// Mock Categories API

const mockCategories = [
    { id: 1, name: 'مجموعة العسل', description: 'أنواع العسل الطبيعي', products_count: 3 },
    { id: 2, name: 'حبوب اللقاح', description: 'حبوب لقاح النحل الطازجة', products_count: 2 },
    { id: 3, name: 'البروبوليس', description: 'منتجات البروبوليس الطبيعية', products_count: 2 }
];

export async function GET() {
    return Response.json({
        data: mockCategories,
        total: mockCategories.length
    });
}

export async function POST(request) {
    const body = await request.json();
    const newCategory = {
        id: mockCategories.length + 1,
        ...body,
        products_count: 0
    };
    mockCategories.push(newCategory);
    return Response.json({ data: newCategory, message: 'Category created successfully' });
}
