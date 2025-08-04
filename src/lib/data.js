import { Briefcase, Building2, Calendar, Linkedin, Twitter, Users } from "lucide-react";

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

export const aboutItems = [
    { icon: Building2, label: "Trade Name", value: companyInfo.tradeName },
    { icon: Briefcase, label: "Legal Status", value: companyInfo.status },
    { icon: Calendar, label: "Established", value: companyInfo.establishmentYear },
    { icon: Users, label: "Partners", value: companyInfo.partners },
];

export const socialLinks = [
    { name: "LinkedIn", url: "#", icon: Linkedin },
    { name: "Twitter", url: "#", icon: Twitter },
];
