import { aboutItems, companyInfo } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-secondary">
      <div className="container px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-headline font-bold md:text-4xl text-primary">About Shabad Papers</h2>
          <p className="max-w-3xl mx-auto text-muted-foreground text-lg">
            We are a leading paper trader and wholesale supplier, committed to delivering quality and value since {companyInfo.establishmentYear}.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {aboutItems.map((item, index) => (
            <Card key={item.label} className="text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
              <CardHeader>
                <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center">
                  <item.icon className="w-8 h-8" />
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-headline font-semibold">{item.label}</h3>
                <p className="text-muted-foreground mt-2">{item.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
