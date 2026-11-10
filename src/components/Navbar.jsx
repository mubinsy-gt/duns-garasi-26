import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { workshopInfo } from '../data/workshopInfo';

const navLinks = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Tentang', href: '#tentang' },
  { label: 'Layanan', href: '#layanan' },
  { label: 'Galeri', href: '#galeri' },
  { label: 'Lokasi', href: '#lokasi' },
  { label: 'Kontak', href: '#kontak' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#101114]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/30'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#beranda"
              onClick={(e) => handleNavClick(e, '#beranda')}
              className="flex items-center gap-3 shrink-0"
            >
              <img
                src="/images/logo.png"
                alt="Dun's Garasi 26 Logo"
                className="h-10 md:h-12 w-auto object-contain drop-shadow-[0_0_8px_rgba(165,232,73,0.3)]"
              />
              <div className="hidden sm:block">
                <div className="text-sm font-heading font-bold tracking-wider text-[#F5F5F5] leading-none">
                  DUN'S GARASI<span className="text-[#A5E849]"> 26</span>
                </div>
                <div className="text-[10px] tracking-widest text-[#686D76] uppercase mt-0.5">
                  Bodyrepair & Custom Paint
                </div>
              </div>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative px-3.5 py-2 text-sm font-medium text-[#A0A4AA] hover:text-[#F5F5F5] transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#A5E849] rounded-full transition-all duration-300 group-hover:w-3/4" />
                </a>
              ))}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <motion.a
                href={workshopInfo.whatsappOfficialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-2 bg-[#A5E849] text-[#101114] px-4 py-2.5 rounded-sm text-xs font-heading font-bold tracking-wider uppercase transition-all hover:bg-[#B9F465] shadow-[0_0_20px_-4px_rgba(165,232,73,0.4)] hover:shadow-[0_0_30px_-4px_rgba(165,232,73,0.6)]"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <img src="/images/walogo.png" alt="WhatsApp" className="w-4 h-4 object-contain" />
                Hubungi Kami
              </motion.a>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-[#F5F5F5] hover:text-[#A5E849] transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#101114]/98 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  className="text-2xl font-heading font-bold tracking-wider text-[#F5F5F5] hover:text-[#A5E849] transition-colors uppercase"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href={workshopInfo.whatsappOfficialUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: navLinks.length * 0.07, duration: 0.4 }}
                className="mt-4 inline-flex items-center gap-2.5 bg-[#A5E849] text-[#101114] px-6 py-3 rounded-sm text-sm font-heading font-bold tracking-wider uppercase shadow-glow-green"
              >
                <img src="/images/walogo.png" alt="WhatsApp" className="w-5 h-5 object-contain" />
                Hubungi Kami via WhatsApp
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
