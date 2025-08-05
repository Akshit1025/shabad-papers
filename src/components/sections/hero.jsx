"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="hero" className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Paper factory background"
          data-ai-hint="paper texture"
          fill
          className="object-cover"
          priority
        />
      </motion.div>
      <motion.div 
        className="relative z-20 container px-4 space-y-6 text-white"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-4xl font-headline font-bold md:text-6xl drop-shadow-lg"
          variants={itemVariants}
        >
          Quality Paper for Every Purpose
        </motion.h1>
        <motion.p 
          className="max-w-3xl mx-auto text-lg md:text-xl text-white/90 drop-shadow-sm"
          variants={itemVariants}
        >
          Shabad Papers: Your trusted partner in paper trading and wholesale supply.
        </motion.p>
        <motion.div 
          className="space-x-4"
          variants={itemVariants}
        >
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/contact">Get a Quote</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
            <Link href="/about">Learn More</Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
