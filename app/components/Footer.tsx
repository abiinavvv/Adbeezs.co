'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Footer() {
  const [hoveredInstagram, setHoveredInstagram] = useState(false);
  
  const contactInfo = [
    { label: 'Email', value: 'adbeezs.co@gmail.com', href: 'mailto:adbeezs.co@gmail.com' },
    { label: 'Instagram', value: '@adbeezs', href: 'https://instagram.com/adbeezs' },
    { label: 'Phone', value: '+91 790 707 5236', href: 'tel:+917907075236' },
    { label: '', value: '+91 974 5371 448', href: 'tel:+919745371448' },
    { label: '', value: '+61 435 424 722', href: 'tel:+61435424722' },
  ];

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50/50 border-t-2 border-black/10 mt-24 sm:mt-32" role="contentinfo" aria-label="Site footer">
      <div className="w-full px-6 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left side - ADBEEZS title and tagline */}
          <motion.div
            className="flex flex-col items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-black tracking-tight"
              style={{ fontFamily: 'var(--font-bebas), sans-serif' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <motion.span
                key={hoveredInstagram ? 'instagram' : 'adbeezs'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {hoveredInstagram ? '@ADBEEZS' : 'ADBEEZS'}
              </motion.span>
            </motion.h2>
            <motion.p
              className="mt-4 text-lg sm:text-xl text-black/80 font-bold uppercase tracking-wide leading-relaxed"
              style={{ fontFamily: 'var(--font-geist-sans), sans-serif' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              WHERE CREATIVITY MEETS ATTENTION
            </motion.p>
          </motion.div>

          {/* Right side - Contact info */}
          <motion.div
            className="flex flex-col gap-4 items-end lg:items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.h3
              className="text-xl font-bold text-black mb-2 w-full lg:w-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Get in Touch
            </motion.h3>
            <div className="space-y-3 w-full">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 p-3 rounded-lg bg-white/50 hover:bg-white border border-black/5 hover:border-black/20 transition-all group w-full focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  whileHover={{ x: 5, scale: 1.02 }}
                  onMouseEnter={() => {
                    if (info.label === 'Instagram') {
                      setHoveredInstagram(true);
                    }
                  }}
                  onMouseLeave={() => {
                    if (info.label === 'Instagram') {
                      setHoveredInstagram(false);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      window.open(info.href, info.href.startsWith('http') ? '_blank' : '_self');
                    }
                  }}
                  aria-label={info.label ? `${info.label}: ${info.value}` : info.value}
                >
                  {info.label && (
                    <span className="text-base font-semibold text-black/70 min-w-[100px] uppercase tracking-wide text-sm">
                      {info.label}
                    </span>
                  )}
                  <span className="text-base font-medium text-black group-hover:text-black/70 transition-colors">
                    {info.value}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Footer bottom */}
        <motion.div
          className="mt-6 pt-4 border-t border-black/10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p className="text-sm text-black/60">
            © {new Date().getFullYear()} Adbeezs. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

