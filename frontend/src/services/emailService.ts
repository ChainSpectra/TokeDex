import emailjs from '@emailjs/browser';

// EmailJS Configuration
// Get these from: https://www.emailjs.com/
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

// Initialize EmailJS
if (EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

export interface SignInEmailParams {
  userName: string;
  userEmail: string;
  signInTime: string;
  ipAddress?: string;
  deviceInfo?: string;
}

/**
 * Send sign-in notification email to user
 */
export const sendSignInEmail = async (params: SignInEmailParams): Promise<boolean> => {
  // Check if EmailJS is configured
  if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' || 
      EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' || 
      EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
    console.warn('⚠️ EmailJS not configured. Please add credentials to .env file');
    console.log('📧 DEMO MODE: Would have sent email to:', params.userEmail);
    console.log('📧 Email content:', {
      subject: 'Sign-in to TokeDex',
      body: `Hello ${params.userName}, you signed in at ${params.signInTime}`
    });
    return false;
  }

  try {
    console.log('📧 Sending sign-in email to:', params.userEmail);

    // EmailJS send function
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        to_email: params.userEmail,        // Recipient email
        reply_to: params.userEmail,        // Reply-to address
        from_name: 'TokeDex',              // Sender name
        to_name: params.userName,          // Recipient name
        user_name: params.userName,
        user_email: params.userEmail,
        signin_time: params.signInTime,
        ip_address: params.ipAddress || 'Unknown',
        device_info: params.deviceInfo || navigator.userAgent.substring(0, 50),
        website_name: 'TokeDex',
        website_url: window.location.origin,
      }
    );

    console.log('✅ Email sent successfully:', response);
    return true;

  } catch (error: any) {
    console.error('❌ Failed to send email:', error);
    
    // Show user-friendly error
    if (error.text) {
      console.error('Error details:', error.text);
    }
    
    return false;
  }
};

/**
 * Send welcome email for new sign-ups
 */
export const sendWelcomeEmail = async (params: SignInEmailParams): Promise<boolean> => {
  // For now, use the same template as sign-in
  // You can create a separate welcome template later
  return sendSignInEmail(params);
};

/**
 * Get device information for email
 */
export const getDeviceInfo = (): string => {
  const ua = navigator.userAgent;
  
  if (ua.includes('Windows')) return 'Windows PC';
  if (ua.includes('Mac')) return 'Mac';
  if (ua.includes('Linux')) return 'Linux';
  if (ua.includes('iPhone')) return 'iPhone';
  if (ua.includes('iPad')) return 'iPad';
  if (ua.includes('Android')) return 'Android';
  
  return 'Unknown Device';
};

/**
 * Get user's IP address (requires external API)
 */
export const getUserIP = async (): Promise<string> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Failed to get IP:', error);
    return 'Unknown';
  }
};

/**
 * Send OTP email for authentication
 */
export const sendOTPEmail = async (email: string, otp: string): Promise<boolean> => {
  if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID') {
    console.log('📧 DEMO MODE: Would have sent OTP email to:', email);
    console.log('🔐 OTP Code:', otp);
    return false;
  }

  try {
    console.log('📧 Sending OTP email to:', email);

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      'template_otp', // You'll need to create this template
      {
        to_email: email,
        reply_to: email,
        from_name: 'TokeDex',
        otp_code: otp,
        website_name: 'TokeDex',
      }
    );

    console.log('✅ OTP email sent:', response);
    return true;

  } catch (error) {
    console.error('❌ Failed to send OTP email:', error);
    return false;
  }
};

/**
 * Generate random 6-digit OTP
 */
export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Format date/time for email
 */
export const formatSignInTime = (): string => {
  const now = new Date();
  return now.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });
};
