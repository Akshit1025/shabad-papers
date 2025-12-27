/**
 * @fileOverview Reusable UI components for individual product detail pages.
 */
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Grid3X3, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductInquiryDialog } from '@/components/product-inquiry-dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";

/**
 * A styled hero section for a product page.
 * @param {object} props - Component props.
 * @param {string} props.title - The title of the product.
 * @param {string} props.subtitle - The subtitle text.
 * @returns {JSX.Element} The rendered hero section.
 */
export function ProductHero({ title, subtitle }) {
  return (
    <section 
        className="relative bg-secondary/50 py-12 md:py-20 overflow-hidden"
        style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
    >
      <motion.div 
        className="container relative text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-headline font-bold md:text-6xl text-primary">
          {title}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">{subtitle}</p>
      </motion.div>
    </section>
  );
}


/**
 * The main content section for a product page.
 * @param {object} props - Component props.
 * @param {string} props.productName - The name of the product.
 * @param {string} props.description - The product description.
 * @param {Array<object>} props.media - An array of image objects.
 * @param {string} props.categorySlug - The slug of the parent category.
 * @param {string} props.formDefinitionId - The ID for the form definition.
 * @returns {JSX.Element} The rendered content section.
 */
export function ProductContent({ productName, description, media, categorySlug, formDefinitionId }) {
  const plugin = React.useRef(
    Autoplay({ delay: 2500, stopOnInteraction: true })
  );

  const hasCarousel = Array.isArray(media) && media.length > 1;
  const singleImageSrc = Array.isArray(media) && media.length === 1 ? media[0] : null;

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-5xl px-4">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column: Image/Carousel */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
           {hasCarousel ? (
              <Carousel
                className="w-full"
                opts={{ loop: true }}
                plugins={[plugin.current]}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
              >
                <CarouselContent>
                  {media.map((image, index) => (
                    <CarouselItem key={`${image.url}-${index}`}>
                      <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden border shadow-lg">
                        <Image
                          src={image.url}
                          alt={`${productName} Image ${index + 1}`}
                          data-ai-hint={image.aiHint}
                          width={image.width}
                          height={image.height}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
           ) : singleImageSrc ? (
             <div className="rounded-lg overflow-hidden border shadow-lg aspect-w-4 aspect-h-3">
                <Image
                    src={singleImageSrc.url}
                    alt={`${productName} Image`}
                    data-ai-hint={singleImageSrc.aiHint}
                    width={singleImageSrc.width}
                    height={singleImageSrc.height}
                    className="object-cover w-full h-full"
                />
             </div>
           ) : null}
          </motion.div>

          {/* Right Column: Description */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
             <div>
                <h2 className="text-3xl font-headline font-bold text-foreground mb-4">{productName}</h2>
                <p className="text-muted-foreground text-lg whitespace-pre-line">
                    {description}
                </p>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {categorySlug && (
            <Button asChild size="lg" variant="outline">
              <Link href={`/products/${categorySlug}`}>
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Parent Category
              </Link>
            </Button>
          )}
          <Button asChild size="lg" variant="outline">
            <Link href="/products">
              <Grid3X3 className="mr-2 h-5 w-5" />
              View All Categories
            </Link>
          </Button>
          <ProductInquiryDialog productName={productName} formDefinitionId={formDefinitionId} />
        </motion.div>
      </div>
    </section>
  );
}
