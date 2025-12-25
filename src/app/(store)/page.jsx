'use client';

import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import { ArrowLeft, Star, ShieldCheck, Leaf, Hexagon, Award, Activity } from 'lucide-react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

// ========== Animations ==========
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// ========== Styled Components ==========

const PageContainer = styled.div`
  background: ${({ theme }) => theme?.colors?.sandBeige || '#F5F1E6'};
  overflow-x: hidden;
  direction: rtl;
  font-family: 'Cairo', sans-serif;
`;

// Shared layout for content that needs to be centered
const ContentWrapper = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

// --- HERO ---
const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme?.colors?.deepOlive || '#1A1A1A'};
  color: ${({ theme }) => theme?.colors?.sandBeige || '#EFE6D8'};
  overflow: hidden;
  padding: 0;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 80%;
    height: 150%;
    background: radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(26, 26, 26, 0.4); /* Strong Dark Overlay */
  z-index: 1;
`;

const HeroBottomGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 150px;
  background: linear-gradient(to bottom, transparent, ${({ theme }) => theme?.colors?.sandBeige || '#F5F1E6'});
  z-index: 2;
  pointer-events: none;
`;

const HeroContent = styled.div`
  text-align: center;
  z-index: 2;
  max-width: 900px;
  padding: 4rem 1.5rem; /* Internal padding only */
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.3;
  color: ${({ theme }) => theme?.colors?.sandBeige || '#F5F1E6'};
  
  span {
    display: block;
    color: ${({ theme }) => theme?.colors?.honeyGold || '#D4AF37'};
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-top: -10px; /* Move Title UP using margin */
    position: relative;
    z-index: 10;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.3rem;
  margin-bottom: 3rem;
  opacity: 0.9;
  font-weight: 400;
  line-height: 1.8;
  max-width: 750px;
  margin-left: auto;
  margin-right: auto;
  color: #F5F1E6;

  @media (max-width: 768px) {
    margin-top: 10px; /* Move Subtitle UP using margin */
    position: relative;
    z-index: 9;
  }
`;

const CTAButton = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: ${({ theme }) => theme?.colors?.honeyGold || '#D4AF37'};
  color: ${({ theme }) => theme?.colors?.deepOlive || '#1A1A1A'};
  padding: 1.2rem 3rem;
  font-weight: 800;
  font-size: 1.1rem;
  border-radius: 80px;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(212, 175, 55, 0.4);
  }

  @media (max-width: 768px) {
    margin-top: 150px; /* Move Button DOWN using margin */
  }
`;

const TrustLine = styled(motion.div)`
  margin-top: 4rem;
  display: flex;
  justify-content: center;
  gap: 3rem;
  font-size: 0.9rem;
  opacity: 0.9;
  flex-wrap: wrap;
  color: #F5F1E6;

  span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

// --- SECTIONS shared ---

const SectionLabel = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme?.colors?.honeyGold || '#D4AF37'};
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 1rem;
  background: rgba(212, 175, 55, 0.1);
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
`;

const SectionTitle = styled.h2`
  font-size: 2.8rem;
  font-weight: 800;
  color: ${({ theme }) => theme?.colors?.deepOlive || '#1A1A1A'};
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Paragraph = styled.p`
  color: ${({ theme }) => theme?.colors?.earthBrown || '#4A3B32'};
  line-height: 2;
  font-size: 1.1rem;
  font-weight: 500;
`;

// --- BRAND STORY ---
const BrandStorySection = styled.section`
  padding: 6rem 0;
  background: ${({ theme }) => theme?.colors?.sandBeige || '#F5F1E6'};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background: linear-gradient(to bottom, ${({ theme }) => theme?.colors?.sandBeige || '#F5F1E6'}, transparent);
    pointer-events: none;
  }
`;

const BrandStoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const StoryImage = styled(motion.div)`
  position: relative;
  height: 550px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0,0,0,0.1);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StoryContent = styled(motion.div)``;

// --- VALUES ---
const ValuesSection = styled.div`
  background: ${({ theme }) => theme?.colors?.charcoal || '#F9F7F2'};
  padding: 8rem 0;
  position: relative;
  overflow: hidden;
