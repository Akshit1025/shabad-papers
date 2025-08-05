import Image from "next/image";

export function QualityCommitment() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up flex justify-center">
                 <Image
                    src="https://placehold.co/400x400.png"
                    alt="Quality seal"
                    data-ai-hint="quality guarantee badge"
                    width={400}
                    height={400}
                    className="rounded-full shadow-2xl"
                  />
            </div>
            <div className="animate-fade-in-up animation-delay-300">
                <h2 className="text-3xl font-headline font-bold md:text-4xl text-primary mb-6">
                  Our Commitment to Quality
                </h2>
                <div className="space-y-4 text-muted-foreground text-lg">
                   <p>
                        As a dedicated wholesale supplier and importer, our foremost priority has always been the quality of the paper we provide.
                    </p>
                    <p>
                        Our promise is to create long-lasting, high-quality materials and occasions handcrafted for validity and consistency. These factors contribute to quality checks - both before and after production. It also ensures safe and flawless delivery.
                    </p>
                    <p>
                        When it comes to the delivery on time of the products, the process, from careful selection to final dispatch, ensuring that our finished, high-performance paper products reach our end-users.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
