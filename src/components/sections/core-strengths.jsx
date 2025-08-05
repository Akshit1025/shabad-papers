"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf, faTruckFast, faHandshake } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";


const strengths = [
  {
    icon: faLeaf,
    title: "Sustainable Sourcing",
    description: "Committed to eco-friendly practices and responsible paper sourcing.",
  },
  {
    icon: faTruckFast,
    title: "Efficient Supply Chain",
    description: "Streamlining global logistics for timely paper product delivery.",
  },
  {
    icon: faHandshake,
    title: "Customer-Centric Approach",
    description: "Building strong relationships through exceptional service and support.",
  },
];

export function CoreStrengths() {
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    };

  return (
    <motion.section 
        id="strengths" 
        className="py-16 md:py-24 bg-background"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.2 }}
    >
      <div className="container px-4">
        <motion.div 
            className="max-w-3xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-headline font-bold md:text-5xl text-primary">
            Our Core Strengths
          </h2>
          <div className="mt-4 w-24 h-1 bg-primary mx-auto"></div>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {strengths.map((strength, index) => (
            <motion.div
              key={strength.title}
              className="group bg-card p-8 rounded-lg shadow-lg text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-border/20"
              variants={cardVariants}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex justify-center mb-6">
                <div className={`bg-primary/10 rounded-full p-5 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110`}>
                  <FontAwesomeIcon icon={strength.icon} className={`h-12 w-12 text-primary transition-colors duration-300`} />
                </div>
              </div>
              <h3 className="text-xl font-headline font-bold mb-2 text-foreground">
                {strength.title}
              </h3>
              <p className="text-muted-foreground">{strength.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
