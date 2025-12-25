'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styled from 'styled-components';
import Link from 'next/link';
import { http, getFullImageUrl } from '@/lib/http';
import { useDispatch } from 'react-redux';
import { addItem } from '@/redux/slices/cartSlice';
import { ShoppingCart, Package, Loader2, Minus, Plus, ArrowRight, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme?.colors?.sandBeige || '#F5F1E6'};
`;

const Breadcrumb = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.5rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme?.colors?.earthBrown || '#666'};
  font-size: 0.9rem;
  
  a {
    color: ${({ theme }) => theme?.colors?.deepOlive || '#1A1A1A'};
    transition: color 0.2s;
    font-weight: 500;
    
    &:hover {
      color: ${({ theme }) => theme?.colors?.honeyGold || '#D4AF37'};
    }
  }
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem 4rem;
`;

const ProductLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  
  @media (min-width: 1024px) {
    grid-template-columns: 1.2fr 1fr;
    gap: 4rem;
  }
`;

const ImageSection = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0,0,0,0.05);
  border: 1px solid rgba(0,0,0,0.05);
  position: sticky;
  top: 100px;
`;

const MainImage = styled.div`
  aspect-ratio: 1;
  background: ${({ theme }) => theme?.colors?.charcoal || '#F9F7F2'};
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const InfoSection = styled.div`
  padding-top: 1rem;
`;

const ProductTitle = styled.h1`
  font-family: 'Cairo', serif;
  font-size: 2.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme?.colors?.deepOlive || '#1A1A1A'};
  margin-bottom: 1rem;
  line-height: 1.3;
`;

const ProductPrice = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme?.colors?.honeyGold || '#D4AF37'};
  margin-bottom: 1.5rem;
  font-family: 'Outfit', sans-serif;
`;

const StockStatus = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 2rem;
  background: ${({ $inStock }) => $inStock ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)'};
  color: ${({ $inStock }) => $inStock ? '#4CAF50' : '#F44336'};
  border: 1px solid ${({ $inStock }) => $inStock ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)'};
`;

const Description = styled.div`
  color: ${({ theme }) => theme?.colors?.earthBrown || '#4A3B32'};
  line-height: 1.8;
  margin-bottom: 2.5rem;
  font-size: 1.05rem;
  font-weight: 500;
  
  h3 {
    color: ${({ theme }) => theme?.colors?.deepOlive || '#1A1A1A'};
    margin-bottom: 0.75rem;
    font-size: 1.25rem;
    font-weight: 700;
  }
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 16px;
  border: 1px solid rgba(0,0,0,0.05);
  box-shadow: 0 4px 20px rgba(0,0,0,0.02);
`;

const QuantityLabel = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme?.colors?.deepOlive || '#1A1A1A'};
  font-size: 1.1rem;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme?.colors?.sandBeige || '#F5F1E6'};
  padding: 0.25rem;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.05);
`;

const QuantityButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 1px solid rgba(0,0,0,0.05);
  border-radius: 8px;
  color: ${({ theme }) => theme?.colors?.deepOlive || '#1A1A1A'};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme?.colors?.honeyGold || '#D4AF37'};
    color: white;
    border-color: transparent;
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const QuantityValue = styled.span`
  width: 50px;
  text-align: center;
  font-weight: 700;
  font-size: 1.2rem;
  color: ${({ theme }) => theme?.colors?.deepOlive || '#1A1A1A'};
`;

const AddToCartButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1.25rem;
  background: ${({ theme }) => theme?.colors?.deepOlive || '#1A1A1A'};
  color: ${({ theme }) => theme?.colors?.sandBeige || '#F5F1E6'};
  border: none;
  border-radius: 50px;
  font-size: 1.125rem;
  font-weight: 700;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    background: ${({ theme }) => theme?.colors?.honeyGold || '#D4AF37'};
    color: #1A1A1A;
    box-shadow: 0 15px 30px rgba(212, 175, 55, 0.25);
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
`;

const Features = styled.div`
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(0,0,0,0.1);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${({ theme }) => theme?.colors?.deepOlive || '#1A1A1A'}CC;
  font-size: 0.95rem;
  font-weight: 500;
  
  svg {
    color: ${({ theme }) => theme?.colors?.honeyGold || '#D4AF37'};
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

// Styled component for variations
// Styled component for variations
const VariationsSection = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 16px;
  border: 1px solid rgba(0,0,0,0.05);
  box-shadow: 0 4px 20px rgba(0,0,0,0.02);
`;

const VariationLabel = styled.div`
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme?.colors?.deepOlive || '#1A1A1A'};
  font-size: 1.1rem;
`;

const VariationOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const VariationButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: 1px solid ${({ $selected, theme }) =>
    $selected ? (theme?.colors?.honeyGold || '#D4AF37') : 'rgba(0,0,0,0.1)'};
  background: ${({ $selected, theme }) =>
    $selected ? (theme?.colors?.honeyGold || '#D4AF37') : 'white'};
  color: ${({ $selected }) =>
    $selected ? 'white' : '#1A1A1A'};
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme?.colors?.honeyGold || '#D4AF37'};
    background: ${({ $selected, theme }) =>
    $selected ? (theme?.colors?.honeyGold || '#D4AF37') : 'rgba(212, 175, 55, 0.1)'};
  }
  
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    text-decoration: line-through;
    background: #f5f5f5;
    border-color: transparent;
  }
`;

// Helper functions
const isVariableProduct = (product) => {
  // Backend uses 'variants' not 'variations'
  return product?.type === 'variable' || (product?.variants && product.variants.length > 0);
};

