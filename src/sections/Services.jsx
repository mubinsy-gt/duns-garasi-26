import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, Paintbrush, Flame, Droplet, Settings, ArrowUpRight } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { servicesData } from '../data/services';
import { getWhatsAppLink } from '../data/workshopInfo';

const iconMap = {
  Wrench,
  Paintbrush,
  Flame,
  Droplet,
  Settings,
};

// Asymmetric column span mapping for 5 cards:
// Row 1 (2 cards): 7 cols and 5 cols out of 12
// Row 2 (3 cards): 4 cols, 4 cols, 4 cols out of 12
const colSpanMap = [
  'lg:col-span-7',
  'lg:col-span-5',
  'lg:col-span-4',
  'lg:col-span-4',
  'lg:col-span-4',
];

export default function Services() {
  return (
    <section id="layanan" className="relative py-20 md:py-28 bg-[#181A1F] overflow-hidden">
      {/* Background Subtle Automotive Dots Pattern */}
      <div className="absolute inset-0 bg-carbon-dots opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <SectionHeading
          badge="Layanan Utama"
          title="OUR"
          highlightText="SERVICES."
          subtitle="Everything Your Motorcycle Needs."
          align="center"
        />

        {/* Asymmetrical 5-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
          {servicesData.map((service, index) => {
            const Icon = iconMap[service.iconName] || Wrench;
            const colSpan = colSpanMap[index] || 'lg:col-span-4';
            const isWide = index === 0;

            const waMessage = `Halo Dun's Garasi 26, saya ingin berkonsultasi mengenai layanan ${service.title}.`;
            const waUrl = getWhatsAppLink(waMessage);

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className={`${colSpan} group relative bg-[#22252B] border border-white/[0.08] hover:border-[#A5E849]/70 rounded-sm p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.5),0_0_25px_rgba(165,232,73,0.18)]`}
              >
                {/* Top Subtle Lime Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#A5E849]/0 to-transparent group-hover:via-[#A5E849] transition-all duration-500 rounded-t-sm" />

                {/* Big Watermark Number */}
                <span className="absolute top-4 right-5 text-4xl sm:text-5xl font-heading font-black text-white/[0.04] group-hover:text-[#A5E849]/10 transition-colors duration-300 select-none">
                  {service.number}
                </span>

                <div>
                  {/* Icon & Badge Row */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-sm bg-[#181A1F] border border-white/[0.08] group-hover:border-[#A5E849]/40 group-hover:bg-[#A5E849]/10 text-[#A5E849] flex items-center justify-center transition-all duration-300 shadow-inner">
                      <Icon size={24} className="transition-transform duration-300 group-hover:scale-110" />
                    </div>

                    <span className="text-[11px] font-mono tracking-widest text-[#686D76] uppercase group-hover:text-[#A5E849] transition-colors">
                      Dun's #{service.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`font-heading font-bold text-[#F5F5F5] group-hover:text-[#A5E849] transition-colors duration-300 tracking-tight ${
                    isWide ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
                  } mb-3`}>
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-[#A0A4AA] leading-relaxed mb-6 font-sans">
                    {service.description}
                  </p>
                </div>

                {/* CTA Button: "Konsultasikan Layanan" */}
                <div className="pt-4 border-t border-white/[0.06] mt-auto">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn relative inline-flex items-center justify-between w-full px-4 py-3 bg-[#181A1F] hover:bg-[#A5E849] text-[#A0A4AA] hover:text-[#101114] border border-white/[0.08] hover:border-[#A5E849] rounded-sm text-xs sm:text-sm font-heading font-semibold tracking-wider uppercase transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(165,232,73,0.35)]"
                  >
                    <span className="flex items-center gap-2">
                      <img src="/images/walogo.png" alt="WhatsApp" className="w-4 h-4 object-contain" />
                      <span>Konsultasikan Layanan</span>
                    </span>
                    <ArrowUpRight size={16} className="text-[#686D76] group-hover/btn:text-[#101114] transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
