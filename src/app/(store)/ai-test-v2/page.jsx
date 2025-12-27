'use client';

import styled from 'styled-components';
import AIRecommendations from '../components/AIRecommendations';
import Bee3D from '@/app/components/Bee3D';
import { Sparkles, Brain, Zap, ShieldCheck, ArrowLeft, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme?.colors?.backgroundLight || '#FAFAFA'};
`;

const HeroSection = styled.section`
  background: ${({ theme }) => theme?.gradients?.gold || 'linear-gradient(135deg, #FFD700 0%, #F4A300 50%, #D68910 100%)'};
  padding: 4rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
  border-radius: 0 0 50px 50px;
  box-shadow: 0 10px 30px rgba(244, 163, 0, 0.2);
  
  @media (min-width: 768px) {
    padding: 6rem 2rem;
    flex-direction: row;
    text-align: right;
    gap: 4rem;
  }
`;

const HeroContent = styled.div`
  max-width: 600px;
  z-index: 2;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
  
  span {
    color: #1A1A1A;
  }
  
  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.95;
  margin-bottom: 2.5rem;
  line-height: 1.6;
`;

const BeeContainer = styled.div`
  width: 300px;
  height: 300px;
  z-index: 2;
  
  @media (min-width: 768px) {
    width: 450px;
    height: 450px;
  }
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: #1A1A1A;
  color: white;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1.1rem;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.4);
    background: #000;
  }
`;

const Section = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 24px;
  border: 1px solid rgba(244, 163, 0, 0.1);
  box-shadow: ${({ theme }) => theme?.shadows?.sm || '0 4px 12px rgba(0,0,0,0.05)'};
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme?.shadows?.lg || '0 12px 24px rgba(0,0,0,0.1)'};
  }
  
  .icon-wrapper {
    width: 50px;
    height: 50px;
    background: ${({ theme }) => theme?.colors?.primaryLight || '#FFF5E6'};
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme?.colors?.primary || '#F4A300'};
  }
  
  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #2C2C2C;
  }
  
  p {
    color: #666;
    line-height: 1.6;
    font-size: 0.95rem;
  }
`;

const UserProfileSelector = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 24px;
  margin-bottom: 3rem;
  border: 1px solid rgba(244, 163, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const UserInfo = styled.div`
  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  p {
    color: #666;
  }
`;

const ProfileButtons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ProfileButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  border: 2px solid ${({ $active }) => $active ? '#F4A300' : '#eee'};
  background: ${({ $active }) => $active ? '#FFF5E6' : 'white'};
  color: ${({ $active }) => $active ? '#F4A300' : '#666'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #F4A300;
  }
`;

export default function EnhancedTestPage() {
    const [activeUser, setActiveUser] = useState('ahmed');

    const users = [
        { id: 'ahmed', name: 'أحمد', interest: 'عسل السدر والمناعة' },
        { id: 'sara', name: 'سارة', interest: 'عسل الليمون والجمال' },
        { id: 'omar', name: 'عمر', interest: 'عسل الزعتر والجهاز الهضمي' },
    ];

    return (
        <PageContainer>
            {/* Hero Section with 3D Bee */}
            <HeroSection>
                <HeroContent>
                    <HeroTitle>
                        تجربة <span>الذكاء الاصطناعي</span> في RodixCloud
                    </HeroTitle>
                    <HeroSubtitle>
                        نحن نستخدم أحدث تقنيات الـ AI لتقديم تجربة تسوق مخصصة لك.
                        النحلة "العواد" ومحرك التوصيات يعملان معاً لفهم احتياجاتك.
                    </HeroSubtitle>
                    <CTAButton href="/products">
                        <ShoppingBag size={20} />
                        ابدأ التسوق الذكي
                    </CTAButton>
                </HeroContent>

                <BeeContainer>
                    <Bee3D isActive={true} />
                </BeeContainer>
            </HeroSection>

            <Section>
                {/* Features Grid */}
                <FeatureGrid>
                    <FeatureCard>
                        <div className="icon-wrapper"><Brain size={24} /></div>
                        <h3>محرك توصيات متطور</h3>
                        <p>خوارزميات Hybrid Filtering تحلل سلوكك لتقديم أفضل منتجات العسل المناسبة لك.</p>
                    </FeatureCard>
                    <FeatureCard>
                        <div className="icon-wrapper"><Zap size={24} /></div>
                        <h3>سرعة فائقة</h3>
                        <p>يتم جلب التوصيات في أقل من 100ms لضمان تجربة مستخدم سلسة وسريعة.</p>
                    </FeatureCard>
                    <FeatureCard>
                        <div className="icon-wrapper"><ShieldCheck size={24} /></div>
                        <h3>دقة في الاختيار</h3>
                        <p>النظام يفهم الفرق بين أنواع العسل وفوائدها العلاجية ليقترح لك الأنسب.</p>
                    </FeatureCard>
                </FeatureGrid>

                {/* AI Testing Section */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>
                        اختبر <span>قوة الـ AI</span> بنفسك
                    </h2>
                    <p style={{ color: '#666', maxWidth: '700px', margin: '0 auto' }}>
                        اختر ملف مستخدم مختلف لترى كيف تتغير التوصيات الذكية فوراً بناءً على اهتمامات كل شخص.
                    </p>
                </div>

                <UserProfileSelector>
                    <UserInfo>
                        <h3>👤 ملف المستخدم الحالي</h3>
                        <p>الاهتمامات: {users.find(u => u.id === activeUser)?.interest}</p>
                    </UserInfo>
                    <ProfileButtons>
                        {users.map(user => (
                            <ProfileButton
                                key={user.id}
                                $active={activeUser === user.id}
                                onClick={() => setActiveUser(user.id)}
                            >
                                {user.name}
                            </ProfileButton>
                        ))}
                    </ProfileButtons>
                </UserProfileSelector>

                {/* The AI Recommendations Component */}
                <div style={{ background: 'white', padding: '2rem', borderRadius: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                    <AIRecommendations userId={activeUser} limit={4} />
                </div>

                <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                    <Link href="/ai-demo" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#F4A300', fontWeight: 600 }}>
                        <ArrowLeft size={18} />
                        العودة لصفحة الديمو البسيطة
                    </Link>
                </div>
            </Section>
        </PageContainer>
    );
}
