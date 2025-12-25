'use client';

import styled from 'styled-components';
import Link from 'next/link';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme?.colors?.deepOlive || '#4A3B32'};
  color: ${({ theme }) => theme?.colors?.sandBeige || '#F5F1E6'};
  padding: 5rem 1.5rem 2rem;
  margin-top: auto;
  border-top: 1px solid rgba(212, 175, 55, 0.2);
`;

const FooterInner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
`;

const FooterSection = styled.div``;

const FooterTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme?.colors?.honeyGold || '#D4AF37'};
  font-family: serif;
  letter-spacing: 0.5px;
`;

const FooterLink = styled(Link)`
  display: block;
  color: ${({ theme }) => theme?.colors?.sandBeige || '#F5F1E6'};
  opacity: 0.8;
  padding: 0.5rem 0;
  transition: all 0.3s;
  font-size: 0.95rem;
  
  &:hover {
    color: ${({ theme }) => theme?.colors?.honeyGold || '#D4AF37'};
    opacity: 1;
    transform: translateX(-5px);
  }
`;

const FooterText = styled.p`
  color: ${({ theme }) => theme?.colors?.sage || '#C8B6A6'};
  line-height: 1.8;
  font-size: 0.95rem;
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  color: ${({ theme }) => theme?.colors?.sage || '#C8B6A6'};
  font-size: 0.875rem;
  opacity: 0.8;
`;

export default function StoreFooter() {
  return (
    <FooterContainer>
      <FooterInner>
        <FooterGrid>
          <FooterSection>
            <FooterTitle style={{ color: '#C9A24D', letterSpacing: '2px' }}>RODANA</FooterTitle>
            <FooterText>
              Purity, craftsmanship, and respect for nature. From nature to jar.
            </FooterText>
          </FooterSection>

          <FooterSection>
            <FooterTitle>التنقل</FooterTitle>
            <FooterLink href="/">الرئيسية</FooterLink>
            <FooterLink href="/about">من نحن</FooterLink>
            <FooterLink href="/quality">الجودة</FooterLink>
            <FooterLink href="/bee-products">منتجات النحل</FooterLink>
          </FooterSection>

          <FooterSection>
            <FooterTitle>المساعدة</FooterTitle>
            <FooterLink href="/faq">الأسئلة الشائعة</FooterLink>
            <FooterLink href="/contact">اتصل بنا</FooterLink>
            <FooterLink href="/shipping">الشحن</FooterLink>
          </FooterSection>

          <FooterSection>
            <FooterTitle>تواصل معنا</FooterTitle>
            <FooterLink href="tel:+212675974874" style={{ opacity: 1 }}>📞 +212 675-974874</FooterLink>
            <FooterLink href="mailto:cooperativecaan@gmail.com" style={{ opacity: 1 }}>✉️ mailto:cooperativecaan@gmail.com</FooterLink>
          </FooterSection>
        </FooterGrid>

        <Copyright>
          © {new Date().getFullYear()} متجر العسل. جميع الحقوق محفوظة.
        </Copyright>
      </FooterInner>
    </FooterContainer>
  );
}
