/**
 * @fileOverview The hero section for the "About Us" page.
 * Displays a large heading and a brief tagline.
 */
"use client"
import Image from "next/image";
import { motion } from "framer-motion";

/**
 * The hero section for the About page.
 * @returns {JSX.Element} The rendered hero section component.
 */
export function AboutHero() {
  return (
    <section className="relative bg-secondary py-20 md:py-32 overflow-hidden">
       <div className="absolute inset-0 opacity">
         <Image 
            src="/images/about/about-us-banner.jpg"
            alt="Paper texture background"
            data-ai-hint="paper texture"
            fill
            className="object-cover"
          />
       </div>
      <motion.div 
        className="container relative text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-4xl font-headline font-bold md:text-6xl text-primary">
          About Us
        </h1>
      </motion.div>
    </section>
  );
}
