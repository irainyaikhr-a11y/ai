import { mockProducts } from '@/lib/mockData';

export async function GET(request, { params }) {
    const { id } = await params;
    const productId = parseInt(id);
    const product = mockProducts.find(p => p.id === productId);

    if (!product) {
        return Response.json({ message: 'Product not found' }, { status: 404 });
    }

    return Response.json({ data: product });
}

export async function PUT(request, { params }) {
    const { id } = await params;
    const productId = parseInt(id);
    const body = await request.json();

    // فالحقيقة خاصنا نحدثو المنتج فالأراي، ولكن حيت هادشي غير تجريبي
    // غادي نرجعو غير البيانات اللي توصلنا بيها
    if (mockProducts.find(p => p.id === productId)) {
        return Response.json({ data: { ...body, id: productId }, message: 'Product updated successfully' });
    }

    return Response.json({ message: 'Product not found' }, { status: 404 });
}

export async function DELETE(request, { params }) {
    const { id } = await params;
    const productId = parseInt(id);
    const index = mockProducts.findIndex(p => p.id === productId);

    if (index !== -1) {
        mockProducts.splice(index, 1);
        return Response.json({ message: 'Product deleted successfully' });
    }

    return Response.json({ message: 'Product not found' }, { status: 404 });
}
