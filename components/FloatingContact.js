import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Mail, Calendar } from 'lucide-react';

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contactOptions = [
    {
      icon: Mail,
      label: 'Email Us',
      action: () => {
        window.dispatchEvent(new Event('open-lead-magnet'));
        setIsOpen(false);
      },
      color: 'bg-blue-500',
      delay: 0.1,
    },
    {
      icon: Calendar,
      label: 'Book Meeting',
      action: () => {
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false);
      },
      color: 'bg-purple-500',
      delay: 0.2,
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Contact Options */}
      <AnimatePresence>
        {isOpen && (
          <div className="mb-4 space-y-3">
            {contactOptions.map((option, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0, x: 20 }}
                transition={{ delay: option.delay, duration: 0.3 }}
                onClick={option.action}
                className={`${option.color} w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group`}
              >
                <option.icon className="w-6 h-6" />
                <span className="absolute right-16 bg-dark-800 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {option.label}
                </span>
              </motion.button>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 animate-glow"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="message"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Tooltip */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-dark-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap"
        >
          Need help? Contact us!
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-dark-800 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
        </motion.div>
      )}
    </div>
  );
};

export default FloatingContact; 