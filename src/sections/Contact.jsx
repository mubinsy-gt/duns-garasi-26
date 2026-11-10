import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Send, ExternalLink } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import { workshopInfo } from '../data/workshopInfo';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vehicle: '',
    service: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, vehicle, service, message } = formData;

    const waMessage = `Halo Dun's Garasi 26, saya ingin konsultasi:

Nama: ${name}
No. WhatsApp: ${phone}
Jenis Kendaraan: ${vehicle}
Layanan yang Dibutuhkan: ${service}
Pesan: ${message}`;

    window.open(getWhatsAppLink(waMessage), '_blank');
  };

  return (
    <section id="kontak" className="relative py-20 md:py-28 bg-[#101114] overflow-hidden">
      <div className="absolute inset-0 bg-garage-grid opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Hubungi Kami"
          title="LET'S TALK ABOUT"
          highlightText="YOUR BIKE."
          subtitle="Konsultasikan kebutuhan pengecatan, body repair, atau modifikasi motor Anda bersama kami."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-4">
            {/* Address */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#181A1F] border border-white/5 rounded-sm p-6"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-sm bg-[#A5E849]/10 flex items-center justify-center">
                  <MapPin size={20} className="text-[#A5E849]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#F5F5F5] mb-2 uppercase tracking-wide">Alamat Bengkel</h4>
                  <p className="text-sm text-[#A0A4AA] leading-relaxed mb-3">
                    {workshopInfo.address}
                  </p>
                  <a
                    href={workshopInfo.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#A5E849] hover:text-[#B9F465] transition-colors font-semibold"
                  >
                    <ExternalLink size={14} />
                    Buka di Google Maps
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#181A1F] border border-white/5 rounded-sm p-6"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-sm bg-[#A5E849]/10 flex items-center justify-center">
                  <Phone size={20} className="text-[#A5E849]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#F5F5F5] mb-2 uppercase tracking-wide">Telepon / WhatsApp</h4>
                  <a
                    href={workshopInfo.whatsappOfficialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-bold text-[#A5E849] hover:text-[#B9F465] transition-colors font-heading block"
                  >
                    {workshopInfo.phone}
                  </a>
                  <span className="text-[11px] text-[#686D76]">Klik untuk chat langsung via WhatsApp</span>
                </div>
              </div>
            </motion.div>

            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#181A1F] border border-white/5 rounded-sm p-6"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-sm bg-[#A5E849]/10 flex items-center justify-center">
                  <Clock size={20} className="text-[#A5E849]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#F5F5F5] mb-2 uppercase tracking-wide">Jam Operasional</h4>
                  <p className="text-sm text-[#A0A4AA]">{workshopInfo.operationalHours.weekdays}</p>
                  <p className="text-sm text-[#A0A4AA] mt-1">{workshopInfo.operationalHours.weekend}</p>
                </div>
              </div>
            </motion.div>

            {/* Quick WhatsApp Button */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button
                variant="primary"
                size="lg"
                href={workshopInfo.whatsappOfficialUrl}
                external
                fullWidth
                icon={true}
                iconPosition="left"
                isWhatsApp={true}
              >
                Chat Resmi via WhatsApp
              </Button>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-[#181A1F] border border-white/5 rounded-sm p-6 md:p-8">
              <h3 className="text-xl font-bold text-[#F5F5F5] mb-2 font-heading">
                Form Konsultasi
              </h3>
              <p className="text-sm text-[#A0A4AA] mb-6">
                Isi form berikut dan kami akan menghubungi Anda via WhatsApp.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-[#F5F5F5] mb-2">
                    Nama Lengkap <span className="text-[#E63B36]">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#22252B] border border-white/10 rounded-sm text-[#F5F5F5] placeholder:text-[#686D76] focus:border-[#A5E849] focus:outline-none focus:ring-1 focus:ring-[#A5E849] transition-colors"
                    placeholder="Masukkan nama Anda"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-[#F5F5F5] mb-2">
                    Nomor WhatsApp <span className="text-[#E63B36]">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#22252B] border border-white/10 rounded-sm text-[#F5F5F5] placeholder:text-[#686D76] focus:border-[#A5E849] focus:outline-none focus:ring-1 focus:ring-[#A5E849] transition-colors"
                    placeholder="08xxxxxxxxxx"
                  />
                </div>

                {/* Vehicle */}
                <div>
                  <label htmlFor="vehicle" className="block text-sm font-semibold text-[#F5F5F5] mb-2">
                    Jenis Kendaraan <span className="text-[#E63B36]">*</span>
                  </label>
                  <input
                    type="text"
                    id="vehicle"
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#22252B] border border-white/10 rounded-sm text-[#F5F5F5] placeholder:text-[#686D76] focus:border-[#A5E849] focus:outline-none focus:ring-1 focus:ring-[#A5E849] transition-colors"
                    placeholder="Contoh: Honda PCX 160, Yamaha NMAX, Vespa Sprint"
                  />
                </div>

                {/* Service */}
                <div>
                  <label htmlFor="service" className="block text-sm font-semibold text-[#F5F5F5] mb-2">
                    Layanan yang Dibutuhkan <span className="text-[#E63B36]">*</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#22252B] border border-white/10 rounded-sm text-[#F5F5F5] focus:border-[#A5E849] focus:outline-none focus:ring-1 focus:ring-[#A5E849] transition-colors"
                  >
                    <option value="">Pilih layanan...</option>
                    <option value="Body Repair">Body Repair</option>
                    <option value="Cat Motor">Cat Motor</option>
                    <option value="Modifikasi & Bore Up">Modifikasi & Bore Up</option>
                    <option value="Ganti Oli">Ganti Oli</option>
                    <option value="Servis Berkala">Servis Berkala</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-[#F5F5F5] mb-2">
                    Pesan / Detail Kebutuhan
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-[#22252B] border border-white/10 rounded-sm text-[#F5F5F5] placeholder:text-[#686D76] focus:border-[#A5E849] focus:outline-none focus:ring-1 focus:ring-[#A5E849] transition-colors resize-none"
                    placeholder="Ceritakan detail kebutuhan Anda, warna yang diinginkan, kondisi motor saat ini, atau pertanyaan lainnya..."
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  icon={Send}
                  iconPosition="right"
                >
                  Kirim via WhatsApp
                </Button>

                <p className="text-xs text-[#686D76] text-center">
                  Dengan mengirim form ini, Anda akan diarahkan ke WhatsApp untuk melanjutkan konsultasi.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
