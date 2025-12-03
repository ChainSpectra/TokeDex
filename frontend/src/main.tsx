import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import { AppWithSplash } from './components/CrystalGenesisSplash'
import { config } from './config/wagmi'

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
