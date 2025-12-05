/**
 * Wallet Utility Functions
 * Reusable helpers for wallet operations
 */

import { formatUnits } from 'ethers'
import { QIE_TESTNET_CHAIN_ID, NETWORK_NAMES, QIE_TESTNET_RPC, QIE_TESTNET_EXPLORER } from '../config/networkConstants'

/**
 * Format balance with proper decimals
 * @param balance - Balance in wei (bigint)
 * @param decimals - Token decimals (default: 18)
 * @returns Formatted balance string
 */
export const formatBalance = (balance: bigint | undefined, decimals: number = 18): string => {
    if (!balance) return '0.00'
    try {
        const formatted = formatUnits(balance, decimals)
        const num = parseFloat(formatted)

        // Format based on size
        if (num === 0) return '0.00'
        if (num < 0.0001) return '< 0.0001'
        if (num < 1) return num.toFixed(4)
        if (num < 1000) return num.toFixed(2)

        // For large numbers, use compact notation
        return new Intl.NumberFormat('en-US', {
            notation: 'compact',
            maximumFractionDigits: 2,
        }).format(num)
    } catch (error) {
        console.error('Error formatting balance:', error)
        return '0.00'
    }
}

/**
 * Shorten address for display
 * @param address - Full Ethereum address
 * @param chars - Number of characters to show on each side (default: 4)
 * @returns Shortened address (e.g., "0x1234...5678")
 */
export const shortenAddress = (address: string | undefined, chars: number = 4): string => {
    if (!address) return ''
    if (address.length < chars * 2 + 2) return address
    return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`
}

/**
 * Check if network is QIE testnet
 * @param chainId - Chain ID to check
 * @returns True if QIE testnet
 */
export const isQIETestnet = (chainId: number | undefined): boolean => {
    return chainId === QIE_TESTNET_CHAIN_ID
}

/**
 * Get network name by chain ID
 * @param chainId - Chain ID
 * @returns Network name or "Unknown Network"
 */
export const getNetworkName = (chainId: number | undefined): string => {
    if (!chainId) return 'Unknown Network'
    return NETWORK_NAMES[chainId as keyof typeof NETWORK_NAMES] || 'Unknown Network'
}

/**
 * Check if user has sufficient balance for transactions
 * @param balance - Current balance in wei
 * @param minBalance - Minimum required balance (default: 0.01 QIE)
 * @returns True if balance is sufficient
 */
export const hasSufficientBalance = (balance: bigint | undefined, minBalance: number = 0.01): boolean => {
    if (!balance) return false
    const balanceNum = parseFloat(formatUnits(balance, 18))
    return balanceNum >= minBalance
}

/**
 * Add QIE testnet to wallet (MetaMask)
 * @returns Promise that resolves when network is added
 */
export const addQIENetwork = async (): Promise<void> => {
    if (!window.ethereum) {
        throw new Error('No wallet detected. Please install MetaMask or another Web3 wallet.')
    }

    try {
        await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
                chainId: `0x${QIE_TESTNET_CHAIN_ID.toString(16)}`, // Convert to hex
                chainName: 'QIE Testnet',
                nativeCurrency: {
                    name: 'QIE',
                    symbol: 'QIE',
                    decimals: 18,
                },
                rpcUrls: [QIE_TESTNET_RPC],
                blockExplorerUrls: [QIE_TESTNET_EXPLORER],
            }],
        })
    } catch (error: any) {
        // User rejected or error occurred
        if (error.code === 4001) {
            throw new Error('User rejected network addition')
        }
        throw error
    }
}

/**
 * Switch to QIE testnet
 * @returns Promise that resolves when network is switched
 */
export const switchToQIENetwork = async (): Promise<void> => {
    if (!window.ethereum) {
        throw new Error('No wallet detected. Please install MetaMask or another Web3 wallet.')
    }

    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${QIE_TESTNET_CHAIN_ID.toString(16)}` }],
        })
    } catch (error: any) {
        // Network not added yet, try adding it
        if (error.code === 4902) {
            await addQIENetwork()
        } else if (error.code === 4001) {
            throw new Error('User rejected network switch')
        } else {
            throw error
        }
    }
}

/**
 * Add custom token to wallet
 * @param tokenAddress - Token contract address
 * @param tokenSymbol - Token symbol (e.g., "QTT")
 * @param tokenDecimals - Token decimals (default: 18)
 * @param tokenImage - Optional token image URL
 * @returns Promise that resolves when token is added
 */
export const addTokenToWallet = async (
    tokenAddress: string,
    tokenSymbol: string,
    tokenDecimals: number = 18,
    tokenImage?: string
): Promise<void> => {
    if (!window.ethereum) {
        throw new Error('No wallet detected. Please install MetaMask or another Web3 wallet.')
    }

    try {
        await window.ethereum.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC20',
                options: {
                    address: tokenAddress,
                    symbol: tokenSymbol,
                    decimals: tokenDecimals,
                    image: tokenImage,
                },
            },
        })
    } catch (error: any) {
        if (error.code === 4001) {
            throw new Error('User rejected token addition')
        }
        throw error
    }
}

/**
 * Copy text to clipboard
 * @param text - Text to copy
 * @returns Promise that resolves when copied
 */
export const copyToClipboard = async (text: string): Promise<void> => {
    try {
        await navigator.clipboard.writeText(text)
    } catch (error) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = text
        textArea.style.position = 'fixed'
        textArea.style.opacity = '0'
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
    }
}

/**
 * Show notification toast
 * @param message - Message to display
 * @param type - Notification type (success, error, info)
 * @param duration - Duration in milliseconds (default: 3000)
 */
export const showNotification = (
    message: string,
    type: 'success' | 'error' | 'info' = 'info',
    duration: number = 3000
): void => {
    const notification = document.createElement('div')
    notification.textContent = message

    const colors = {
        success: 'linear-gradient(135deg, #10B981, #059669)',
        error: 'linear-gradient(135deg, #EF4444, #DC2626)',
        info: 'linear-gradient(135deg, #00D4FF, #7B61FF)',
    }

    notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${colors[type]};
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    font-weight: 600;
    z-index: 10000;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    animation: slideIn 0.3s ease-out;
  `

    document.body.appendChild(notification)
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out'
        setTimeout(() => notification.remove(), 300)
    }, duration)
}

// Add CSS animations
const style = document.createElement('style')
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`
document.head.appendChild(style)
