import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import BookAppointment from './components/BookAppointment';
import MeetingConfirmed from './components/MeetingConfirmed';
import LeadMagnetModal from './components/LeadMagnetModal';
import MeetingConfirmationPopup from './components/MeetingConfirmationPopup';
import Testimonials from './components/Testimonials';
import ScrollToTop from './components/ScrollToTop';

function AppContent() {
  const location = useLocation();
  const hideFooter = location.pathname === '/book-appointment';
  const navigate = useNavigate();
  React.useEffect(() => {
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
    }
    // Only run on mount
    // eslint-disable-next-line
  }, []);
  return (
    <div className="bg-dark-950 text-white min-h-screen">
      <LeadMagnetModal />
      <MeetingConfirmationPopup />
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <About />
            <Services />
            <Portfolio />
            <Testimonials />

            <div id="contact">
              <Contact />
            </div>
          </>
        } />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/meeting-confirmed" element={<MeetingConfirmed />} />
      </Routes>
      {!hideFooter && <Footer />}
      <FloatingContact />
      {/* <LiveChat /> */}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App; 