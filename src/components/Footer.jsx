import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import { workshopInfo } from '../data/workshopInfo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0D0E10] border-t border-white/[0.05] overflow-hidden">
      {/* Top Carbon Pattern */}
      <div className="absolute inset-0 bg-carbon-dots opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 mb-10">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-4"
            >
              <img
                src="/images/logo.png"
                alt="Dun's Garasi 26"
                className="h-12 w-auto drop-shadow-[0_0_12px_rgba(165,232,73,0.4)]"
              />
              <div>
                <div className="text-lg font-heading font-bold tracking-wide text-[#F5F5F5]">
                  DUN'S GARASI <span className="text-[#A5E849]">26</span>
                </div>
                <div className="text-xs text-[#686D76] uppercase tracking-widest">
                  Bodyrepair & Custom Paint
                </div>
              </div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sm text-[#A0A4AA] leading-relaxed max-w-md"
            >
              Bengkel spesialis pengecatan body motor, restorasi komponen, modifikasi, dan servis berkala di Bekasi.
              Presisi pengerjaan dengan material premium.
            </motion.p>
          </div>

          {/* Navigasi Cepat */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <h4 className="text-sm font-heading font-bold tracking-wider uppercase text-[#F5F5F5] mb-3">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2">
              {['Beranda', 'Tentang', 'Layanan', 'Galeri', 'Lokasi', 'Kontak'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-sm text-[#A0A4AA] hover:text-[#A5E849] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#A5E849]" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Kontak */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-sm font-heading font-bold tracking-wider uppercase text-[#F5F5F5] mb-3">
              Hubungi Kami
            </h4>
            <ul className="space-y-3 text-sm text-[#A0A4AA]">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="shrink-0 mt-0.5 text-[#A5E849]" />
                <a
                  href={workshopInfo.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="leading-snug hover:text-[#A5E849] transition-colors"
                >
                  {workshopInfo.address}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-[#A5E849]" />
                <a
                  href={`https://wa.me/${workshopInfo.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#A5E849] transition-colors"
                >
                  {workshopInfo.phone}
                </a>
              </li>
            </ul>

            {/* Social */}
            <div className="flex items-center gap-3 mt-4">
              <a
                href={workshopInfo.whatsappOfficialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
                aria-label="WhatsApp"
              >
                <img src="/images/walogo.png" alt="WhatsApp" className="w-5 h-5 object-contain" />
              </a>
              <a
                href={workshopInfo.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-[#A5E849]/20 border border-white/10 hover:border-[#A5E849]/40 text-[#A0A4AA] hover:text-[#A5E849] transition-all"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href={workshopInfo.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-[#A5E849]/20 border border-white/10 hover:border-[#A5E849]/40 text-[#A0A4AA] hover:text-[#A5E849] transition-all"
                aria-label="YouTube"
              >
                <Youtube size={16} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#686D76]">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            &copy; {currentYear} <span className="text-[#A5E849] font-semibold">DUN'S GARASI 26 & BODYREPAIR</span>. All rights reserved.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="text-[#686D76]"
          >
            Crafted with precision & passion.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
