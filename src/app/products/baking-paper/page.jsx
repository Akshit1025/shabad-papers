/**
 * @fileOverview The product detail page for Baking Paper.
 */
"use client";

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ProductHero, ProductContent } from '@/components/product-page-ui';
import placeholderImages from '@/lib/placeholder-images.json';

const product = {
    name: "Baking Paper",
    subtitle: "Detailed information about our baking paper.",
    description: "Provides a non-stick surface during baking for roasting. It reduces clean-up time and ensures even cooking. Ideal for kitchens and bakeries handling large volumes of baked goods.",
    image: placeholderImages.bakingPaperHero
};

/**
 * Renders the product detail page for Baking Paper.
 * @returns {JSX.Element} The Baking Paper page component.
 */
export default function BakingPaperPage() {
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