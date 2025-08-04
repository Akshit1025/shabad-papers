import { InquiryForm } from "@/components/inquiry-form";

export function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="container px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-headline font-bold md:text-4xl">Get in Touch</h2>
            <p className="text-muted-foreground text-lg">
              Have a question or need a custom quote? Our team is here to help.
              Fill out the form, and we'll get back to you shortly.
            </p>
            <p className="text-muted-foreground">
              For specific paper requirements, try our AI Suggester for an instant recommendation.
            </p>
          </div>
          <div className="w-full">
            <InquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}
