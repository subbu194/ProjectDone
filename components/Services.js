import React from 'react';
import {
  Globe,
  Smartphone,
  Brain,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const SERVICES = [
  {
    icon: Globe,
    title: 'Enterprise Web Solutions',
    description: 'Custom, scalable web platforms for performance, security, and growth. Robust digital experiences to elevate your brand.',
    features: [
      'Custom Web Application Architecture',
      'Enterprise-Grade Security & Compliance',
      'API Ecosystem Design & Integration',
      'Progressive Web Apps (PWA)',
      'SEO & Accessibility Best Practices',
      'Ongoing Support & Optimization'
    ],
  },
  {
    icon: Smartphone,
    title: 'Mobile Product Engineering',
    description: 'Premium mobile apps for iOS and Android, blending seamless UX with powerful native and cross-platform tech.',
    features: [
      'Native & Cross-Platform Development',
      'App Store & Play Store Launch Strategy',
      'UX/UI Design for Engagement & Retention',
      'Real-Time Data Synchronization',
      'Push Notifications & Deep Linking',
      'Lifecycle Management & Analytics'
    ],
  },
  {
    icon: Brain,
    title: 'AI & Automation Consulting',
    description: 'Transform your business with intelligent automation and AI-driven solutions. Unlock new opportunities and efficiencies.',
    features: [
      'AI Strategy & Roadmapping',
      'End-to-End AI Integration',
      'Conversational AI & Chatbots',
      'Predictive Analytics & Insights',
      'Computer Vision & Image Processing',
    ],
  },
];

const TECHNOLOGIES = [
  { name: 'React', icon: '⚛️' },
  { name: 'React Native', icon: '📱' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'AWS', icon: '☁️' },
  { name: 'Docker', icon: '🐳' },
];

const PROCESS = [
  { step: '01', title: 'Consult', description: 'We listen, understand your vision, and define clear goals.' },
  { step: '02', title: 'Strategize', description: 'We architect a tailored plan and design the roadmap.' },
  { step: '03', title: 'Build', description: 'Our experts develop, iterate, and test your solution.' },
  { step: '04', title: 'Launch & Support', description: 'We deploy, monitor, and help you grow post-launch.' },
];

const Services = () => {
  return (
    <section id="services" className="section-padding bg-dark-950" data-testid="services-section">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6"
            data-testid="services-header-badge"
          >
            What We Do Best
          </div>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 text-white"
            data-testid="services-header-title"
          >
            Elevate Your Business <br className="hidden md:block" />
            <span className="gradient-text">With Our Expertise</span>
          </h2>
          <p
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            data-testid="services-header-desc"
          >
            Unlock growth with our full-spectrum digital services. From stunning web apps to intelligent automation, we craft solutions that drive results and delight users.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12" data-testid="services-grid">
          {SERVICES.map((service, idx) => (
            <div
              key={service.title}
              className={`relative rounded-xl border border-gray-700 bg-dark-900/80 flex flex-col h-full p-7 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-primary-500 group`}
              data-testid={`service-card-${idx}`}
            >
              {/* Icon */}
              <div className={`w-14 h-14 bg-gray-800 rounded-lg flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-primary-500/20`}>
                <service.icon className="w-8 h-8 text-white group-hover:text-primary-400 transition-colors duration-300" aria-label={`${service.title} icon`} />
              </div>
              {/* Title */}
              <h3 className="text-xl font-bold mb-2 text-white tracking-tight group-hover:text-primary-400 transition-colors duration-300" data-testid={`service-title-${idx}`}>{service.title}</h3>
              {/* Description */}
              <p className="text-gray-300 leading-relaxed mb-5 text-base" data-testid={`service-desc-${idx}`}>{service.description}</p>
              {/* Features */}
              <ul className="space-y-2 mb-5" data-testid={`service-features-${idx}`}> 
                {service.features.slice(0, 3).map((feature, fidx) => (
                  <li key={fidx} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary-400 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-200 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              {/* CTA Button */}
              <button
                className="mt-auto w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-base bg-primary-500 text-white hover:bg-primary-600 hover:scale-105 active:scale-95 transition-all duration-200 shadow group-hover:shadow-lg"
                data-testid={`service-cta-${idx}`}
                onClick={() => {
                  window.dispatchEvent(new Event('open-lead-magnet'));
                }}
                aria-label={`Start your project with ${service.title}`}
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Technologies Section */}
        <div
          className="text-center"
          data-testid="tech-stack-section"
        >
          <h3 className="text-3xl sm:text-4xl font-bold mb-7 text-white">
            <span className="gradient-text">Tech Stack</span> We Love
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-5">
            {TECHNOLOGIES.map((tech, idx) => (
              <div
                key={tech.name}
                className="flex flex-col items-center space-y-1.5 p-3 rounded-lg bg-dark-800/70 border border-dark-700 hover:border-primary-500/80 transition-all duration-300 group shadow hover:shadow-xl hover:-translate-y-1"
                data-testid={`tech-card-${idx}`}
              >
                <div className="text-2xl group-hover:scale-125 transition-transform duration-300" aria-label={`${tech.name} icon`}>
                  {tech.icon}
                </div>
                <span className="text-gray-200 text-base font-medium">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div
          className="mt-14 bg-dark-800/60 rounded-2xl p-8 border border-dark-700 shadow-xl"
          data-testid="workflow-section"
        >
          <div className="text-center mb-10">
            <h3 className="text-3xl sm:text-4xl font-bold mb-3 text-white">
              Our <span className="gradient-text">Workflow</span>
            </h3>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We guide you from idea to launch with a transparent, collaborative, and proven process.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-7">
            {PROCESS.map((process, idx) => (
              <div
                key={process.step}
                className="text-center flex flex-col items-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                data-testid={`workflow-step-${idx}`}
              >
                <div className="w-14 h-14 bg-primary-500/30 rounded-full flex items-center justify-center mb-4 border-2 border-primary-500/40 shadow transition-all duration-300 group-hover:bg-primary-500/50">
                  <span className="text-primary-400 font-extrabold text-lg">{process.step}</span>
                </div>
                <h4 className="text-lg font-bold mb-1 text-white">{process.title}</h4>
                <p className="text-gray-300 text-sm">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;