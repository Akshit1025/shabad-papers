import { companyInfo, socialLinks } from "@/lib/data";
import { Paperclip, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-headline text-xl font-bold">
              <Paperclip className="h-6 w-6" />
              <span>{companyInfo.tradeName}</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your trusted partner in paper trading and wholesale supply since {companyInfo.establishmentYear}.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold font-headline">Contact Information</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong>GSTIN:</strong> {companyInfo.gstin}
              </p>
              <p>
                <strong>Legal Name:</strong> {companyInfo.legalName}
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 shrink-0" />
                <span>{companyInfo.address}</span>
              </p>
              <Button variant="link" asChild className="p-0 h-auto">
                 <a href={companyInfo.googleMapsUrl} target="_blank" rel="noopener noreferrer">View on Google Maps</a>
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold font-headline">Follow Us</h4>
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
                  <link.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} {companyInfo.legalName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
