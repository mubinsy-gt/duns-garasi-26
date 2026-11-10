import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  PhoneCall,
  ExternalLink,
  ChevronDown,
  RotateCcw,
} from 'lucide-react';
import { workshopInfo, getWhatsAppLink } from '../data/workshopInfo';

const QUICK_REPLIES = [
  'Informasi Layanan',
  'Konsultasi Cat Motor',
  'Konsultasi Body Repair',
  'Modifikasi & Bore Up',
  'Ganti Oli',
  'Servis Berkala',
  'Hubungi Admin',
];

const INITIAL_MESSAGE = {
  id: 'msg-init',
  sender: 'assistant',
  text: `Halo Kak! Selamat datang di **Dun's Garasi 26 & Bodyrepair**! 👋\n\nSaya **Dun's Assistant**, siap bantu jelaskan layanan body repair, cat motor, modifikasi, bore up, ganti oli, atau servis berkala.\n\nBoleh tahu jenis motor Kakak dan apa yang bisa saya bantu hari ini?`,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  suggestAdmin: false,
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    try {
      const saved = sessionStorage.getItem('duns_chat_history');
      return saved ? JSON.parse(saved) : [INITIAL_MESSAGE];
    } catch {
      return [INITIAL_MESSAGE];
    }
  });
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [detectedContext, setDetectedContext] = useState({
    vehicle: null,
    service: null,
  });

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, messages]);

  // Persist session history
  useEffect(() => {
    try {
      sessionStorage.setItem('duns_chat_history', JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  // Handle WhatsApp Handoff
  const handleAdminHandoff = (customReason = '') => {
    const lastUserMsg = [...messages].reverse().find((m) => m.sender === 'user')?.text || '';
    const vehicleText = detectedContext.vehicle ? `\n- Motor: ${detectedContext.vehicle}` : '';
    const serviceText = detectedContext.service ? `\n- Layanan: ${detectedContext.service}` : '';
    const lastTopicText = lastUserMsg ? `\n- Topik Percakapan: "${lastUserMsg}"` : '';

    const text = `Halo Admin Dun's Garasi 26, saya ingin berkonsultasi lebih lanjut setelah berbicara dengan Dun's Assistant.${vehicleText}${serviceText}${lastTopicText}${customReason ? `\n- Catatan: ${customReason}` : ''}\n\nMohon info estimasi dan ketersediaan jadwalnya ya min. Terima kasih!`;

    window.open(workshopInfo.whatsappOfficialUrl, '_blank');
  };

  // Local fallback response if backend server is not running
  const getClientFallback = (text) => {
    const lower = text.toLowerCase().trim();
    let service = null;
    let vehicle = null;

    // Detect service
    if (lower.includes('body') || lower.includes('pecah') || lower.includes('retak') || lower.includes('penyok')) service = 'Body Repair';
    else if (lower.includes('cat') || lower.includes('repaint') || lower.includes('warna')) service = 'Cat Motor';
    else if (lower.includes('bore up') || lower.includes('modifikasi') || lower.includes('noken')) service = 'Modifikasi & Bore Up';
    else if (lower.includes('oli')) service = 'Ganti Oli';
    else if (lower.includes('servis') || lower.includes('tune up')) service = 'Servis Berkala';

    // Detect vehicle
    if (lower.includes('pcx')) vehicle = 'Honda PCX';
    else if (lower.includes('nmax')) vehicle = 'Yamaha NMAX';
    else if (lower.includes('vespa')) vehicle = 'Vespa';
    else if (lower.includes('mio')) vehicle = 'Yamaha Mio';
    else if (lower.includes('beat')) vehicle = 'Honda BeAT';
    else if (lower.includes('vario')) vehicle = 'Honda Vario';

    // PRIORITY 1: Pure Greeting Detection (must come first!)
    const isGreeting = text.length < 25 && (
      lower === 'halo' || lower === 'hai' || lower === 'hi' || lower === 'hello' ||
      lower === 'pagi' || lower === 'selamat pagi' || lower === 'pagi kak' ||
      lower === 'siang' || lower === 'selamat siang' || lower === 'siang kak' ||
      lower === 'sore' || lower === 'selamat sore' || lower === 'sore kak' ||
      lower === 'malam' || lower === 'selamat malam' || lower === 'malam kak' ||
      lower === 'permisi' || lower === 'assalamualaikum' || lower === 'assalamu alaikum' ||
      lower.startsWith('halo') || lower.startsWith('hai') || lower.startsWith('hi ')
    ) && !service && !vehicle && !lower.includes('?');

    if (isGreeting) {
      const hour = new Date().getHours();
      let greeting = 'Halo';
      if (hour >= 5 && hour < 11) greeting = 'Selamat pagi';
      else if (hour >= 11 && hour < 15) greeting = 'Selamat siang';
      else if (hour >= 15 && hour < 18) greeting = 'Selamat sore';
      else if (hour >= 18 || hour < 5) greeting = 'Selamat malam';

      return {
        reply: `${greeting} Kak! 👋\n\nTerima kasih telah menghubungi **Dun's Garasi 26 & Bodyrepair**.\n\nSaya **Dun's Assistant**, siap membantu Kakak mendapatkan informasi seputar layanan bengkel kami.\n\nAda yang bisa kami bantu hari ini? 😊`,
        suggestAdmin: false,
        service: null,
        vehicle: null,
      };
    }

    // PRIORITY 2: Thank You Response
    if (lower.includes('terima kasih') || lower.includes('terimakasih') || lower === 'makasih' || lower === 'thanks' || lower === 'thank you') {
      return {
        reply: `Sama-sama Kak! 😊\n\nSenang bisa membantu. Jika ada pertanyaan lagi seputar motor atau layanan bengkel kami, jangan ragu untuk chat lagi ya!`,
        suggestAdmin: false,
        service: null,
        vehicle: null,
      };
    }

    // PRIORITY 3: Admin Contact Request
    if (lower.includes('admin') || lower.includes('whatsapp') || lower.includes('wa') || lower.includes('kontak')) {
      return {
        reply: `Kakak bisa langsung terhubung ke WhatsApp Admin kami di **${workshopInfo.phone}** atau klik tombol **Hubungi Admin** di bawah ini untuk konsultasi langsung ya! 😊`,
        suggestAdmin: true,
        service,
        vehicle,
      };
    }

    // PRIORITY 4: Price Inquiry
    if (lower.includes('harga') || lower.includes('biaya') || lower.includes('berapa')) {
      return {
        reply: `Untuk estimasi biaya, tergantung pada jenis motor, kondisi bodi, atau warna/bahan yang dipilih ya Kak. Kami tidak menentukan tarif sebelum melihat detailnya.\n\nBoleh klik **Hubungi Admin** untuk kirim foto motor dan dapat estimasi akurat!`,
        suggestAdmin: true,
        service,
        vehicle,
      };
    }

    // PRIORITY 5: Location Inquiry
    if (lower.includes('alamat') || lower.includes('lokasi') || lower.includes('dimana')) {
      return {
        reply: `Bengkel Dun's Garasi 26 berlokasi di **${workshopInfo.address}**.\n\nBuka Senin–Sabtu jam 09.00–21.00 WIB. Silakan mampir Kak!`,
        suggestAdmin: false,
        service,
        vehicle,
      };
    }

    // PRIORITY 6: Vehicle Mentioned
    if (vehicle && !service) {
      return {
        reply: `Mantap, motor **${vehicle}** Kakak! 👍\n\nUntuk ${vehicle}, kami bisa bantu Body Repair, Cat Motor, Modifikasi & Bore Up, Ganti Oli, atau Servis Berkala.\n\nAda yang ingin dikerjakan atau diperbaiki Kak?`,
        suggestAdmin: false,
        service: null,
        vehicle,
      };
    }

    // PRIORITY 7: Service Inquiry
    if (service) {
      return {
        reply: `Untuk layanan **${service}**, kami siap membantu Kakak!\n\nBoleh ceritakan lebih detail kebutuhan motornya? Atau langsung konsultasi dengan Admin via WhatsApp ya! 😊`,
        suggestAdmin: true,
        service,
        vehicle,
      };
    }

    // PRIORITY 8: Default Unclear Message
    return {
      reply: `Boleh Kakak ceritakan lebih detail kebutuhan atau kondisi motornya?\n\nKami siap bantu **Body Repair, Cat Motor, Modifikasi & Bore Up, Ganti Oli, dan Servis Berkala**.\n\nAtau kalau mau langsung konsultasi dengan Admin via WhatsApp, silakan klik tombol **Hubungi Admin** ya Kak! 😊`,
      suggestAdmin: true,
      service: null,
      vehicle: null,
    };
  };

  // Send message handler
  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // If Quick Reply is "Hubungi Admin", handle directly
    if (text === 'Hubungi Admin') {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-${Date.now()}`,
            sender: 'assistant',
            text: `Siap Kak! Silakan klik tombol **Hubungi Admin via WhatsApp** di bawah untuk langsung terhubung dengan bengkel.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            suggestAdmin: true,
          },
        ]);
        setIsLoading(false);
      }, 400);
      return;
    }

    // HIGH PRIORITY: Pure Greeting Pre-check (instant response, zero lag, no network risk)
    const lower = text.toLowerCase().trim();
    const isPureGreeting = text.length < 25 && (
      lower === 'halo' || lower === 'hai' || lower === 'hi' || lower === 'hello' ||
      lower === 'pagi' || lower === 'selamat pagi' || lower === 'pagi kak' ||
      lower === 'siang' || lower === 'selamat siang' || lower === 'siang kak' ||
      lower === 'sore' || lower === 'selamat sore' || lower === 'sore kak' ||
      lower === 'malam' || lower === 'selamat malam' || lower === 'malam kak' ||
      lower === 'permisi' || lower === 'assalamualaikum' || lower === 'assalamu alaikum' ||
      lower.startsWith('halo') || lower.startsWith('hai') || lower.startsWith('hi ')
    ) && !lower.includes('?') && !lower.includes('cat') && !lower.includes('body') && !lower.includes('oli') && !lower.includes('servis') && !lower.includes('modif');

    if (isPureGreeting) {
      setTimeout(() => {
        const hour = new Date().getHours();
        let greeting = 'Halo';
        if (hour >= 5 && hour < 11) greeting = 'Selamat pagi';
        else if (hour >= 11 && hour < 15) greeting = 'Selamat siang';
        else if (hour >= 15 && hour < 18) greeting = 'Selamat sore';
        else if (hour >= 18 || hour < 5) greeting = 'Selamat malam';

        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-${Date.now()}`,
            sender: 'assistant',
            text: `${greeting} Kak! 👋\n\nTerima kasih telah menghubungi **Dun's Garasi 26 & Bodyrepair**.\n\nSaya **Dun's Assistant**, siap membantu Kakak mendapatkan informasi seputar layanan bengkel kami.\n\nAda yang bisa kami bantu hari ini? 😊`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            suggestAdmin: false,
          },
        ]);
        setIsLoading(false);
      }, 300);
      return;
    }

    try {
      // Build conversation history for API
      const history = messages.slice(-6).map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));

      // Call Express Backend API
      const apiUrl =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? 'http://localhost:5001' : '');
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 9000);

      const response = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (data.detectedVehicle) setDetectedContext((p) => ({ ...p, vehicle: data.detectedVehicle }));
        if (data.detectedService) setDetectedContext((p) => ({ ...p, service: data.detectedService }));

        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-${Date.now()}`,
            sender: 'assistant',
            text: data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            suggestAdmin: data.suggestAdmin,
          },
        ]);
      } else {
        throw new Error('API response not ok');
      }
    } catch {
      // Fallback to client-side engine seamlessly
      const fallback = getClientFallback(text);
      if (fallback.vehicle) setDetectedContext((p) => ({ ...p, vehicle: fallback.vehicle }));
      if (fallback.service) setDetectedContext((p) => ({ ...p, service: fallback.service }));

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          sender: 'assistant',
          text: fallback.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestAdmin: fallback.suggestAdmin,
        },
      ]);
    } finally {
      setIsLoading(false);
      if (!isOpen) setHasUnread(true);
    }
  };

  const handleResetChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setDetectedContext({ vehicle: null, service: null });
    sessionStorage.removeItem('duns_chat_history');
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="hidden sm:flex items-center gap-2 bg-[#181A1F]/90 backdrop-blur-md text-[#F5F5F5] border border-white/10 px-3.5 py-2 rounded-full shadow-lg text-xs font-heading font-medium"
          >
            <span className="w-2 h-2 rounded-full bg-[#A5E849] animate-pulse" />
            <span>Tanya Dun's Assistant</span>
          </motion.div>
        )}

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 rounded-full bg-[#181A1F] text-[#A5E849] border-2 border-[#A5E849] flex items-center justify-center shadow-[0_0_25px_rgba(165,232,73,0.45)] hover:shadow-[0_0_35px_rgba(165,232,73,0.7)] transition-all cursor-pointer group"
          aria-label="Buka Chat Dun's Assistant"
        >
          {isOpen ? (
            <X size={26} className="text-[#F5F5F5] transition-transform duration-300 group-hover:rotate-90" />
          ) : (
            <>
              <Bot size={28} className="text-[#A5E849] transition-transform duration-300 group-hover:scale-110" />
              {hasUnread && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E63B36] border-2 border-[#101114] animate-ping" />
              )}
            </>
          )}
        </motion.button>
      </div>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[410px] h-[580px] max-h-[calc(100vh-120px)] bg-[#181A1F] border border-white/10 rounded-lg shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className="bg-[#101114] border-b border-white/[0.08] px-4 py-3.5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full bg-[#22252B] border border-[#A5E849]/50 flex items-center justify-center shadow-glow-green-sm">
                  <Bot size={20} className="text-[#A5E849]" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#A5E849] border-2 border-[#101114]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-heading font-bold text-sm text-[#F5F5F5]">Dun's Assistant</h3>
                    <span className="text-[10px] font-semibold uppercase px-1.5 py-0.2 rounded bg-[#A5E849]/10 text-[#A5E849] border border-[#A5E849]/30">
                      AI CS
                    </span>
                  </div>
                  <p className="text-[11px] text-[#A0A4AA]">Dun's Garasi 26 & Bodyrepair</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  title="Reset Percakapan"
                  className="p-1.5 text-[#686D76] hover:text-[#A5E849] hover:bg-white/5 rounded transition-colors"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Tutup Chat"
                  className="p-1.5 text-[#686D76] hover:text-[#F5F5F5] hover:bg-white/5 rounded transition-colors"
                >
                  <ChevronDown size={18} />
                </button>
              </div>
            </div>

            {/* Quick WhatsApp Handoff Bar */}
            <div className="bg-[#22252B]/60 border-b border-white/[0.05] px-4 py-2 flex items-center justify-between text-xs">
              <span className="text-[#A0A4AA] flex items-center gap-1.5">
                <Sparkles size={13} className="text-[#A5E849]" />
                Butuh cek fisik / estimasi?
              </span>
              <button
                onClick={() => handleAdminHandoff()}
                className="text-[#A5E849] hover:underline font-semibold flex items-center gap-1 text-[11px]"
              >
                <span>Admin WA</span>
                <ExternalLink size={12} />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-carbon-dots">
              {messages.map((msg) => {
                const isAssistant = msg.sender === 'assistant';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isAssistant ? 'items-start' : 'items-end'}`}
                  >
                    <div className="flex items-end gap-2 max-w-[85%]">
                      {isAssistant && (
                        <div className="w-6 h-6 rounded-full bg-[#22252B] border border-[#A5E849]/40 flex items-center justify-center shrink-0 mb-1">
                          <Bot size={13} className="text-[#A5E849]" />
                        </div>
                      )}

                      <div
                        className={`rounded-lg px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed shadow-md ${
                          isAssistant
                            ? 'bg-[#22252B] text-[#F5F5F5] border border-white/[0.08] rounded-bl-xs'
                            : 'bg-[#A5E849] text-[#101114] font-medium rounded-br-xs'
                        }`}
                      >
                        {/* Format linebreaks & bold markdown */}
                        <div className="whitespace-pre-line">
                          {msg.text.split('\n').map((line, i) => (
                            <p key={i} className={i > 0 ? 'mt-1.5' : ''}>
                              {line.split(/(\*\*.*?\*\*|\*.*?\*)/).map((part, j) => {
                                if (part.startsWith('**') && part.endsWith('**')) {
                                  return (
                                    <strong key={j} className={isAssistant ? 'text-[#A5E849] font-bold' : 'font-extrabold'}>
                                      {part.slice(2, -2)}
                                    </strong>
                                  );
                                }
                                if (part.startsWith('*') && part.endsWith('*')) {
                                  return <em key={j}>{part.slice(1, -1)}</em>;
                                }
                                return part;
                              })}
                            </p>
                          ))}
                        </div>

                        {/* Direct WhatsApp button in message if suggested */}
                        {isAssistant && msg.suggestAdmin && (
                          <div className="mt-3 pt-2 border-t border-white/10">
                            <button
                              onClick={() => handleAdminHandoff()}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#A5E849] hover:bg-[#B9F465] text-[#101114] rounded-sm text-xs font-heading font-bold uppercase tracking-wider transition-colors shadow-glow-green-sm"
                            >
                              <img src="/images/walogo.png" alt="WhatsApp" className="w-3.5 h-3.5 object-contain" />
                              <span>Hubungi Admin WhatsApp</span>
                            </button>
                          </div>
                        )}
                      </div>

                      {!isAssistant && (
                        <div className="w-6 h-6 rounded-full bg-[#181A1F] border border-white/20 flex items-center justify-center shrink-0 mb-1">
                          <User size={13} className="text-[#A0A4AA]" />
                        </div>
                      )}
                    </div>

                    <span className="text-[10px] text-[#686D76] px-8 mt-1">{msg.timestamp}</span>
                  </div>
                );
              })}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex items-end gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#22252B] border border-[#A5E849]/40 flex items-center justify-center shrink-0">
                    <Bot size={13} className="text-[#A5E849]" />
                  </div>
                  <div className="bg-[#22252B] border border-white/[0.08] px-3.5 py-2.5 rounded-lg rounded-bl-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#A5E849] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#A5E849] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#A5E849] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies Carousel */}
            <div className="bg-[#141518] border-t border-white/[0.06] px-3 py-2 overflow-x-auto no-scrollbar flex items-center gap-1.5 shrink-0">
              {QUICK_REPLIES.map((reply, i) => (
                <button
                  key={i}
                  disabled={isLoading}
                  onClick={() => handleSendMessage(reply)}
                  className="shrink-0 px-2.5 py-1 rounded-full bg-[#22252B] hover:bg-[#A5E849]/20 hover:border-[#A5E849]/60 border border-white/[0.08] text-[11px] font-medium text-[#A0A4AA] hover:text-[#A5E849] transition-all whitespace-nowrap disabled:opacity-50"
                >
                  {reply}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="bg-[#101114] border-t border-white/[0.08] p-3 flex items-center gap-2 shrink-0"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Tulis pesan atau tanya seputar motor..."
                disabled={isLoading}
                maxLength={500}
                className="flex-1 bg-[#22252B] border border-white/10 rounded-sm px-3.5 py-2.5 text-xs sm:text-sm text-[#F5F5F5] placeholder:text-[#686D76] focus:outline-none focus:border-[#A5E849] transition-colors"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="w-10 h-10 rounded-sm bg-[#A5E849] hover:bg-[#B9F465] text-[#101114] flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0 shadow-glow-green-sm"
                aria-label="Kirim Pesan"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
