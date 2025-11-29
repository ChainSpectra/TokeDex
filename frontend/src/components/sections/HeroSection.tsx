import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Container from '../layout/Container';
import Button from '../ui/Button';
import GradientText from '../ui/GradientText';
import AnimatedOrb from '../ui/AnimatedOrb';
import FloatingElement from '../animations/FloatingElement';
import FadeIn from '../animations/FadeIn';

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-radial from-dark-800 via-dark-900 to-black" />
      <div className="absolute inset-0 grid-background opacity-30" />
      
      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary-cyan rounded-full opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <FadeIn direction="up" className="space-y-8">
            {/* Headline */}
            <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-none">
              The Future of{' '}
              <GradientText>
                Decentralized Infrastructure
              </GradientText>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
              Create, launch, and manage tokens seamlessly with TokeDEx - the next-generation 
              decentralized token creation platform trusted by developers worldwide.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg" href="#features">
                <span className="flex items-center">
                  Launch App
                  <ArrowRight className="ml-2" size={20} />
                </span>
              </Button>
              <Button variant="outline" size="lg" href="#architecture">
                View Documentation
              </Button>
            </div>
          </FadeIn>

          {/* Right Column - Animated Orb Visual */}
          <div className="relative hidden lg:block">
            <FloatingElement duration={8} yOffset={30}>
              <div className="relative w-full aspect-square max-w-xl mx-auto">
                <AnimatedOrb />
              </div>
            </FloatingElement>
          </div>
        </div>
      </Container>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent" />
    </section>
  );
};

export default HeroSection;
