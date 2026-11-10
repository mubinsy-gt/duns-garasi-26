import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { galleryCategories, galleryItems } from '../data/gallery';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const goToNext = () => {
    setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const goToPrev = () => {
    setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <section id="galeri" className="relative py-20 md:py-28 bg-[#101114] overflow-hidden">
      <div className="absolute inset-0 bg-garage-grid opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Portfolio"
          title="OUR WORKS."
          highlightText="YOUR STYLE."
          subtitle="Dokumentasi hasil pekerjaan pengecatan, body repair, dan modifikasi motor dari bengkel Dun's Garasi 26."
          align="center"
        />

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          {galleryCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-sm text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-[#A5E849] text-[#101114] shadow-glow-green-sm'
                  : 'bg-[#22252B] text-[#A0A4AA] border border-white/10 hover:border-[#A5E849]/40 hover:text-[#F5F5F5]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Masonry Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="wait">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`relative overflow-hidden rounded-sm border border-white/10 group cursor-pointer ${
                  item.aspect === 'tall' ? 'row-span-2' : ''
                } ${item.aspect === 'wide' ? 'sm:col-span-2' : ''}`}
                onClick={() => openLightbox(index)}
              >
                {item.type === 'video' ? (
                  <div className="relative w-full h-full min-h-[300px]">
                    <video
                      src={item.src}
                      poster={item.poster}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-16 h-16 rounded-full bg-[#A5E849] flex items-center justify-center shadow-glow-green">
                        <Play size={28} className="text-[#101114] ml-1" fill="#101114" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                )}

                {/* Overlay Info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
                  <div className="mb-2">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-[#A5E849] text-[#101114] text-[10px] font-bold uppercase tracking-wider">
                      {item.categoryLabel}
                    </span>
                  </div>
                  <h4 className="text-white font-semibold text-sm mb-1">{item.title}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] text-white/70 bg-white/10 px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            {/* Navigation */}
            {filteredItems.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); goToPrev(); }}
                  className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
                  aria-label="Previous"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); goToNext(); }}
                  className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
                  aria-label="Next"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Content */}
            <div className="max-w-6xl max-h-[90vh] w-full mx-4" onClick={(e) => e.stopPropagation()}>
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                {filteredItems[lightboxIndex]?.type === 'video' ? (
                  <video
                    src={filteredItems[lightboxIndex].src}
                    controls
                    autoPlay
                    loop
                    className="w-full h-auto max-h-[80vh] object-contain rounded-sm"
                  />
                ) : (
                  <img
                    src={filteredItems[lightboxIndex]?.src}
                    alt={filteredItems[lightboxIndex]?.title}
                    className="w-full h-auto max-h-[80vh] object-contain rounded-sm"
                  />
                )}
                <div className="mt-4 text-center">
                  <h3 className="text-white text-lg font-semibold mb-2">
                    {filteredItems[lightboxIndex]?.title}
                  </h3>
                  <p className="text-white/70 text-sm">
                    {filteredItems[lightboxIndex]?.description}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
