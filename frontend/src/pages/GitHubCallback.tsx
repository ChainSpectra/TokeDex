import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GitHubCallback = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processing GitHub authentication...');

  useEffect(() => {
    const handleGitHubCallback = async () => {
      try {
        // Get code and state from URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        const error = urlParams.get('error');

        // Check for errors
        if (error) {
          throw new Error(`GitHub OAuth error: ${error}`);
        }

        if (!code) {
          throw new Error('No authorization code received from GitHub');
        }

        // Verify state matches (CSRF protection)
        const savedState = localStorage.getItem('github_oauth_state');
        if (state !== savedState) {
          throw new Error('Invalid state parameter - possible CSRF attack');
        }

        console.log('✅ GitHub authorization code received:', code.substring(0, 10) + '...');
        console.log('🔄 Exchanging code for access token...');

        // In a real app, you would send this code to your backend
        // Backend would exchange it for an access token
        // For now, we'll simulate a successful login

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock user data (in production, this comes from GitHub API)
        const mockGitHubUser = {
          id: Math.floor(Math.random() * 1000000),
          login: 'github_user_' + Math.floor(Math.random() * 1000),
          name: 'GitHub User',
          email: 'user@github.com',
          avatar_url: 'https://github.com/github.png',
        };

        console.log('✅ GitHub user authenticated:', mockGitHubUser);

        // Store auth token
        localStorage.setItem('auth_token', 'github_token_' + Date.now());
        localStorage.setItem('user_email', mockGitHubUser.email);
        localStorage.setItem('user_name', mockGitHubUser.name);
        localStorage.setItem('github_username', mockGitHubUser.login);
        localStorage.removeItem('github_oauth_state'); // Clean up

        setStatus('success');
        setMessage('Successfully authenticated with GitHub!');

        // Show success notification
        const notification = document.createElement('div');
        notification.textContent = '✓ Signed in with GitHub successfully!';
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

        // Redirect to home after 2 seconds
        setTimeout(() => {
          navigate('/');
        }, 2000);

      } catch (err: any) {
        console.error('❌ GitHub OAuth error:', err);
        setStatus('error');
        setMessage(err.message || 'Failed to authenticate with GitHub');

        // Redirect to home after 3 seconds
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    };

    handleGitHubCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-dark-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
        {status === 'loading' && (
          <>
            <div className="mb-6">
              <svg className="animate-spin h-12 w-12 mx-auto text-primary-cyan" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Authenticating...</h2>
            <p className="text-gray-400">{message}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Success!</h2>
            <p className="text-gray-400">{message}</p>
            <p className="text-sm text-gray-500 mt-4">Redirecting to home...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto bg-red-500/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Authentication Failed</h2>
            <p className="text-gray-400">{message}</p>
            <p className="text-sm text-gray-500 mt-4">Redirecting to home...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default GitHubCallback;
