import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { CoreStrengths } from '@/components/sections/core-strengths';
import { HomepageContact } from '@/components/sections/homepage-contact';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <CoreStrengths />
        <HomepageContact />
      </main>
      <Footer />
    </div>
  );
}
