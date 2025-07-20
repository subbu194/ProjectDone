import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Simon Ohlmér',
      title: 'Founder & CEO, KeepAI',
      quote: "ProDone's expertise in AI and energy technology was exactly what we needed to scale our energy optimization platform. They didn't just build software - they understood our mission to make energy management more intelligent and sustainable. The AI algorithms they implemented have helped our clients achieve significant cost savings while reducing their environmental impact. Their team's technical depth and commitment to our vision made them the perfect partner for our growth journey.",
    },
    {
      id: 2,
      name: 'Varun Umesh',
      title: 'Founder & CEO, Zysk Technologies',
      quote: "Working with ProDone transformed how we deliver IT consulting services to our clients. They built a comprehensive platform that streamlines our entire workflow - from client onboarding to project delivery. The automation features they implemented have saved us countless hours and improved our service quality. What impressed us most was their ability to understand our business model and create solutions that actually solve real problems. They're not just developers; they're true business partners.",
    },
    {
      id: 3,
      name: 'CutTheQ Team',
      title: 'Leadership Team, CutTheQ',
      quote: "ProDone revolutionized our restaurant operations with their innovative queue management system. Before working with them, our customers were frustrated with long wait times. Now, they can order ahead and skip the queue entirely. The platform's real-time tracking and seamless payment integration have not only improved customer satisfaction but also increased our order volume by 30%. Their understanding of the food service industry and ability to deliver user-friendly solutions made all the difference.",
    },
    {
      id: 4,
      name: 'Kaushik Dutta',
      title: 'Founder & CEO, Klinic',
      quote: "ProDone's development of our telemedicine platform has been a game-changer for healthcare delivery. They built a secure, HIPAA-compliant system that our doctors and patients love to use. The platform's ease of use and robust security features have helped us expand our services to reach more patients. Their healthcare technology expertise and attention to compliance requirements gave us confidence from day one. They've been instrumental in our mission to make quality healthcare accessible to everyone.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section id="testimonials" className="section-padding bg-dark-950">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6"
          >
            Client Testimonials
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6"
          >
            What Our <span className="gradient-text">Clients Say</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </motion.p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="relative max-w-5xl mx-auto px-12"
        >
          {/* Navigation Buttons - Outside */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-dark-800/80 hover:bg-dark-700/80 border border-dark-600 hover:border-primary-500/50 transition-all duration-300 z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Main Testimonial */}
          <div className="relative px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="card text-center relative p-8 bg-dark-800/50 backdrop-blur-sm rounded-2xl border border-dark-700/50 hover:border-primary-500/30 transition-all duration-300"
              >
                {/* Quote Icon */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <Quote className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-lg text-gray-300 leading-relaxed mb-8 mt-4 px-4">
                  "{testimonials[currentIndex].quote}"
                </blockquote>

                {/* Client Info */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-transparent mb-4 rounded-full"></div>
                  <h4 className="text-xl font-semibold text-white">{testimonials[currentIndex].name}</h4>
                  <p className="text-primary-400 text-sm font-medium">{testimonials[currentIndex].title}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-dark-800/80 hover:bg-dark-700/80 border border-dark-600 hover:border-primary-500/50 transition-all duration-300 z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary-500 scale-125'
                    : 'bg-dark-600 hover:bg-dark-500'
                }`}
              />
            ))}
          </div>
        </motion.div>


      </div>
    </section>
  );
};

export default Testimonials; 