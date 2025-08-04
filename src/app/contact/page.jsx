import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Contact } from '@/components/sections/contact';

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
