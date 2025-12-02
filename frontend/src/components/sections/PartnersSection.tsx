import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Code, Globe, Layers, Box } from 'lucide-react';
import Container from '../layout/Container';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import FadeIn from '../animations/FadeIn';

const PartnersSection: React.FC = () => {
  const technologies = [
    { name: 'QIE Blockchain', icon: Layers, description: 'Lightning-fast EVM-compatible Layer-1' },
    { name: 'Solidity', icon: Code, description: 'Smart contract development' },
    { name: 'Hardhat', icon: Box, description: 'Testing & deployment framework' },
    { name: 'React + TypeScript', icon: Globe, description: 'Modern web interface' },
    { name: 'QieDex', icon: Zap, description: 'Decentralized exchange integration' },
    { name: 'OpenZeppelin', icon: Shield, description: 'Audited security standards' },
  ];

  const features = [
    {
      title: 'Instant Token Deployment',
      description: 'Create and launch ERC-20 tokens in seconds with zero coding required.',
      icon: Zap,
    },
    {
      title: 'Multi-Chain Support',
      description: 'Deploy across QIE Network with seamless cross-chain compatibility.',
      icon: Globe,
    },
    {
      title: 'Audited Smart Contracts',
      description: 'Built with OpenZeppelin libraries ensuring maximum security.',
      icon: Shield,
    },
  ];

  return (
    <section id="partners" className="relative py-24 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-cyan/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-purple/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <Container>
        {/* Tech Stack */}
        <FadeIn className="text-center mb-20 relative z-10">
          <Badge variant="gradient" className="mb-6 animate-pulse">
            Tech Stack
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-cyan via-primary-purple to-primary-pink bg-clip-text text-transparent animate-gradient">
            Powered by Leading Technologies
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-16">
            TokeDex leverages cutting-edge blockchain tools and frameworks to deliver a seamless tokenization experience.
          </p>

          {/* Tech Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                {/* Glow Effect on Hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-cyan to-primary-purple rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-300"></div>
                
                <Card className="relative h-full text-center p-8 bg-dark-800/50 backdrop-blur-sm border border-gray-800 group-hover:border-primary-cyan/50 transition-all duration-300">
                  <div className="flex justify-center mb-4">
                    <motion.div 
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-cyan via-primary-purple to-primary-cyan 
                        flex items-center justify-center shadow-lg shadow-primary-cyan/50 group-hover:shadow-2xl group-hover:shadow-primary-purple/50 transition-all duration-300"
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity }
                      }}
                    >
                      <tech.icon className="text-white" size={28} />
                    </motion.div>
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary-cyan group-hover:to-primary-purple group-hover:bg-clip-text transition-all duration-300">
                    {tech.name}
                  </h3>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    {tech.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Key Features */}
        <FadeIn delay={0.3} className="relative z-10">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-primary-cyan via-primary-purple to-primary-pink bg-clip-text text-transparent animate-gradient">
            Why Choose TokeDex?
          </h3>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <FadeIn key={feature.title} delay={0.1 * index}>
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="group relative h-full"
                >
                  {/* Animated Border Gradient */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-cyan via-primary-purple to-primary-cyan rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition duration-500 animate-gradient"></div>
                  
                  <Card className="relative h-full text-center p-10 bg-gradient-to-br from-dark-800/90 to-dark-900/90 backdrop-blur-xl border border-gray-800 group-hover:border-transparent transition-all duration-500">
                    {/* Icon with Animated Glow */}
                    <div className="flex justify-center mb-6">
                      <motion.div 
                        className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary-cyan/30 
                          to-primary-purple/30 flex items-center justify-center border-2 border-primary-cyan/50 
                          group-hover:border-primary-purple/70 shadow-xl group-hover:shadow-2xl 
                          group-hover:shadow-primary-cyan/50 transition-all duration-500"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8 }}
                      >
                        {/* Pulsing Background */}
                        <div className="absolute inset-0 rounded-full bg-primary-cyan/20 animate-ping"></div>
                        <feature.icon className="relative text-primary-cyan group-hover:text-white transition-colors z-10" size={32} />
                      </motion.div>
                    </div>

                    {/* Title with Gradient Hover */}
                    <h4 className="font-bold text-2xl mb-4 text-white group-hover:text-transparent 
                      group-hover:bg-gradient-to-r group-hover:from-primary-cyan group-hover:to-primary-purple 
                      group-hover:bg-clip-text transition-all duration-300">
                      {feature.title}
                    </h4>

                    {/* Description */}
                    <p className="text-gray-400 leading-relaxed text-base group-hover:text-gray-300 transition-colors">
                      {feature.description}
                    </p>

                    {/* Bottom Accent Line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </Card>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
};

export default PartnersSection;
