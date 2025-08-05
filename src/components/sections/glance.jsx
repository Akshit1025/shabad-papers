import Image from "next/image";

export function Glance() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <h2 className="text-3xl font-headline font-bold md:text-4xl text-primary mb-6">
              A Glance at Shabad Papers
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg">
                <p>
                    Established in 2022, Shabad Papers is an emerging importer, trader, and wholesale supplier of high-quality carbonless paper and food grade paper. Known for our steadfast quality and clean, centric approach, our products are trusted across industries for their reliability and performance.
                </p>
                 <p>
                    Our success is built on strong, long-term relationships with clients. A mark of our success, our customer retention is really good. From inception, we have carefully sourced and selected the best to meet our customers' varied requirements, main procurement being high-grade products in the whole range of colors.
                </p>
            </div>
          </div>
          <div className="animate-fade-in-up animation-delay-300">
             <Image
                src="https://placehold.co/600x400.png"
                alt="Close up of a notebook"
                data-ai-hint="notebook paper"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl object-cover"
              />
          </div>
        </div>
      </div>
    </section>
  );
}
