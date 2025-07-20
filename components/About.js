import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, Target, Zap, CheckCircle, ArrowRight } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const coreValues = [
    {
      icon: Target,
      title: 'Innovation First',
      description: 'We push boundaries and embrace cutting-edge technologies to deliver exceptional solutions.',
      color: 'text-blue-400',
    },
    {
      icon: Users,
      title: 'Client Partnership',
      description: 'We work closely with our clients, treating every project as a collaborative partnership.',
      color: 'text-green-400',
    },
    {
      icon: Zap,
      title: 'Fast Delivery',
      description: 'We understand time is money. We deliver high-quality solutions on time, every time.',
      color: 'text-yellow-400',
    },
  ];

  const achievements = [
    '24/7 Support',
    '99% Client Satisfaction',
    'Fastest Delivery Time',
  ];

  return (
    <section id="about" className="section-padding bg-dark-900/50">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6"
          >
            About Our ProDone
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            We're a Team of{' '}
            <span className="gradient-text">Digital Innovators</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            We specialize in creating cutting-edge digital solutions that help startups and businesses 
            thrive in the modern digital landscape. Our team combines creativity, technical expertise, 
            and business acumen to deliver results that exceed expectations.
          </motion.p>
        </motion.div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="grid md:grid-cols-3 gap-4 mb-6"
        >
          {coreValues.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 + index * 0.2, duration: 0.8 }}
              className="card text-center hover-lift group"
            >
              <div className={`w-16 h-16 ${value.color} mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <value.icon className="w-full h-full" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">{value.title}</h3>
              <p className="text-gray-400 leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="space-y-8 max-w-xl text-center"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                Why Choose <span className="gradient-text">Our ProDone?</span>
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                We're not just developers – we're strategic partners who understand your business goals 
                and translate them into powerful digital solutions. Our approach combines technical 
                excellence with creative problem-solving.
              </p>
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-1 gap-4 justify-items-center">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
                  className="flex items-center space-x-3 justify-center"
                >
                  <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{achievement}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.6, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center space-x-2 group mx-auto"
              onClick={() => {
                const servicesSection = document.querySelector('#services');
                if (servicesSection) {
                  servicesSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>

        {/* Stats Section */}
        {/* Removed stats section (Projects Completed, Happy Clients, Years Experience, Client Satisfaction) */}
      </div>
    </section>
  );
};

export default About; 