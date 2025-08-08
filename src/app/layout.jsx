/**
 * @fileOverview The root layout for the entire application.
 * It sets up the HTML structure, includes global stylesheets, fonts,
 * and wraps the content with necessary providers like Firebase Auth.
 */
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FirebaseAuthProvider } from "@/components/firebase-auth-provider";
config.autoAddCss = false

export const metadata = {
  title: "Shabad Papers Official",
  description: "Your trusted partner in paper trading and wholesale supply. Discover quality paper solutions with Shabad Papers LLP.",
};

/**
 * The root layout component that wraps all pages.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The root layout element.
 */
export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <FirebaseAuthProvider>
          {children}
        </FirebaseAuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
