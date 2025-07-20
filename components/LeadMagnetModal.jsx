import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Logo from './Logo';

const industries = [
  'Technology', 'Healthcare', 'Finance', 'Education', 'E-commerce',
  'Real Estate', 'Manufacturing', 'Entertainment', 'Non-profit', 'Other'
];

const LeadMagnetModal = () => {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();

  // Watch form values for real-time validation
  const watchedValues = watch();

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Listen for custom event to open modal
  useEffect(() => {
    const handler = () => {
      setOpen(true);
    };
    window.addEventListener('open-lead-magnet', handler);
    return () => window.removeEventListener('open-lead-magnet', handler);
  }, []);

  const onSubmit = async (data) => {
    setError('');
    setIsSubmitting(true);
    
    try {
      console.log('Submitting form data:', data);
      
      const response = await axios.post('/api/leads', data, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 second timeout
      });
      
      console.log('Form submitted successfully:', response.data);
      
      if (response.data.success) {
        setSubmitted(true);
        reset();
        
        // Show confirmation for 3 seconds, then open Calendly
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            setOpen(false);
            setFadeOut(false);
            setSubmitted(false);
            // Scroll to contact section before opening Calendly
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
            setTimeout(() => {
              window.dispatchEvent(new Event('open-calendly-meeting'));
            }, 100);
          }, 300);
        }, 3000); // Show confirmation for 3 seconds
      } else {
        throw new Error(response.data.error || 'Submission failed');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      
      let errorMessage = 'There was an error. Please try again.';
      
      if (err.response) {
        // Server responded with error status
        const serverError = err.response.data;
        if (serverError && typeof serverError === 'object' && serverError.error) {
          errorMessage = serverError.error;
        } else if (typeof serverError === 'string') {
          errorMessage = serverError;
        } else {
          errorMessage = `Server error: ${err.response.status}`;
        }
      } else if (err.request) {
        // Request was made but no response received
        errorMessage = 'No response from server. Please check your connection and try again.';
      } else if (err.message) {
        // Something else happened
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if form is valid for submission
  const isFormValid = () => {
    const { industry, businessType, name, city, phone, email, message } = watchedValues;
    return industry && businessType && name && city && phone && email && message;
  };

  if (!open) return null;

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 py-8 transition-opacity duration-300 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="bg-dark-900 rounded-xl p-6 w-full max-w-2xl text-white shadow-2xl border border-dark-700 relative transition-all duration-300">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl transition-colors z-10"
          aria-label="Close"
        >×</button>
        {!submitted ? (
          <>
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <Logo size="default" />
              </div>
              <h2 className="text-3xl font-bold mb-2 text-white">Send <span className="gradient-text">Message</span></h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                Let's discuss how we can help grow your business. Share your details and project requirements, and our team will get back to you within 24 hours.
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              {/* Industry and Business Type in one row */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Industry *</label>
                  <select 
                    {...register('industry', { required: 'Select industry' })} 
                    className="w-full px-3 py-2 text-sm rounded-lg bg-dark-800 border border-dark-700 text-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                  >
                    <option value="">Select Industry</option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                  {errors.industry && <p className="text-red-400 text-xs mt-1">{errors.industry.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Business Type *</label>
                  <select 
                    {...register('businessType', { required: 'Select business type' })} 
                    className="w-full px-3 py-2 text-sm rounded-lg bg-dark-800 border border-dark-700 text-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                  >
                    <option value="">Select Business Type</option>
                    <option value="B2B">B2B</option>
                    <option value="B2C">B2C</option>
                    <option value="Both">Both</option>
                  </select>
                  {errors.businessType && <p className="text-red-400 text-xs mt-1">{errors.businessType.message}</p>}
                </div>
              
              {/* Name and City */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Name *</label>
                  <input
                    type="text"
                    {...register('name', { 
                      required: 'Name required', 
                      minLength: { value: 2, message: 'Min 2 chars' },
                      maxLength: { value: 50, message: 'Max 50 chars' }
                    })}
                    className="w-full px-3 py-2 text-sm rounded-lg bg-dark-800 border border-dark-700 text-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                    placeholder="Full name"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">City *</label>
                  <input
                    type="text"
                    {...register('city', { 
                      required: 'City required', 
                      minLength: { value: 2, message: 'Min 2 chars' },
                      maxLength: { value: 50, message: 'Max 50 chars' }
                    })}
                    className="w-full px-3 py-2 text-sm rounded-lg bg-dark-800 border border-dark-700 text-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                    placeholder="City"
                  />
                  {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city.message}</p>}
                </div>
              </div>
              
              {/* Phone and Email */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Phone *</label>
                  <input
                    type="tel"
                    {...register('phone', { 
                      required: 'Phone required', 
                      pattern: { 
                        value: /^[+]?[-\d\s()]{7,20}$/, 
                        message: 'Invalid phone number' 
                      }
                    })}
                    className="w-full px-3 py-2 text-sm rounded-lg bg-dark-800 border border-dark-700 text-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                    placeholder="Phone"
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Email *</label>
                  <input
                    type="email"
                    {...register('email', { 
                      required: 'Email required', 
                      pattern: { 
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                        message: 'Invalid email format' 
                      }
                    })}
                    className="w-full px-3 py-2 text-sm rounded-lg bg-dark-800 border border-dark-700 text-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>
              
              {/* Message */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Message *</label>
                <textarea
                  {...register('message', { 
                    required: 'Message required', 
                    minLength: { value: 10, message: 'Min 10 chars' }, 
                    maxLength: { value: 500, message: 'Max 500 chars' } 
                  })}
                  rows={3}
                  className="w-full text-sm resize-none py-2 px-3 rounded-lg bg-dark-800 border border-dark-700 text-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                  placeholder="Tell us about your project and how we can help..."
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
              </div>
              
              {/* Error Display */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}
              
              <button 
                type="submit" 
                disabled={isSubmitting || !isFormValid()}
                className={`w-full py-3 px-6 font-semibold rounded-lg shadow-md transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50 ${
                  isSubmitting || !isFormValid()
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-primary-500 hover:bg-primary-600 text-white hover:scale-[1.02]'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Get in Touch'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="text-center p-8">
              {/* Success Animation */}
              <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              {/* Success Message */}
              <h3 className="text-3xl font-bold text-green-400 mb-4">Message Sent Successfully! 🎉</h3>
              
              <div className="space-y-4 text-gray-300">
                <p className="text-lg leading-relaxed">
                  Thank you for reaching out! We've received your message and our team will get back to you within <span className="text-primary-400 font-semibold">24 hours</span>.
                </p>
                
                <div className="bg-dark-800/50 rounded-lg p-4 border border-dark-700">
                  <p className="text-sm text-gray-400 mb-2">What happens next?</p>
                  <ul className="text-sm space-y-1 text-left">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                      We'll review your project requirements
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                      Schedule a consultation call
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                      Provide a customized proposal
                    </li>
                  </ul>
                </div>
                
                <p className="text-sm text-gray-400">
                  Opening Calendly in <span className="text-primary-400 font-semibold">3 seconds</span> to schedule your consultation...
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadMagnetModal;