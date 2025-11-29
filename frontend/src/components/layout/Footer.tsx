import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Github, MessageCircle, Send } from 'lucide-react';
import GradientText from '../ui/GradientText';
import Container from './Container';

const Footer: React.FC = () => {
  const footerLinks = {
    product: [
      { name: 'Launch App', href: '#' },
      { name: 'Features', href: '#features' },
      { name: 'Documentation', href: '#' },
      { name: 'API Reference', href: '#' },
      { name: 'Whitepaper', href: '#' },
    ],
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press Kit', href: '#' },
      { name: 'Contact', href: '#' },
    ],
    community: [
      { name: 'Discord', href: '#' },
      { name: 'Forum', href: '#' },
      { name: 'GitHub', href: '#' },
      { name: 'Twitter', href: '#' },
      { name: 'Newsletter', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: 'https://github.com/ChainSpectra/TokeDex', label: 'GitHub' },
    { icon: MessageCircle, href: '#', label: 'Discord' },
    { icon: Send, href: '#', label: 'Telegram' },
  ];

  return (
    <footer className="bg-dark-900 border-t border-white/10 pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-2xl font-bold mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-cyan via-primary-purple to-primary-pink glow-gradient" />
              <GradientText>TokeDEx</GradientText>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Building the decentralized future with enterprise-grade protocol infrastructure.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Community</h3>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 TokeDEx. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
