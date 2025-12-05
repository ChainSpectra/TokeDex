import { createConfig, http } from 'wagmi'
import { mainnet, sepolia, localhost } from 'wagmi/chains'
import { injected, metaMask, walletConnect } from 'wagmi/connectors'
import type { Chain } from 'wagmi/chains'
import { QIE_TESTNET_CHAIN_ID, QIE_TESTNET_RPC, QIE_TESTNET_EXPLORER } from './networkConstants'

// Define QIE testnet with correct parameters
export const qieTestnet = {
  id: QIE_TESTNET_CHAIN_ID, // ✅ Correct Chain ID: 1983
  name: 'QIE Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'QIE',
    symbol: 'QIE',
  },
  rpcUrls: {
    default: {
      http: [QIE_TESTNET_RPC], // ✅ Correct RPC: https://rpc1testnet.qie.digital
    },
  },
  blockExplorers: {
    default: {
      name: 'QIE Explorer',
      url: QIE_TESTNET_EXPLORER, // ✅ Correct Explorer: https://testnet.qie.digital
    },
  },
  testnet: true, // ✅ Mark as testnet
} as const satisfies Chain

export const config = createConfig({
  chains: [qieTestnet, sepolia, localhost, mainnet], // ✅ QIE testnet as primary chain
  connectors: [
    injected(),
    metaMask(),
    walletConnect({
      projectId: 'd17eff2bad7d6dda74ac8a49784a4cca' // Get from https://walletconnect.com
    }),
  ],
  transports: {
    [qieTestnet.id]: http(),
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [localhost.id]: http(),
  },
})