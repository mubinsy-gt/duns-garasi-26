import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import { workshopInfo } from '../data/workshopInfo';

export default function Location() {
  return (
    <section id="lokasi" className="relative py-20 md:py-28 bg-[#101114] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-garage-grid opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Lokasi Bengkel"
          title="VISIT OUR"
          highlightText="WORKSHOP."
          subtitle="Kunjungi bengkel kami untuk konsultasi langsung dan pengerjaan motor berkualitas."
          align="center"
        />

        <div className="max-w-4xl mx-auto">
          {/* Location Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="bg-[#181A1F] border border-white/5 rounded-sm p-8 md:p-10 shadow-card-dark"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
              {/* Icon */}
              <div className="shrink-0 w-16 h-16 rounded-sm bg-[#A5E849]/10 border border-[#A5E849]/30 flex items-center justify-center">
                <MapPin size={32} className="text-[#A5E849]" />
              </div>

              {/* Address Info */}
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-[#F5F5F5] mb-2 font-heading">
                  {workshopInfo.name}
                </h3>
                <p className="text-base text-[#A0A4AA] leading-relaxed mb-1">
                  {workshopInfo.address}
                </p>
                <p className="text-sm text-[#686D76]">{workshopInfo.city}</p>
              </div>
            </div>

            {/* Operational Hours */}
            <div className="bg-[#22252B] rounded-sm p-5 mb-6 border border-white/5">
              <h4 className="text-sm font-bold text-[#F5F5F5] uppercase tracking-wider mb-3 flex items-center gap-2">
                <Navigation size={16} className="text-[#A5E849]" />
                Jam Operasional
              </h4>
              <div className="space-y-2 text-sm text-[#A0A4AA]">
                <p className="flex items-center justify-between">
                  <span className="font-medium text-[#F5F5F5]">Senin – Sabtu:</span>
                  <span>09.00 – 21.00 WIB</span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="font-medium text-[#F5F5F5]">Minggu:</span>
                  <span>By Appointment / Konfirmasi</span>
                </p>
              </div>
            </div>

            {/* Google Maps Preview */}
            <motion.a
              href={workshopInfo.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="block relative w-full aspect-video rounded-sm overflow-hidden border border-white/10 hover:border-[#A5E849]/40 transition-all duration-300 cursor-pointer group mb-6"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2969087654843!2d106.99956287499478!3d-6.223456893764892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698d0e0e0e0e0e%3A0x0!2zNsKwMTMnMjQuNCJTIDEwNsKwNjAnMDYuMCJF!5e0!3m2!1sen!2sid!4v1699999999999!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Dun's Garasi 26 & Bodyrepair"
                className="pointer-events-none"
              />

              {/* Overlay untuk klik */}
              <div className="absolute inset-0 bg-transparent group-hover:bg-[#A5E849]/5 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#181A1F]/90 backdrop-blur-sm px-4 py-2 rounded-sm border border-[#A5E849]/50">
                  <span className="text-xs font-bold text-[#A5E849] uppercase tracking-wider flex items-center gap-2">
                    <ExternalLink size={14} />
                    Buka di Google Maps
                  </span>
                </div>
              </div>
            </motion.a>

            {/* Google Maps Button */}
            <Button
              variant="primary"
              size="lg"
              href={workshopInfo.googleMapsUrl}
              external
              fullWidth
              icon={ExternalLink}
              iconPosition="right"
            >
              Lihat Lokasi di Google Maps
            </Button>

            <p className="text-xs text-[#686D76] text-center mt-4">
              Klik tombol di atas untuk membuka petunjuk arah di Google Maps
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
