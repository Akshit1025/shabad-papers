/**
 * @fileOverview The main "Contact" section for the contact page.
 * It includes an inquiry form, company contact details, business hours, and an embedded map.
 */
"use client"
import { InquiryForm } from "@/components/inquiry-form";
import { companyInfo } from "@/lib/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin, faEnvelope, faPhone, faBuilding } from "@fortawesome/free-solid-svg-icons";
import { BusinessHours } from "../business-hours";
import { motion } from "framer-motion";

/**
 * The Contact section component.
 * @returns {JSX.Element} The rendered Contact section.
 */
export function Contact() {
  const phoneNumbers = ["+919555509507", "+919810087126"];
  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 }}
  };
  const detailsVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, staggerChildren: 0.2 } }
  };
   const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-background">
      <div className="container px-4">
        {/* Section Header */}
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-headline font-bold md:text-5xl text-primary">
            Contact Us
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We're here to help! Reach out to us for any inquiries.
          </p>
          <div className="mt-4 w-24 h-1 bg-primary mx-auto"></div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left Column: Form */}
          <motion.div 
            className="w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={formVariants}
          >
            <h3 className="text-2xl font-headline font-bold mb-6 text-foreground">Send Us a Message</h3>
            <InquiryForm />
          </motion.div>

          {/* Right Column: Details, Hours, Map */}
          <motion.div 
            className="space-y-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={detailsVariants}
          >
            {/* Our Details */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-headline font-bold mb-6 text-foreground">Our Details</h3>
              <div className="space-y-6 text-muted-foreground">
                  <div className="flex items-start gap-4">
                      <FontAwesomeIcon icon={faBuilding} className="h-5 w-5 mt-1 shrink-0 text-primary" />
                      <div>
                          <p className="font-semibold text-foreground">Registered/Corporate Office</p>
                          <a href={companyInfo.registeredUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                            <p>{companyInfo.registeredAddress}</p>
                          </a>
                      </div>
                  </div>
                  <div className="flex items-start gap-4">
                      <FontAwesomeIcon icon={faMapPin} className="h-5 w-5 mt-1 shrink-0 text-primary" />
                      <div>
                          <p className="font-semibold text-foreground">Sales Office</p>
                          <a href={companyInfo.salesUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                            <p>{companyInfo.salesOfficeAddress}</p>
                          </a>
                      </div>
                  </div>
                   <div className="flex items-center gap-4">
                      <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5 shrink-0 text-primary" />
                      <a href="mailto:shabadpapersllp@gmail.com" className="hover:text-primary transition-colors">shabadpapersllp@gmail.com</a>
                  </div>
                   <div className="flex items-center gap-4">
                      <FontAwesomeIcon icon={faPhone} className="h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <a href={`tel:${phoneNumbers[0]}`} className="hover:text-primary transition-colors">{phoneNumbers[0].replace('+91', '+91 ')}</a>
                        {' | '}
                        <a href={`tel:${phoneNumbers[1]}`} className="hover:text-primary transition-colors">{phoneNumbers[1].replace('+91', '+91 ')}</a>
                      </div>
                  </div>
              </div>
            </motion.div>

            {/* Business Hours */}
            <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-headline font-bold mb-6 text-foreground">Business Hours</h3>
                <BusinessHours />
            </motion.div>

            {/* Find Us Here */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-headline font-bold mb-6 text-foreground">Find Us Here</h3>
              <div className="aspect-video w-full rounded-lg overflow-hidden border border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15073.90640224007!2d72.8310540366848!3d19.174374930236958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b6f86d7048f5%3A0xdf26405fc17d3b34!2sEaze%20Zone%20Mall%2C%205078%2C%20Malad%2C%20Sunder%20Nagar%2C%20Malad%20West%2C%20Mumbai%2C%20Maharashtra%20400064!5e0!3m2!1sen!2sin!4v1754905439098!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps view of Shabad Papers LLP Sales Office"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
