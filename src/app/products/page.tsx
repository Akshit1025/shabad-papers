import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Products } from '@/components/sections/products';

export default function ProductsPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main>
        <Products />
      </main>
      <Footer />
    </div>
  );
}
