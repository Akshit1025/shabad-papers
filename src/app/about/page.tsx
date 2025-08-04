import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { About } from '@/components/sections/about';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main>
        <About />
      </main>
      <Footer />
    </div>
  );
}
