import React from 'react';
import { motion } from 'framer-motion';
import { workshopInfo } from '../data/workshopInfo';

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href={workshopInfo.whatsappOfficialUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 left-6 z-40 flex items-center justify-center transition-all duration-300 group cursor-pointer"
      aria-label="Chat via WhatsApp"
    >
      <img
        src="/images/walogo.png"
        alt="WhatsApp"
        className="w-20 h-20 sm:w-24 sm:h-24 object-contain transition-transform duration-300 group-hover:scale-110"
      />

      {/* Tooltip */}
      <div className="absolute left-full ml-3 px-3 py-2 bg-[#181A1F] border border-white/10 rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <span className="text-xs font-semibold text-[#F5F5F5]">Chat WhatsApp</span>
        <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-4 border-r-[#181A1F]" />
      </div>
    </motion.a>
  );
}
