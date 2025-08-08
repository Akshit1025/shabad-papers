
"use client";

import { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from 'framer-motion';
import { socialLinks } from '@/lib/data';

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const Logo = ({ className }) => (
    <Link href="/" className={cn("flex items-center gap-2 font-headline text-xl font-bold text-primary", className)}>
        <FontAwesomeIcon icon={faPaperclip} className="h-6 w-6" />
        <span>Shabad Papers</span>
    </Link>
);

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkTextColor = scrolled ? "text-foreground/80" : "text-white/80";
  const mobileButtonTextColor = "text-foreground";
  const mobileButtonHoverClasses = "hover:bg-accent";
  
  const handleMouseEnter = (index, e) => {
    const linkEl = e.currentTarget;
    const navEl = navRef.current;
    if (!navEl) return;
    
    const navRect = navEl.getBoundingClientRect();
    const linkRect = linkEl.getBoundingClientRect();

    setHoveredLink({
      index,
      width: linkRect.width,
      left: linkRect.left - navRect.left,
    });
  };

  const handleMouseLeave = () => {
    setHoveredLink(null);
  };


  return (
    <header className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40" : "bg-transparent"
    )}>
      <div className="container flex h-20 items-center justify-between">
        <Logo />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center">
          <ul 
            ref={navRef}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "relative flex items-center gap-2 rounded-full p-1", 
                scrolled ? "" : "bg-black/20 border border-white/20"
            )}
          >
             <AnimatePresence>
              {hoveredLink && (
                  <motion.div
                    layoutId="hover-background"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1, 
                      x: hoveredLink.left,
                      width: hoveredLink.width,
                    }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
              )}
            </AnimatePresence>
            {navLinks.map((link, index) => (
              <li key={link.href} onMouseEnter={(e) => handleMouseEnter(index, e)}>
                <Link
                  href={link.href}
                  className={cn(
                      "relative rounded-full px-4 py-2 text-base transition-colors duration-300",
                      navLinkTextColor,
                      hoveredLink?.index === index 
                        ? 'text-white font-bold' 
                        : ''
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              aria-label={link.name}
              target="_blank"
              rel="noopener noreferrer"
              className={cn("transition-colors", scrolled ? "text-muted-foreground hover:text-primary" : "text-white/80 hover:text-white")}
            >
              <FontAwesomeIcon icon={link.icon} className="h-5 w-5" />
            </a>
          ))}
        </div>


        {/* Mobile Navigation */}
        <div className="flex items-center md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={cn(mobileButtonTextColor, mobileButtonHoverClasses, scrolled ? "" : "text-white hover:text-white hover:bg-white/10")}>
                <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] bg-background/95 backdrop-blur-lg">
               <div className="flex flex-col h-full">
                <div className="p-6">
                    <Logo />
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
