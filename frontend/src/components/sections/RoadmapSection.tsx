import React from 'react';
import { motion } from 'framer-motion';
import { Check, Wallet, Coins, Droplets, ArrowRightLeft, TrendingUp } from 'lucide-react';
import Container from '../layout/Container';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import FadeIn from '../animations/FadeIn';

const RoadmapSection: React.FC = () => {
  const setupSteps = [
    {
      step: 'Step 1',
      title: 'Connect Your Wallet',
      icon: Wallet,
      color: 'from-cyan-400 to-blue-500',
      items: [
        'Install MetaMask browser extension',
        'Create a new wallet or import existing one',
        'Add QIE Network to your wallet',
        'Click "Connect Wallet" on TokeDex',
        'Approve the connection request',
        'Your wallet is now connected!',
      ],
    },
    {
      step: 'Step 2',
      title: 'Create Your Token',
      icon: Coins,
      color: 'from-purple-400 to-pink-500',
      items: [
        'Click "Create Token" button',
        'Enter your token name (e.g., "MyToken")',
        'Choose token symbol (e.g., "MTK")',
        'Set total supply amount',
        'Review and confirm details',
        'Your token is created instantly!',
      ],
    },
    {
      step: 'Step 3',
      title: 'Add Liquidity',
      icon: Droplets,
      color: 'from-green-400 to-emerald-500',
      items: [
        'Navigate to "Liquidity" section',
        'Select your token and QIE pair',
        'Enter amount to add as liquidity',
        'Approve token spending',
        'Confirm liquidity addition',
        'Earn fees from trades!',
      ],
    },
    {
      step: 'Step 4',
      title: 'Trade on DEX',
      icon: ArrowRightLeft,
      color: 'from-yellow-400 to-orange-500',
      items: [
        'Go to "Swap" or "Trade" section',
        'Select tokens to swap',
        'Enter amount you want to trade',
        'Check exchange rate and fees',
        'Confirm the swap transaction',
        'Tokens appear in your wallet!',
      ],
    },
    {
      step: 'Step 5',
      title: 'Track & Manage',
      icon: TrendingUp,
      color: 'from-pink-400 to-rose-500',
      items: [
        'View your token balance in dashboard',
        'Monitor token price and volume',
        'Check your liquidity pool earnings',
        'See transaction history',
        'Withdraw liquidity anytime',
        'Share your token with others!',
      ],
    },
  ];

  return (
    <section id="roadmap" className="relative py-24 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-40 left-20 w-96 h-96 bg-primary-cyan/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-primary-purple/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      <div className="absolute inset-0 grid-background opacity-10" />

      <Container className="relative z-10">
        <FadeIn className="text-center max-w-3xl mx-auto mb-20">
          <Badge variant="gradient" className="mb-6 animate-pulse">
            How It Works
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-cyan via-primary-purple to-primary-pink bg-clip-text text-transparent animate-gradient">
            Start Creating Tokens in Minutes
          </h2>
          <p className="text-lg md:text-xl text-gray-400">
            No coding required - just follow these simple steps to launch your own token
          </p>
        </FadeIn>

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative">
          {/* Timeline Line */}
          <div className="absolute left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-cyan via-primary-purple to-primary-pink" />

          <div className="space-y-12">
            {setupSteps.map((step, index) => (
              <div key={step.step} className="flex gap-8">
                {/* Timeline Dot */}
                <div className="relative flex-shrink-0">
                  <motion.div
                    className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${step.color} 
                      flex items-center justify-center shadow-xl relative z-10`}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <step.icon size={40} className="text-white" />
                  </motion.div>
                </div>

                {/* Card */}
                <motion.div
                  className="flex-1 group"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 blur transition duration-500 rounded-3xl"
                    style={{ background: `linear-gradient(135deg, ${step.color.includes('cyan') ? '#22d3ee, #3b82f6' : 
                      step.color.includes('purple') ? '#c084fc, #ec4899' :
                      step.color.includes('green') ? '#4ade80, #10b981' :
                      step.color.includes('yellow') ? '#facc15, #f97316' :
                      '#f472b6, #fb7185'})` }}
                  ></div>

                  <Card className="relative bg-gradient-to-br from-dark-800/90 to-dark-900/90 backdrop-blur-xl border border-gray-800 group-hover:border-transparent transition-all duration-500">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                      <span className={`px-4 py-1.5 rounded-full text-sm font-bold bg-gradient-to-r ${step.color} text-white shadow-lg`}>
                        {step.step}
                      </span>
                    </div>
                    
                    <ul className="space-y-3">
                      {step.items.map((item) => (
                        <li 
                          key={item} 
                          className="flex items-start gap-3 text-gray-300"
                        >
                          <div className="w-5 h-5 rounded-full bg-primary-cyan/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check size={14} className="text-primary-cyan" />
                          </div>
                          <span className="group-hover:text-white transition-colors">{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Bottom Accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `linear-gradient(90deg, transparent, ${step.color.includes('cyan') ? '#22d3ee' : 
                        step.color.includes('purple') ? '#c084fc' :
                        step.color.includes('green') ? '#4ade80' :
                        step.color.includes('yellow') ? '#facc15' :
                        '#f472b6'}, transparent)` }}
                    ></div>
                  </Card>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden space-y-8">
          {setupSteps.map((step, index) => (
            <motion.div
              key={step.step}
              className="group relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 blur-sm transition duration-500 rounded-2xl"
                style={{ background: `linear-gradient(135deg, ${step.color.includes('cyan') ? '#22d3ee, #3b82f6' : 
                  step.color.includes('purple') ? '#c084fc, #ec4899' :
                  step.color.includes('green') ? '#4ade80, #10b981' :
                  step.color.includes('yellow') ? '#facc15, #f97316' :
                  '#f472b6, #fb7185'})` }}
              ></div>

              <Card className="relative bg-gradient-to-br from-dark-800/90 to-dark-900/90 backdrop-blur-xl border border-gray-800 group-hover:border-transparent transition-all duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} 
                      flex items-center justify-center shadow-lg`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <step.icon size={28} className="text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{step.title}</h3>
                    <span className="text-sm text-primary-cyan font-semibold">{step.step}</span>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  {step.items.map((item) => (
                    <li 
                      key={item} 
                      className="flex items-start gap-3 text-sm text-gray-300 group-hover:text-white transition-colors"
                    >
                      <div className="w-5 h-5 rounded-full bg-primary-cyan/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={12} className="text-primary-cyan" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default RoadmapSection;
