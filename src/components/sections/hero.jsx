import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section id="hero" className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center text-center">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Paper factory background"
        data-ai-hint="paper texture"
        fill
        className="object-cover"
        priority
      />
      <div className="relative z-20 container px-4 space-y-6 text-white">
        <h1 className="text-4xl font-headline font-bold md:text-6xl drop-shadow-lg animate-fade-in-up">
          Quality Paper for Every Purpose
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-white/90 drop-shadow-sm animate-fade-in-up animation-delay-300">
          Shabad Papers: Your trusted partner in paper trading and wholesale supply.
        </p>
        <div className="space-x-4 animate-fade-in-up animation-delay-600">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/contact">Get a Quote</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
