import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';
import Container from '../layout/Container';
import FadeIn from '../animations/FadeIn';

const StatsSection: React.FC = () => {
  const stats = [
    { icon: TrendingUp, value: 1000000, suffix: '+', label: 'Total Transactions', prefix: '' },
    { icon: Users, value: 500000, suffix: '+', label: 'Active Users', prefix: '' },
    { icon: DollarSign, value: 50, suffix: 'B+', label: 'Total Value Locked', prefix: '$' },
    { icon: Activity, value: 99.99, suffix: '%', label: 'Uptime Guarantee', prefix: '' },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-blue-900/20">
      <div className="absolute inset-0 bg-dark-900/50" />
      
      <Container className="relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <FadeIn key={stat.label} delay={0.1 * index}>
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 
                    flex items-center justify-center group-hover:glow-gradient transition-all duration-300">
                    <stat.icon className="text-primary-cyan" size={24} />
                  </div>
                </div>

                {/* Value */}
                <div className="text-5xl md:text-6xl font-bold gradient-text mb-2">
                  <Counter
                    end={stat.value}
                    duration={2}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>

                {/* Label */}
                <p className="text-sm md:text-base text-gray-400">
                  {stat.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
};

// Counter Animation Component
const Counter: React.FC<{
  end: number;
  duration: number;
  prefix?: string;
  suffix?: string;
}> = ({ end, duration, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(num >= 100000000 ? 0 : 1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(num >= 100000 ? 0 : 1) + 'K';
    }
    return num.toString();
  };

  return (
    <span ref={countRef}>
      {prefix}
      {end > 100 ? formatNumber(count) : count.toFixed(end % 1 !== 0 ? 2 : 0)}
      {suffix}
    </span>
  );
};

export default StatsSection;
