'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import HoneybeeCursor from '../components/HoneybeeCursor';
import ScrollProgress from '../components/ScrollProgress';
import MobileMenu from '../components/MobileMenu';

export default function Clients() {
  const pathname = usePathname();
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Contact', href: '/contact' },
    { name: 'Our Clients', href: '/clients' },
  ];

  return (
    <div className="min-h-screen bg-white relative">
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <ScrollProgress />
      <HoneybeeCursor />
      {/* Header integrated in page */}
      <header className="w-full" role="banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-2 sm:py-3 md:py-4 lg:py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center" aria-label="Adbeezs Home">
            <Logo size="small" />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Main navigation" role="navigation">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className="relative text-sm lg:text-base font-medium text-black hover:text-black/70 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 rounded"
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black"
                      layoutId="underline"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <MobileMenu navItems={navItems} />
          </div>
        </div>
      </header>
      
      <main id="main-content" className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Hero Section */}
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-black mb-4">
              OUR CLIENTS
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-black/70">
              Trusted by brands that value creativity and results
            </p>
          </motion.div>

          {/* Coming Soon Section - Spotify Style */}
          <section aria-labelledby="clients-coming-soon">
            <motion.div
              className="flex flex-col items-center justify-center min-h-[60vh] text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
            {/* Icon/Visual Element */}
            <motion.div
              className="mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              aria-hidden="true"
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 border-2 border-black/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 sm:w-16 sm:h-16 text-black/40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
            </motion.div>

            {/* Main Message */}
            <motion.h2
              id="clients-coming-soon"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              We&apos;re building something special
            </motion.h2>

            {/* Quote */}
            <motion.div
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <p className="text-xl sm:text-2xl md:text-3xl text-black/60 font-serif italic mb-4 leading-relaxed">
                "Great things are done by a series of small things brought together."
              </p>
              <p className="text-sm sm:text-base text-black/40 mt-6">
                — Vincent van Gogh
              </p>
            </motion.div>

            {/* Subtext */}
            <motion.p
              className="text-base sm:text-lg text-black/50 mt-12 max-w-md mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              Our client showcase is coming soon. We're working with amazing brands to create impactful stories.
            </motion.p>

            {/* CTA */}
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
            >
              <Link
                href="/contact"
                className="inline-block px-8 py-4 bg-black text-white font-semibold rounded-lg hover:bg-black/90 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 rounded"
                aria-label="Contact us to be the first client"
              >
                Be the first to join us
              </Link>
            </motion.div>
            </motion.div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

