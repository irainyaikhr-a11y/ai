'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartTotalPrice, updateQuantity, removeItem, clearCart } from '@/redux/slices/cartSlice';
import { getFullImageUrl } from '@/lib/http';
import { ShoppingCart, Trash2, Minus, Plus, Package, ArrowRight, ArrowLeft } from 'lucide-react';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme?.colors?.sandBeige || '#F5F1E6'};
  padding-bottom: 4rem;
`;

const PageHeader = styled.div`
  padding: 3rem 1.5rem;
  text-align: center;
  background: radial-gradient(circle at 50% -20%, rgba(212, 175, 55, 0.1), transparent 70%);
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: ${({ theme }) => theme?.colors?.deepOlive || '#4A3B32'};
  margin-bottom: 0.5rem;
  font-family: serif;
`;

const PageSubtitle = styled.p`
  color: ${({ theme }) => theme?.colors?.earthBrown || '#8D7B68'};
  opacity: 0.9;
  font-size: 1.1rem;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const CartLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
  }
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CartItem = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  background: white;
  border: 1px solid rgba(212, 175, 55, 0.15);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.03);
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${({ theme }) => theme?.colors?.honeyGold || '#D4AF37'};
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.05);
  }

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const ItemImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 12px;
  overflow: hidden;
  background: ${({ theme }) => theme?.colors?.charcoal || '#F9F7F2'};
  flex-shrink: 0;
  border: 1px solid rgba(0,0,0,0.05);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 640px) {
    width: 100%;
    height: 200px;
  }
`;

const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const ItemName = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme?.colors?.deepOlive || '#4A3B32'};
  margin-bottom: 0.25rem;
`;

const ItemPrice = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme?.colors?.honeyGold || '#D4AF37'};
`;

const ItemControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme?.colors?.charcoal || '#F9F7F2'};
  padding: 0.25rem;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.05);
`;

const QuantityButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 1px solid rgba(0,0,0,0.05);
  border-radius: 8px;
  color: ${({ theme }) => theme?.colors?.deepOlive || '#4A3B32'};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${({ theme }) => theme?.colors?.honeyGold || '#D4AF37'};
    color: white;
    border-color: transparent;
  }
`;

const QuantityValue = styled.span`
  width: 40px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme?.colors?.deepOlive || '#4A3B32'};
`;

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(244, 67, 54, 0.05);
  border: 1px solid rgba(244, 67, 54, 0.1);
  border-radius: 8px;
  color: ${({ theme }) => theme?.colors?.error || '#F44336'};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(244, 67, 54, 0.1);
    border-color: ${({ theme }) => theme?.colors?.error || '#F44336'};
  }
`;

const CartSummary = styled.div`
  background: white;
  border: 1px solid rgba(212, 175, 55, 0.15);
  border-radius: 16px;
  padding: 2rem;
  height: fit-content;
  position: sticky;
  top: 120px;
  box-shadow: 0 4px 25px rgba(0,0,0,0.03);
`;

const SummaryTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme?.colors?.deepOlive || '#4A3B32'};
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0,0,0,0.05);
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  color: ${({ theme }) => theme?.colors?.earthBrown || '#8D7B68'};
  
  &.total {
    font-size: 1.5rem;
    font-weight: 800;
    color: ${({ theme }) => theme?.colors?.deepOlive || '#4A3B32'};
    padding-top: 1.5rem;
    margin-top: 1rem;
    border-top: 1px solid rgba(0,0,0,0.05);
    
    span:last-child {
      color: ${({ theme }) => theme?.colors?.honeyGold || '#D4AF37'};
    }
  }
`;

const CheckoutButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  padding: 1.25rem;
  margin-top: 2rem;
  background: ${({ theme }) => theme?.colors?.deepOlive || '#4A3B32'};
  color: ${({ theme }) => theme?.colors?.sandBeige || '#F5F1E6'};
  border: none;
  border-radius: 50px;
  font-size: 1.125rem;
  font-weight: 700;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(74, 59, 50, 0.15);
  
  &:hover {
    transform: translateY(-2px);
    background: ${({ theme }) => theme?.colors?.honeyGold || '#D4AF37'};
    color: #4A3B32;
    box-shadow: 0 15px 30px rgba(212, 175, 55, 0.25);
  }
`;

