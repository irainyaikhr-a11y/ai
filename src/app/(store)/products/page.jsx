'use client';

import { useEffect, useState, Suspense } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { http, getFullImageUrl } from '@/lib/http';
import { useDispatch } from 'react-redux';
import { addItem } from '@/redux/slices/cartSlice';
import { ShoppingCart, Package, Loader2, Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme?.colors?.sandBeige || '#F5F1E6'};
`;

const PageHeader = styled.div`
  background: ${({ theme }) => theme?.colors?.deepOlive || '#1A1A1A'};
  padding: 3rem 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme?.colors?.sandBeige || '#EFE6D8'};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const PageTitle = styled.h1`
  font-family: 'Cairo', serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme?.colors?.honeyGold || '#D4AF37'};
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 1;
`;

const PageSubtitle = styled.p`
  color: ${({ theme }) => theme?.colors?.sandBeige || '#EFE6D8'};
  opacity: 0.8;
  font-size: 1.1rem;
  position: relative;
  z-index: 1;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
`;

const FiltersBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  background: white;
  padding: 1.25rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.03);
  border: 1px solid rgba(0,0,0,0.05);
`;

const SearchInput = styled.div`
  flex: 1;
  min-width: 250px;
  position: relative;
  
  input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 12px;
    font-size: 1rem;
    background: ${({ theme }) => theme?.colors?.sandBeige || '#F5F1E6'}40;
    color: ${({ theme }) => theme?.colors?.deepOlive || '#1A1A1A'};
    
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme?.colors?.honeyGold || '#D4AF37'};
      background: white;
    }
    
    &::placeholder {
      color: ${({ theme }) => theme?.colors?.earthBrown || '#8D7B68'}80;
    }
  }
  
  svg {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme?.colors?.honeyGold || '#D4AF37'};
  }
`;

const CategoryFilter = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 12px;
  font-size: 1rem;
  background: white;
  color: ${({ theme }) => theme?.colors?.deepOlive || '#1A1A1A'};
  cursor: pointer;
  min-width: 150px;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme?.colors?.honeyGold || '#D4AF37'};
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.02);
  transition: all 0.3s ease;
  border: 1px solid rgba(0,0,0,0.03);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.05);
    border-color: ${({ theme }) => theme?.colors?.honeyGold || '#D4AF37'}40;
  }
`;

const ProductImage = styled.div`
  aspect-ratio: 1;
  background: ${({ theme }) => theme?.colors?.charcoal || '#F9F7F2'};
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  ${ProductCard}:hover & img {
    transform: scale(1.08);
  }
`;

const ProductBadge = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  background: ${({ $type, theme }) =>
    $type === 'new' ? (theme?.colors?.deepOlive || '#1A1A1A') :
      $type === 'sale' ? (theme?.colors?.error || '#F44336') :
        (theme?.colors?.honeyGold || '#D4AF37')};
  color: ${({ $type, theme }) => $type === 'sale' || $type === 'new' ? '#F5F1E6' : '#1A1A1A'};
  padding: 0.35rem 0.85rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  z-index: 1;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
  text-align: center;
`;

const ProductName = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
  color: ${({ theme }) => theme?.colors?.deepOlive || '#1A1A1A'};
  margin-bottom: 0.5rem;
  font-family: 'Cairo', serif;
`;

const ProductPrice = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme?.colors?.honeyGold || '#D4AF37'};
  margin-bottom: 0.75rem;
  font-family: 'Outfit', sans-serif;
`;

const ProductStock = styled.div`
  font-size: 0.875rem;
  color: ${({ $inStock, theme }) => $inStock ? '#66BB6A' : '#EF5350'};
  margin-bottom: 1rem;
  font-weight: 600;
`;

const AddToCartButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.85rem;
  background: ${({ theme }) => theme?.colors?.deepOlive || '#1A1A1A'};
  color: ${({ theme }) => theme?.colors?.sandBeige || '#F5F1E6'};
  border: none;
  border-radius: 50px;
  font-weight: 700;
  transition: all 0.2s;
  
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme?.colors?.honeyGold || '#D4AF37'};
    color: #1A1A1A;
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: #E0E0E0;
    color: #999;
    cursor: not-allowed;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${({ theme }) => theme?.colors?.earthBrown || '#8D7B68'};
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme?.colors?.deepOlive || '#1A1A1A'};
  }
`;

const ResultsCount = styled.div`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme?.colors?.earthBrown || '#8D7B68'};
  font-size: 0.95rem;
`;

