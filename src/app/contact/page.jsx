/**
 * @fileOverview The "Contact Us" page of the application.
 * This page provides a form for users to send inquiries and displays
 * the company's contact information.
 */
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Contact } from '@/components/sections/contact';

/**
 * Renders the Contact Us page.
 * @returns {JSX.Element} The Contact Us page component.
 */
export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
