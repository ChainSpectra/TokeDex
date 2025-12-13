/**
 * Network Constants for TokeDex
 * Centralized configuration for blockchain networks
 */

// QIE Testnet Configuration
export const QIE_TESTNET_CHAIN_ID = 1983
export const QIE_TESTNET_RPC = 'https://rpc1testnet.qie.digital'
export const QIE_TESTNET_EXPLORER = 'https://testnet.qie.digital'
export const QIE_FAUCET_URL = 'https://testnet.qie.digital/' // Official QIE faucet

// Qiedex DEX Configuration
export const QIEDEX_URL = 'https://www.dex.qie.digital'
export const QIEDEX_TOKEN_CREATOR_PATH = '/token-creator' // Adjust if needed based on actual Qiedex routing

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

// QTT Token and Faucet (deployed on QIE Testnet)
export const QTT_TOKEN_ADDRESS = "0xcD7F8e44a0bEcA8003312857A3DFb8545Fdfb814"
export const QTT_FAUCET_ADDRESS = "0x7529138a5Bc978A62d842dF6a3699af1C47087fB"

// TokenFactory contract address on QIE Testnet
export const TOKEN_FACTORY_ADDRESS = '0xfa1a836DB0307bd214E8f3b3672b47d53491a29C'

// TokenFactory ABI - only the functions we need
export const TOKEN_FACTORY_ABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "name", "type": "string" },
      { "internalType": "string", "name": "symbol", "type": "string" },
      { "internalType": "uint256", "name": "initialSupply", "type": "uint256" },
      { "internalType": "uint8", "name": "decimals", "type": "uint8" }
    ],
    "name": "createToken",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "tokenAddress", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "creator", "type": "address" },
      { "indexed": false, "internalType": "string", "name": "name", "type": "string" },
      { "indexed": false, "internalType": "string", "name": "symbol", "type": "string" },
      { "indexed": false, "internalType": "uint256", "name": "initialSupply", "type": "uint256" },
      { "indexed": false, "internalType": "uint8", "name": "decimals", "type": "uint8" }
    ],
    "name": "TokenCreated",
    "type": "event"
  },
  {
    "inputs": [{ "internalType": "address", "name": "creator", "type": "address" }],
    "name": "getTokensByCreator",
    "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }],
    "stateMutability": "view",
    "type": "function"
  }
] as const