import Hero from '@/components/Hero';
import ValueCards from '@/components/ValueCards';
import KpiStrip from '@/components/KpiStrip';
import Section3D from '@/components/Section3D';
import ROICalculator from '@/components/ROICalculator';
import ProjectShowcase from '@/components/ProjectShowcase';
import LeadMagnets from '@/components/LeadMagnets';
import Testimonials from '@/components/Testimonials';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ValueCards />
      <KpiStrip />
      <Section3D />
      <ROICalculator />
      <ProjectShowcase />
      <Testimonials />
      <LeadMagnets />
    </main>
  );
}
