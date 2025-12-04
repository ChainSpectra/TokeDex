/**
 * Network Constants for TokeDex
 * Centralized configuration for blockchain networks
 */

// QIE Testnet Configuration
export const QIE_TESTNET_CHAIN_ID = 1983
export const QIE_TESTNET_RPC = 'https://rpc1testnet.qie.digital'
export const QIE_TESTNET_EXPLORER = 'https://testnet.qie.digital'
export const QIE_FAUCET_URL = 'https://testnet.qie.digital/' // Official QIE faucet

// Network Names Mapping
export const NETWORK_NAMES = {
    [QIE_TESTNET_CHAIN_ID]: 'QIE Testnet',
    1: 'Ethereum Mainnet',
    11155111: 'Sepolia Testnet',
    31337: 'Localhost',
} as const

// Expected/Default Network
export const EXPECTED_NETWORK = QIE_TESTNET_CHAIN_ID

// Network Colors for UI
export const NETWORK_COLORS = {
    [QIE_TESTNET_CHAIN_ID]: {
        bg: 'bg-purple-500/20',
        text: 'text-purple-400',
        border: 'border-purple-500/30',
    },
    1: {
        bg: 'bg-blue-500/20',
        text: 'text-blue-400',
        border: 'border-blue-500/30',
    },
    11155111: {
        bg: 'bg-yellow-500/20',
        text: 'text-yellow-400',
        border: 'border-yellow-500/30',
    },
    31337: {
        bg: 'bg-green-500/20',
        text: 'text-green-400',
        border: 'border-green-500/30',
    },
} as const

// Type exports
export type SupportedChainId = keyof typeof NETWORK_NAMES
