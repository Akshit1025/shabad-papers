import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye, faHandshake, faShippingFast, faTasks, faUsersCog, faVials } from "@fortawesome/free-solid-svg-icons";


const whyUsPoints = [
    { icon: faBullseye, text: "Prompt and reliable delivery" },
    { icon: faHandshake, text: "Honest and transparent business practices" },
    { icon: faShippingFast, text: "Competitively priced bidding with technically advanced products" },
    { icon: faTasks, text: "Well-managed and client-friendly policies and services" },
    { icon: faUsersCog, text: "Consultant-backed, quality-assured firm with skilled employees" },
];

export function WhyUs() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <h2 className="text-3xl font-headline font-bold md:text-4xl text-primary mb-6">
              Why Us?
            </h2>
             <p className="text-muted-foreground text-lg mb-8">
                Over the years, we have established a reputation for providing a comprehensive and reliable range of paper solutions tailored to our clients' specific needs. The following key strengths drive our continued success:
            </p>
            <ul className="space-y-4">
                {whyUsPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-4">
                        <FontAwesomeIcon icon={point.icon} className="h-6 w-6 text-primary mt-1" />
                        <span className="text-lg text-foreground">{point.text}</span>
                    </li>
                ))}
            </ul>
          </div>
          <div className="animate-fade-in-up animation-delay-300 flex justify-center items-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 bg-primary/10 rounded-full flex items-center justify-center">
                     <FontAwesomeIcon icon={faVials} className="h-32 w-32 text-primary opacity-20" />
                </div>
                 <p className="relative text-8xl md:text-9xl font-bold font-headline text-primary">?</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
