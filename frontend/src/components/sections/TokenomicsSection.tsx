import React from 'react';
import { Zap, Shield, Coins, TrendingUp, Lock, Users, Sparkles, Rocket } from 'lucide-react';
import Container from '../layout/Container';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import FadeIn from '../animations/FadeIn';


const TokenomicsSection: React.FC = () => {
  const benefits = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Deploy tokens in seconds with our optimized smart contracts on Layer 2 networks',
      color: '#00D4FF',
      stat: '< 3 sec',
      statLabel: 'Deploy Time'
    },
    {
      icon: Shield,
      title: 'Battle-Tested Security',
      description: 'Audited smart contracts with built-in safety mechanisms and anti-rug-pull protection',
      color: '#7B61FF',
      stat: '100%',
      statLabel: 'Secure'
    },
    {
      icon: Coins,
      title: 'Multi-Chain Support',
      description: 'Create tokens across multiple blockchains with a single, unified interface',
      color: '#FF3366',
      stat: '10+',
      statLabel: 'Networks'
    },
    {
      icon: TrendingUp,
      title: 'Built-in Trading',
      description: 'Instant liquidity pools and automated market making for your tokens',
      color: '#00FFA3',
      stat: '24/7',
      statLabel: 'Trading'
    },
    {
      icon: Lock,
      title: 'Token Vesting',
      description: 'Customizable vesting schedules to ensure fair distribution and prevent dumps',
      color: '#8B5CF6',
      stat: 'Custom',
      statLabel: 'Schedules'
    },
    {
      icon: Users,
      title: 'Gas Optimization',
      description: 'Highly optimized smart contracts that minimize transaction costs and maximize efficiency',
      color: '#F59E0B',
      stat: '60%',
      statLabel: 'Less Gas'
    },
    {
      icon: Sparkles,
      title: 'No-Code Interface',
      description: 'Create professional-grade tokens without writing a single line of code',
      color: '#EC4899',
      stat: 'Zero',
      statLabel: 'Code Required'
    },
    {
      icon: Rocket,
      title: 'Instant Listing',
      description: 'Automatic listing on DEXs and our integrated marketplace upon deployment',
      color: '#10B981',
      stat: 'Auto',
      statLabel: 'Listing'
    },
  ];

  return (
    <section id="tokenomics" className="relative py-24 bg-gradient-to-br from-dark-900 via-purple-900/10 to-dark-800">
      <Container>
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="gradient" className="mb-6">
            Key Benefits
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Why Choose <span className="gradient-text">TokeDeX</span>
          </h2>
          <p className="text-lg text-gray-400">
            The most powerful, secure, and user-friendly token creation platform in Web3
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <FadeIn key={benefit.title} delay={0.1 * index}>
                <Card
                  variant="glass"
                  className="p-6 h-full hover-lift group transition-all duration-300"
                >
                  {/* Icon with glow effect */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    style={{
                      backgroundColor: `${benefit.color}20`,
                      boxShadow: `0 0 20px ${benefit.color}40`
                    }}
                  >
                    <Icon
                      className="w-7 h-7"
                      style={{ color: benefit.color }}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-400 group-hover:to-purple-400 transition-all">
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {benefit.description}
                  </p>

                  {/* Stat Badge */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-baseline gap-2">
                      <span
                        className="text-2xl font-bold"
                        style={{ color: benefit.color }}
                      >
                        {benefit.stat}
                      </span>
                      <span className="text-xs text-gray-500 uppercase tracking-wider">
                        {benefit.statLabel}
                      </span>
                    </div>
                  </div>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default TokenomicsSection;
