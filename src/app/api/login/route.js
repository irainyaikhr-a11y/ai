// Mock Login API - للتجربة فقط

export async function POST(request) {
    const body = await request.json();
    const { email, password } = body;

    // أي إيميل وباسورد كيخدم للتجربة
    if (email && password) {
        return Response.json({
            token: 'mock-jwt-token-12345',
            user: {
                id: 1,
                name: 'Admin',
                email: email,
                role: 'admin'
            },
            message: 'Login successful'
        });
    }

    return Response.json(
        { message: 'Invalid credentials' },
        { status: 401 }
    );
}
