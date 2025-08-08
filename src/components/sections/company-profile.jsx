/**
 * @fileOverview The "Company Profile" section for the About Us page.
 * It displays key details about the company in a list format.
 */
"use client"
import Image from "next/image";
import { companyInfo } from "@/lib/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard, faGavel, faCalendarCheck, faUsers, faBuilding, faUserTie, faFileInvoiceDollar, faMapPin } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const profileItems = [
    { icon: faIdCard, label: "Nature of Business", value: companyInfo.businessNature },
    { icon: faGavel, label: "Legal Status of Firm", value: companyInfo.status },
    { icon: faCalendarCheck, label: "Year of Establishment", value: companyInfo.establishmentYear },
    { icon: faUsers, label: "Total Number of Employees", value: "2 to 11" },
    { icon: faIdCard, label: "Legal Name of Firm", value: companyInfo.legalName },
    { icon: faUserTie, label: "Partners", value: companyInfo.partners },
    { icon: faFileInvoiceDollar, label: "GSTN", value: companyInfo.gstin },
    { icon: faBuilding, label: "Registered/Corporate Office", value: companyInfo.registeredAddress, link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(companyInfo.registeredAddress)}` },
    { icon: faMapPin, label: "Sales Office", value: companyInfo.salesOfficeAddress, link: companyInfo.googleMapsUrl },

];

/**
 * A section displaying the company's profile information.
 * @returns {JSX.Element} The rendered company profile section.
 */
export function CompanyProfile() {
    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } }
    };
    const itemVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <motion.section 
            className="py-16 md:py-24 bg-secondary"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <div className="container">
                <motion.div 
                    className="max-w-3xl mx-auto text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-headline font-bold md:text-4xl text-primary">
                        Company Profile
                    </h2>
                    <div className="mt-4 w-24 h-1 bg-primary mx-auto"></div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Image
                            src="https://placehold.co/600x450.png"
                            alt="Paper rolls"
                            data-ai-hint="paper rolls factory"
                            width={600}
                            height={450}
                            className="rounded-lg shadow-2xl object-cover"
                        />
                    </motion.div>
                    <motion.ul 
                        className="space-y-4"
                        variants={containerVariants}
                    >
                        {profileItems.map((item) => (
                            <motion.li 
                                key={item.label} 
                                className="flex items-start gap-4"
                                variants={itemVariants}
                            >
                                <FontAwesomeIcon icon={item.icon} className="h-6 w-6 text-primary mt-1" />
                                <div>
                                    <p className="font-semibold text-foreground">{item.label}</p>
                                    {item.link ? (
                                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                            {item.value}
                                        </a>
                                    ) : (
                                        <p className="text-muted-foreground">{item.value}</p>
                                    )}
                                </div>
                            </motion.li>
                        ))}
                    </motion.ul>
                </div>
            </div>
        </motion.section>
    );
}
