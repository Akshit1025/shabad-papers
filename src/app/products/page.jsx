/**
 * @fileOverview The "Products" page of the application.
 * This page displays the main categories of products offered by the company, fetched dynamically from Firestore.
 */
"use client";

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Loader } from 'lucide-react';
import placeholderImages from '@/lib/placeholder-images.json';
import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';

/**
 * Fetches visible product categories from Firestore.
 * @returns {Promise<Array<object>>} A promise that resolves to an array of category objects.
 */
async function fetchCategories() {
  try {
    const categoriesCollection = collection(db, 'categories');
    // Query for visible categories and order them
    const q = query(categoriesCollection, where("visible", "==", true), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    const categories = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    // This error likely means a composite index is needed in Firestore.
    // The console in the browser will have a link to create it.
    return []; // Return empty array on error
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
    return { url: imageIdentifier, width: 600, height: 400, aiHint: 'product category' };
  }
  return placeholderImages[imageIdentifier] || null;
}


/**
 * Renders the Products page, showcasing the main product categories.
 * @returns {JSX.Element} The Products page component.
 */
export default function ProductsPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
      setLoading(false);
    }
    loadCategories();
  }, []);

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

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader className="h-12 w-12 animate-spin text-primary" />
              </div>
            ) : categories.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ staggerChildren: 0.2 }}
              >
                {categories.map((category, index) => {
                  const imageSrc = getImageSource(category.image);
                  return (
                    <motion.div
                      key={category.slug}
                      variants={{
                        hidden: { opacity: 0, y: 50 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Link href={`/products/${category.slug}`} className="block h-full">
                        <div className="group bg-card h-full rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-border/20 flex flex-col">
                          <div className="relative w-full h-56">
                            {imageSrc && (
                               <Image
                                  src={imageSrc.url}
                                  alt={category.name}
                                  data-ai-hint={imageSrc.aiHint}
                                  width={imageSrc.width}
                                  height={imageSrc.height}
                                  className="object-cover w-full h-full"
                                />
                            )}
                          </div>
                          <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-xl font-headline font-bold mb-2 text-foreground">
                              {category.name}
                            </h3>
                            <p className="text-muted-foreground text-sm flex-grow">
                              {category.description}
                            </p>
                            <div className="mt-4 text-primary font-semibold text-sm flex items-center">
                              {category.hasSubProducts ? 'View Products' : 'Learn More'}
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <div className="text-center py-16">
                <h2 className="text-2xl font-semibold text-muted-foreground">No Categories Found</h2>
                <p className="mt-2 text-foreground">
                  We couldn't retrieve any product categories at the moment. Please check back later.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
