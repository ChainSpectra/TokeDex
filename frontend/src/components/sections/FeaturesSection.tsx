import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Globe, Server, Code, Lock } from 'lucide-react';
import Container from '../layout/Container';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import FadeIn from '../animations/FadeIn';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Sub-second finality with throughput of 100K+ TPS for seamless user experiences.',
      gradient: 'from-yellow-400 to-orange-500',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Multi-layer encryption and audited smart contracts ensure your assets stay protected.',
      gradient: 'from-blue-400 to-cyan-500',
    },
    {
      icon: Globe,
      title: 'Cross-Chain',
      description: 'Seamless interoperability across 50+ blockchains with unified protocol layer.',
      gradient: 'from-green-400 to-emerald-500',
    },
    {
      icon: Server,
      title: 'Developer-First',
      description: 'Intuitive APIs, comprehensive SDKs, and extensive documentation for rapid integration.',
      gradient: 'from-purple-400 to-pink-500',
    },
    {
      icon: Code,
      title: 'Real-Time Analytics',
      description: 'Monitor protocol health and track performance with advanced analytics dashboards.',
      gradient: 'from-red-400 to-rose-500',
    },
    {
      icon: Lock,
      title: 'Scalable Architecture',
      description: 'Auto-scaling infrastructure handles peak demand without compromising performance.',
      gradient: 'from-indigo-400 to-purple-500',
    },
  ];

  return (
    <section id="features" className="relative py-24 md:py-32 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-40 right-20 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <Container>
        {/* Section Header */}
        <FadeIn className="text-center max-w-3xl mx-auto mb-20 relative z-10">
          <Badge variant="gradient" className="mb-6 animate-pulse">
            Features
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-cyan via-primary-purple to-primary-pink bg-clip-text text-transparent animate-gradient">
            Built for Scale, Security & Speed
          </h2>
          <p className="text-lg md:text-xl text-gray-400">
            Everything you need to power next-generation decentralized applications
          </p>
        </FadeIn>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {features.map((feature, index) => (
            <FadeIn key={feature.title} delay={0.1 * index}>
              <motion.div
                className="group relative h-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                {/* Animated Glow Border on Hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-br opacity-0 group-hover:opacity-100 blur-sm transition duration-500 rounded-3xl animate-gradient"
                  style={{
                    background: `linear-gradient(135deg, ${feature.gradient.includes('yellow') ? '#facc15, #f97316' : 
                      feature.gradient.includes('blue') ? '#60a5fa, #06b6d4' :
                      feature.gradient.includes('green') ? '#4ade80, #10b981' :
                      feature.gradient.includes('purple') ? '#c084fc, #ec4899' :
                      feature.gradient.includes('red') ? '#f87171, #fb7185' :
                      '#818cf8, #a855f7'})`
                  }}
                ></div>

                <Card className="relative h-full bg-gradient-to-br from-dark-800/90 to-dark-900/90 backdrop-blur-xl border border-gray-800 group-hover:border-transparent transition-all duration-500 p-8">
                  {/* Icon Container with Rotation Animation */}
                  <motion.div
                    className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} 
                      flex items-center justify-center mb-6 shadow-xl group-hover:shadow-2xl 
                      transition-all duration-500`}
                    style={{
                      boxShadow: `0 10px 40px ${feature.gradient.includes('yellow') ? 'rgba(251, 146, 60, 0.4)' : 
                        feature.gradient.includes('blue') ? 'rgba(6, 182, 212, 0.4)' :
                        feature.gradient.includes('green') ? 'rgba(16, 185, 129, 0.4)' :
                        feature.gradient.includes('purple') ? 'rgba(168, 85, 247, 0.4)' :
                        feature.gradient.includes('red') ? 'rgba(251, 113, 133, 0.4)' :
                        'rgba(139, 92, 246, 0.4)'}`
                    }}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  >
                    {/* Pulsing Background Effect */}
                    <div className="absolute inset-0 rounded-2xl animate-ping opacity-20"
                      style={{
                        background: `linear-gradient(135deg, ${feature.gradient.includes('yellow') ? '#facc15, #f97316' : 
                          feature.gradient.includes('blue') ? '#60a5fa, #06b6d4' :
                          feature.gradient.includes('green') ? '#4ade80, #10b981' :
                          feature.gradient.includes('purple') ? '#c084fc, #ec4899' :
                          feature.gradient.includes('red') ? '#f87171, #fb7185' :
                          '#818cf8, #a855f7'})`
                      }}
                    ></div>
                    <feature.icon size={36} className="text-white relative z-10" />
                  </motion.div>

                  {/* Content with Clean Title */}
                  <h3 className="text-2xl font-bold mb-4 text-white transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-base group-hover:text-gray-300 transition-colors">
                    {feature.description}
                  </p>

                  {/* Bottom Accent Line */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${feature.gradient.includes('yellow') ? '#f97316' : 
                        feature.gradient.includes('blue') ? '#06b6d4' :
                        feature.gradient.includes('green') ? '#10b981' :
                        feature.gradient.includes('purple') ? '#a855f7' :
                        feature.gradient.includes('red') ? '#fb7185' :
                        '#a855f7'}, transparent)`
                    }}
                  ></div>
                </Card>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturesSection;
