'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, FormEvent } from 'react';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import HoneybeeCursor from '../components/HoneybeeCursor';
import ScrollProgress from '../components/ScrollProgress';
import MobileMenu from '../components/MobileMenu';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const pathname = usePathname();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Contact', href: '/contact' },
    { name: 'Our Clients', href: '/clients' },
  ];

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Clear previous status
    setSubmitStatus({ type: null, message: '' });

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: data.message || 'Thank you! Your message has been sent successfully.',
        });
        // Reset form
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Something went wrong. Please try again.',
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      label: 'Email',
      value: 'adbeezs.co@gmail.com',
      href: 'mailto:adbeezs.co@gmail.com',
    },
    {
      label: 'Phone',
      value: '+91 790 707 5236',
      href: 'tel:+917907075236',
    },
    {
      label: 'Phone',
      value: '+91 974 5371 448',
      href: 'tel:+919745371448',
    },
    {
      label: 'Phone',
      value: '+61 435 424 722',
      href: 'tel:+61435424722',
    },
    {
      label: 'Instagram',
      value: '@adbeezs',
      href: 'https://instagram.com/adbeezs',
    },
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
      
      <main id="main-content" className="pb-20" role="main">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Hero Section */}
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-black mb-4">
              CONTACT
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-black/70" aria-label="Contact page description">
              Let&apos;s start a conversation
            </p>
          </motion.div>

          {/* Contact Methods */}
          <section aria-label="Contact methods">
            <h2 className="sr-only">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={`${method.label}: ${method.value}`}
                  className="group relative p-6 bg-white border-2 border-black/10 rounded-lg hover:border-black/30 transition-all overflow-hidden focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.03, y: -8 }}
                >
                {/* Gradient overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-orange-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  style={{ transform: 'skewX(-20deg)' }}
                />
                <div className="flex items-center gap-4 relative z-10">
                  <motion.div 
                    className="w-12 h-12 flex items-center justify-center bg-black/5 rounded-lg group-hover:bg-black/10 transition-colors"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {method.label === 'Email' && (
                      <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )}
                    {method.label === 'Phone' && (
                      <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    )}
                    {method.label === 'Instagram' && (
                      <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    )}
                  </motion.div>
                  <div>
                    <p className="text-sm text-black/60 mb-1 uppercase tracking-wide font-medium">{method.label}</p>
                    <p className="text-lg font-semibold text-black group-hover:text-black/70 transition-colors">
                      {method.value}
                    </p>
                  </div>
                </div>
              </motion.a>
            ))}
            </div>
          </section>

          {/* Contact Form */}
          <motion.section
            className="bg-white border-2 border-black/10 rounded-lg p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            aria-labelledby="form-title"
          >
            <h2 id="form-title" className="text-3xl font-bold text-black mb-6">Send us a message</h2>
            
            {/* Success/Error Messages */}
            <AnimatePresence>
              {submitStatus.type && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`mb-6 p-4 rounded-lg ${
                    submitStatus.type === 'success'
                      ? 'bg-green-50 border-2 border-green-200 text-green-800'
                      : 'bg-red-50 border-2 border-red-200 text-red-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {submitStatus.type === 'success' ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                    <p className="font-medium">{submitStatus.message}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors text-black ${
                    errors.name
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                      : 'border-black/10 focus:border-black focus:ring-black/20'
                  }`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-600"
                  >
                    {errors.name}
                  </motion.p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors text-black ${
                    errors.email
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                      : 'border-black/10 focus:border-black focus:ring-black/20'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-600"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-black mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors resize-none text-black ${
                    errors.message
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                      : 'border-black/10 focus:border-black focus:ring-black/20'
                  }`}
                  placeholder="Tell us about your project..."
                />
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-600"
                  >
                    {errors.message}
                  </motion.p>
                )}
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-black text-white font-semibold rounded-lg hover:bg-black/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group/btn"
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {/* Shine effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"
                  style={{ transform: 'skewX(-20deg)' }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </span>
              </motion.button>
            </form>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

