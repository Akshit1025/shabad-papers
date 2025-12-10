/**
 * @fileOverview The product detail page for Glassine Paper.
 */
"use client";

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ProductHero, ProductContent } from '@/components/product-page-ui';
import placeholderImages from '@/lib/placeholder-images.json';

const product = {
    name: "Glassine Paper",
    subtitle: "A smooth, glossy, and translucent paper.",
    description: "A smooth, glossy, and translucent paper that is air, water, and grease resistant.",
    image: placeholderImages.glassinePaperHero
};

/**
 * Renders the product detail page for Glassine Paper.
 * @returns {JSX.Element} The Glassine Paper page component.
 */
export default function GlassinePaperPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main>
        <ProductHero title={product.name} subtitle={product.subtitle} />
        <ProductContent 
            productName={product.name}
            description={product.description}
            image={product.image}
        />
      </main>
      <Footer />
    </div>
  );
}
