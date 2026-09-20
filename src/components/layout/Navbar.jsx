"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet";

const navLinks = [
  { label: "Colleges", href: "/colleges" },
  { label: "Courses", href: "/courses" },
  { label: "Compare", href: "/compare" },
  { label: "Rankings", href: "/rankings" },
  { label: "Resources", href: "#" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 10;
          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-200 transform-gpu ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm border-b border-slate-200/80 shadow-xs"
          : "bg-white border-b border-transparent"
      }`}
    >
      <div className="container-main">
        <nav className="flex items-center justify-between h-16 lg:h-[68px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/logo.png"
              alt="Compare Degree"
              width={140}
              height={32}
              style={{ width: "auto" }}
              className="h-7 lg:h-8 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-navy transition-colors rounded-md hover:bg-slate-50"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-slate-600 hover:text-navy transition-colors px-3 py-2"
            >
              Login
            </Link>
            <Button asChild className="bg-crimson hover:bg-crimson-dark text-white font-medium px-5 h-9 text-sm rounded-lg shadow-none">
              <Link href="/login">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger 
              className="lg:hidden p-2 -mr-2 text-slate-600 hover:text-navy transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[340px] p-0">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-100">
                  <Image
                    src="/logo.png"
                    alt="Compare Degree"
                    width={120}
                    height={28}
                    style={{ width: "auto" }}
                    className="h-7 w-auto object-contain"
                  />
                </div>

                {/* Mobile Links */}
                <div className="flex-1 overflow-y-auto py-4">
                  {navLinks.map((link, i) => (
                    <SheetClose asChild key={link.label}>
                      <Link
                        href={link.href}
                        className="flex items-center px-6 py-3 text-[15px] font-medium text-slate-700 hover:bg-slate-50 hover:text-crimson transition-colors"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>

                {/* Mobile Actions */}
                <div className="p-4 border-t border-slate-100 space-y-3">
                  <SheetClose asChild>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full h-10 text-sm font-medium"
                    >
                      <Link href="/login">Login</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      asChild
                      className="w-full h-10 text-sm font-medium bg-crimson hover:bg-crimson-dark text-white"
                    >
                      <Link href="/login">Get Started</Link>
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}
