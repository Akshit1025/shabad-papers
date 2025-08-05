import { InquiryForm } from "@/components/inquiry-form";
import Link from "next/link";
import { Button } from "../ui/button";

export function HomepageContact() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-secondary">
      <div className="container px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in-up">
            <h2 className="text-3xl font-headline font-bold md:text-5xl text-primary">Get in Touch</h2>
            <p className="text-muted-foreground text-lg">
              Have a question or need a custom quote? Our team is here to help.
              Fill out the form, and we'll get back to you shortly. For more detailed contact information, visit our contact page.
            </p>
            <Button asChild size="lg">
                <Link href="/contact">View All Contact Details</Link>
            </Button>
          </div>
          <div className="w-full animate-fade-in-up animation-delay-300">
            <InquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}
