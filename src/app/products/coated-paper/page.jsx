/**
 * @fileOverview The product detail page for Coated Paper.
 * This page showcases the product with a carousel, detailed descriptions,
 * benefits, applications, and an inquiry form.
 */
"use client";

import React from 'react';
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
import Autoplay from "embla-carousel-autoplay";

const benefits = [
    "Produces exceptionally sharp and vibrant printed images.",
    "Offers a smooth, professional feel in various finishes (gloss, matte, silk).",
    "Excellent ink holdout for crisp text and graphics.",
    "Durable and resistant to dirt and moisture.",
    "Enhances the perceived quality of printed materials."
];

const applications = [
    "Magazines and Catalogs",
    "Brochures and Flyers",
    "High-Quality Photo Printing",
    "Annual Reports",
    "Book Covers and Jackets"
];

/**
 * Renders the product detail page for Coated Paper.
 * @returns {JSX.Element} The Coated Paper page component.
 */
export default function CoatedPaperPage() {
  const media = [
    placeholderImages.coatedCarousel1,
    placeholderImages.coatedCarousel2,
    placeholderImages.coatedCarousel3,
  ];

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );


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
                Coated Paper
              </h1>
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left Column: Carousel */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <Carousel 
                  className="w-full" 
                  opts={{ loop: true }}
                  plugins={[plugin.current]}
                  onMouseEnter={plugin.current.stop}
                  onMouseLeave={plugin.current.reset}
                >
                  <CarouselContent>
                    {media.map((item, index) => (
                      <CarouselItem key={index}>
                        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border shadow-lg">
                          <Image
                            src={item.url}
                            alt={`Coated Paper Image ${index + 1}`}
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
              </motion.div>

              {/* Right Column: Description */}
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                 <div>
                    <h2 className="text-2xl font-headline font-bold text-foreground mb-4">What is Coated Paper About?</h2>
                    <p className="text-muted-foreground text-lg">
                        Coated paper has a glossy or matte finish applied to its surface, making it ideal for high-quality printing. The coating restricts ink absorption, allowing for sharper, more vibrant images and text. It's the standard for magazines, brochures, and high-end marketing materials where visual quality is paramount.
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
               <ProductInquiryDialog productName="Coated Paper" />
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
