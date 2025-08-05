"use client"
import Image from "next/image";
import { motion } from "framer-motion";

export function QualityCommitment() {
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -15 },
    visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 120, damping: 12 } }
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
        className="py-16 md:py-24 bg-secondary"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
    >
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div className="flex justify-center" variants={imageVariants}>
                 <Image
                    src="https://placehold.co/400x400.png"
                    alt="Quality seal"
                    data-ai-hint="quality guarantee badge"
                    width={400}
                    height={400}
                    className="rounded-full shadow-2xl"
                  />
            </motion.div>
            <motion.div variants={contentVariants}>
                <motion.h2 variants={itemVariants} className="text-3xl font-headline font-bold md:text-4xl text-primary mb-6">
                  Our Commitment to Quality
                </motion.h2>
                <motion.div className="space-y-4 text-muted-foreground text-lg" variants={itemVariants}>
                   <p>
                        As a dedicated wholesale supplier and importer, our foremost priority has always been the quality of the paper we provide.
                    </p>
                    <p>
                        Our promise is to create long-lasting, high-quality materials and occasions handcrafted for validity and consistency. These factors contribute to quality checks - both before and after production. It also ensures safe and flawless delivery.
                    </p>
                    <p>
                        When it comes to the delivery on time of the products, the process, from careful selection to final dispatch, ensuring that our finished, high-performance paper products reach our end-users.
                    </p>
                </motion.div>
            </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
