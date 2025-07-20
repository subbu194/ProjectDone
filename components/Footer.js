import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone,
  ArrowUp 
} from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Services', href: '#services' },
      { name: 'Portfolio', href: '#portfolio' },
      { name: 'Contact', href: '#contact' },
    ],
    services: [
      { name: 'Web Development', href: '#services' },
      { name: 'Mobile Apps', href: '#services' },
      { name: 'AI Integration', href: '#services' },
      { name: 'Consulting', href: '#contact' },
    ],
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'Documentation', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
    ],
  };

  // const contactInfo = [
  //   { icon: Mail, text: 'hello@yourProDone.com', href: 'mailto:hello@yourProDone.com' },
  //   { icon: Phone, text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
  //   { icon: MapPin, text: '123 Tech Street, Digital City, DC 12345', href: '#' },
  // ];

  const contactInfo = [
    { icon: Mail, text: 'yourprodone@gmail.com', href: 'mailto:yourprodone@gmail.com' },
    { icon: Phone, text: '+91 96636 14603', href: 'tel:+919663614603' },

  ];

  return (
    <footer className="bg-dark-950 border-t border-dark-800">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Logo size="default" />
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed text-base">
              We build cutting-edge digital solutions that help businesses thrive in the modern digital landscape.
            </p>
            
            {/* Social Links removed */}
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="text-gray-400 hover:text-primary-500 transition-colors duration-300 text-base"
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="text-gray-400 hover:text-primary-500 transition-colors duration-300 text-base"
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Contact</h3>
            <ul className="space-y-4">
              {contactInfo.map((contact, index) => (
                <li key={index}>
                  <motion.a
                    href={contact.href}
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-3 text-gray-400 hover:text-primary-500 transition-colors duration-300 text-base"
                  >
                    <contact.icon className="w-4 h-4 flex-shrink-0" />
                    <span>{contact.text}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-dark-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-base">
              © {currentYear} ProDone . All rights reserved.
            </p>
            
            <div className="flex items-center space-x-6">
              <button className="text-gray-400 hover:text-primary-500 transition-colors duration-300 text-base">
                Privacy Policy
              </button>
              <button className="text-gray-400 hover:text-primary-500 transition-colors duration-300 text-base">
                Terms of Service
              </button>
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-300"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-5 h-5 text-white" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
