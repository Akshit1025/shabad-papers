/**
 * @fileOverview A section for the homepage to display a preview of product categories.
 * It fetches the top categories from Firestore and provides a link to the main products page.
 */
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Loader } from 'lucide-react';
import placeholderImages from '@/lib/placeholder-images.json';
import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { Button } from '@/components/ui/button';

/**
 * Fetches visible product categories from Firestore, sorted by order.
 * @returns {Promise<Array<object>>} A promise that resolves to an array of category objects.
 */
async function fetchCategories() {
  try {
    const categoriesCollection = collection(db, 'categories');
    const q = query(categoriesCollection, where("visible", "==", true), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching categories for homepage:", error);
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
    return { url: imageIdentifier, width: 600, height: 400, aiHint: 'product category' };
  }
  return placeholderImages[imageIdentifier] || null;
}

/**
 * The "Our Products" section component for the homepage.
 * @returns {JSX.Element} The rendered Our Products section.
 */
export function OurProducts() {
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

  const displayedCategories = categories.slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-headline font-bold md:text-5xl text-primary">
            Our Products
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore our curated selection of high-quality paper products.
          </p>
          <div className="mt-4 w-24 h-1 bg-primary mx-auto"></div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : displayedCategories.length > 0 ? (
          <>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ staggerChildren: 0.2 }}
            >
              {displayedCategories.map((category, index) => {
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

            {categories.length > 3 && (
              <motion.div 
                className="text-center mt-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Button asChild size="lg">
                  <Link href="/products">
                    View More Categories
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-muted-foreground">No Categories to Display</h2>
            <p className="mt-2 text-foreground">
              Check back soon to see our product offerings.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
