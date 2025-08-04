import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Products } from '@/components/sections/products';
import { AiSuggestion } from '@/components/sections/ai-suggestion';
import { Certifications } from '@/components/sections/certifications';
import { Contact } from '@/components/sections/contact';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <Products />
        <AiSuggestion />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
