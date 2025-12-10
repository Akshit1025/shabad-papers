/**
 * @fileOverview The product detail page for Greaseproof Paper.
 */
"use client";

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ProductHero, ProductContent } from '@/components/product-page-ui';
import placeholderImages from '@/lib/placeholder-images.json';

const product = {
    name: "Greaseproof Paper",
    subtitle: "Ideal for wrapping fatty foods.",
    description: "Designed to prevent oil and grease from seeping through, ideal for wrapping fatty foods.",
    image: placeholderImages.greaseproofPaperHero
};

/**
 * Renders the product detail page for Greaseproof Paper.
 * @returns {JSX.Element} The Greaseproof Paper page component.
 */
export default function GreaseproofPaperPage() {
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
