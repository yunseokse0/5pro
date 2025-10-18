import HeroPrimary from '@/components/5pro/HeroPrimary';
import QuickEstimate from '@/components/5pro/QuickEstimate';
import ProcessSteps from '@/components/5pro/ProcessSteps';
import SolutionCards from '@/components/5pro/SolutionCards';
import TransparencyTeaser from '@/components/5pro/TransparencyTeaser';
import CaseGrid from '@/components/5pro/CaseGrid';
import EnterpriseCTA from '@/components/5pro/EnterpriseCTA';
import FAQAccordion from '@/components/5pro/FAQAccordion';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* 1. Hero Section: 훅업 & 신뢰 구축 */}
      <HeroPrimary />
      
      {/* 2. Quick Quote: 고객의 가장 큰 고민 즉시 해결 */}
      <QuickEstimate />
      
      {/* 3. Process: 서비스 이용의 편리성 증명 */}
      <ProcessSteps />
      
      {/* 4. Core Value: 4가지 핵심 서비스 (차별점) */}
      <SolutionCards />
      
      {/* 5. Transparency Teaser: 투명 관리 시스템 강조 */}
      <TransparencyTeaser />
      
      {/* 6. Social Proof: 성공 사례 */}
      <CaseGrid />
      
      {/* 7. Final CTA: 최종 전환 유도 */}
      <EnterpriseCTA />
      
      {/* 8. FAQ: 마지막 의문 해소 */}
      <FAQAccordion />
    </main>
  );
}
