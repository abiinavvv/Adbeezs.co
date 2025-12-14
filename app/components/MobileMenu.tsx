'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

interface MobileMenuProps {
  navItems: { name: string; href: string }[];
}

export default function MobileMenu({ navItems }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
          }
          if (e.key === 'Escape' && isOpen) {
            closeMenu();
          }
        }}
        className="md:hidden flex flex-col gap-1.5 p-2 z-50 relative"
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <motion.span
          className="w-6 h-0.5 bg-black block"
          animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="w-6 h-0.5 bg-black block"
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="w-6 h-0.5 bg-black block"
          animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        />
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
            />
            
            {/* Menu Panel */}
            <motion.nav
              id="mobile-menu"
              className="fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 md:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              aria-label="Mobile navigation menu"
              role="navigation"
            >
              <div className="flex flex-col h-full pt-20 px-6">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        onKeyDown={(e) => {
                          if (e.key === 'Escape') {
                            closeMenu();
                          }
                        }}
                        aria-current={isActive ? 'page' : undefined}
                        className={`block py-4 text-lg font-medium text-black border-b border-black/10 focus:outline-2 focus:outline-black focus:outline-offset-2 rounded ${
                          isActive ? 'text-black font-bold' : 'text-black/70'
                        }`}
                      >
                        {item.name}
                        {isActive && (
                          <motion.div
                            className="h-0.5 bg-black mt-1"
                            layoutId="mobile-underline"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

