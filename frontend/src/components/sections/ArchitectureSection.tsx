import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Cpu, Network, ArrowRight, Check } from 'lucide-react';
import Container from '../layout/Container';
import Card from '../ui/Card';
import Button from '../ui/Button';
import FadeIn from '../animations/FadeIn';
import SlideIn from '../animations/SlideIn';

const ArchitectureSection: React.FC = () => {
  const layers = [
    {
      number: '01',
      title: 'Client Layer',
      icon: Layers,
      description: 'Developer-friendly interface for seamless integration',
      features: [
        'dApp Integration',
        'REST & WebSocket APIs',
        'Multi-language SDKs',
        'Real-time Events',
      ],
    },
    {
      number: '02',
      title: 'Core Engine',
      icon: Cpu,
      description: 'High-performance processing and state management',
      features: [
        'Transaction Processing',
        'State Management',
        'Consensus Mechanism',
        'Smart Contract Execution',
      ],
    },
    {
      number: '03',
      title: 'Network Layer',
      icon: Network,
      description: 'Distributed infrastructure for global reach',
      features: [
        'P2P Communication',
        'Data Propagation',
        'Cross-Chain Bridges',
        'Node Synchronization',
      ],
    },
  ];

  return (
    <section id="architecture" className="relative py-24 md:py-32 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary-cyan/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-primary-purple/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Grid Background */}
      <div className="absolute inset-0 grid-background opacity-10" />

      <Container className="relative z-10">
        {/* Section Header */}
        <FadeIn className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-cyan via-primary-purple to-primary-pink bg-clip-text text-transparent animate-gradient">
            How TokeDEx Works
          </h2>
          <p className="text-lg md:text-xl text-gray-400">
            A three-layer architecture designed for reliability, scalability, and performance
          </p>
        </FadeIn>

        {/* Architecture Diagram */}
        <div className="relative">
          {/* Desktop Layout - Horizontal */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8 mb-16">
            {layers.map((layer, index) => (
              <SlideIn
                key={layer.number}
                direction={index === 0 ? 'left' : index === 2 ? 'right' : 'up'}
                delay={0.2 * index}
              >
                <motion.div
                  className="group relative h-full"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Animated Glow Border */}
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-primary-cyan via-primary-purple to-primary-pink rounded-3xl opacity-0 group-hover:opacity-100 blur transition duration-500 animate-gradient"></div>

                  <Card variant="gradient-border" hover={false} className="relative h-full min-h-[450px] bg-gradient-to-br from-dark-800/90 to-dark-900/90 backdrop-blur-xl border border-gray-800 group-hover:border-transparent transition-all duration-500 p-8">
                    {/* Number Badge with Animation */}
                    <motion.div 
                      className="inline-flex items-center justify-center w-14 h-14 rounded-full 
                        bg-gradient-to-br from-primary-cyan to-primary-purple text-white font-bold mb-6 shadow-lg shadow-primary-cyan/50 group-hover:shadow-2xl group-hover:shadow-primary-purple/50 transition-all duration-300"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      {layer.number}
                    </motion.div>

                    {/* Icon with Glow */}
                    <motion.div 
                      className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-cyan/20 to-primary-purple/20 flex items-center justify-center mb-6 border-2 border-primary-cyan/30 group-hover:border-primary-purple/50 shadow-xl group-hover:shadow-2xl group-hover:shadow-primary-cyan/30 transition-all duration-500"
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="absolute inset-0 rounded-2xl bg-primary-cyan/10 animate-ping opacity-0 group-hover:opacity-20"></div>
                      <layer.icon size={44} className="text-primary-cyan relative z-10 group-hover:text-white transition-colors" />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-4 text-white">
                      {layer.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors">
                      {layer.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-3">
                      {layer.features.map((feature, featureIndex) => (
                        <motion.li 
                          key={feature} 
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: featureIndex * 0.1 }}
                        >
                          <div className="w-5 h-5 rounded-full bg-primary-cyan/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check size={14} className="text-primary-cyan" />
                          </div>
                          <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Bottom Accent Line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </Card>
                </motion.div>
              </SlideIn>
            ))}

            {/* Connecting Lines */}
            <svg
              className="absolute top-1/2 left-0 w-full h-24 -translate-y-1/2 pointer-events-none"
              style={{ zIndex: -1 }}
            >
              {/* Line 1 to 2 */}
              <motion.line
                x1="33%"
                y1="50%"
                x2="50%"
                y2="50%"
                stroke="url(#gradient1)"
                strokeWidth="3"
                strokeDasharray="5,5"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
              {/* Line 2 to 3 */}
              <motion.line
                x1="50%"
                y1="50%"
                x2="67%"
                y2="50%"
                stroke="url(#gradient1)"
                strokeWidth="3"
                strokeDasharray="5,5"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 1.5, delay: 0.8 }}
              />
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00D4FF" />
                  <stop offset="50%" stopColor="#7B61FF" />
                  <stop offset="100%" stopColor="#FF3366" />
                </linearGradient>
              </defs>

              {/* Animated Dots */}
              <motion.circle
                r="4"
                fill="#00D4FF"
                initial={{ cx: '33%', cy: '50%' }}
                animate={{ cx: ['33%', '67%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
            </svg>
          </div>

          {/* Mobile Layout - Vertical */}
          <div className="lg:hidden space-y-8">
            {layers.map((layer, index) => (
              <FadeIn key={layer.number} delay={0.1 * index}>
                <motion.div
                  className="group relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Glow Border on Hover */}
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-primary-cyan via-primary-purple to-primary-pink rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition duration-500"></div>

                  <Card variant="gradient-border" className="relative bg-gradient-to-br from-dark-800/90 to-dark-900/90 backdrop-blur-xl border border-gray-800 group-hover:border-transparent transition-all duration-500">
                    <div className="flex items-center gap-4 mb-6">
                      <motion.div 
                        className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-cyan to-primary-purple 
                          flex items-center justify-center text-white font-bold shadow-lg shadow-primary-cyan/40"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        {layer.number}
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{layer.title}</h3>
                      </div>
                    </div>
                    
                    <motion.div 
                      className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-cyan/20 to-primary-purple/20 flex items-center justify-center mb-6 border-2 border-primary-cyan/30"
                      whileHover={{ scale: 1.05 }}
                    >
                      <layer.icon size={36} className="text-primary-cyan" />
                    </motion.div>

                    <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors">{layer.description}</p>
                    
                    <ul className="space-y-3">
                      {layer.features.map((feature, featureIndex) => (
                        <motion.li 
                          key={feature} 
                          className="flex items-center gap-3 text-sm text-gray-300 group-hover:text-white transition-colors"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: featureIndex * 0.1 }}
                        >
                          <div className="w-5 h-5 rounded-full bg-primary-cyan/20 flex items-center justify-center flex-shrink-0">
                            <Check size={14} className="text-primary-cyan" />
                          </div>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>

                    {/* Bottom Accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </Card>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* CTA */}
        <FadeIn className="text-center mt-16">
          <Button variant="outline" size="lg">
            Read Technical Docs
            <ArrowRight className="ml-2" size={20} />
          </Button>
        </FadeIn>
      </Container>
    </section>
  );
};

export default ArchitectureSection;
