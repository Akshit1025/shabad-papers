"use client"
import Image from "next/image";
import { motion } from "framer-motion";


export function AboutHero() {
  return (
    <section className="relative bg-secondary py-20 md:py-32 overflow-hidden">
       <div className="absolute inset-0 opacity-5">
         <Image 
            src="https://placehold.co/1920x1080.png"
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
          About Shabad Papers
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Your trusted partner in the paper trading industry since 2022.
        </p>
      </motion.div>
    </section>
  );
}
