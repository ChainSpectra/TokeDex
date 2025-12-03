import { createConfig, http } from 'wagmi'
import { mainnet, sepolia, localhost } from 'wagmi/chains'
import { injected, metaMask, walletConnect } from 'wagmi/connectors'

// Define QIE testnet
export const qieTestnet = {
  id: 12345, // Replace with actual QIE testnet chain ID
  name: 'QIE Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'QIE',
    symbol: 'QIE',
  },
  rpcUrls: {
    default: {
      http: ['ttps://rpc.qtestnet.org'], // Replace with actual QIE RPC URL
    },
  },
  blockExplorers: {
    default: {
      name: 'QIE Explorer',
      url: 'ttps://rpc.qtestnet.org', // Replace with actual explorer URL
    },
  },
} as const

export const config = createConfig({
  chains: [mainnet, sepolia, localhost, qieTestnet],
  connectors: [
    injected(),
    metaMask(),
    walletConnect({ 
      projectId: 'd17eff2bad7d6dda74ac8a49784a4cca' // Get from https://walletconnect.com
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [localhost.id]: http(),
    [qieTestnet.id]: http(),
  },
})