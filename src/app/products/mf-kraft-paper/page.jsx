/**
 * @fileOverview The product detail page for MF Kraft Paper.
 */
"use client";

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ProductHero, ProductContent } from '@/components/product-page-ui';
import placeholderImages from '@/lib/placeholder-images.json';

const product = {
    name: "MF Kraft Paper",
    subtitle: "Machine Finished Kraft paper with a smooth, natural finish.",
    description: "Machine Finished Kraft paper with a smooth, natural finish on both sides, valued for its strength.",
    image: placeholderImages.mfKraftPaperHero
};

/**
 * Renders the product detail page for MF Kraft Paper.
 * @returns {JSX.Element} The MF Kraft Paper page component.
 */
export default function MFKraftPaperPage() {
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
