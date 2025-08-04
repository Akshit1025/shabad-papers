import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Certifications } from '@/components/sections/certifications';

export default function CertificationsPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main>
        <Certifications />
      </main>
      <Footer />
    </div>
  );
}
