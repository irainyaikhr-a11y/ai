'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { selectCartTotalItems } from '@/redux/slices/cartSlice';

const HeaderContainer = styled.header`
  background: ${({ theme }) => theme?.colors?.sandBeige || '#F5F1E6'};
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(141, 123, 104, 0.15); /* sage/earthBrown hint */
`;

const HeaderInner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 800;
  letter-spacing: 2px;
  color: ${({ theme }) => theme?.colors?.deepOlive || '#4A3B32'};
  text-transform: uppercase;
  font-family: serif;
  
  &:hover {
    color: ${({ theme }) => theme?.colors?.honeyGold || '#D4AF37'};
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme?.colors?.deepOlive || '#4A3B32'};
  font-weight: 500;
  transition: color 0.2s;
  
  &:hover {
    color: ${({ theme }) => theme?.colors?.honeyGold || '#D4AF37'};
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const EnterDashboardCTA = styled(Link)`
  background: ${({ theme }) => theme?.colors?.deepOlive || '#4A3B32'};
  color: ${({ theme }) => theme?.colors?.sandBeige || '#F5F1E6'};
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme?.colors?.honeyGold || '#D4AF37'};
    color: #4A3B32;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const CartButton = styled(Link)`
  position: relative;
  padding: 0.5rem;
  border-radius: 50%;
  background: rgba(74, 59, 50, 0.05); /* deeply olive weak */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  color: ${({ theme }) => theme?.colors?.deepOlive || '#4A3B32'};
  
  &:hover {
    background: ${({ theme }) => theme?.colors?.honeyGold || '#D4AF37'};
    color: ${({ theme }) => theme?.colors?.deepOlive || '#4A3B32'};
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: ${({ theme }) => theme?.colors?.error || '#F44336'};
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MobileMenuButton = styled.button`
  display: none;
  padding: 0.5rem;
  background: none;
  border: none;
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 80%;
  max-width: 300px;
  height: 100vh;
  background: ${({ theme }) => theme?.colors?.sandBeige || '#F5F1E6'};
  box-shadow: -4px 0 20px rgba(0,0,0,0.15);
  padding: 2rem;
  z-index: 200;
  transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '100%')});
  transition: transform 0.3s ease;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(74, 59, 50, 0.4); /* deepOlive with opacity */
  z-index: 150;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition: all 0.3s;
`;

const MobileNavLink = styled(Link)`
  display: block;
  padding: 1rem 0;
  font-size: 1.125rem;
  color: ${({ theme }) => theme?.colors?.deepOlive || '#4A3B32'};
  border-bottom: 1px solid rgba(141, 123, 104, 0.2);
`;

// ... (styled components remain same until StoreHeader)

export default function StoreHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartItemsCount = useSelector(selectCartTotalItems);

  return (
    <HeaderContainer>
      <HeaderInner>
        <Logo href="/">RODANA</Logo>

        <Nav>
          <NavLink href="/">الرئيسية</NavLink>
          <NavLink href="/about">من نحن</NavLink>
          <NavLink href="/quality">الجودة</NavLink>
          <NavLink href="/bee-products">منتجات النحل</NavLink>
          <NavLink href="/contact">اتصل بنا</NavLink>
        </Nav>

        <Actions>
          <CartButton href="/cart">
            <ShoppingCart size={20} />
            {cartItemsCount > 0 && <CartBadge>{cartItemsCount}</CartBadge>}
          </CartButton>

          <EnterDashboardCTA href="/products">تسوق الآن</EnterDashboardCTA>

          <MobileMenuButton onClick={() => setMobileMenuOpen(true)}>
            <Menu size={24} color="#1C1C1A" />
          </MobileMenuButton>
        </Actions>
      </HeaderInner>

      {/* Mobile Menu */}
      <Overlay $isOpen={mobileMenuOpen} onClick={() => setMobileMenuOpen(false)} />
      <MobileMenu $isOpen={mobileMenuOpen}>
        <button
          onClick={() => setMobileMenuOpen(false)}
          style={{ background: 'none', border: 'none', marginBottom: '2rem' }}
        >
          <X size={24} />
        </button>
        <MobileNavLink href="/" onClick={() => setMobileMenuOpen(false)}>الرئيسية</MobileNavLink>
        <MobileNavLink href="/about" onClick={() => setMobileMenuOpen(false)}>من نحن</MobileNavLink>
        <MobileNavLink href="/quality" onClick={() => setMobileMenuOpen(false)}>الجودة</MobileNavLink>
        <MobileNavLink href="/bee-products" onClick={() => setMobileMenuOpen(false)}>منتجات النحل</MobileNavLink>
        <MobileNavLink href="/contact" onClick={() => setMobileMenuOpen(false)}>اتصل بنا</MobileNavLink>
        <MobileNavLink href="/products" onClick={() => setMobileMenuOpen(false)} style={{ color: '#C9A24D', fontWeight: '700' }}>
          تسوق الآن
        </MobileNavLink>
      </MobileMenu>
    </HeaderContainer>
  );
}
