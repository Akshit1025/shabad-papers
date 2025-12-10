/**
 * @fileOverview The product detail page for MG Kraft Paper.
 */
"use client";

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ProductHero, ProductContent } from '@/components/product-page-ui';
import placeholderImages from '@/lib/placeholder-images.json';

const product = {
    name: "MG Kraft Paper",
    subtitle: "Machine Glazed Kraft paper with a glossy, smooth finish.",
    description: "Machine Glazed Kraft paper with a glossy, smooth finish on one side, great for printing and packaging.",
    image: placeholderImages.mgKraftPaperHero
};

/**
 * Renders the product detail page for MG Kraft Paper.
 * @returns {JSX.Element} The MG Kraft Paper page component.
 */
export default function MGKraftPaperPage() {
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
