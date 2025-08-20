/**
 * @fileOverview The main footer component for the website.
 * It contains company information, quick links, contact details, and social media links.
 */
import { companyInfo, socialLinks } from "@/lib/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin, faEnvelope, faPhone, faBuilding, faHeart } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";

/**
 * The main Footer component for the application.
 * @returns {JSX.Element} The rendered footer component.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();
  const phoneNumbers = ["+919555509507", "+919810087126"];

  return (
    <footer className="bg-secondary text-secondary-foreground border-t border-border/40">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-headline text-xl font-bold">
               <Image src="/images/sp-logo-no-bg.png" alt="Shabad Papers Logo" width={40} height={40} />
              <span>{companyInfo.tradeName}</span>
            </Link>
            <p className="text-sm text-muted-foreground pr-4">
              Delivering excellence in paper products since {companyInfo.establishmentYear}. Committed to quality and sustainability.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  aria-label={link.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <FontAwesomeIcon icon={link.icon} className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold font-headline text-lg relative pb-2">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-primary"></span>
            </h4>
            <ul className="space-y-2 text-sm">
                <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
                <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold font-headline text-lg relative pb-2">
              Contact Info
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-primary"></span>
            </h4>
            <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                    <FontAwesomeIcon icon={faBuilding} className="h-4 w-4 mt-1 shrink-0 text-primary" />
                    <a href={companyInfo.registeredUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                      {companyInfo.registeredAddress}
                    </a>
                </div>
                 <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4 shrink-0 text-primary" />
                    <a href="mailto:shabadpapersllp@gmail.com" className="hover:text-primary transition-colors">shabadpapersllp@gmail.com</a>
                </div>
                 <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faPhone} className="h-4 w-4 shrink-0 text-primary" />
                    <div>
                      <a href={`tel:${phoneNumbers[0]}`} className="hover:text-primary transition-colors">{phoneNumbers[0].replace('+91', '+91 ')}</a>
                      {' | '}
                      <a href={`tel:${phoneNumbers[1]}`} className="hover:text-primary transition-colors">{phoneNumbers[1].replace('+91', '+91 ')}</a>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-border/40">
        <div className="container py-4 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground space-y-2 sm:space-y-0">
            <p>&copy; {currentYear} {companyInfo.tradeName}. All Rights Reserved.</p>
            <p className="flex items-center gap-1">
                Made by
                <a href="https://instagram.com/akshitthecoder" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
                    Akshit Gupta
                </a>
            </p>
        </div>
      </div>
    </footer>
  );
}