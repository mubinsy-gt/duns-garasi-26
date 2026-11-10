import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Play } from 'lucide-react';
import Button from '../components/Button';
import { workshopInfo } from '../data/workshopInfo';

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const scrollToGallery = () => {
    document.querySelector('#galeri')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="beranda" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#101114]">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="/images/cat1.jpeg"
        >
          <source src="/videos/catvideo.mp4" type="video/mp4" />
        </video>
        {/* Dark Cinematic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#101114]/95 via-[#101114]/85 to-[#101114]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#101114]/90 via-transparent to-[#101114]/90" />
        {/* Subtle Grain Texture */}
        <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#A5E849]/10 border border-[#A5E849]/30 text-[#A5E849] text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-[#A5E849] animate-pulse" />
          {workshopInfo.badge}
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#F5F5F5] tracking-tighter leading-[1.1] font-heading uppercase mb-4"
        >
          RESTORE THE LOOK.
          <br />
          <span className="text-[#A5E849] drop-shadow-[0_0_30px_rgba(165,232,73,0.4)]">
            REDEFINE THE RIDE.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-base sm:text-lg md:text-xl text-[#A0A4AA] max-w-3xl mx-auto leading-relaxed mb-10"
        >
          {workshopInfo.subtagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            variant="primary"
            size="lg"
            href={workshopInfo.whatsappOfficialUrl}
            external
            icon={true}
            iconPosition="left"
            isWhatsApp={true}
          >
            Konsultasi via WhatsApp
          </Button>
          <Button
            variant="ghost"
            size="lg"
            onClick={scrollToGallery}
            icon={Play}
            iconPosition="left"
          >
            Lihat Hasil Pekerjaan
          </Button>
        </motion.div>

        {/* Logo Brand */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 md:mt-20"
        >
          <img
            src="/images/logo.png"
            alt="Dun's Garasi 26 Logo"
            className="h-20 md:h-28 w-auto mx-auto drop-shadow-[0_0_40px_rgba(165,232,73,0.35)] opacity-90"
          />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-[#686D76] uppercase tracking-widest font-medium">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-12 bg-gradient-to-b from-[#A5E849] to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
