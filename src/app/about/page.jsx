/**
 * @fileOverview The "About Us" page of the application.
 * This page provides detailed information about the company,
 * its philosophy, leadership, and commitment to quality.
 */
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AboutHero } from '@/components/sections/about-hero';
import { Glance } from '@/components/sections/glance';
import { Philosophy } from '@/components/sections/philosophy';
import { Leadership } from '@/components/sections/leadership';
import { CompanyProfile } from '@/components/sections/company-profile';
import { WhyUs } from '@/components/sections/why-us';
import { QualityCommitment } from '@/components/sections/quality-commitment';

/**
 * Renders the About Us page, which is composed of several informational sections.
 * @returns {JSX.Element} The About Us page component.
 */
export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main>
        <AboutHero />
        <Glance />
        <Philosophy />
        <Leadership />
        <CompanyProfile />
        <WhyUs />
        <QualityCommitment />
      </main>
      <Footer />
    </div>
  );
}
