"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const Logo = ({ className }) => (
    <Link href="/" className={cn("flex items-center gap-2 font-headline text-xl font-bold", className)}>
        <FontAwesomeIcon icon={faPaperclip} className="h-6 w-6" />
        <span>Shabad Papers</span>
    </Link>
);

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerTextColor = scrolled ? "text-primary" : "text-white";
  const navLinkTextColor = scrolled ? "text-foreground/80" : "text-white/80";
  const navLinkHoverBg = scrolled ? "hover:bg-secondary" : "hover:bg-white/10";
  const mobileButtonTextColor = scrolled ? "text-foreground" : "text-white";
  const mobileButtonHoverClasses = scrolled ? "" : "hover:text-white hover:bg-white/10";


  return (
    <header className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40" : "bg-black/20"
    )}>
      <div className="container flex h-20 items-center justify-between">
        <Logo className={headerTextColor}/>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center">
          <ul className={cn("flex items-center gap-2 rounded-full p-1", scrolled ? "bg-transparent" : "bg-black/20 border border-white/20")}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                      "rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                      navLinkTextColor,
                      navLinkHoverBg
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Button asChild className="hidden md:inline-flex" variant={scrolled ? 'default' : 'secondary'}>
            <Link href="/contact">Get a Quote</Link>
        </Button>

        {/* Mobile Navigation */}
        <div className="flex items-center md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={cn(mobileButtonTextColor, mobileButtonHoverClasses)}>
                <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] bg-background/95 backdrop-blur-lg">
               <div className="flex flex-col h-full">
                <div className="p-6">
                    <Logo className="text-primary"/>
                </div>
                <nav className="flex-1 grid gap-4 p-6 text-lg font-medium">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        className="block py-2 text-muted-foreground transition-colors hover:text-primary"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
                <div className="p-6 mt-auto">
                    <Button asChild className="w-full">
                        <Link href="/contact" onClick={() => setIsOpen(false)}>Get a Quote</Link>
                    </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
