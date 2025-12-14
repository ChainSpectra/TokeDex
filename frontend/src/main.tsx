import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import { AppWithSplash } from './components/CrystalGenesisSplash'
import { config } from './config/wagmi'

// Fix BigInt serialization for React DevTools
// This prevents "Do not know how to serialize a BigInt" errors
// wagmi v3 returns BigInt values which React DevTools can't serialize
if (typeof (BigInt.prototype as any).toJSON === 'undefined') {
  (BigInt.prototype as any).toJSON = function () {
    return this.toString()
  }
}

const queryClient = new QueryClient()
const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <AppWithSplash />
        </QueryClientProvider>
      </WagmiProvider>
    </StrictMode>,
  );
}
