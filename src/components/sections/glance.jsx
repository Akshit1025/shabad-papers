/**
 * @fileOverview "A Glance at Shabad Papers" section for the About Us page.
 * Provides a brief overview of the company's history and mission.
 */
"use client"
import Image from "next/image";
import { motion } from "framer-motion";

/**
 * A section giving a quick glance at the company.
 * @returns {JSX.Element} The rendered glance section component.
 */
export function Glance() {
    const textVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
    };
    const imageVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
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
          <motion.div variants={textVariants}>
            <h2 className="text-3xl font-headline font-bold md:text-4xl text-primary mb-6">
              A Glance at Shabad Papers
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg">
                <p>
                    Established in 2022, Shabad Papers is an emerging importer, trader, and wholesale supplier of high-quality carbonless paper and food grade paper. Known for our steadfast quality and clean, centric approach, our products are trusted across industries for their reliability and performance.
                </p>
                 <p>
                    Our success is built on strong, long-term relationships with clients. A mark of our success, our customer retention is really good. From inception, we have carefully sourced and selected the best to meet our customers' varied requirements, main procurement being high-grade products in the whole range of colors.
                </p>
            </div>
          </motion.div>
          <motion.div variants={imageVariants}>
             <Image
                src="https://placehold.co/600x400.png"
                alt="Close up of a notebook"
                data-ai-hint="notebook paper"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl object-cover"
              />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
