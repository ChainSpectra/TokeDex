import React from 'react'
import { motion } from 'framer-motion'
import { Plus, Loader } from 'lucide-react'
import { addTokenToWallet, showNotification } from '../utils/walletUtils'
import { usePublicClient } from 'wagmi'
import { QIE_TESTNET_CHAIN_ID } from '../config/networkConstants'

interface TokenImporterProps {
    tokenAddress: string
    tokenSymbol?: string
    tokenDecimals?: number
    tokenImage?: string
    tokenName?: string
    onTokenImported?: (tokenData: { address: string; name: string; symbol: string; decimals: number }) => void
}

/**
 * ERC20 ABI minimal interface for token metadata retrieval
 */
const ERC20_ABI = [
    {
        constant: true,
        inputs: [],
        name: 'name',
        outputs: [{ name: '', type: 'string' }],
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'symbol',
        outputs: [{ name: '', type: 'string' }],
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'decimals',
        outputs: [{ name: '', type: 'uint8' }],
        type: 'function',
    },
]

export function TokenImporter({
    tokenAddress,
    tokenSymbol: initialSymbol,
    tokenDecimals: initialDecimals = 18,
    tokenImage,
    tokenName: initialName,
    onTokenImported,
}: TokenImporterProps) {
    const [isAdding, setIsAdding] = React.useState(false)
    const [isFetchingMetadata, setIsFetchingMetadata] = React.useState(false)
    const [tokenMetadata, setTokenMetadata] = React.useState({
        name: initialName,
        symbol: initialSymbol,
        decimals: initialDecimals,
    })
    const publicClient = usePublicClient({ chainId: QIE_TESTNET_CHAIN_ID })

    // Fetch token metadata from blockchain
    React.useEffect(() => {
        const fetchTokenMetadata = async () => {
            if (!tokenAddress || !publicClient) return

            // Skip if we already have complete metadata
            if (initialName && initialSymbol && initialDecimals) return

            setIsFetchingMetadata(true)
            try {
                const [name, symbol, decimals] = await Promise.all([
                    publicClient.readContract({
                        address: tokenAddress as `0x${string}`,
                        abi: ERC20_ABI,
                        functionName: 'name',
                    }),
                    publicClient.readContract({
                        address: tokenAddress as `0x${string}`,
                        abi: ERC20_ABI,
                        functionName: 'symbol',
                    }),
                    publicClient.readContract({
                        address: tokenAddress as `0x${string}`,
                        abi: ERC20_ABI,
                        functionName: 'decimals',
                    }),
                ])

                setTokenMetadata({
                    name: name as string,
                    symbol: symbol as string,
                    decimals: decimals as number,
                })
            } catch (error) {
                console.warn('Failed to fetch token metadata:', error)
                // Keep initial values if fetch fails
            } finally {
                setIsFetchingMetadata(false)
            }
        }

        fetchTokenMetadata()
    }, [tokenAddress, publicClient, initialName, initialSymbol, initialDecimals])

    const handleAddToken = async () => {
        setIsAdding(true)
        try {
            await addTokenToWallet(
                tokenAddress,
                tokenMetadata.symbol || 'Unknown',
                tokenMetadata.decimals,
                tokenImage
            )
            showNotification(`${tokenMetadata.symbol} added to wallet successfully!`, 'success')

            // Notify parent component
            if (onTokenImported) {
                onTokenImported({
                    address: tokenAddress,
                    name: tokenMetadata.name || 'Unknown',
                    symbol: tokenMetadata.symbol || 'Unknown',
                    decimals: tokenMetadata.decimals,
                })
            }
        } catch (error: any) {
            console.error('Error adding token:', error)
            if (error.message?.includes('rejected')) {
                showNotification('Token addition cancelled', 'info')
            } else {
                showNotification(`Failed to add ${tokenMetadata.symbol} to wallet`, 'error')
            }
        } finally {
            setIsAdding(false)
        }
    }

    return (
        <motion.button
            onClick={handleAddToken}
            disabled={isAdding || isFetchingMetadata}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 px-4 py-2
        bg-gradient-to-r from-green-600/20 to-emerald-600/20
        hover:from-green-600/30 hover:to-emerald-600/30
        border border-green-500/30 hover:border-green-500/50
        text-green-400 font-medium rounded-lg
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        text-sm"
        >
            {isFetchingMetadata ? <Loader size={16} className="animate-spin" /> : <Plus size={16} />}
            {isFetchingMetadata
                ? 'Fetching...'
                : isAdding
                  ? 'Adding...'
                  : `Add ${tokenMetadata.name || tokenMetadata.symbol || 'Token'} to Wallet`}
        </motion.button>
    )
}
