import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle } from 'lucide-react';

const CALENDLY_URL = 'https://calendly.com/yourprodone/30min?hide_event_type_details=1&hide_gdpr_banner=1';

const Contact = () => {
  const [showCalendly, setShowCalendly] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const calendlyWidgetRef = useRef(null);

  // Listen for calendly.event_scheduled globally
  useEffect(() => {
    const handler = (e) => {
      if (e.data.event && e.data.event === 'calendly.event_scheduled') {
        console.log('Calendly event scheduled received', e.data);
        setShowCalendly(false);
        setShowConfirmation(true);
        
        // Store meeting details for the popup
        if (e.data.payload) {
          const { invitee, event } = e.data.payload;
          const meetingDetails = {
            eventType: event.name || 'Consultation Call',
            inviteeName: invitee.name || 'You',
            inviteeEmail: invitee.email || '',
            meetingTime: new Date(event.start_time).toLocaleString(),
            meetingLink: event.location || event.conferencing?.join_url || '',
            confirmationEmail: true
          };
          
          // Store in localStorage for the popup to access
          localStorage.setItem('calendly_meeting_details', JSON.stringify(meetingDetails));
          
          // Store meeting link separately for easy access
          if (meetingDetails.meetingLink) {
            localStorage.setItem('calendly_meeting_link', meetingDetails.meetingLink);
          }
        }
        
        setTimeout(() => setShowConfirmation(false), 7000);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  // Dynamically load Calendly script and init widget when modal opens
  useEffect(() => {
    if (!showCalendly) return;
    // Add Calendly script if not present
    if (!document.getElementById('calendly-script')) {
      const script = document.createElement('script');
      script.id = 'calendly-script';
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => {
        if (window.Calendly) {
          window.Calendly.initInlineWidget({
            url: CALENDLY_URL,
            parentElement: calendlyWidgetRef.current,
            prefill: {
              name: '',
              email: '',
              firstName: '',
              lastName: '',
              guests: [],
              customAnswers: {}
            },
            utm: {
              utmCampaign: 'website',
              utmSource: 'prodone',
              utmMedium: 'contact'
            }
          });
        }
      };
    } else {
      // Script already loaded
      if (window.Calendly) {
        window.Calendly.initInlineWidget({
          url: CALENDLY_URL,
          parentElement: calendlyWidgetRef.current,
          prefill: {
            name: '',
            email: '',
            firstName: '',
            lastName: '',
            guests: [],
            customAnswers: {}
          },
          utm: {
            utmCampaign: 'website',
            utmSource: 'prodone',
            utmMedium: 'contact'
          }
        });
      }
    }
    // Fix: copy ref to variable for cleanup
    const widgetDiv = calendlyWidgetRef.current;
    return () => {
      if (widgetDiv) {
        widgetDiv.innerHTML = '';
      }
    };
  }, [showCalendly]);

  // Listen for custom event to open Calendly meeting
  useEffect(() => {
    const handler = () => setShowCalendly(true);
    window.addEventListener('open-calendly-meeting', handler);
    return () => window.removeEventListener('open-calendly-meeting', handler);
  }, []);

  return (
    <section id="contact" className="section-padding bg-dark-900/50">
      <div className="container-custom flex flex-col items-center justify-center min-h-[40vh]">
        {showConfirmation ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center bg-dark-900/90 rounded-2xl shadow-2xl border border-green-600 px-8 py-12 max-w-xl w-full text-center"
          >
            <CheckCircle className="w-16 h-16 text-green-400 mb-4 mx-auto" />
            <h2 className="text-3xl font-bold text-green-400 mb-2">You are scheduled!</h2>
            <p className="text-lg text-gray-200 mb-4">Your meeting has been booked. Check your email for the confirmation and Google Meet link.</p>
            <button
              onClick={() => setShowConfirmation(false)}
              className="mt-2 px-6 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold text-lg shadow-lg transition-colors"
            >
              Close
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6">
              Book With Us
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 text-white drop-shadow-lg">
              Schedule a Meeting With Our <span className="gradient-text">Experts</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Let us help you take your business to the next level. Book a free strategy session with our team and discover how we can deliver results for your brand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4 w-full">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => window.dispatchEvent(new Event('open-lead-magnet'))}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-lg sm:text-xl px-8 py-4 rounded-2xl shadow-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400/40 w-full sm:w-auto"
              >
                <span className="inline-flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Send Message
                </span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowCalendly(true)}
                className="bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-lg sm:text-xl px-8 py-4 rounded-2xl shadow-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary-400/40 w-full sm:w-auto"
              >
                <span className="inline-flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Schedule a Meeting
                </span>
              </motion.button>
            </div>
          </motion.div>
        )}
        {showCalendly && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-2">
            <div className="relative bg-dark-900 rounded-2xl shadow-2xl border border-primary-700/30 w-full max-w-2xl p-0 overflow-hidden flex flex-col items-center">
              <button
                onClick={() => setShowCalendly(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl z-10"
                aria-label="Close"
              >×</button>
              <div
                ref={calendlyWidgetRef}
                id="calendly-inline-widget"
                className="w-full h-[700px] bg-white rounded-b-2xl overflow-hidden"
                style={{ minHeight: 700 }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Contact; 