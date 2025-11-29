import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import Container from '../layout/Container';
import Button from '../ui/Button';
import FadeIn from '../animations/FadeIn';

const CTASection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset states
    setError('');
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call - Replace with your actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For now, just log the email and show success
      console.log('Newsletter signup:', email);
      
      setIsSubmitted(true);
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary-cyan via-primary-purple to-primary-pink opacity-10"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundSize: '200% 200%',
        }}
      />

      {/* Animated Particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, ${
              ['#00D4FF', '#7B61FF', '#FF3366'][Math.floor(Math.random() * 3)]
            }, transparent)`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <Container className="relative z-10">
        <FadeIn className="text-center max-w-4xl mx-auto">
          {/* Icon */}
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full 
              bg-gradient-to-br from-primary-cyan via-primary-purple to-primary-pink mb-8 glow-gradient"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <Sparkles className="text-white" size={32} />
          </motion.div>

          {/* Headline */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="gradient-text">Ready to Build</span>
            <br />
            the Future?
          </h2>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
            Join thousands of developers creating and launching tokens with TokeDEx's 
            powerful and intuitive platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button variant="primary" size="lg" className="min-w-[200px]">
              Start Building
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button variant="outline" size="lg" className="min-w-[200px]">
              Schedule Demo
            </Button>
          </div>

          {/* Email Signup */}
          <motion.div
            className="mt-16 glass-card p-6 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            {isSubmitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center justify-center gap-2 text-green-400 py-3"
              >
                <CheckCircle size={24} />
                <span className="font-medium">Thanks for subscribing!</span>
              </motion.div>
            ) : (
              <>
                <p className="text-sm text-gray-400 mb-4">
                  Get updates on new features and releases
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      disabled={isLoading}
                      className="flex-1 px-4 py-3 rounded-full bg-white/5 border border-white/10 
                        text-white placeholder-gray-500 focus:outline-none focus:border-primary-cyan 
                        transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <Button 
                      type="submit" 
                      variant="primary" 
                      size="md"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Sending...' : 'Subscribe'}
                    </Button>
                  </div>
                  {error && (
                    <p className="text-sm text-red-400 text-left ml-4">{error}</p>
                  )}
                </form>
              </>
            )}
          </motion.div>
        </FadeIn>
      </Container>
    </section>
  );
};

export default CTASection;
