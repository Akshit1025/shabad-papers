import { aboutItems, companyInfo } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

export function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-secondary">
      <div className="container px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4 animate-fade-in-up">
                <h2 className="text-3xl font-headline font-bold md:text-5xl text-primary">Welcome to Shabad Papers</h2>
                <p className="text-muted-foreground text-lg">
                    Founded in 2022, Shabad Papers has grown into a trusted name in the import and wholesale trade of premium carbonless papers and food-grade papers. We are proud to be recognised for our consistent quality, reliability, and service excellence.
                </p>
                <p className="text-muted-foreground text-lg">
                    At the heart of our business is a deep commitment to building long-term relationships. Our loyal clientele is a reflection of our integrity, responsiveness, and client-first approach. Every product we offer is carefully selected to meet the evolving needs of our customers, ensuring quality at every step.
                </p>
                 <Button asChild>
                    <Link href="/about">Learn More</Link>
                </Button>
            </div>
             <div className="grid gap-8 md:grid-cols-2">
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
      </div>
    </section>
  );
}
