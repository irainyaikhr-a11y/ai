'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { ShoppingCart, Package, Loader2, Sparkles } from 'lucide-react';
import { getFullImageUrl } from '@/lib/http';
import { useDispatch } from 'react-redux';
import { addItem } from '@/redux/slices/cartSlice';
import toast from 'react-hot-toast';

const Section = styled.section`
  padding: 3rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${({ theme }) => theme?.colors?.textPrimary || '#2C2C2C'};

  span {
    color: ${({ theme }) => theme?.colors?.primary || '#F4A300'};
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme?.borders?.radius?.lg || '12px'};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme?.shadows?.sm || '0 2px 8px rgba(0,0,0,0.05)'};
  transition: all 0.3s;
  border: 1px solid rgba(244, 163, 0, 0.1);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme?.shadows?.lg || '0 8px 16px rgba(0,0,0,0.1)'};
  }
`;

const ProductImage = styled.div`
  aspect-ratio: 1;
  background: #f9f9f9;
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductInfo = styled.div`
  padding: 1rem;
`;

const ProductName = styled.h3`
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  height: 2.4rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ProductPrice = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme?.colors?.primary || '#F4A300'};
  margin-bottom: 0.75rem;
`;

const RecommendationBadge = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: ${({ theme }) => theme?.gradients?.gold || 'rgba(244, 163, 0, 0.9)'};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 700;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
`;

const AddToCartButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.6rem;
  background: ${({ theme }) => theme?.colors?.primary || '#F4A300'};
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85rem;
  transition: background 0.2s;
  
  &:hover {
    background: ${({ theme }) => theme?.colors?.primaryDark || '#D68910'};
  }
`;

export default function AIRecommendations({ userId = 'ahmed', limit = 4 }) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const aiApiUrl = process.env.NEXT_PUBLIC_AI_API_URL || 'http://localhost:5050';
        // Calling my Python AI API
        const res = await fetch(`${aiApiUrl}/api/recommendations/${userId}?num=${limit}`);

        if (!res.ok) {
          throw new Error(`AI API responded with status: ${res.status}`);
        }

        const data = await res.json();
        if (data.success) {
          setRecommendations(data.recommendations);
        }
      } catch (err) {
        console.error('AI API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [userId, limit]);

  const handleAddToCart = (product) => {
    dispatch(addItem({
      id: product.id,
      name: product.title,
      price: product.price || 150, // Fallback price
      image_url: product.image_url,
    }));
    toast.success(`✅ تم إضافة ${product.title} للسلة!`);
  };

  if (loading) return null;
  if (recommendations.length === 0) return null;

  return (
    <Section>
      <SectionTitle>
        <Sparkles size={24} color="#F4A300" />
        مقترحات <span>ذكية</span> لك
      </SectionTitle>
      <ProductGrid>
        {recommendations.map((product) => (
          <ProductCard key={product.id}>
            <Link href={`/products/${product.id}`}>
              <ProductImage>
                <RecommendationBadge>
                  <Sparkles size={12} />
                  {Math.round(product.score * 100)}% Match
                </RecommendationBadge>
                {product.image_url ? (
                  <img src={getFullImageUrl(product.image_url)} alt={product.title} />
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <Package size={40} color="#ccc" />
                  </div>
                )}
              </ProductImage>
            </Link>
            <ProductInfo>
              <ProductName>{product.title}</ProductName>
              <ProductPrice>{product.price || 150} درهم</ProductPrice>
              <AddToCartButton onClick={() => handleAddToCart(product)}>
                <ShoppingCart size={16} />
                أضف للسلة
              </AddToCartButton>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductGrid>
    </Section>
  );
}
