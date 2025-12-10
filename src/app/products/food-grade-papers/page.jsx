/**
 * @fileOverview The product category page for Food Grade Papers.
 * This page displays all the sub-products available in this category.
 */
"use client";

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import placeholderImages from '@/lib/placeholder-images.json';

const subProducts = [
  {
    name: 'Bleached Kraft Paper',
    slug: 'bleached-kraft-paper',
    description: 'A clean, white paper ideal for applications requiring high strength and printability.',
    image: placeholderImages.bleachedKraft,
  },
  {
    name: 'Unbleached Kraft Paper',
    slug: 'unbleached-kraft-paper',
    description: 'A strong, brown paper known for its durability and tear resistance, perfect for heavy-duty packaging.',
    image: placeholderImages.unbleachedKraft,
  },
  {
    name: 'Greaseproof Paper',
    slug: 'greaseproof-paper',
    description: 'A barrier paper that prevents oil and grease from seeping through, ideal for food wrapping.',
    image: placeholderImages.greaseproof,
  },
  {
    name: 'Glassine Paper',
    slug: 'glassine-paper',
    description: 'A smooth, glossy, and translucent paper that is resistant to air, water, and grease.',
    image: placeholderImages.glassine,
  },
  {
    name: 'Parchment Paper',
    slug: 'parchment-paper',
    description: 'A non-stick, heat-resistant paper used in baking and cooking to prevent food from sticking to pans.',
    image: placeholderImages.parchment,
  },
    {
    name: 'Poster Paper',
    slug: 'poster-paper',
    description: 'A versatile, lightweight paper suitable for various applications including posters and wrapping.',
    image: placeholderImages.poster,
  },
];

/**
 * Renders the Food Grade Papers category page.
 * @returns {JSX.Element} The Food Grade Papers category page component.
 */
export default function FoodGradePapersPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main>
        <section className="py-16 md:py-24 bg-secondary/50">
          <div className="container max-w-7xl px-4">
            {/* Page Header */}
            <motion.div
              className="max-w-3xl mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button asChild variant="ghost" className="mb-4 pl-1">
                <Link href="/products">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Products
                </Link>
              </Button>
              <h1 className="text-4xl font-headline font-bold md:text-6xl text-primary">
                Food Grade Papers
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Our food-grade papers are certified safe for direct contact with food, ensuring that your products remain fresh, safe, and beautifully presented. We offer a variety of specialized papers to meet the unique needs of the food and packaging industry.
              </p>
            </motion.div>

             <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ staggerChildren: 0.2 }}
            >
              {subProducts.map((product, index) => (
                <motion.div
                  key={product.slug}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="group bg-card h-full rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-border/20 flex flex-col">
                    <div className="relative w-full h-56">
                      <Image
                        src={product.image.url}
                        alt={product.name}
                        data-ai-hint={product.image.aiHint}
                        width={product.image.width}
                        height={product.image.height}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-headline font-bold mb-2 text-foreground">
                        {product.name}
                      </h3>
                      <p className="text-muted-foreground text-sm flex-grow">
                        {product.description}
                      </p>
                       <div className="mt-4 text-primary font-semibold text-sm flex items-center">
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>


            {/* Action Buttons */}
            <motion.div 
              className="flex items-center justify-center gap-4 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button asChild size="lg" variant="outline">
                <Link href="/products">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  View All Products
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
