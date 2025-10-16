import Hero from '@/components/Hero';
import ValueCards from '@/components/ValueCards';
import ROIBanner from '@/components/ROIBanner';
import Section3D from '@/components/Section3D';
import ROICalculator from '@/components/ROICalculator';
import ProjectShowcase from '@/components/ProjectShowcase';
import ExpertInterview from '@/components/ExpertInterview';
import LeadMagnets from '@/components/LeadMagnets';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ValueCards />
      <ROIBanner />
      <Section3D />
      <ROICalculator />
      <ProjectShowcase />
      <ExpertInterview />
      <LeadMagnets />
    </main>
  );
}