`;

// 3D Honeycomb Background Component
const HoneycombMesh = ({ mouseX, mouseY }) => {
  // Dampen the movement: Move only 1px for every 20px of mouse movement
  // This ensures the background stays covered even with the 'infinite' 200% size
  const x = useTransform(mouseX, (val) => val / 25);
  const y = useTransform(mouseY, (val) => val / 25);

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        opacity: 0.05,
        zIndex: 0,
        x, // Apply dampened values
        y,
      }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="honeycomb" x="0" y="0" width="56" height="100" patternUnits="userSpaceOnUse">
            <path
              d="M28 66L0 50V16L28 0L56 16V50L28 66L28 100"
              fill="none"
              stroke="#000"
              strokeWidth="0.5"
            />
            <path
              d="M28 0V50"
              fill="none"
              stroke="#000"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#honeycomb)" />
      </svg>
      {/* Subtle Glow Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.05), transparent 70%)',
      }} />
    </motion.div>
  );
};

// Golden Pollen Particles
const PollenParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate particles only on the client to avoid SSR hydration mismatch
    const p = [...Array(15)].map(() => ({
      width: Math.random() * 4 + 2,
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(p);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
      {particles.map((p, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: p.width,
            height: p.width,
            top: p.top,
            left: p.left,
            background: '#D4AF37',
            borderRadius: '50%',
            boxShadow: `0 0 ${p.width * 2}px #D4AF37`,
            opacity: 0.6,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ValueCard = styled(motion.div)`
  text-align: center;
  padding: 3rem 2rem;
  border-radius: 20px;
  background: white;
  border: 1px solid rgba(0,0,0,0.05);
  transition: all 0.4s ease;
  position: relative;
  z-index: 2;
  box-shadow: 0 4px 20px rgba(0,0,0,0.02);

  &:hover {
    transform: translateY(-5px);
    border-color: ${({ theme }) => theme?.colors?.honeyGold || '#D4AF37'};
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  }
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${({ theme }) => theme?.colors?.sandBeige || '#F5F1E6'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: ${({ theme }) => theme?.colors?.deepOlive || '#1A1A1A'};
`;

const ValueTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme?.colors?.deepOlive || '#1A1A1A'};
`;

// --- PRODUCTS ---
const ProductsSection = styled.div`
  padding: 6rem 0;
  background: white;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CategoryCard = styled(motion(Link))`
  position: relative;
  height: 450px;
  border-radius: 20px;
  display: flex;
  align-items: flex-end;
  padding: 2.5rem;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  border: 1px solid rgba(255,255,255,0.1);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 100%);
    transition: all 0.3s;
  }

  &:hover::before {
    background: linear-gradient(to top, rgba(201, 162, 77, 0.9) 0%, rgba(0,0,0,0.3) 100%);
  }
`;

const CategoryContent = styled.div`
  position: relative;
  z-index: 2;
  color: white;
`;

const CategoryTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const CategoryLink = styled.span`
  font-size: 0.95rem;
  opacity: 0.8;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

// --- TESTIMONIALS ---
const TestimonialsSection = styled.div`
  background: ${({ theme }) => theme?.colors?.sandBeige || '#F5F1E6'};
  padding: 6rem 0;
  text-align: center;
`;

const Quote = styled(motion.p)`
  font-size: 1.8rem;
  font-weight: 600;
  max-width: 800px;
  margin: 2rem auto;
  color: ${({ theme }) => theme?.colors?.deepOlive || '#1A1A1A'};
  line-height: 1.8;
  font-family: serif;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const Author = styled.cite`
  font-size: 1.1rem;
  color: ${({ theme }) => theme?.colors?.honeyGold || '#D4AF37'};
  font-style: normal;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Stars = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.25rem;
`;

