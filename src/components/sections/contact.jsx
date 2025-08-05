import { InquiryForm } from "@/components/inquiry-form";
import { companyInfo } from "@/lib/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin, faEnvelope, faPhone, faBuilding } from "@fortawesome/free-solid-svg-icons";
import { BusinessHours } from "../business-hours";

export function Contact() {
  const phoneNumbers = ["+919555509507", "+919810087126"];
  return (
    <section id="contact" className="py-16 md:py-24 bg-background">
      <div className="container px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-headline font-bold md:text-5xl text-primary">
            Contact Us
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We're here to help! Reach out to us for any inquiries.
          </p>
          <div className="mt-4 w-24 h-1 bg-primary mx-auto"></div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left Column: Form */}
          <div className="w-full animate-fade-in-up">
            <h3 className="text-2xl font-headline font-bold mb-6 text-foreground">Send Us a Message</h3>
            <InquiryForm />
          </div>

          {/* Right Column: Details, Hours, Map */}
          <div className="space-y-12 animate-fade-in-up animation-delay-300">
            {/* Our Details */}
            <div>
              <h3 className="text-2xl font-headline font-bold mb-6 text-foreground">Our Details</h3>
              <div className="space-y-6 text-muted-foreground">
                  <div className="flex items-start gap-4">
                      <FontAwesomeIcon icon={faBuilding} className="h-5 w-5 mt-1 shrink-0 text-primary" />
                      <div>
                          <p className="font-semibold text-foreground">Registered/Corporate Office</p>
                          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(companyInfo.registeredAddress)}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                            <p>{companyInfo.registeredAddress}</p>
                          </a>
                      </div>
                  </div>
                  <div className="flex items-start gap-4">
                      <FontAwesomeIcon icon={faMapPin} className="h-5 w-5 mt-1 shrink-0 text-primary" />
                      <div>
                          <p className="font-semibold text-foreground">Sales Office</p>
                          <a href={companyInfo.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                            <p>{companyInfo.salesOfficeAddress}</p>
                          </a>
                      </div>
                  </div>
                   <div className="flex items-center gap-4">
                      <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5 shrink-0 text-primary" />
                      <a href="mailto:dineshgupta@shabadpapers.co.in" className="hover:text-primary transition-colors">dineshgupta@shabadpapers.co.in</a>
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
            </div>

            {/* Business Hours */}
            <div>
                <h3 className="text-2xl font-headline font-bold mb-6 text-foreground">Business Hours</h3>
                <BusinessHours />
            </div>

            {/* Find Us Here */}
            <div>
              <h3 className="text-2xl font-headline font-bold mb-6 text-foreground">Find Us Here</h3>
              <div className="aspect-video w-full rounded-lg overflow-hidden border border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.213215284794!2d72.84499877520038!3d19.142144382076296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b6139366e543%3A0x74964f4344795361!2sEaze%20Zone!5e0!3m2!1sen!2sin!4v1722421338604!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps view of Shabad Papers LLP Sales Office"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
