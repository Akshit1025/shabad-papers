import { companyInfo, socialLinks } from "@/lib/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faMapPin, faEnvelope, faPhone, faBuilding } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground border-t border-border/40">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-headline text-xl font-bold">
              <FontAwesomeIcon icon={faPaperclip} className="h-6 w-6" />
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
                    <p>{companyInfo.registeredAddress}</p>
                </div>
                 <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4 shrink-0 text-primary" />
                    <a href="mailto:dineshgupta@shabadpapers.co.in" className="hover:text-primary transition-colors">dineshgupta@shabadpapers.co.in</a>
                </div>
                 <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faPhone} className="h-4 w-4 shrink-0 text-primary" />
                    <span>+91 95555 09507 | +91 98100 87126</span>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-border/40">
        <div className="container py-4 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; {currentYear} {companyInfo.tradeName}. All Rights Reserved.</p>
            <div className="flex gap-4 mt-2 md:mt-0">
                <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                <Link href="#" className="hover:text-primary transition-colors">Terms & Conditions</Link>
            </div>
        </div>
      </div>
    </footer>
  );
}
