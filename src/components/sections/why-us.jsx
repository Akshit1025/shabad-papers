"use client"
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye, faHandshake, faShippingFast, faTasks, faUsersCog, faVials } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";


const whyUsPoints = [
    { icon: faBullseye, text: "Prompt and reliable delivery" },
    { icon: faHandshake, text: "Honest and transparent business practices" },
    { icon: faShippingFast, text: "Competitively priced bidding with technically advanced products" },
    { icon: faTasks, text: "Well-managed and client-friendly policies and services" },
    { icon: faUsersCog, text: "Consultant-backed, quality-assured firm with skilled employees" },
];

export function WhyUs() {
    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } }
    };
    const itemVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0 }
    };

  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-headline font-bold md:text-4xl text-primary mb-6">
              Why Us?
            </motion.h2>
             <motion.p variants={itemVariants} className="text-muted-foreground text-lg mb-8">
                Over the years, we have established a reputation for providing a comprehensive and reliable range of paper solutions tailored to our clients' specific needs. The following key strengths drive our continued success:
            </motion.p>
            <ul className="space-y-4">
                {whyUsPoints.map((point) => (
                    <motion.li key={point.text} className="flex items-start gap-4" variants={itemVariants}>
                        <FontAwesomeIcon icon={point.icon} className="h-6 w-6 text-primary mt-1" />
                        <span className="text-lg text-foreground">{point.text}</span>
                    </motion.li>
                ))}
            </ul>
          </motion.div>
          <motion.div 
            className="flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 bg-primary/10 rounded-full flex items-center justify-center">
                     <FontAwesomeIcon icon={faVials} className="h-32 w-32 text-primary opacity-20" />
                </div>
                 <p className="relative text-8xl md:text-9xl font-bold font-headline text-primary">?</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
