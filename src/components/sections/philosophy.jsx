import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";

export function Philosophy() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container text-center max-w-3xl mx-auto">
        <div className="flex justify-center mb-6">
            <div className="bg-primary/10 rounded-full p-5 border-4 border-primary/20">
                <FontAwesomeIcon icon={faLightbulb} className="h-12 w-12 text-primary" />
            </div>
        </div>
        <h2 className="text-3xl font-headline font-bold md:text-4xl text-primary mb-4">
          Paper Supply Philosophy
        </h2>
        <p className="text-muted-foreground text-lg">
          We believe in delivering only the best, high-grade paper products that combine functionality, luxury, and durability. A curated selection supports both food-grade and documentation needs with precision and care.
        </p>
      </div>
    </section>
  );
}
