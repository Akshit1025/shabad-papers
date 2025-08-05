import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

export function Leadership() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
                 <Image
                    src="https://placehold.co/500x500.png"
                    alt="Shabad Papers Logo Graphic"
                    data-ai-hint="abstract logo"
                    width={500}
                    height={500}
                    className="rounded-lg shadow-2xl object-cover mx-auto"
                  />
            </div>
            <div className="animate-fade-in-up animation-delay-300">
                <h2 className="text-3xl font-headline font-bold md:text-4xl text-primary mb-6">
                  Our Leadership
                </h2>
                <div className="relative bg-secondary p-6 rounded-lg mb-6">
                    <FontAwesomeIcon icon={faQuoteLeft} className="absolute -top-3 -left-3 h-10 w-10 text-primary/20" />
                    <blockquote className="text-lg text-foreground italic">
                        "It's not about how many years you've worked - it's about how much those years have taught you."
                    </blockquote>
                    <p className="text-right mt-2 text-muted-foreground">- Dinesh Gupta</p>
                </div>
                <p className="text-muted-foreground text-lg">
                    Our leadership's insightful experience in the financial, trading, and export-import sectors, combined with a passion for excellence, drives us to deliver products that consistently shape our core business in quality, trust, and long-term vision.
                </p>
            </div>
        </div>
      </div>
    </section>
  );
}
