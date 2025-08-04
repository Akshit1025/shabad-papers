import { Briefcase, Building2, Calendar, Linkedin, Github, Users } from "lucide-react";

const WhatsappIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
    {...props}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const GooglePlusIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
    {...props}
  >
    <path d="M9 8.2c0-2.3 1.4-3.2 3-3.2 1.5 0 2.9 1.2 2.9 3.4 0 2.3-1.4 3.2-3 3.2-1.5 0-2.9-1.2-2.9-3.4zm10.9 2.8h-2.9v-2.9h-2.4v2.9h-2.9v2.4h2.9v2.9h2.4v-2.9h2.9z" />
    <path d="M22 10.1c0-.6-.1-1.2-.2-1.8H12v3.4h5.6c-.2 1.1-.9 2.1-2.1 2.8v2.1h2.7c1.6-1.5 2.5-3.6 2.5-6.1z" />
    <path d="M12 22c-2.7 0-5.1-1-7.1-2.7l2.7-2.1c.8.5 1.8.9 3.1.9 2.3 0 4.2-1.6 4.9-3.7h2.8c-.8 2.2-2.9 4.3-7.7 4.3z" />
    <path d="M4.9 14.3c-.2-.5-.3-1-.3-1.5s.1-1 .3-1.5V9.2H2.1C1.4 10.4 1 11.7 1 13s.4 2.6 1.1 3.8l2.8-2.5z" />
  </svg>
);

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
    { name: "Github", url: "#", icon: Github },
    { name: "Whatsapp", url: "#", icon: WhatsappIcon },
    { name: "Google+", url: "#", icon: GooglePlusIcon },
];
