import HeroPrimary from '@/components/5pro/HeroPrimary';
import QuickEstimate from '@/components/5pro/QuickEstimate';
import ProcessSteps from '@/components/5pro/ProcessSteps';
import StakeholderTiles from '@/components/5pro/StakeholderTiles';
import PartnerLogoStrip from '@/components/5pro/PartnerLogoStrip';
import SolutionCards from '@/components/5pro/SolutionCards';
import CaseGrid from '@/components/5pro/CaseGrid';
import KPIStats from '@/components/5pro/KPIStats';
import EnterpriseCTA from '@/components/5pro/EnterpriseCTA';
import FAQAccordion from '@/components/5pro/FAQAccordion';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroPrimary />
      <QuickEstimate />
      <ProcessSteps />
      <StakeholderTiles />
      <PartnerLogoStrip />
      <SolutionCards />
      <CaseGrid />
      <KPIStats />
      <EnterpriseCTA />
      <FAQAccordion />
    </main>
  );
}
