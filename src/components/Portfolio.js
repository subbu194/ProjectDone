import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CLIENTS = [
  {
    name: 'KeepAI',
    industry: 'AI & Energy Technology',
    image: '/keepai.png',
    description: 'We developed an AI-powered energy optimization platform that helps businesses reduce energy costs and carbon footprint. Our solution integrates real-time data analytics, predictive modeling, and automated energy management systems, enabling companies to achieve up to 35% energy savings while maintaining operational efficiency.'
  },
  {
    name: 'Zysk Technologies',
    industry: 'IT Solutions & Consulting',
    image: '/zysk-logo.png',
    description: 'We partnered with Zysk to build a comprehensive digital transformation platform that streamlines their IT consulting services. Our solution includes client management systems, project tracking tools, and automated reporting capabilities, helping them deliver better services to their enterprise clients while improving internal workflows.'
  },
  {
    name: 'CutTheQ',
    industry: 'Food Tech & Ordering',
    image: '/cuttheq-logo.png',
    description: 'We created a revolutionary food ordering and queue management system that eliminates waiting times at restaurants. Our platform features real-time order tracking, digital queue management, and seamless payment integration, helping restaurants increase customer satisfaction and operational efficiency by 40%.'
  },
  {
    name: 'Klinic',
    industry: 'Healthcare Technology',
    image: '/klinic-logo.png',
    description: 'We built a secure, HIPAA-compliant telemedicine platform that connects patients with healthcare providers. Our solution includes video consultations, electronic health records integration, appointment scheduling, and prescription management, making healthcare more accessible and efficient for both patients and providers.'
  },
  {
    name: 'Early2nine',
    industry: 'Digital Marketing & Web Development',
    image: '/early2nine_logo.png',
    description: 'We collaborated with Early2nine to enhance their digital marketing capabilities and web development services. Our team delivered a modern, responsive website with integrated marketing tools, improved user experience, and optimized performance that helped them better serve their clients in the digital marketing space.'
  }
];

const Portfolio = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="portfolio" className="section-padding bg-dark-900/50" data-testid="portfolio-section">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6"
          >
            Client Showcase
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 text-white"
          >
            Our Valued <span className="gradient-text">Clients</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            We take pride in our long-term partnerships with innovative companies across various industries. Here are some of the businesses we've helped transform through technology.
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-4"
        >
          {CLIENTS.map((client, idx) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + idx * 0.15, duration: 0.7 }}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-dark-800/80 to-dark-900/90 border border-dark-700 hover:border-primary-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 p-6 h-full flex flex-col">
                {/* Client Logo */}
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary-900/30 to-primary-500/10 flex items-center justify-center mb-5 border border-dark-600 group-hover:border-primary-500/30 transition-all duration-300 shadow-lg mx-auto">
                  <img
                    src={client.image}
                    alt={client.name}
                    className="w-14 h-14 object-contain rounded-lg"
                    style={{ background: '#fff', padding: '4px' }}
                  />
                </div>
                
                {/* Client Info */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
                    {client.name}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {client.description}
                  </p>
                  <div className="flex items-center justify-center">
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-dark-700/50 text-primary-300 border border-dark-600">
                      {client.industry}
                    </span>
                  </div>
                </div>
                

              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;