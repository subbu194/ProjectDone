import React, { useEffect, useRef, useState } from 'react';

const CALENDLY_URL = 'https://calendly.com/yourprodone/30min?hide_event_type_details=1&hide_gdpr_banner=1';

const BookAppointment = () => {
  const calendlyRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to initialize Calendly widget
    const initCalendly = () => {
      if (window.Calendly && calendlyRef.current) {
        try {
          window.Calendly.initInlineWidget({
            url: CALENDLY_URL,
            parentElement: calendlyRef.current,
            prefill: {},
            utm: {
              utmCampaign: 'website',
              utmSource: 'prodone',
              utmMedium: 'booking'
            }
          });
          setIsLoading(false);
        } catch (err) {
          setError('Failed to load booking widget. Please try refreshing the page.');
          setIsLoading(false);
        }
      }
    };

    // Load Calendly script if not present
    if (!document.getElementById('calendly-script')) {
      const script = document.createElement('script');
      script.id = 'calendly-script';
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = () => setTimeout(initCalendly, 100);
      script.onerror = () => {
        setError('Failed to load booking widget. Please check your internet connection and try again.');
        setIsLoading(false);
      };
      document.body.appendChild(script);
    } else {
      setTimeout(initCalendly, 100);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-primary-950 py-8 px-2 sm:px-4">
      <div className="w-full max-w-3xl bg-dark-900 rounded-2xl shadow-2xl p-6 flex flex-col items-center border border-primary-700/30">
        <h2 className="text-4xl font-bold text-white mb-2 text-center">Book a <span className="gradient-text">30-Minute Meeting</span></h2>
        <p className="text-lg text-gray-300 mb-6 text-center leading-relaxed max-w-3xl">
          Schedule a Google Meet with our team at your convenience. Select a time slot below and you'll receive a confirmation email with the meeting link. We look forward to connecting with you!
        </p>
        {/* Loading state */}
        {isLoading && !error && (
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
    </div>
  );
};

export default BookAppointment; 