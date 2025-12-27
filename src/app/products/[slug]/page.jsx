/**
 * @fileOverview A dynamic page to display details for a specific product or category.
 * It first tries to fetch a category, and if not found, tries to fetch a product.
 */
"use client";

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Loader, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import placeholderImages from '@/lib/placeholder-images.json';
import { ProductInquiryDialog } from '@/components/product-inquiry-dialog';
import { ProductHero, ProductContent } from '@/components/product-page-ui';
import Autoplay from "embla-carousel-autoplay";
import { useParams } from 'next/navigation';

/**
 * Fetches data for a specific category from Firestore.
 * @param {string} slug - The slug of the category to fetch.
 * @returns {Promise<object|null>} A promise that resolves to the category object or null if not found.
 */
async function fetchCategory(slug) {
  try {
    const q = query(collection(db, "categories"), where("slug", "==", slug), where("visible", "==", true));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return null;
    }
    return { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data(), type: 'category' };
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}

/**
 * Fetches data for a specific product from Firestore.
 * @param {string} slug - The slug of the product to fetch.
 * @returns {Promise<object|null>} A promise that resolves to the product object or null if not found.
 */
async function fetchProduct(slug) {
  try {
    const q = query(collection(db, "products"), where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return null;
    }
    return { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data(), type: 'product' };
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}


/**
 * Fetches sub-products for a given category slug.
 * @param {string} categorySlug - The slug of the parent category.
 * @returns {Promise<Array<object>>} A promise that resolves to an array of product objects.
 */
async function fetchSubProducts(categorySlug) {
  try {
    const q = query(collection(db, "products"), where("categorySlug", "==", categorySlug), orderBy("order", "asc"), orderBy("name", "asc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

/**
 * A helper to get an image source, preferring direct URLs over placeholder keys.
 * @param {string} imageIdentifier - A URL or a key from placeholder-images.json.
 * @returns {{url: string, width: number, height: number, aiHint: string}|null}
 */
function getImageSource(imageIdentifier) {
  if (!imageIdentifier) return null;
  if (imageIdentifier.startsWith('http')) {
    // It's a direct URL, but we don't have width/height.
    // For simplicity, we'll use some defaults. For production, these should be stored with the URL.
    return { url: imageIdentifier, width: 800, height: 600, aiHint: 'product image' };
  }
  const placeholder = placeholderImages[imageIdentifier];
  if (!placeholder) return null;
  return placeholder;
}

/**
 * Renders a placeholder for missing content.
 * @param {string} message - The message to display.
 * @returns {JSX.Element}
 */
const NotFoundSection = ({ message }) => (
  <div className="flex items-center justify-center p-8 bg-secondary/30 rounded-lg text-muted-foreground">
    <AlertCircle className="mr-3 h-5 w-5" />
    <span>{message}</span>
  </div>
);

/**
 * Renders the UI for a Category.
 */
const CategoryDetailView = ({ category, products }) => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  
  const hasCarousel = Array.isArray(category.media) && category.media.length > 0;
  const singleImageSrc = getImageSource(category.image || (category.media && category.media[0]));

  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="container max-w-7xl px-4">
        <motion.div
          className="max-w-3xl mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button asChild variant="ghost" className="mb-4 pl-1">
            <Link href="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          </Button>
          <h1 className="text-4xl font-headline font-bold md:text-6xl text-primary">
            {category.name}
          </h1>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            {hasCarousel ? (
              <Carousel
                className="w-full"
                opts={{ loop: true }}
                plugins={[plugin.current]}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
              >
                <CarouselContent>
                  {category.media.map((itemIdentifier) => {
                    const imageSrc = getImageSource(itemIdentifier);
                    return imageSrc && (
                      <CarouselItem key={itemIdentifier}>
                        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border shadow-lg">
                          <Image
                            src={imageSrc.url}
                            alt={`${category.name} Image`}
                            data-ai-hint={imageSrc.aiHint}
                            width={imageSrc.width}
                            height={imageSrc.height}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </CarouselItem>
                    )
                  })}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
            ) : (
              singleImageSrc && (
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border shadow-lg">
                  <Image
                    src={singleImageSrc.url}
                    alt={`${category.name} Image`}
                    data-ai-hint={singleImageSrc.aiHint}
                    width={singleImageSrc.width}
                    height={singleImageSrc.height}
                    className="object-cover w-full h-full"
                  />
                </div>
              )
            )}
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div>
              <h2 className="text-2xl font-headline font-bold text-foreground mb-4">What is {category.name} About?</h2>
              <p className="text-muted-foreground text-lg">
                {category.longDescription || category.description}
              </p>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-2xl font-headline font-bold text-foreground mb-4">Benefits</h3>
            {Array.isArray(category.benefits) && category.benefits.length > 0 ? (
              <ul className="space-y-3">
                {category.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            ) : <NotFoundSection message="Benefits for this category are not available yet." />}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-2xl font-headline font-bold text-foreground mb-4">Applications</h3>
            {Array.isArray(category.applications) && category.applications.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {category.applications.map((app, index) => (
                  <div key={index} className="bg-primary/10 text-primary font-medium px-3 py-1 rounded-full text-sm">
                    {app}
                  </div>
                ))}
              </div>
            ) : <NotFoundSection message="Applications for this category are not available yet." />}
          </motion.div>
        </div>

        {category.hasSubProducts && products.length > 0 && (
          <div className="mt-16 md:mt-24">
            <motion.div
              className="max-w-3xl mx-auto text-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-headline font-bold md:text-5xl text-primary">
                Our {category.name}
              </h2>
               <div className="mt-4 w-24 h-1 bg-primary mx-auto"></div>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ staggerChildren: 0.2 }}
            >
              {products.map((product, index) => {
                const productImageSrc = getImageSource(product.image);
                return (
                    <motion.div
                      key={product.slug}
                      variants={{
                        hidden: { opacity: 0, y: 50 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Link href={`/products/${product.slug}`} className="block h-full">
                        <div className="group bg-card h-full rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-border/20 flex flex-col">
                          {productImageSrc && (
                            <div className="relative w-full h-56">
                              <Image
                                src={productImageSrc.url}
                                alt={product.name}
                                data-ai-hint={productImageSrc.aiHint}
                                width={productImageSrc.width}
                                height={productImageSrc.height}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          )}
                          <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-xl font-headline font-bold mb-2 text-foreground">
                              {product.name}
                            </h3>
                            <p className="text-muted-foreground text-sm flex-grow">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                );
              })}
            </motion.div>
          </div>
        )}

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button asChild size="lg" variant="outline">
            <Link href="/products">
              <ArrowLeft className="mr-2 h-5 w-5" />
              View All Categories
            </Link>
          </Button>
          <ProductInquiryDialog productName={category.name} />
        </motion.div>
      </div>
    </section>
  )
}

/**
 * Renders the UI for a Product.
 */
const ProductDetailView = ({ product }) => {
    const imageSrc = getImageSource(product.image);
    const description = product.longDescription || product.description;
    return (
        <>
            <ProductHero 
              title={product.name} 
              subtitle={product.description} 
            />
            <ProductContent
                productName={product.name}
                description={description}
                image={imageSrc}
                categorySlug={product.categorySlug}
            />
        </>
    );
};


/**
 * Renders the dynamic product category/product page.
 * @returns {JSX.Element} The detail page component.
 */
export default function DetailPage() {
  const params = useParams();
  const slug = params.slug;

  const [data, setData] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const loadData = async () => {
        setLoading(true);
        let loadedData = await fetchCategory(slug);

        if (loadedData) {
          if (loadedData.hasSubProducts) {
            const fetchedProducts = await fetchSubProducts(slug);
            setProducts(fetchedProducts);
          }
        } else {
          // If no category was found, try fetching a product
          loadedData = await fetchProduct(slug);
        }
        
        setData(loadedData);
        setLoading(false);
      };
      loadData();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-dvh bg-background">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <Loader className="h-12 w-12 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col min-h-dvh bg-background">
        <Header />
        <main className="flex-grow flex items-center justify-center text-center">
          <div>
            <h1 className="text-3xl font-bold text-destructive">Content Not Found</h1>
            <p className="mt-2 text-muted-foreground">Sorry, we couldn't find what you're looking for.</p>
            <Button asChild className="mt-6">
              <Link href="/products">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main>
        {data.type === 'category' && <CategoryDetailView category={data} products={products} />}
        {data.type === 'product' && <ProductDetailView product={data} />}
      </main>
      <Footer />
    </div>
  );
}