const ContinueShopping = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem;
  margin-top: 1rem;
  background: transparent;
  color: ${({ theme }) => theme?.colors?.deepOlive || '#4A3B32'};
  border: 1px solid rgba(74, 59, 50, 0.2);
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.2s;
  
  &:hover {
    background: ${({ theme }) => theme?.colors?.deepOlive || '#4A3B32'};
    border-color: ${({ theme }) => theme?.colors?.deepOlive || '#4A3B32'};
    color: ${({ theme }) => theme?.colors?.sandBeige || '#F5F1E6'};
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 6rem 2rem;
  background: white;
  border: 1px solid rgba(0,0,0,0.05);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.02);
  
  svg {
    color: ${({ theme }) => theme?.colors?.honeyGold || '#D4AF37'};
    margin-bottom: 1.5rem;
    opacity: 0.8;
  }
  
  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme?.colors?.deepOlive || '#4A3B32'};
    font-weight: 700;
  }
  
  p {
    color: ${({ theme }) => theme?.colors?.earthBrown || '#8D7B68'};
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }
`;

const ShopNowButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2.5rem;
  background: ${({ theme }) => theme?.colors?.deepOlive || '#4A3B32'};
  color: ${({ theme }) => theme?.colors?.sandBeige || '#F5F1E6'};
  border-radius: 50px;
  font-weight: 700;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-2px);
    background: ${({ theme }) => theme?.colors?.honeyGold || '#D4AF37'};
    color: #4A3B32;
    box-shadow: 0 10px 20px rgba(212, 175, 55, 0.2);
  }
`;

export default function CartPage() {
  const items = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);
  const dispatch = useDispatch();

  const shipping = totalPrice > 200 ? 0 : 30;
  const finalTotal = totalPrice + shipping;

  if (items.length === 0) {
    return (
      <PageContainer>
        <PageHeader>
          <PageTitle>
            <ShoppingCart size={32} />
            سلة تسوقك الملكية
          </PageTitle>
          <PageSubtitle>أكمل طلبك واستمتع بأجود منتجات العسل الطبيعي</PageSubtitle>
        </PageHeader>
        <Container>
          <EmptyCart>
            <ShoppingCart size={80} />
            <h2>سلتك فارغة حالياً</h2>
            <p>لم تقم بإضافة أي منتجات فاخرة بعد. تصفح مجموعتنا المختارة بعناية.</p>
            <ShopNowButton href="/products">
              تسوق الآن
              <ArrowLeft size={20} />
            </ShopNowButton>
          </EmptyCart>
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>
          <ShoppingCart size={32} />
          سلة تسوقك الملكية
        </PageTitle>
        <PageSubtitle>أكمل طلبك واستمتع بأجود منتجات العسل الطبيعي</PageSubtitle>
      </PageHeader>

      <Container>
        <CartLayout>
          <CartItems>
            {items.map((item) => (
              <CartItem key={item.id}>
                <ItemImage>
                  {item.image_url ? (
                    <img src={getFullImageUrl(item.image_url)} alt={item.name} />
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                      <Package size={32} color="#C9A24D" />
                    </div>
                  )}
                </ItemImage>
                <ItemDetails>
                  <div>
                    <ItemHeader>
                      <ItemName>{item.name}</ItemName>
                      <ItemPrice>{item.price} درهم</ItemPrice>
                    </ItemHeader>
                  </div>

                  <ItemControls>
                    <QuantityControls>
                      <QuantityButton onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>
                        <Minus size={14} />
                      </QuantityButton>
                      <QuantityValue>{item.quantity}</QuantityValue>
                      <QuantityButton onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>
                        <Plus size={14} />
                      </QuantityButton>
                    </QuantityControls>

                    <RemoveButton onClick={() => dispatch(removeItem(item.id))}>
                      <Trash2 size={16} />
                      حذف
                    </RemoveButton>
                  </ItemControls>
                </ItemDetails>
              </CartItem>
            ))}
          </CartItems>

          <CartSummary>
            <SummaryTitle>ملخص الطلب</SummaryTitle>
            <SummaryRow>
              <span>المجموع الفرعي</span>
              <span>{totalPrice.toFixed(2)} درهم</span>
            </SummaryRow>
            <SummaryRow>
              <span>الشحن</span>
              <span>{shipping === 0 ? 'مجاني' : `${shipping} درهم`}</span>
            </SummaryRow>
            {shipping > 0 && (
              <SummaryRow style={{ fontSize: '0.9rem', color: '#8FA98C' }}>
                <span>✨ شحن مجاني للطلبات فوق 200 درهم</span>
              </SummaryRow>
            )}
            <SummaryRow className="total">
              <span>الإجمالي</span>
              <span>{finalTotal.toFixed(2)} درهم</span>
            </SummaryRow>
            <CheckoutButton href="/checkout">
              إتمام الطلب
              <ArrowLeft size={20} />
            </CheckoutButton>
            <ContinueShopping href="/products">
              <ArrowRight size={18} />
              متابعة التسوق
            </ContinueShopping>
          </CartSummary>
        </CartLayout>
      </Container>
    </PageContainer>
  );
}
