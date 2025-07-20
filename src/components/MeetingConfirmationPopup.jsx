import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Calendar, Clock, Video, Mail } from 'lucide-react';
import Logo from './Logo';

const MeetingConfirmationPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [meetingDetails, setMeetingDetails] = useState(null);

  useEffect(() => {
    // Check if user is returning from Calendly
    const urlParams = new URLSearchParams(window.location.search);
    const calendlyEvent = urlParams.get('calendly_event');
    const eventType = urlParams.get('event_type');
    const inviteeEmail = urlParams.get('invitee_email');
    const inviteeName = urlParams.get('invitee_name');

    // Check for stored meeting details first
    const storedDetails = localStorage.getItem('calendly_meeting_details');
    
    if (storedDetails) {
      try {
        const details = JSON.parse(storedDetails);
        setMeetingDetails(details);
        setShowPopup(true);
        
        // Clean up stored data
        localStorage.removeItem('calendly_meeting_details');
        localStorage.removeItem('calendly_meeting_link');
        
        // Clean up URL parameters
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
      } catch (error) {
        console.error('Error parsing stored meeting details:', error);
      }
    } else if (calendlyEvent || eventType) {
      // Fallback to URL parameters
      const details = {
        eventType: eventType || 'Consultation Call',
        inviteeName: inviteeName || 'You',
        inviteeEmail: inviteeEmail || '',
        meetingTime: new Date().toLocaleString(),
        meetingLink: localStorage.getItem('calendly_meeting_link') || '',
        confirmationEmail: true
      };

      setMeetingDetails(details);
      setShowPopup(true);

      // Clean up URL parameters
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  if (!showPopup || !meetingDetails) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 py-8"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-dark-900 rounded-2xl p-8 w-full max-w-2xl text-white shadow-2xl border border-dark-700 relative"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl transition-colors z-10"
            aria-label="Close"
          >
            ×
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <Logo size="default" />
            </div>
            
            {/* Success Icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <CheckCircle className="h-10 w-10 text-green-400" />
            </div>
            
            <h2 className="text-3xl font-bold text-green-400 mb-2">
              Meeting Scheduled Successfully! 🎉
            </h2>
            <p className="text-lg text-gray-300">
              Your consultation call has been confirmed
            </p>
          </div>

          {/* Meeting Details */}
          <div className="space-y-6">
            {/* Meeting Info Card */}
            <div className="bg-dark-800/50 rounded-xl p-6 border border-dark-700">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-primary-400" />
                Meeting Details
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Event Type:</span>
                  <span className="text-white font-medium">{meetingDetails.eventType}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Attendee:</span>
                  <span className="text-white font-medium">{meetingDetails.inviteeName}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Scheduled:</span>
                  <span className="text-white font-medium">{meetingDetails.meetingTime}</span>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-primary-500/10 rounded-xl p-6 border border-primary-500/20">
              <h3 className="text-xl font-semibold text-primary-400 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                What Happens Next?
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-gray-300 text-sm">
                    <strong className="text-white">Confirmation Email:</strong> Check your inbox for meeting details and Google Meet link
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-gray-300 text-sm">
                    <strong className="text-white">Reminder:</strong> You'll receive a reminder 30 minutes before the meeting
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-gray-300 text-sm">
                    <strong className="text-white">Preparation:</strong> Our team will review your project requirements before the call
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={handleClose}
                className="flex-1 py-3 px-6 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50 flex items-center justify-center"
              >
                <Video className="w-4 h-4 mr-2" />
                Got It, Thanks!
              </button>
              
              {meetingDetails.meetingLink && (
                <a
                  href={meetingDetails.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-6 bg-dark-700 hover:bg-dark-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-dark-400 focus:ring-opacity-50 flex items-center justify-center"
                >
                  <Video className="w-4 h-4 mr-2" />
                  Join Meeting
                </a>
              )}
            </div>

            {/* Email Note */}
            <div className="text-center pt-4 border-t border-dark-700">
              <p className="text-sm text-gray-400 flex items-center justify-center">
                <Mail className="w-4 h-4 mr-2" />
                Check your email for detailed meeting information
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MeetingConfirmationPopup; 