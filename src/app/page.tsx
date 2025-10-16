import Hero from '@/components/Hero';
import ValueCards from '@/components/ValueCards';
import KpiStrip from '@/components/KpiStrip';
import ProjectShowcase from '@/components/ProjectShowcase';
import LeadMagnets from '@/components/LeadMagnets';
import Testimonials from '@/components/Testimonials';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ValueCards />
      <KpiStrip />
      <ProjectShowcase />
      <Testimonials />
      <LeadMagnets />
    </main>
  );
}
