/**
 * @fileOverview The product detail page for Food Grade Papers.
 * This page showcases the product with a carousel, detailed descriptions,
 * benefits, applications, and an inquiry form. It also lists the sub-products in this category.
 */
"use client";

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import placeholderImages from '@/lib/placeholder-images.json';
import { ProductInquiryDialog } from '@/components/product-inquiry-dialog';

const benefits = [
    "Certified safe for direct contact with food items.",
    "Prevents grease and oil from seeping through.",
    "Maintains freshness and hygiene of packed goods.",
    "Resistant to moisture, preserving food quality.",
    "Eco-friendly and often biodegradable or recyclable options available."
];

const applications = [
    "Food Wrapping (Burgers, Sandwiches)",
    "Bakery and Confectionery Packaging",
    "Butter and Cheese Wraps",
    "Quick Service Restaurant (QSR) Packaging",
    "Lining for Trays and Boxes"
];

const subProducts = [
  {
    name: 'Slip-Easy Cupcake Paper',
    slug: 'slip-easy-cupcake-paper',
    description: 'Specialty paper for cupcake liners, designed for easy release and baking performance.',
    image: placeholderImages.cupcakePaper,
  },
  {
    name: 'Glassine Paper',
    slug: 'glassine-paper',
    description: 'A smooth, glossy, and translucent paper that is air, water, and grease resistant.',
    image: placeholderImages.glassine,
  },
  {
    name: 'Greaseproof Paper',
    slug: 'greaseproof-paper',
    description: 'Designed to prevent oil and grease from seeping through, ideal for wrapping fatty foods.',
    image: placeholderImages.greaseproof,
  },
  {
    name: 'MG Kraft Paper',
    slug: 'mg-kraft-paper',
    description: 'Machine Glazed Kraft paper with a glossy, smooth finish on one side, great for printing and packaging.',
    image: placeholderImages.mgKraft,
  },
  {
    name: 'MF Kraft Paper',
    slug: 'mf-kraft-paper',
    description: 'Machine Finished Kraft paper with a smooth, natural finish on both sides, valued for its strength.',
    image: placeholderImages.mfKraft,
  },
  {
    name: 'Baking Paper',
    slug: 'baking-paper',
    description: 'A cellulose-based paper with a non-stick surface, widely used in baking and cooking.',
    image: placeholderImages.bakingPaper,
  },
];


/**
 * Renders the product detail page for Food Grade Papers.
 * @returns {JSX.Element} The Food Grade Papers page component.
 */
export default function FoodGradePapersPage() {
  const media = placeholderImages.foodgradeCarousel1;

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main>
        <section className="py-16 md:py-24 bg-secondary/50">
          <div className="container max-w-7xl px-4">
            {/* Page Header */}
            <motion.div
              className="max-w-3xl mb-8"
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
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left Column: Image */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border shadow-lg">
                  <Image
                    src={media.url}
                    alt="Food Grade Paper Image"
                    data-ai-hint={media.aiHint}
                    width={media.width}
                    height={media.height}
                    className="object-cover w-full h-full"
                  />
                </div>
              </motion.div>

              {/* Right Column: Description */}
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                 <div>
                    <h2 className="text-2xl font-headline font-bold text-foreground mb-4">What are Food Grade Papers About?</h2>
                    <p className="text-muted-foreground text-lg">
                        Our food-grade papers are certified safe for direct contact with food, ensuring that your products remain fresh, safe, and beautifully presented. We offer a variety of specialized papers to meet the unique needs of the food and packaging industry, from greaseproof wraps to sturdy container boards. These papers are designed to provide excellent barrier properties, strength, and printability while adhering to the strictest food safety standards.
                    </p>
                </div>
              </motion.div>
            </div>
            
            {/* Benefits & Applications */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 mt-12">
               {/* Benefits */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h3 className="text-2xl font-headline font-bold text-foreground mb-4">Benefits</h3>
                  <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Applications */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h3 className="text-2xl font-headline font-bold text-foreground mb-4">Applications</h3>
                  <div className="flex flex-wrap gap-3">
                    {applications.map((app, index) => (
                      <div key={index} className="bg-primary/10 text-primary font-medium px-3 py-1 rounded-full text-sm">
                        {app}
                      </div>
                    ))}
                  </div>
                </motion.div>
            </div>
             
             {/* Sub-products Grid */}
            <div className="mt-16 md:mt-24">
                <motion.div
                    className="max-w-3xl mx-auto text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-headline font-bold md:text-5xl text-primary">
                        Our Food Grade Paper Products
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Explore our specialized range of papers, each designed for specific food packaging and handling needs.
                    </p>
                    <div className="mt-4 w-24 h-1 bg-primary mx-auto"></div>
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
                            key={product.name}
                            variants={{
                                hidden: { opacity: 0, y: 50 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link href={`/products/${product.slug}`} className="block h-full">
                                <div className="group bg-card h-full rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-border/20 flex flex-col">
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
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>


            {/* Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
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
               <ProductInquiryDialog productName="Food Grade Papers" />
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
