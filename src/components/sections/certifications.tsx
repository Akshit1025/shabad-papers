import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { certifications } from "@/lib/data";

export function Certifications() {
  return (
    <section id="certifications" className="py-16 md:py-24 bg-secondary">
      <div className="container px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-headline font-bold md:text-4xl text-primary">Quality & Compliance</h2>
          <p className="max-w-3xl mx-auto text-muted-foreground text-lg">
            We adhere to the highest industry standards to ensure product quality and sustainability.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {certifications.map((cert, index) => (
            <Card key={cert.name} className="text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
              <CardHeader>
                <div className="mx-auto bg-primary text-primary-foreground rounded-full w-20 h-20 flex items-center justify-center">
                  <cert.icon className="w-10 h-10" />
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-headline font-semibold">{cert.name}</h3>
                <p className="text-muted-foreground mt-2">{cert.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
