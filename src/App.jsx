import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Gallery from './sections/Gallery';
import WhyChooseUs from './sections/WhyChooseUs';
import Location from './sections/Location';
import Contact from './sections/Contact';

function App() {
  return (
    <div className="min-h-screen bg-[#101114] text-[#F5F5F5]">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <WhyChooseUs />
        <Location />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <Chatbot />
    </div>
  );
}

export default App;
