import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import { workshopInfo } from '../data/workshopInfo';

export default function About() {
  return (
    <section id="tentang" className="relative py-20 md:py-28 bg-[#101114] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-garage-grid opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Tentang Kami"
          title="MORE THAN JUST"
          highlightText="A WORKSHOP."
          align="center"
        />

        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Text Block */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-5"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-[#F5F5F5] font-heading leading-tight">
              Bengkel Cat & Body Repair Motor Presisi di <span className="text-[#A5E849]">Bekasi</span>
            </h3>
            <p className="text-[#A0A4AA] leading-relaxed">
              <span className="font-semibold text-[#F5F5F5]">Dun's Garasi 26 & Bodyrepair</span> adalah bengkel spesialis pengecatan body motor,
              restorasi bodi pecah atau retak, modifikasi kustom, bore up mesin, serta servis berkala untuk kendaraan roda dua.
            </p>
            <p className="text-[#A0A4AA] leading-relaxed">
              Kami menggunakan material cat <span className="font-semibold text-[#F5F5F5]">PU (Polyurethane) premium</span>,
              epoxy primer anti karat, serta clear coat berlapis tebal untuk hasil kilap maksimal (wet look) yang awet dan tahan cuaca ekstrem.
            </p>
            <p className="text-[#A0A4AA] leading-relaxed">
              Setiap pengerjaan dilakukan dengan perhatian pada detail, mulai dari tahap persiapan permukaan, teknik plastic welding untuk
              body repair, hingga proses spraying dan finishing yang presisi.
            </p>

            {/* Info Blocks */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-[#181A1F] border border-white/5 rounded-sm">
                <div className="text-3xl font-bold text-[#A5E849] font-heading mb-1">5</div>
                <div className="text-xs text-[#686D76] uppercase tracking-wide">Layanan Utama</div>
              </div>
              <div className="p-4 bg-[#181A1F] border border-white/5 rounded-sm">
                <div className="text-3xl font-bold text-[#A5E849] font-heading mb-1">PU</div>
                <div className="text-xs text-[#686D76] uppercase tracking-wide">Cat Premium</div>
              </div>
            </div>
          </motion.div>

          {/* Right Image Collage */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Large Image */}
              <div className="col-span-2 row-span-1 relative overflow-hidden rounded-sm border border-white/10 group h-64">
                <img
                  src="/images/modifikasi.png"
                  alt="Hasil Modifikasi Honda PCX"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="text-white text-sm font-semibold">Honda PCX Custom</p>
                  <p className="text-white/70 text-xs">Candy Red Finish</p>
                </div>
              </div>

              {/* Small Image 1 */}
              <div className="relative overflow-hidden rounded-sm border border-white/10 aspect-square group">
                <img
                  src="/images/service.png"
                  alt="Servis Motor Yamaha Mio"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Small Image 2 */}
              <div className="relative overflow-hidden rounded-sm border border-white/10 aspect-square group">
                <img
                  src="/images/cat1.jpeg"
                  alt="Proses Pengecatan Body"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Support Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 p-6 md:p-8 bg-[#181A1F] border border-white/5 rounded-sm"
        >
          <div className="text-center mb-6">
            <h4 className="text-sm font-heading font-bold tracking-widest uppercase text-[#686D76] mb-3">
              Supported By
            </h4>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-xs text-[#A0A4AA]">
              {workshopInfo.supportedBy.map((partner, i) => (
                <div key={i} className="text-center">
                  <div className="font-semibold text-[#F5F5F5]">{partner.name}</div>
                  <div className="text-[10px] text-[#686D76]">{partner.subtitle}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
