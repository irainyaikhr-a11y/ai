// Shared Mock Data with Persistence
// كنستعملو globalThis باش البيانات متمشيش ملي يتسيفا الفايل (Hot Reload)

const defaultProducts = [
    {
        id: 10,
        name: 'عسل فاكهة الميرتيل (Blueberry Honey)',
        description: 'عسل نادر مستخلص من أزهار الميرتيل (التوت الأزرق). يتميز بطعمه الفاكهي اللذيذ ولونه الداكن الفريد. يعتبر من أقوى مضادات الأكسدة الطبيعية، مفيد جداً لتقوية النظر وتحسين الدورة الدموية.',
        price: 109,
        stock: 50,
        category_id: 1,
        category_name: 'مجموعة العسل',
        image_url: '/images/rodana_blueberry_honey.png',
        is_new: true,
        type: 'simple'
    },
    {
        id: 9,
        name: 'عسل الخروب الفاخر (Carob Honey)',
        description: 'تحفة طبيعية نادرة من أشجار الخروب المغربية. يتميز بلون عنبري داكن ومذاق غني يجمع بين حلاوة الشوكولاتة ودفء الكراميل. معروف بخصائصه المذهلة للجهاز الهضمي واحتوائه على مضادات أكسدة قوية.',
        price: 109,
        stock: 60,
        category_id: 1,
        category_name: 'مجموعة العسل',
        image_url: '/images/rodana_carob_honey.png',
        is_new: true,
        type: 'simple'
    },
    {
        id: 8,
        name: 'عسل الأعشاب الطبيعي (Herbs Honey)',
        description: 'عسل طبيعي 100% مستخلص من رحيق أزهار برية متنوعة. يتميز بنكهة عطرية فريدة وفوائد صحية لتعزيز المناعة والجهاز الهضمي.',
        price: 280,
        stock: 45,
        category_id: 1,
        category_name: 'مجموعة العسل',
        image_url: '/images/rodana_herbs_honey.png',
        is_new: true,
        type: 'simple'
    }
];

// Force reset to remove "rubbish" from memory
globalThis.mockProducts = defaultProducts;

if (!globalThis.mockCategories) {
    globalThis.mockCategories = [
        { id: 1, name: 'مجموعة العسل', description: 'أنواع العسل الطبيعي', products_count: 3 },
        { id: 2, name: 'حبوب اللقاح', description: 'حبوب لقاح النحل الطازجة', products_count: 2 },
        { id: 3, name: 'البروبوليس', description: 'منتجات البروبوليس الطبيعية', products_count: 2 }
    ];
}

export const mockProducts = globalThis.mockProducts;
export const mockCategories = globalThis.mockCategories;
