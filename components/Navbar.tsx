"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "/#home" },
  { name: "About Us", href: "/#about" },
  { name: "Mission", href: "/#mission" },
  { name: "Team", href: "/#team" },
  { name: "Our Work", href: "/#work" },
  { name: "Get Involved", href: "/#get-involved" },
  { name: "Contact", href: "/#contact" },
  { name: "Feedback", href: "/#feedback" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3"
          : "bg-white shadow-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/#home"
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
        >
          <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/New_logo.png"
              alt="Premadhu Gau Seva Samiti Logo"
              fill
              className="object-contain rounded-lg"
              priority
            />
          </div>
          <span className="font-semibold text-lg sm:text-xl md:text-2xl text-primary tracking-tight leading-tight">
            Premadhu Gau Seva Samiti
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative text-[15px] font-medium text-text-dark hover:text-primary transition-colors py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary hover:after:w-full after:transition-all after:duration-300"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg text-text-dark hover:text-primary hover:bg-bg-light focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2.5 rounded-md text-base font-medium text-text-dark hover:text-primary hover:bg-bg-light transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
