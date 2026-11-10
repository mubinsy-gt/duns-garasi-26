import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Wrench, Paintbrush, Shield, Users } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

const advantages = [
  {
    icon: Paintbrush,
    title: 'Material Cat PU Premium',
    description: 'Polyurethane berkualitas tinggi dengan hasil kilap maksimal, tahan lama, dan tidak mudah pudar.',
  },
  {
    icon: Wrench,
    title: 'Teknik Pengerjaan Presisi',
    description: 'Setiap tahap dikerjakan teliti, mulai persiapan permukaan, plastic welding, hingga finishing clear coat.',
  },
  {
    icon: Shield,
    title: 'Epoxy Primer Anti Karat',
    description: 'Lapisan dasar epoxy mencegah karat dan korosi, menjamin cat tidak kelupas dalam jangka panjang.',
  },
  {
    icon: Users,
    title: 'Konsultasi Langsung',
    description: 'Diskusi warna, pilihan finishing, dan estimasi biaya secara transparan sebelum pengerjaan dimulai.',
  },
];

export default function WhyChooseUs() {
  return (
    <section id="keunggulan" className="relative py-20 md:py-28 bg-[#181A1F] overflow-hidden">
      <div className="absolute inset-0 bg-carbon-dots opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Keunggulan"
          title="WHY CHOOSE"
          highlightText="US?"
          subtitle="Komitmen kami pada kualitas pengerjaan dan kepuasan pelanggan."
          align="center"
        />

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {advantages.map((adv, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-[#22252B] border border-white/5 rounded-sm p-6 hover:border-[#A5E849]/40 transition-all duration-500"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-sm bg-[#A5E849]/10 text-[#A5E849] mb-4 group-hover:bg-[#A5E849]/20 transition-colors">
                <adv.icon size={24} />
              </div>
              <h4 className="text-base font-bold text-[#F5F5F5] mb-2 font-heading">
                {adv.title}
              </h4>
              <p className="text-sm text-[#A0A4AA] leading-relaxed">
                {adv.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quality Promise */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-gradient-to-br from-[#22252B] to-[#181A1F] border border-[#A5E849]/20 rounded-sm p-8 md:p-10"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="shrink-0 w-12 h-12 rounded-full bg-[#A5E849]/10 flex items-center justify-center">
              <CheckCircle2 size={24} className="text-[#A5E849]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#F5F5F5] mb-2 font-heading">
                Fokus Pada <span className="text-[#A5E849]">Detail Pengerjaan</span>
              </h3>
              <p className="text-[#A0A4AA] leading-relaxed">
                Kami memahami bahwa motor Anda bukan sekadar kendaraan, tetapi investasi dan kebanggaan pribadi.
                Oleh karena itu, setiap proses pengecatan dan body repair dilakukan dengan standar tinggi,
                menggunakan material terpilih, dan dokumentasi hasil pekerjaan yang transparan.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
            <div>
              <div className="text-sm text-[#686D76] mb-1">Persiapan Permukaan</div>
              <div className="text-lg font-bold text-[#A5E849] font-heading">Presisi</div>
            </div>
            <div>
              <div className="text-sm text-[#686D76] mb-1">Proses Spraying</div>
              <div className="text-lg font-bold text-[#A5E849] font-heading">Teknik Pro</div>
            </div>
            <div>
              <div className="text-sm text-[#686D76] mb-1">Clear Coat Finish</div>
              <div className="text-lg font-bold text-[#A5E849] font-heading">3x Layer</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
