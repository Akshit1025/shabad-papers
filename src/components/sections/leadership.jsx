/**
 * @fileOverview The "Our Leadership" section for the About Us page.
 * It features a quote and a brief description of the company's leadership.
 */
"use client"
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

/**
 * A section dedicated to the company's leadership.
 * @returns {JSX.Element} The rendered leadership section component.
 */
export function Leadership() {
    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
    };
    const contentVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, staggerChildren: 0.2 } }
    };
     const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

  return (
    <motion.section 
        className="py-16 md:py-24 bg-background"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
    >
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={imageVariants}>
                 <Image
                    src="/images/sp-logo.png"
                    alt="Shabad Papers Logo Graphic"
                    data-ai-hint="company logo"
                    width={500}
                    height={500}
                    className="rounded-lg shadow-2xl object-cover mx-auto"
                  />
            </motion.div>
            <motion.div variants={contentVariants}>
                <motion.h2 variants={itemVariants} className="text-3xl font-headline font-bold md:text-4xl text-primary mb-6">
                  Our Leadership
                </motion.h2>
                <motion.div variants={itemVariants} className="relative bg-secondary p-6 rounded-lg mb-6">
                    <FontAwesomeIcon icon={faQuoteLeft} className="absolute -top-3 -left-3 h-10 w-10 text-primary/20" />
                    <blockquote className="text-lg text-foreground italic">
                        "It's not about how many years you've worked - it's about how much those years have taught you."
                    </blockquote>
                    <p className="text-right mt-2 text-muted-foreground">- Dinesh Gupta</p>
                </motion.div>
                <motion.p variants={itemVariants} className="text-muted-foreground text-lg">
                    Our leadership's insightful experience in the financial, trading, and export-import sectors, combined with a passion for excellence, drives us to deliver products that consistently shape our core business in quality, trust, and long-term vision.
                </motion.p>
            </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
