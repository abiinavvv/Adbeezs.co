'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Footer from './components/Footer';
import Logo from './components/Logo';
import HoneybeeCursor from './components/HoneybeeCursor';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgress from './components/ScrollProgress';
import MobileMenu from './components/MobileMenu';
import ParallaxSection from './components/ParallaxSection';
import Image from 'next/image';

export default function Home() {
  const pathname = usePathname();
  const pillars = ['Attention', 'Creativity', 'Results'];
  const title = 'ADBEEZS';
  const letters = title.split('');

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Contact', href: '/contact' },
    { name: 'Our Clients', href: '/clients' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 100,
      rotateX: -90,
      scale: 0.5,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        type: 'spring' as const,
        stiffness: 100,
        damping: 10,
      },
    }),
  };

  return (
    <div className="min-h-screen bg-white relative">
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <ScrollProgress />
      <HoneybeeCursor />
      <ScrollToTop />
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
                  className="relative text-sm lg:text-base font-medium text-black hover:text-black/70 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 rounded group/nav"
                >
                  <motion.span
                    className="relative z-10"
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.name}
                  </motion.span>
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black"
                      layoutId="underline"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  {/* Hover underline effect */}
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black/30 origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
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
      
      <main id="main-content">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8 sm:pt-12 md:pt-16 pb-8 sm:pb-16 md:pb-24 lg:pb-32" aria-labelledby="hero-title">
          <motion.div
            className="text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              id="hero-title"
              className="text-8xl xs:text-9xl sm:text-[10rem] md:text-[12rem] lg:text-[14rem] xl:text-[16rem] 2xl:text-[18rem] font-bold text-black mb-8 sm:mb-12 md:mb-16 tracking-[0.05em] sm:tracking-[0.1em] flex items-center justify-center gap-1 sm:gap-2 md:gap-3 flex-wrap"
              style={{ fontFamily: 'var(--font-bebas), sans-serif' }}
            >
              {letters.map((letter, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block relative"
                  whileHover={{
                    scale: 1.2,
                    y: -10,
                    rotateY: 15,
                    transition: { duration: 0.3 },
                  }}
                >
                  <motion.span
                    className="relative z-10"
                    whileHover={{
                      textShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
                    }}
                  >
                    {letter}
                  </motion.span>
                  {letter === 'B' && (
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-b from-yellow-400/30 to-transparent blur-xl"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: [0, 0.5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 1,
                      }}
                    />
                  )}
                  {letter === 'Z' && (
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-b from-yellow-400/30 to-transparent blur-xl"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: [0, 0.5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 1.5,
                      }}
                    />
                  )}
                </motion.span>
              ))}
            </motion.h1>
            
            <motion.p
              className="text-base sm:text-xl md:text-2xl lg:text-3xl text-black/80 mb-16 sm:mb-24 md:mb-32 tracking-wide px-4"
              variants={itemVariants}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              aria-label="Company tagline"
            >
              ADVERTISING COMPANY
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-20 md:gap-32 lg:gap-40 xl:gap-48 2xl:gap-56 mt-4 sm:mt-8 relative group px-4"
              variants={itemVariants}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              {/* Honeycomb pattern on hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='0.6'%3E%3Cpath d='M40 10L50 15V25L40 30L30 25V15Z'/%3E%3Cpath d='M30 30L40 35V45L30 50L20 45V35Z'/%3E%3Cpath d='M40 35L50 40V50L40 55L30 50V40Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundSize: '80px 80px',
                }}
              />
              {pillars.map((pillar, index) => (
                <motion.span
                  key={pillar}
                  className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black uppercase tracking-wider relative z-10 cursor-default"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.8 + index * 0.2,
                    type: 'spring',
                    stiffness: 200,
                  }}
                  whileHover={{ 
                    scale: 1.15, 
                    color: '#FFD700',
                    textShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {pillar.toUpperCase()}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* About Us Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-8 sm:pt-16 md:pt-24 lg:pt-32 pb-16 sm:pb-24 md:pb-32" aria-labelledby="about-title">
          <ParallaxSection speed={0.3}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left - About Us Content */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2
                id="about-title"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 sm:mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                ABOUT US!
              </motion.h2>
              
              <motion.p
                className="text-xl sm:text-2xl md:text-3xl font-serif text-black mb-6 sm:mb-8"
                style={{ fontFamily: 'var(--font-playfair)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                aria-label="Company description"
              >
                Adbeezs - Where Creativity Meets Attention
              </motion.p>

              <motion.div
                className="space-y-4 sm:space-y-6 text-sm sm:text-base md:text-lg leading-relaxed text-black/80"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <p>
                  At Adbeezs, we are architects of attention. We don&apos;t just create ads—we craft experiences that captivate, inspire, and leave lasting impressions. Our mission is to transform the way brands connect with their audiences through innovative advertising solutions that break through the noise.
                </p>
                <p>
                  We believe in a new way of advertising—one that seamlessly blends creativity with strategy, innovation with impact. Every campaign we design is a carefully orchestrated journey that turns static spaces into storytelling platforms and everyday moments into marketing opportunities.
                </p>
                <p>
                  With fresh thinking, modern design, and data-driven strategies, we ensure that every project is unique, engaging, and built to inspire. Our team is dedicated to creating campaigns that don&apos;t just reach audiences—they engage, inspire, and build lasting brand loyalty.
                </p>
                <p className="font-semibold text-black mt-6">
                  Adbeezs - Attention. Creativity. Results.
                </p>
              </motion.div>
            </motion.div>

            {/* Right - Quote */}
            <motion.div
              className="flex items-center justify-center lg:justify-end relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="text-right">
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <motion.p
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black leading-tight"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    STORIES START
                  </motion.p>
                  <motion.p
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black leading-tight"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    HERE.
                  </motion.p>
                  <motion.p
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black leading-tight"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    SOME EVEN
                  </motion.p>
                  <motion.p
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black leading-tight relative inline-block"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    END WELL.
                    <motion.span
                      className="absolute -bottom-2 left-0 right-0 h-[2px] bg-black"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1, duration: 0.6 }}
                    />
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
            </div>
          </ParallaxSection>
        </section>

        {/* Image Showcase Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-0 pb-16 sm:pb-24 md:pb-32" aria-label="Advertising showcase">
          <ParallaxSection speed={0.4}>
            <motion.div
              className="relative w-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Image */}
              <div className="relative w-full">
                <Image
                  src="/images/pic.png"
                  alt="Adbeezs Advertising Showcase - Examples of our creative advertising solutions"
                  width={1920}
                  height={1080}
                  className="w-full h-auto object-contain"
                  sizes="100vw"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </ParallaxSection>
        </section>

        {/* Handwritten Slogan */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 sm:py-32">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-black"
              style={{ 
                fontFamily: 'var(--font-playfair), cursive',
                fontStyle: 'italic',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}
            >
              The new way of advertising.
            </motion.p>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
