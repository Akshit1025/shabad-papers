/**
 * @fileOverview Centralized data for the application.
 * This file exports various constants and data structures, such as company information
 * and social media links, to be used across different components.
 */
import { faLinkedin, faGithub, faWhatsapp, faGooglePlus } from "@fortawesome/free-brands-svg-icons";
import { faBriefcase, faBuilding, faCalendar, faUsers } from "@fortawesome/free-solid-svg-icons";

/**
 * @property {object} companyInfo - Contains detailed information about the company.
 */
export const companyInfo = {
  legalName: "Shabad Papers LLP",
  tradeName: "Shabad Papers",
  status: "LLP (Limited Liability Partnership)",
  gstin: "27AEVFS9052B1ZL",
  establishmentYear: "2022",
  businessNature: "Paper Trader and Wholesale Supplier",
  partners: "Dinesh Gupta and Ritu Gupta",
  employeeCount: "2-11",
  address: "Gala No 5, Mistry Industrial Complex, MIDC Cross Rd, A, Marol, Andheri East, Mumbai, Maharashtra 400093, India",
  registeredAddress: "Flat no. 102, The Bhartiya CGHS, Plot No. 4, Sector 19, Dwarka, Delhi - 110075, India",
  salesOfficeAddress: "Shop no. 87, Lower Ground floor, Eaze Zone Mall, Goregaon West, Mumbai, Maharashtra - 400104",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Eaze+Zone+Mall+Goregaon+West+Mumbai",
};

/**
 * @property {Array<object>} aboutItems - A simplified list for displaying key company info.
 */
export const aboutItems = [
    { icon: faBuilding, label: "Trade Name", value: companyInfo.tradeName },
    { icon: faBriefcase, label: "Legal Status", value: companyInfo.status },
    { icon: faCalendar, label: "Established", value: companyInfo.establishmentYear },
    { icon: faUsers, label: "Partners", value: companyInfo.partners },
];

/**
 * @property {Array<object>} socialLinks - A list of social media links with names, URLs, and icons.
 */
export const socialLinks = [
    { name: "LinkedIn", url: "#", icon: faLinkedin },
    { name: "Github", url: "#", icon: faGithub },
    { name: "Whatsapp", url: "#", icon: faWhatsapp },
    { name: "Google+", url: "#", icon: faGooglePlus },
];