// ========== COMPONENT ==========
export default function HomePage() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <PageContainer>
      {/* 1. HERO */}
      <HeroSection>
        {/* Background Video */}
        <VideoBackground autoPlay loop muted playsInline>
          <source src="/videos/hero-mobile.mp4" media="(max-width: 768px)" />
          <source src="/videos/hero-desktop.mp4" />
          Your browser does not support the video tag.
        </VideoBackground>
        <VideoOverlay />
        <HeroBottomGradient />

        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            عسل مغربي أصيل
            <span>صُنع بإتقان</span>
          </HeroTitle>

          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            من خلية النحل إلى مائدتك — نقاء طبيعي ومذاق أصيل. اكتشف الذهب السائل من قلب المغرب.
          </HeroSubtitle>

          <CTAButton
            href="/products"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            تسوق الآن
            <ArrowLeft size={20} />
          </CTAButton>

          <TrustLine
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <span><Leaf size={16} /> طبيعي 100%</span>
            <span><Award size={16} /> أصل مغربي</span>
            <span><ShieldCheck size={16} /> جودة مضمونة</span>
          </TrustLine>
        </HeroContent>
      </HeroSection>

      {/* 2. BRAND STORY */}
      <BrandStorySection>
        <ContentWrapper>
          <BrandStoryGrid>
            <StoryImage
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img src="/images/story-texture.png" alt="قصة رودانا" />
            </StoryImage>
            <StoryContent
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <SectionLabel>قصتنا</SectionLabel>
              <SectionTitle>الحكاية وراء رودانا</SectionTitle>
              <Paragraph>
                رودانا هي قصة حب للطبيعة والتراث المغربي الأصيل. نؤمن بأن أجود أنواع العسل تأتي من احترام النحل وبيئته الطبيعية.
              </Paragraph>
              <Paragraph style={{ marginTop: '1.5rem' }}>
                نختار بعناية فائقة كل منتج من منتجاتنا، من المناحل المختارة في جبال الأطلس إلى التعبئة الفاخرة، لنقدم لك تجربة استثنائية.
              </Paragraph>
            </StoryContent>
          </BrandStoryGrid>
        </ContentWrapper>
      </BrandStorySection>

      {/* 3. VALUES - Living Background */}
      {/* 3. VALUES - Living Background */}
      <ValuesSection onMouseMove={handleMouseMove}>
        <HoneycombMesh mouseX={mouseX} mouseY={mouseY} />
        <PollenParticles />

        <ContentWrapper style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <SectionLabel>لماذا رودانا؟</SectionLabel>
            <SectionTitle $light>قيمنا الأساسية</SectionTitle>
          </div>
          <ValuesGrid>
            {[
              { icon: <Leaf size={32} />, title: 'طبيعي ونقي 100%', desc: 'بدون إضافات أو مواد حافظة' },
              { icon: <Hexagon size={32} />, title: 'تربية نحل أخلاقية', desc: 'نحترم النحل وموطنه الطبيعي' },
              { icon: <Activity size={32} />, title: 'صنعة تقليدية', desc: 'طرق موروثة مع معايير حديثة' },
              { icon: <ShieldCheck size={32} />, title: 'مراقبة الجودة', desc: 'فحص مختبري لكل دفعة' },
            ].map((item, i) => (
              <ValueCard
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <IconWrapper>{item.icon}</IconWrapper>
                <ValueTitle>{item.title}</ValueTitle>
                <Paragraph $light style={{ fontSize: '0.95rem' }}>{item.desc}</Paragraph>
              </ValueCard>
            ))}
          </ValuesGrid>
        </ContentWrapper>
      </ValuesSection>

      {/* 5. PRODUCTS */}
      <ProductsSection>
        <ContentWrapper>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <SectionLabel style={{ color: '#C9A24D' }}>مجموعتنا</SectionLabel>
            <SectionTitle $light>كنوز الطبيعة</SectionTitle>
          </div>
          <CategoryGrid>

            {[
              { id: 1, title: 'مجموعة العسل', link: 'اكتشف العسل', bg: 'url(/images/rodana_honey_collection_dark.png)', overlay: 'rgba(0,0,0,0.5)' },
              { id: 2, title: 'حبوب اللقاح', link: 'اكتشف اللقاح', bg: 'url(/images/rodana_bee_pollen_macro.png)', overlay: 'rgba(0,0,0,0.5)' },
              { id: 3, title: 'البروبوليس', link: 'اكتشف البروبوليس', bg: 'url(/images/rodana_propolis_raw.png)', overlay: 'rgba(0,0,0,0.5)' },
            ].map((cat, i) => (
              <CategoryCard
                key={i}
                href={`/products?category=${cat.id}`}
                style={{ backgroundImage: cat.bg }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <CategoryContent>
                  <CategoryTitle>{cat.title}</CategoryTitle>
                  <CategoryLink>{cat.link} <ArrowLeft size={16} /></CategoryLink>
                </CategoryContent>
              </CategoryCard>
            ))}
          </CategoryGrid>
        </ContentWrapper>
      </ProductsSection>

      {/* 6. TESTIMONIALS */}
      <TestimonialsSection>
        <ContentWrapper>
          <Stars>
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} size={24} fill="#C9A24D" color="#C9A24D" />
            ))}
          </Stars>
          <Quote
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            "جودة عسل رودانا استثنائية. ذكّرني بالمذاق الأصيل الذي عرفته في جبال الأطلس. منتج فاخر بحق!"
          </Quote>
          <Author>— سارة م. • الدار البيضاء</Author>
        </ContentWrapper>
      </TestimonialsSection>


    </PageContainer>
  );
}
