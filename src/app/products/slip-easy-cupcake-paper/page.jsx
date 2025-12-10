/**
 * @fileOverview The product detail page for Slip-Easy Cupcake Paper.
 */
"use client";

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ProductHero, ProductContent } from '@/components/product-page-ui';
import placeholderImages from '@/lib/placeholder-images.json';

const product = {
    name: "Slip-Easy Cupcake Paper",
    subtitle: "Specialty paper for cupcake liners.",
    description: "Specialty paper for cupcake liners, designed for easy release and baking performance.",
    image: placeholderImages.cupcakePaperHero
};

/**
 * Renders the product detail page for Slip-Easy Cupcake Paper.
 * @returns {JSX.Element} The Slip-Easy Cupcake Paper page component.
 */
export default function SlipEasyCupcakePaperPage() {
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
