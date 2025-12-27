'use client';

import styled from 'styled-components';
import AIRecommendations from '../components/AIRecommendations';
import StoreHeader from '../components/StoreHeader';
import StoreFooter from '../components/StoreFooter';
import { Sparkles, Brain, Zap, ShieldCheck } from 'lucide-react';

const PageContainer = styled.div`
  min-height: 100vh;
  background: #FAFAFA;
`;

const Content = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
`;

const DemoHeader = styled.div`
  background: linear-gradient(135deg, #1a1a1a 0%, #333 100%);
  color: white;
  padding: 4rem 1.5rem;
  text-align: center;
  border-radius: 0 0 40px 40px;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  
  span {
    color: #F4A300;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.8;
  max-width: 700px;
  margin: 0 auto;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  svg {
    margin-bottom: 1rem;
    color: #F4A300;
  }
  
  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 0.9rem;
    opacity: 0.7;
  }
`;

export default function AIDemoPage() {
    return (
        <PageContainer>
            <StoreHeader />

            <DemoHeader>
                <Title>
                    <Brain size={48} color="#F4A300" />
                    Rodix<span>AI</span> Integration Test
                </Title>
                <Subtitle>
                    هذه الصفحة مخصصة لاختبار نظام التوصيات الذكي المدمج مع واجهة الفريق.
                    النظام يتعلم من سلوكك ويقترح عليك أفضل المنتجات.
                </Subtitle>

                <StatsGrid>
                    <StatCard>
                        <Zap size={24} />
                        <h3>توصيات فورية</h3>
                        <p>تحليل البيانات في أقل من 100ms</p>
                    </StatCard>
                    <StatCard>
                        <Brain size={24} />
                        <h3>تعلم عميق</h3>
                        <p>خوارزميات Hybrid Filtering متطورة</p>
                    </StatCard>
                    <StatCard>
                        <ShieldCheck size={24} />
                        <h3>دقة عالية</h3>
                        <p>توصيات مخصصة حسب اهتماماتك</p>
                    </StatCard>
                </StatsGrid>
            </DemoHeader>

            <Content>
                {/* Testing with different user profiles */}
                <div style={{ marginBottom: '4rem' }}>
                    <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', borderLeft: '5px solid #F4A300', marginBottom: '2rem' }}>
                        <h3 style={{ marginBottom: '0.5rem' }}>👤 ملف المستخدم: أحمد (مهتم بالإلكترونيات)</h3>
                        <p style={{ color: '#666' }}>يتم جلب هذه التوصيات مباشرة من محرك الـ AI المتقدم.</p>
                    </div>
                    <AIRecommendations userId="ahmed" limit={4} />
                </div>

                <div style={{ marginBottom: '4rem' }}>
                    <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', borderLeft: '5px solid #F4A300', marginBottom: '2rem' }}>
                        <h3 style={{ marginBottom: '0.5rem' }}>👤 ملف المستخدم: سارة (مهتمة بالملابس)</h3>
                        <p style={{ color: '#666' }}>لاحظ كيف تتغير التوصيات لتناسب اهتمامات سارة.</p>
                    </div>
                    <AIRecommendations userId="sara" limit={4} />
                </div>

                <div style={{ marginBottom: '4rem' }}>
                    <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', borderLeft: '5px solid #F4A300', marginBottom: '2rem' }}>
                        <h3 style={{ marginBottom: '0.5rem' }}>👤 ملف المستخدم: عمر (مهتم بالكتب والبرمجة)</h3>
                        <p style={{ color: '#666' }}>النظام يحلل الكلمات الدلالية (Tags) والوصف ليجد أفضل الكتب.</p>
                    </div>
                    <AIRecommendations userId="omar" limit={4} />
                </div>
            </Content>

            <StoreFooter />
        </PageContainer>
    );
}