// Helper function to get product price display
const getProductPrice = (product) => {
  if (product.price && parseFloat(product.price) > 0) {
    return `${product.price} درهم`;
  }

  // Backend uses 'variants' not 'variations'
  if (product.variants && product.variants.length > 0) {
    const prices = product.variants
      .map(v => parseFloat(v.price))
      .filter(p => !isNaN(p) && p > 0);

    if (prices.length > 0) {
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      if (minPrice === maxPrice) {
        return `${minPrice} درهم`;
      }
      return `${minPrice} - ${maxPrice} درهم`;
    }
  }

  return 'السعر حسب الاختيار';
};

const isVariableProduct = (product) => {
  return product.type === 'variable' || (product.variants && product.variants.length > 0);
};

// Check if product is in stock
const isInStock = (product) => {
  if (isVariableProduct(product)) {
    // Variable product: check if any variation has stock
    if (product.variants && product.variants.length > 0) {
      return product.variants.some(v => v.stock > 0);
    }
    return true; // Assume in stock if no variation data
  }
  return product.stock > 0;
};

function ProductsContent() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          http.get('/products'),
          http.get('/categories').catch(() => ({ data: { data: [] } }))
        ]);
        setProducts(productsRes.data.data || []);
        setFilteredProducts(productsRes.data.data || []);
        setCategories(categoriesRes.data.data || []);

        // Handle initial category from URL
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
          setSelectedCategory(categoryParam);
        }
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchParams]); // Re-run if URL params change

  useEffect(() => {
    let result = products;

    if (searchQuery) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category_id === parseInt(selectedCategory));
    }

    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, products]);

  const handleAddToCart = (product) => {
    // If variable product, show message
    if (isVariableProduct(product)) {
      toast('🔍 اختر الخيارات من صفحة المنتج', { icon: '📦' });
      return;
    }

    dispatch(addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
    }));
    toast.success(`✅ تم إضافة ${product.name} للسلة!`);
  };

  if (loading) {
    return (
      <PageContainer>
        <PageHeader>
          <PageTitle>🍯 منتجاتنا</PageTitle>
        </PageHeader>
        <LoadingContainer>
          <Loader2 size={40} className="animate-spin" style={{ color: '#D4AF37' }} />
        </LoadingContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>🍯 منتجاتنا</PageTitle>
        <PageSubtitle>اكتشف خيرات الطبيعة النقية من رودانا</PageSubtitle>
      </PageHeader>

      <Container>
        <FiltersBar>
          <SearchInput>
            <input
              type="text"
              placeholder="ابحث عن منتج..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={18} />
          </SearchInput>

          <CategoryFilter
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">جميع الفئات</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </CategoryFilter>
        </FiltersBar>

        <ResultsCount>
          عرض {filteredProducts.length} من {products.length} منتج
        </ResultsCount>

        {filteredProducts.length === 0 ? (
          <EmptyMessage>
            <Package size={64} style={{ marginBottom: '1rem', opacity: 0.5, color: '#D4AF37' }} />
            <h3>لا توجد منتجات</h3>
            <p>جرب تغيير معايير البحث أو اختيار فئة أخرى</p>
          </EmptyMessage>
        ) : (
          <ProductGrid>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id}>
                <Link href={`/products/${product.id}`}>
                  <ProductImage>
                    {product.image_url ? (
                      <img src={getFullImageUrl(product.image_url)} alt={product.name} />
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        <Package size={48} color="#D4AF37" style={{ opacity: 0.5 }} />
                      </div>
                    )}
                    {product.is_new && <ProductBadge $type="new">جديد</ProductBadge>}
                  </ProductImage>
                </Link>
                <ProductInfo>
                  <ProductName>{product.name}</ProductName>
                  <ProductPrice>{getProductPrice(product)}</ProductPrice>
                  <ProductStock $inStock={isInStock(product)}>
                    {isVariableProduct(product)
                      ? 'متعدد الخيارات'
                      : (product.stock > 0 ? `متوفر (${product.stock})` : 'غير متوفر')}
                  </ProductStock>
                  <AddToCartButton
                    onClick={() => handleAddToCart(product)}
                    disabled={!isVariableProduct(product) && product.stock <= 0}
                  >
                    <ShoppingCart size={18} />
                    {isVariableProduct(product)
                      ? 'عرض الخيارات'
                      : (product.stock > 0 ? 'أضف للسلة' : 'غير متوفر')}
                  </AddToCartButton>
                </ProductInfo>
              </ProductCard>
            ))}
          </ProductGrid>
        )}
      </Container>
    </PageContainer>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>جاري التحميل...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