const getProductPrice = (product, selectedVariation) => {
  if (selectedVariation) {
    return `${selectedVariation.price} درهم`;
  }

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

export default function ProductDetailsPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await http.get(`/products/${productId}`);
        const productData = res.data.data || res.data;
        console.log('📦 Product Data:', productData);
        console.log('📦 Variants:', productData?.variants);
        console.log('📦 Product Type:', productData?.type);
        setProduct(productData);
      } catch (err) {
        console.error('Failed to load product:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  // Get current stock based on product type
  const getCurrentStock = () => {
    if (isVariableProduct(product) && selectedVariation) {
      return selectedVariation.stock || 0;
    }
    return product?.stock || 0;
  };

  // Check if can add to cart
  const canAddToCart = () => {
    if (isVariableProduct(product)) {
      return selectedVariation && getCurrentStock() > 0;
    }
    return getCurrentStock() > 0;
  };

  const handleAddToCart = () => {
    if (isVariableProduct(product) && !selectedVariation) {
      toast.error('❌ يرجى اختيار الخيار المناسب');
      return;
    }

    const price = selectedVariation ? selectedVariation.price : product.price;
    const variationName = selectedVariation
      ? ` (${selectedVariation.name || selectedVariation.sku})`
      : '';

    for (let i = 0; i < quantity; i++) {
      dispatch(addItem({
        id: selectedVariation ? `${product.id}-${selectedVariation.id}` : product.id,
        name: product.name + variationName,
        price: price,
        image_url: product.image_url,
        variation_id: selectedVariation?.id,
      }));
    }
    toast.success(`✅ تم إضافة ${quantity} ${product.name}${variationName} للسلة!`);
  };

  if (loading) {
    return (
      <PageContainer>
        <LoadingContainer>
          <Loader2 size={40} className="animate-spin" style={{ color: '#C9A24D' }} />
        </LoadingContainer>
      </PageContainer>
    );
  }

  if (!product) {
    return (
      <PageContainer>
        <Container>
          <div style={{ textAlign: 'center', padding: '6rem 2rem', color: '#EFE6D8' }}>
            <Package size={64} style={{ color: '#C9A24D', marginBottom: '1.5rem', opacity: 0.5 }} />
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#C9A24D' }}>المنتج غير موجود</h2>
            <Link href="/products" style={{ color: '#EFE6D8', textDecoration: 'underline' }}>العودة للمنتجات</Link>
          </div>
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Breadcrumb>
        <Link href="/">الرئيسية</Link>
        <span>/</span>
        <Link href="/products">المنتجات</Link>
        <span>/</span>
        <span>{product.name}</span>
      </Breadcrumb>

      <Container>
        <ProductLayout>
          <ImageSection>
            <MainImage>
              {product.image_url ? (
                <img src={getFullImageUrl(product.image_url)} alt={product.name} />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <Package size={80} color="#C9A24D" style={{ opacity: 0.5 }} />
                </div>
              )}
            </MainImage>
          </ImageSection>

          <InfoSection>
            <ProductTitle>{product.name}</ProductTitle>
            <ProductPrice>{getProductPrice(product, selectedVariation)}</ProductPrice>

            <StockStatus $inStock={getCurrentStock() > 0}>
              {isVariableProduct(product) ? (
                selectedVariation ? (
                  getCurrentStock() > 0 ? (
                    <>
                      <Check size={16} />
                      متوفر ({getCurrentStock()} قطعة)
                    </>
                  ) : (
                    'غير متوفر'
                  )
                ) : (
                  'اختر الخيار المناسب'
                )
              ) : (
                getCurrentStock() > 0 ? (
                  <>
                    <Check size={16} />
                    متوفر في المخزون ({getCurrentStock()} قطعة)
                  </>
                ) : (
                  'غير متوفر حالياً'
                )
              )}
            </StockStatus>

            {/* Variants Selection - Backend uses 'variants' not 'variations' */}
            {isVariableProduct(product) && product.variants && product.variants.length > 0 && (
              <VariationsSection>
                <VariationLabel>اختر الخيار:</VariationLabel>
                <VariationOptions>
                  {product.variants.map((variant) => (
                    <VariationButton
                      key={variant.id}
                      $selected={selectedVariation?.id === variant.id}
                      onClick={() => setSelectedVariation(variant)}
                      disabled={variant.stock <= 0}
                    >
                      {variant.name || variant.sku} - {variant.price} درهم
                      {variant.stock <= 0 && ' (نفذ)'}
                    </VariationButton>
                  ))}
                </VariationOptions>
              </VariationsSection>
            )}

            {product.description && (
              <Description>
                <h3>وصف المنتج</h3>
                <p>{product.description}</p>
              </Description>
            )}

            <QuantitySelector>
              <QuantityLabel>الكمية:</QuantityLabel>
              <QuantityControls>
                <QuantityButton
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus size={18} />
                </QuantityButton>
                <QuantityValue>{quantity}</QuantityValue>
                <QuantityButton
                  onClick={() => setQuantity(q => Math.min(getCurrentStock(), q + 1))}
                  disabled={quantity >= getCurrentStock() || getCurrentStock() <= 0}
                >
                  <Plus size={18} />
                </QuantityButton>
              </QuantityControls>
            </QuantitySelector>

            <AddToCartButton
              onClick={handleAddToCart}
              disabled={!canAddToCart()}
            >
              <ShoppingCart size={22} />
              {isVariableProduct(product)
                ? (selectedVariation
                  ? (getCurrentStock() > 0 ? 'أضف إلى السلة' : 'غير متوفر')
                  : 'اختر الخيار أولاً')
                : (getCurrentStock() > 0 ? 'أضف إلى السلة' : 'غير متوفر')}
            </AddToCartButton>

            <Features>
              <FeatureItem>
                <Check size={18} />
                عسل طبيعي 100%
              </FeatureItem>
              <FeatureItem>
                <Check size={18} />
                شحن سريع لجميع المدن
              </FeatureItem>
              <FeatureItem>
                <Check size={18} />
                ضمان جودة المنتج
              </FeatureItem>
              <FeatureItem>
                <Check size={18} />
                إرجاع خلال 14 يوم
              </FeatureItem>
            </Features>
          </InfoSection>
        </ProductLayout>
      </Container>
    </PageContainer >
  );
}
