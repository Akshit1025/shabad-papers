/**
 * @fileOverview A custom 404 "Not Found" page for the application.
 * This page is displayed whenever a user navigates to a URL that does not exist.
 * It is designed to be user-friendly and consistent with the site's overall theme.
 */
"use client";

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

/**
 * Renders a custom 404 Not Found page.
 * It provides a clear message to the user and a link to navigate back to the homepage.
 * @returns {JSX.Element} The rendered 404 page component.
 */
export default function NotFound() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <motion.section
          className="container text-center py-16 md:py-24"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-md mx-auto">
            <h1 className="text-8xl md:text-9xl font-bold font-headline text-primary drop-shadow-sm">
              404
            </h1>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-foreground">
              Page Not Found
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/">
                <Home className="mr-2 h-5 w-5" />
                Go Back Home
              </Link>
            </Button>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}
