/**
 * @fileOverview The "Products" page of the application.
 * This page displays the main categories of products offered by the company.
 */
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import placeholderImages from '@/lib/placeholder-images.json';

const categories = [
  {
    name: 'Carbonless Paper',
    slug: 'carbonless-paper',
    description: 'High-quality, multi-part forms that transfer information from the top sheet to the sheets below without the need for carbon.',
    image: placeholderImages.carbonless,
    hasSubProducts: false,
  },
  {
    name: 'Food Grade Papers',
    slug: 'food-grade-papers',
    description: 'Safe for direct food contact, our papers are perfect for packaging, baking, and serving. Ensuring quality and safety for your culinary needs.',
    image: placeholderImages.foodgrade,
    hasSubProducts: true,
  },
  {
    name: 'Coated Paper',
    slug: 'coated-paper',
    description: 'Ideal for high-quality printing, our coated papers provide a smooth, glossy surface for vibrant and sharp image reproduction.',
    image: placeholderImages.coated,
    hasSubProducts: false,
  },
];

/**
 * Renders the Products page, showcasing the main product categories.
 * @returns {JSX.Element} The Products page component.
 */
export default function ProductsPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main>
        <section className="py-16 md:py-24">
          <div className="container px-4">
            <motion.div
              className="max-w-3xl mx-auto text-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-headline font-bold md:text-6xl text-primary">
                Our Products
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Discover our range of high-quality paper solutions tailored for various industries.
              </p>
              <div className="mt-4 w-24 h-1 bg-primary mx-auto"></div>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ staggerChildren: 0.2 }}
            >
              {categories.map((category, index) => (
                <motion.div
                  key={category.slug}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="group bg-card h-full rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-border/20 flex flex-col">
                    <div className="relative w-full h-56">
                      <Image
                        src={category.image.url}
                        alt={category.name}
                        data-ai-hint={category.image.aiHint}
                        width={category.image.width}
                        height={category.image.height}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-headline font-bold mb-2 text-foreground">
                        {category.name}
                      </h3>
                      <p className="text-muted-foreground text-sm flex-grow">
                        {category.description}
                      </p>
                      <Button asChild variant="link" className="p-0 h-auto mt-4 self-start text-primary">
                        <Link href={`/products/${category.slug}`}>
                          {category.hasSubProducts ? 'View Products' : 'Learn More'}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
