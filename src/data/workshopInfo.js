export const workshopInfo = {
  name: "DUN'S GARASI 26 & BODYREPAIR",
  shortName: "Dun's Garasi 26",
  tagline: "RESTORE THE LOOK. REDEFINE THE RIDE.",
  subtagline: "Solusi pengecatan, body repair, dan modifikasi motor dengan hasil pengerjaan yang memperhatikan setiap detail.",
  badge: "MOTORCYCLE BODY REPAIR & CUSTOM PAINT",
  phone: "0895383125741",
  whatsappNumber: "62895383125741",
  address: "Kp. Paburan RT 001/003, Kel. Cimuning, Kec. Mustika Jaya, Kota Bekasi, Jawa Barat",
  city: "Bekasi, Indonesia",
  operationalHours: {
    weekdays: "Senin – Sabtu: 09.00 – 21.00 WIB",
    weekend: "Minggu: By Appointment / Konfirmasi",
  },
  supportedBy: [
    { name: "K.I.S.S Bekasi", subtitle: "King's Independent Soul & Spirit" },
    { name: "Wibowo Gank", subtitle: "Automotive Community" },
    { name: "Alowslowslowly", subtitle: "Riders & Enthusiast" },
    { name: "Radit Mokas BKS", subtitle: "Motorcycle Partner" },
    { name: "Lurah BO", subtitle: "Community Partner" },
  ],
  googleMapsUrl: "https://maps.app.goo.gl/vxYiLBw8VXe1fVmE6",
  whatsappOfficialUrl: "https://wa.me/qr/4MYHW5TLM6LWP1",
  socials: {
    instagram: "https://instagram.com",
    tiktok: "https://tiktok.com",
    youtube: "https://youtube.com",
    whatsapp: "https://wa.me/qr/4MYHW5TLM6LWP1",
  }
};

export const getWhatsAppLink = (customMessage = "") => {
  const base = `https://wa.me/${workshopInfo.whatsappNumber}`;
  const defaultText = `Halo Dun's Garasi 26, saya ingin konsultasi mengenai pengerjaan motor saya.`;
  const text = customMessage || defaultText;
  return `${base}?text=${encodeURIComponent(text)}`;
};

export const getOfficialWhatsAppLink = () => {
  return workshopInfo.whatsappOfficialUrl;
};
