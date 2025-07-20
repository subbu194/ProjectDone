import React, { useEffect, useRef, useState } from 'react';

const BookAppointment = () => {
  const calendlyRef = useRef(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to initialize Calendly widget
    const initCalendly = () => {
      if (window.Calendly && calendlyRef.current) {
        try {
          window.Calendly.initInlineWidget({
            url: 'https://calendly.com/yourprodone/30min',
            parentElement: calendlyRef.current,
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
              utmMedium: 'booking'
            }
          });
          setIsLoading(false);
        } catch (err) {
          console.error('Error initializing Calendly:', err);
          setError('Failed to load booking widget. Please try refreshing the page.');
          setIsLoading(false);
        }
      }
    };

    // Check if Calendly script is already loaded
    if (window.Calendly) {
      initCalendly();
    } else {
      // Load Calendly script if not present
      if (!document.getElementById('calendly-script')) {
        const script = document.createElement('script');
        script.id = 'calendly-script';
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        script.onload = () => {
          // Wait a bit for Calendly to initialize
          setTimeout(initCalendly, 100);
        };
        script.onerror = () => {
          console.error('Failed to load Calendly script');
          setError('Failed to load booking widget. Please check your internet connection and try again.');
          setIsLoading(false);
        };
        document.body.appendChild(script);
      } else {
        // Script exists but Calendly might not be ready yet
        setTimeout(initCalendly, 500);
      }
    }

    // Listen for event_scheduled
    const handler = (e) => {
      if (e.data.event && e.data.event === 'calendly.event_scheduled') {
        setShowConfirmation(true);
      }
    };
    window.addEventListener('message', handler);
    
    return () => {
      window.removeEventListener('message', handler);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-primary-950 py-8 px-2 sm:px-4">
      <div className="w-full max-w-3xl bg-dark-900 rounded-2xl shadow-2xl p-6 flex flex-col items-center border border-primary-700/30">
        <h2 className="text-4xl font-bold text-white mb-2 text-center">Book a <span className="gradient-text">30-Minute Meeting</span></h2>
        <p className="text-lg text-gray-300 mb-6 text-center leading-relaxed max-w-3xl">
          Schedule a Google Meet with our team at your convenience. Select a time slot below and you'll receive a confirmation email with the meeting link. We look forward to connecting with you!
        </p>
        
        {/* Loading state */}
        {isLoading && (
          <div className="w-full min-h-[700px] bg-white rounded-xl overflow-hidden shadow-lg border border-primary-500/20 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading booking widget...</p>
            </div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="w-full min-h-[700px] bg-white rounded-xl overflow-hidden shadow-lg border border-red-500/20 flex items-center justify-center">
            <div className="text-center p-8">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Booking Widget Unavailable</h3>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
              >
                Refresh Page
              </button>
            </div>
          </div>
        )}

        {/* Calendly widget */}
        {!isLoading && !error && (
          <div
            ref={calendlyRef}
            className="w-full min-h-[700px] bg-white rounded-xl overflow-hidden shadow-lg border border-primary-500/20"
            style={{ minHeight: 700 }}
          />
        )}
      </div>

      {/* Confirmation modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-dark-900 rounded-2xl p-8 max-w-md w-full text-white shadow-2xl border border-dark-700 relative text-center">
            <button
              onClick={() => setShowConfirmation(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
              aria-label="Close"
            >×</button>
            <h2 className="text-3xl font-bold mb-4 text-green-400">Meeting Booked!</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">Thank you for booking a meeting with us. Check your email for the confirmation and Google Meet link.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookAppointment;