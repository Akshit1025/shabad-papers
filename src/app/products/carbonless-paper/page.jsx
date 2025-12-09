/**
 * @fileOverview The product detail page for Carbonless Paper.
 * This page showcases the product with a carousel, detailed descriptions,
 * benefits, applications, and an inquiry form.
 */
"use client";

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import placeholderImages from '@/lib/placeholder-images.json';
import { ProductInquiryDialog } from '@/components/product-inquiry-dialog';

const benefits = [
    "Creates instant, clean duplicates without messy carbon sheets.",
    "Produces clear, legible, and fade-resistant copies.",
    "Provides a professional look for all business forms.",
    "Saves time and increases efficiency in documentation.",
    "Tamper-evident copies for better record security."
];

const applications = [
    "Invoices and Receipts",
    "Purchase Orders",
    "Delivery Notes and Challans",
    "Application Forms",
    "Contracts and Agreements"
];

/**
 * Renders the product detail page for Carbonless Paper.
 * @returns {JSX.Element} The Carbonless Paper page component.
 */
export default function CarbonlessPaperPage() {
  const media = [
    placeholderImages.carbonlessCarousel1,
    placeholderImages.carbonlessCarousel2,
    placeholderImages.carbonlessCarousel3,
  ];

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main>
        <section className="py-16 md:py-24 bg-secondary/50">
          <div className="container px-4">
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
                Carbonless Paper
              </h1>
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
              {/* Left Column: Carousel & Description */}
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <Carousel className="w-full">
                  <CarouselContent>
                    {media.map((item, index) => (
                      <CarouselItem key={index}>
                        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border shadow-lg">
                          <Image
                            src={item.url}
                            alt={`Carbonless Paper Image ${index + 1}`}
                            data-ai-hint={item.aiHint}
                            width={item.width}
                            height={item.height}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>
                
                <div>
                    <h2 className="text-2xl font-headline font-bold text-foreground mb-4">What is Carbonless Paper About?</h2>
                    <p className="text-muted-foreground text-lg">
                        This is a speciality documentation paper used to create duplicate copies without carbon inserts. With surface-reactive coatings, it transfers written or printed information across sheets via applied pressure.
                    </p>
                </div>
              </motion.div>

              {/* Right Column: Benefits & Applications */}
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                {/* Benefits */}
                <div>
                  <h3 className="text-2xl font-headline font-bold text-foreground mb-4">Benefits</h3>
                  <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Applications */}
                <div>
                  <h3 className="text-2xl font-headline font-bold text-foreground mb-4">Applications</h3>
                  <div className="flex flex-wrap gap-3">
                    {applications.map((app, index) => (
                      <div key={index} className="bg-primary/10 text-primary font-medium px-3 py-1 rounded-full text-sm">
                        {app}
                      </div>
                    ))}
                  </div>
                </div>
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
               <ProductInquiryDialog productName="Carbonless Paper" />
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
