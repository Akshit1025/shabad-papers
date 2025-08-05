import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf, faTruckFast, faHandshake } from "@fortawesome/free-solid-svg-icons";

const strengths = [
  {
    icon: faLeaf,
    title: "Sustainable Sourcing",
    description: "Committed to eco-friendly practices and responsible paper sourcing.",
    color: "text-green-600",
  },
  {
    icon: faTruckFast,
    title: "Efficient Supply Chain",
    description: "Streamlining global logistics for timely paper product delivery.",
    color: "text-blue-600",
  },
  {
    icon: faHandshake,
    title: "Customer-Centric Approach",
    description: "Building strong relationships through exceptional service and support.",
    color: "text-sky-500",
  },
];

export function CoreStrengths() {
  return (
    <section id="strengths" className="py-16 md:py-24 bg-background">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-headline font-bold md:text-5xl text-primary">
            Our Core Strengths
          </h2>
          <div className="mt-4 w-24 h-1 bg-primary mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {strengths.map((strength, index) => (
            <div
              key={strength.title}
              className="group bg-card p-8 rounded-lg shadow-lg text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex justify-center mb-4">
                <div className={`bg-primary/10 rounded-full p-4 transition-colors duration-300 group-hover:bg-primary/20`}>
                  <FontAwesomeIcon icon={strength.icon} className={`h-10 w-10 ${strength.color} transition-colors duration-300`} />
                </div>
              </div>
              <h3 className="text-xl font-headline font-bold mb-2 text-foreground">
                {strength.title}
              </h3>
              <p className="text-muted-foreground">{strength.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
