'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Contact', href: '/contact' },
    { name: 'Our Clients', href: '/clients' },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-black/5"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 sm:py-10 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Logo size="small" />
        </Link>

        <nav className="flex items-center gap-8">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              >
                <Link
                  href={item.href}
                  className="relative text-sm font-medium text-black hover:text-black/70 transition-colors"
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
                  {item.name === 'Our Clients' && !isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-[1px] bg-black/30"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </div>
    </motion.header>
  );
}

