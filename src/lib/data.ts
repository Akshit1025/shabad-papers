import { Award, Briefcase, Building2, Calendar, CheckCircle, Linkedin, MapPin, ShieldCheck, Twitter, Users } from "lucide-react";
import type { ComponentType } from "react";

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
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Shabad+Papers+LLP+Mumbai",
};

export const aboutItems: { icon: ComponentType<{className?: string}>, label: string, value: string }[] = [
    { icon: Building2, label: "Trade Name", value: companyInfo.tradeName },
    { icon: Briefcase, label: "Legal Status", value: companyInfo.status },
    { icon: Calendar, label: "Established", value: companyInfo.establishmentYear },
    { icon: Users, label: "Partners", value: companyInfo.partners },
];

export const products = [
  {
    name: "Premium Glossy Art Paper",
    description: "130-300 GSM. Ideal for high-quality magazines, brochures, and photo prints.",
    image: "https://placehold.co/600x400.png",
    hint: "paper sheets"
  },
  {
    name: "Coated Matte Finish Board",
    description: "200-400 GSM. Perfect for premium packaging, business cards, and book covers.",
    image: "https://placehold.co/600x400.png",
    hint: "cardboard box"
  },
  {
    name: "100% Recycled Kraft Paper",
    description: "60-180 GSM. Eco-friendly option for bags, wrapping, and void-fill. FSC Certified.",
    image: "https://placehold.co/600x400.png",
    hint: "kraft paper"
  },
  {
    name: "Uncoated Woodfree Paper",
    description: "70-120 GSM. Excellent for notebooks, letterheads, and general office printing.",
    image: "https://placehold.co/600x400.png",
    hint: "office paper"
  },
  {
    name: "Thermal Paper Rolls",
    description: "55-80 GSM. For POS receipts and labels. BPA-free options available.",
    image: "https://placehold.co/600x400.png",
    hint: "paper roll"
  },
  {
    name: "Specialty Paper",
    description: "Custom solutions for unique needs, including water-resistant and tear-proof options.",
    image: "https://placehold.co/600x400.png",
    hint: "specialty paper"
  },
];

export const certifications = [
  {
    name: "ISO 9001:2015",
    description: "Quality Management Systems",
    icon: Award,
  },
  {
    name: "FSC Certified",
    description: "Forest Stewardship Council",
    icon: ShieldCheck,
  },
  {
    name: "PEFC Certified",
    description: "Programme for the Endorsement of Forest Certification",
    icon: CheckCircle,
  },
];

export const socialLinks = [
    { name: "LinkedIn", url: "#", icon: Linkedin },
    { name: "Twitter", url: "#", icon: Twitter },
];

export const productCatalogForAI = `
- Premium Glossy Art Paper (130-300 GSM): Ideal for high-quality magazines, brochures, and photo prints. High brightness and smooth surface.
- Coated Matte Finish Board (200-400 GSM): Perfect for premium packaging, business cards, and book covers. Offers a non-glare, elegant finish.
- 100% Recycled Kraft Paper (60-180 GSM): Eco-friendly option for bags, wrapping, and void-fill. Made from post-consumer waste. FSC Certified.
- Uncoated Woodfree Paper (70-120 GSM): Excellent for notebooks, letterheads, and general office printing. Good writability and printability.
- Thermal Paper Rolls (55-80 GSM): For POS receipts and labels. BPA-free options available for enhanced safety.
- Specialty Paper (Custom): Custom solutions for unique needs, including water-resistant, tear-proof, and food-grade papers.
`;
