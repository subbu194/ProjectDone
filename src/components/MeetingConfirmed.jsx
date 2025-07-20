import React from 'react';

const MeetingConfirmed = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-dark-950 py-12 px-4">
    <h2 className="text-3xl font-bold text-green-400 mb-6">Meeting Booked!</h2>
    <p className="text-white text-lg mb-4 text-center">Thank you for booking a meeting with us. Check your email for the confirmation and Google Meet link.</p>
    <a href="/" className="btn-primary px-6 py-3 rounded-lg text-lg font-semibold mt-4 shadow-lg hover:bg-primary-600 transition-colors">Back to Home</a>
  </div>
);

export default MeetingConfirmed; 