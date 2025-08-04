import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section id="hero" className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center text-center">
      <div className="absolute inset-0 bg-primary/80 z-10" />
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Paper factory background"
        data-ai-hint="paper texture"
        fill
        className="object-cover"
        priority
      />
      <div className="relative z-20 container px-4 space-y-6 text-primary-foreground">
        <h1 className="text-4xl font-headline font-bold md:text-6xl drop-shadow-lg">
          Quality Paper for Every Purpose
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-primary-foreground/90 drop-shadow-sm">
          Shabad Papers: Your trusted partner in paper trading and wholesale supply.
        </p>
        <div className="space-x-4">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="#products">Explore Products</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
            <Link href="#contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
