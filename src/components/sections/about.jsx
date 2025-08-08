/**
 * @fileOverview A brief "About" section for the homepage.
 * It provides a short introduction to the company and a link to the full about page.
 */
"use client"
import { Button } from "../ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

/**
 * The About section component.
 * @returns {JSX.Element} The rendered About section.
 */
export function About() {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <motion.section 
      id="about" 
      className="py-16 md:py-24 bg-secondary"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ staggerChildren: 0.2 }}
    >
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center">
            <motion.div className="space-y-4" variants={variants}>
                <h2 className="text-3xl font-headline font-bold md:text-5xl text-primary">Welcome to Shabad Papers</h2>
                <p className="text-muted-foreground text-lg">
                    Founded in 2022, Shabad Papers has grown into a trusted name in the import and wholesale trade of premium carbonless papers and food-grade papers. We are proud to be recognised for our consistent quality, reliability, and service excellence.
                </p>
                <p className="text-muted-foreground text-lg">
                    At the heart of our business is a deep commitment to building long-term relationships. Our loyal clientele is a reflection of our integrity, responsiveness, and client-first approach. Every product we offer is carefully selected to meet the evolving needs of our customers, ensuring quality at every step.
                </p>
                 <Button asChild>
                    <Link href="/about">Learn More</Link>
                </Button>
            </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
