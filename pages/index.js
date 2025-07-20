import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import LeadMagnetModal from '../components/LeadMagnetModal';
import Testimonials from '../components/Testimonials';
import LiveChat from '../components/LiveChat';

export default function Home() {
  return (
    <div className="bg-dark-950 text-white min-h-screen">
      <LeadMagnetModal />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Testimonials />
      <div id="contact">
        <Contact />
      </div>
      <Footer />
      <LiveChat />
    </div>
  );
} 