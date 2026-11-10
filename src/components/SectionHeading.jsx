import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeading({
  badge,
  title,
  highlightText,
  subtitle,
  align = 'center',
  accentColor = 'green'
}) {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 md:mb-16 ${isCenter ? 'text-center mx-auto' : 'text-left'} max-w-3xl`}>
      {/* Badge / Tag */}
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4 border ${
            accentColor === 'red'
              ? 'bg-[#E63B36]/10 text-[#E63B36] border-[#E63B36]/30'
              : 'bg-[#A5E849]/10 text-[#A5E849] border-[#A5E849]/30'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full animate-ping ${
              accentColor === 'red' ? 'bg-[#E63B36]' : 'bg-[#A5E849]'
            }`}
          />
          <span>{badge}</span>
        </motion.div>
      )}

      {/* Main Title */}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F5F5] tracking-tight uppercase leading-tight font-heading"
      >
        {title}{' '}
        {highlightText && (
          <span
            className={
              accentColor === 'red'
                ? 'text-[#E63B36]'
                : 'text-[#A5E849] drop-shadow-[0_0_20px_rgba(165,232,73,0.35)]'
            }
          >
            {highlightText}
          </span>
        )}
      </motion.h2>

      {/* Editorial Decorative Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`h-1 w-20 mt-4 rounded-full ${
          isCenter ? 'mx-auto' : ''
        } ${accentColor === 'red' ? 'bg-[#E63B36]' : 'bg-[#A5E849]'}`}
      />

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-[#A0A4AA] text-base sm:text-lg leading-relaxed font-sans"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
