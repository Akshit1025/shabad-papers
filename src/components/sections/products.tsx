import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { products } from "@/lib/data";
import { Button } from "../ui/button";
import Link from "next/link";

export function Products() {
  const isProductsPage = typeof window !== 'undefined' && window.location.pathname.includes('/products');
  const displayedProducts = isProductsPage ? products : products.slice(0, 3);

  return (
    <section id="products" className="py-16 md:py-24">
      <div className="container px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-headline font-bold md:text-4xl text-primary">Our Products</h2>
          <p className="max-w-3xl mx-auto text-muted-foreground text-lg">
            A wide range of high-quality paper to meet diverse business needs.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayedProducts.map((product, index) => (
            <Card key={product.name} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
              <div className="relative w-full h-60">
                <Image
                  src={product.image}
                  alt={product.name}
                  data-ai-hint={product.hint}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-xl">{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{product.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        {!isProductsPage && (
            <div className="text-center mt-12">
                <Button asChild size="lg">
                    <Link href="/products">View All Products</Link>
                </Button>
            </div>
        )}
      </div>
    </section>
  );
}
