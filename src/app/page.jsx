/**
 * @fileOverview The main landing page of the application.
 * It serves as the entry point for visitors, showcasing key sections
 * like the hero, about, and core strengths of the company.
 */
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { CoreStrengths } from '@/components/sections/core-strengths';

/**
 * Renders the Home page.
 * @returns {JSX.Element} The Home page component.
 */
export default function HomePage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <CoreStrengths />
      </main>
      <Footer />
    </div>
  );
}
