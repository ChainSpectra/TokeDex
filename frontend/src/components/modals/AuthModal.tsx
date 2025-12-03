import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Wallet, Github, Smartphone, ArrowLeft } from 'lucide-react';
import { WalletConnector } from '../WalletConnector';
import Button from '../ui/Button';
import { sendSignInEmail, sendWelcomeEmail, formatSignInTime, getDeviceInfo, getUserIP, sendOTPEmail, generateOTP } from '../../services/emailService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = 'login' | 'signup' | 'otp' | 'wallet';

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
  });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOTP, setGeneratedOTP] = useState(''); // Store generated OTP
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    console.log('🔵 Form submitted - Mode:', authMode, 'Data:', formData);

    try {
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email || !emailRegex.test(formData.email)) {
        setError('Please enter a valid email address');
        setIsLoading(false);
        return;
      }

      if (!formData.password || formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        setIsLoading(false);
        return;
      }

      if (authMode === 'signup' && !formData.name) {
        setError('Please enter your name');
        setIsLoading(false);
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log(`✅ DEMO MODE: ${authMode === 'login' ? 'Login' : 'Signup'} successful`, formData);
      localStorage.setItem('auth_token', 'demo_token_' + Date.now());
      localStorage.setItem('user_email', formData.email);
      localStorage.setItem('user_name', formData.name || 'User');
      
      // Send email notification
      try {
        const ipAddress = await getUserIP();
        const deviceInfo = getDeviceInfo();
        
        if (authMode === 'login') {
          await sendSignInEmail({
            userName: formData.name || 'User',
            userEmail: formData.email,
            signInTime: formatSignInTime(),
            ipAddress,
            deviceInfo
          });
          console.log('📧 Sign-in email sent to:', formData.email);
        } else {
          await sendWelcomeEmail({
            userName: formData.name,
            userEmail: formData.email,
            signInTime: formatSignInTime(),
            ipAddress,
            deviceInfo
          });
          console.log('📧 Welcome email sent to:', formData.email);
        }
      } catch (emailError) {
        console.warn('Email notification failed (non-blocking):', emailError);
      }
      
      // Show success notification
      const notification = document.createElement('div');
      notification.textContent = `✓ ${authMode === 'login' ? 'Signed in' : 'Account created'} successfully! Check your email.`;
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #00D4FF, #7B61FF);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 8px 32px rgba(0, 212, 255, 0.3);
      `;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 5000);

      // Close modal after short delay
      setTimeout(() => onClose(), 500);
      
    } catch (err: any) {
      console.error('❌ Auth Error:', err);
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    console.log('🔵 OTP form submitted - Sent:', otpSent, 'Email:', formData.email);

    try {
      if (!otpSent) {
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
          setError('Please enter a valid email address');
          setIsLoading(false);
          return;
        }

        // Generate 6-digit OTP
        const newOTP = generateOTP();
        setGeneratedOTP(newOTP);
        
        console.log('🔐 Generated OTP:', newOTP);

        // Send OTP via email
        const emailSent = await sendOTPEmail(formData.email, newOTP);
        
        if (emailSent) {
          console.log('✅ OTP email sent successfully to:', formData.email);
        } else {
          console.log('📧 DEMO MODE: OTP generated but email service not configured');
          console.log('🔐 Use this OTP to login:', newOTP);
        }
        
        setOtpSent(true);
        setError('');
        
        // Show notification
        const notification = document.createElement('div');
        notification.innerHTML = `✓ OTP sent to your email!<br><small>Check: ${formData.email}</small>`;
        notification.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: linear-gradient(135deg, #00D4FF, #7B61FF);
          color: white;
          padding: 16px 24px;
          border-radius: 12px;
          font-weight: 600;
          z-index: 10000;
          box-shadow: 0 8px 32px rgba(0, 212, 255, 0.3);
          text-align: center;
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 5000);
        
      } else {
        // Verify OTP
        const otpCode = otp.join('');
        console.log('🔵 Verifying OTP:', otpCode, 'Expected:', generatedOTP);
        
        if (otpCode.length !== 6) {
          setError('Please enter complete 6-digit OTP');
          setIsLoading(false);
          return;
        }

        // Verify OTP matches
        if (otpCode === generatedOTP) {
          console.log('✅ OTP verified successfully');
          localStorage.setItem('auth_token', 'demo_token_' + Date.now());
          localStorage.setItem('user_email', formData.email);
          
          // Show success notification
          const notification = document.createElement('div');
          notification.textContent = '✓ OTP verified successfully!';
          notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #00D4FF, #7B61FF);
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            font-weight: 600;
            z-index: 10000;
            box-shadow: 0 8px 32px rgba(0, 212, 255, 0.3);
          `;
          document.body.appendChild(notification);
          setTimeout(() => notification.remove(), 3000);

          // Close modal after short delay
          setTimeout(() => onClose(), 500);
        } else {
          throw new Error('Invalid OTP. Please check your email and try again.');
        }
      }
    } catch (err: any) {
      console.error('❌ OTP Error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError('');
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('🔐 DEMO MODE: OTP resent to:', formData.phone);
      console.log('🔐 DEMO OTP CODE: 123456 (use this to test)');
      
      /* Uncomment when backend is ready:
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: formData.phone }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to resend OTP');
      }

      const data = await response.json();
      console.log('OTP resent successfully:', data);
      */
      
      setOtp(['', '', '', '', '', '']);
      setError('');
      
      // Show success notification
      const notification = document.createElement('div');
      notification.textContent = '✓ OTP resent successfully! Use: 123456';
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #00D4FF, #7B61FF);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 8px 32px rgba(0, 212, 255, 0.3);
      `;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
      
    } catch (err: any) {
      console.error('Resend OTP Error:', err);
      setError(err.message || 'Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleGitHubLogin = async () => {
    setIsLoading(true);
    console.log('🔵 GitHub login clicked');
    
    try {
      // GitHub OAuth URL
      const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID || 'YOUR_GITHUB_CLIENT_ID';
      const REDIRECT_URI = window.location.origin + '/auth/github/callback';
      const STATE = Math.random().toString(36).substring(7); // Random state for security
      
      // Store state in localStorage for verification
      localStorage.setItem('github_oauth_state', STATE);
      
      // GitHub OAuth URL
      const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=user:email&state=${STATE}`;
      
      console.log('🔗 Redirecting to GitHub OAuth...');
      console.log('📍 Redirect URI:', REDIRECT_URI);
      
      // Redirect to GitHub OAuth
      window.location.href = githubAuthUrl;
      
    } catch (err) {
      console.error('❌ GitHub OAuth error:', err);
      setError('Failed to connect with GitHub. Please try again.');
      setIsLoading(false);
    }
  };

  const handleWalletConnect = () => {
    // Switch to wallet connection mode
    setAuthMode('wallet');
    console.log('🔵 Switching to wallet connector');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetAuthMode = () => {
    setAuthMode('login');
    setOtpSent(false);
    setOtp(['', '', '', '', '', '']);
    setError('');
    setIsLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-dark-800 rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Animated Background Gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary-cyan/10 via-primary-purple/10 to-primary-pink/10 opacity-50"
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

              {/* Content */}
              <div className="relative z-10 p-10">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X size={24} className="text-gray-400" />
                </button>

                {/* Back Button for OTP */}
                {authMode === 'otp' && (
                  <button
                    onClick={resetAuthMode}
                    className="absolute top-6 left-6 p-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <ArrowLeft size={24} className="text-gray-400" />
                  </button>
                )}

                {/* Logo */}
                <div className="flex justify-center mb-8">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-cyan via-primary-purple to-primary-pink glow-gradient flex items-center justify-center">
                    <span className="text-3xl font-bold">Q</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-4xl font-bold text-center mb-3">
                  <span className="gradient-text">
                    {authMode === 'otp' 
                      ? (otpSent ? 'Verify OTP' : 'Phone Login')
                      : authMode === 'wallet'
                      ? 'Connect Wallet'
                      : authMode === 'login' 
                      ? 'Welcome Back' 
                      : 'Create Account'}
                  </span>
                </h2>
                <p className="text-gray-400 text-center mb-10 text-base">
                  {authMode === 'otp'
                    ? (otpSent 
                      ? `Enter the 6-digit code sent to ${formData.phone}`
                      : 'Sign in with your phone number')
                    : authMode === 'wallet'
                    ? 'Connect your preferred wallet to get started'
                    : authMode === 'login'
                    ? 'Sign in to access your dashboard'
                    : 'Start your journey with TokeDEx'}
                </p>

                {/* Wallet Connect Button */}
                {authMode !== 'otp' && authMode !== 'wallet' && (
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full mb-8 py-4 text-lg"
                    onClick={handleWalletConnect}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Connecting...
                      </span>
                    ) : (
                      <>
                        <Wallet className="mr-2" size={22} />
                        Connect Wallet
                      </>
                    )}
                  </Button>
                )}

                {/* Divider */}
                {authMode !== 'otp' && (
                  <div className="relative flex items-center justify-center mb-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative px-4 bg-dark-800 text-sm text-gray-400">
                      or continue with
                    </div>
                  </div>
                )}

                {/* OTP Login Form */}
                {authMode === 'otp' && (
                  <form onSubmit={handleOTPSubmit} className="space-y-6">
                    {!otpSent ? (
                      <>
                        <div className="relative">
                          <Mail
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            size={22}
                          />
                          <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={isLoading}
                            required
                            className="w-full pl-14 pr-4 py-4 text-lg bg-white/5 border border-white/10 rounded-xl
                              text-white placeholder-gray-500 focus:outline-none focus:border-primary-cyan
                              transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                        </div>
                        <p className="text-xs text-gray-400 text-center">
                          We'll send a 6-digit OTP to your email
                        </p>
                        {error && (
                          <div className="text-red-400 text-sm text-center bg-red-400/10 border border-red-400/20 rounded-lg p-3">
                            {error}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="space-y-6">
                        <div className="text-center mb-4">
                          <p className="text-sm text-gray-400">
                            OTP sent to: <span className="text-white font-medium">{formData.email}</span>
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              setOtpSent(false);
                              setOtp(['', '', '', '', '', '']);
                              setGeneratedOTP('');
                            }}
                            className="text-xs text-[#00D4FF] hover:underline mt-2"
                          >
                            Change email
                          </button>
                        </div>
                        <div className="flex gap-3 justify-center">
                          {otp.map((digit, index) => (
                            <input
                              key={index}
                              id={`otp-${index}`}
                              type="text"
                              maxLength={1}
                              value={digit}
                              onChange={(e) => handleOtpChange(index, e.target.value)}
                              onKeyDown={(e) => handleOtpKeyDown(index, e)}
                              disabled={isLoading}
                              className="w-14 h-14 text-center text-2xl font-bold bg-white/5 border border-white/10 
                                rounded-xl text-white focus:outline-none focus:border-primary-cyan
                                transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                          ))}
                        </div>
                        {error && (
                          <div className="text-red-400 text-sm text-center bg-red-400/10 border border-red-400/20 rounded-lg p-3">
                            {error}
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={handleResendOTP}
                          disabled={isLoading}
                          className="w-full text-sm text-primary-cyan hover:text-primary-cyan/80 transition-colors
                            disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Didn't receive code? Resend
                        </button>
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      variant="primary" 
                      size="lg" 
                      className="w-full py-4 text-lg"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {otpSent ? 'Verifying...' : 'Sending...'}
                        </span>
                      ) : (
                        otpSent ? 'Verify & Login' : 'Send OTP'
                      )}
                    </Button>
                  </form>
                )}

                {/* Wallet Connection Form */}
                {authMode === 'wallet' && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-semibold text-white mb-2">Connect Your Wallet</h3>
                      <p className="text-gray-400 text-sm">
                        Choose your preferred wallet to connect to TokeDx
                      </p>
                    </div>
                    <WalletConnector />
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={resetAuthMode}
                        className="text-gray-400 hover:text-white text-sm transition-colors"
                      >
                        ← Back to login options
                      </button>
                    </div>
                  </div>
                )}

                {/* Email/Password Login Form */}
                {authMode !== 'otp' && (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {authMode === 'signup' && (
                      <div className="relative">
                        <User
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                          size={22}
                        />
                        <input
                          type="text"
                          name="name"
                          placeholder="Full Name"
                          value={formData.name}
                          onChange={handleChange}
                          disabled={isLoading}
                          required={authMode === 'signup'}
                          className="w-full pl-14 pr-4 py-4 text-lg bg-white/5 border border-white/10 rounded-xl
                            text-white placeholder-gray-500 focus:outline-none focus:border-primary-cyan
                            transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>
                    )}

                    <div className="relative">
                      <Mail
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={22}
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                        className="w-full pl-14 pr-4 py-4 text-lg bg-white/5 border border-white/10 rounded-xl
                          text-white placeholder-gray-500 focus:outline-none focus:border-primary-cyan
                          transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>

                    <div className="relative">
                      <Lock
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={22}
                      />
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                        className="w-full pl-14 pr-4 py-4 text-lg bg-white/5 border border-white/10 rounded-xl
                          text-white placeholder-gray-500 focus:outline-none focus:border-primary-cyan
                          transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>

                    {authMode === 'login' && (
                      <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-white/10 bg-white/5 text-primary-cyan
                              focus:ring-2 focus:ring-primary-cyan focus:ring-offset-0"
                          />
                          Remember me
                        </label>
                        <button
                          type="button"
                          className="text-primary-cyan hover:text-primary-cyan/80 transition-colors"
                        >
                          Forgot password?
                        </button>
                      </div>
                    )}

                    {error && (
                      <div className="text-red-400 text-sm text-center bg-red-400/10 border border-red-400/20 rounded-lg p-3">
                        {error}
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      variant="primary" 
                      size="lg" 
                      className="w-full py-4 text-lg"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {authMode === 'login' ? 'Signing in...' : 'Creating account...'}
                        </span>
                      ) : (
                        authMode === 'login' ? 'Sign In' : 'Create Account'
                      )}
                    </Button>
                  </form>
                )}

                {/* Alternative Login Options */}
                {authMode !== 'otp' && (
                  <>
                    <div className="mt-6 space-y-4">
                      <button
                        type="button"
                        onClick={handleGitHubLogin}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2 px-4 py-4 text-base
                          bg-white/5 border border-white/10 rounded-xl text-white
                          hover:bg-white/10 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Github size={22} />
                        Continue with GitHub
                      </button>
                    </div>

                    {/* Toggle Login/Signup */}
                    <p className="text-center text-gray-400 text-base mt-8">
                      {authMode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                      <button
                        type="button"
                        onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                        className="text-primary-cyan hover:text-primary-cyan/80 transition-colors font-medium"
                      >
                        {authMode === 'login' ? 'Sign up' : 'Sign in'}
                      </button>
                    </p>

                    {/* Terms */}
                    {authMode === 'signup' && (
                      <p className="text-center text-gray-500 text-sm mt-4">
                        By signing up, you agree to our{' '}
                        <a href="#" className="text-primary-cyan hover:underline">
                          Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="#" className="text-primary-cyan hover:underline">
                          Privacy Policy
                        </a>
                      </p>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
