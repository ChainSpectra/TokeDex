import { useState, useEffect } from 'react'
import { useAccount, useChainId, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { Droplet, RefreshCw, Clock, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { QIE_TESTNET_CHAIN_ID } from '../config/networkConstants'
import { formatBalance, showNotification } from '../utils/walletUtils'
import { TokenImporter } from './TokenImporter'

import { QTT_TOKEN_ADDRESS, QTT_FAUCET_ADDRESS } from '../config/networkConstants'

// Faucet ABI - only the functions we need
const FAUCET_ABI = [
    {
        "inputs": [],
        "name": "claimTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "name": "canClaim",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "name": "timeUntilNextClaim",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getFaucetBalance",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "CLAIM_AMOUNT",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    }
] as const

// ERC20 ABI - only balanceOf
const ERC20_ABI = [
    {
        "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
        "name": "balanceOf",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    }
] as const

export function QTTFaucet() {
    const { address } = useAccount()
    const chainId = useChainId()

    // Check if contracts are deployed
    const contractsDeployed = QTT_TOKEN_ADDRESS !== "0x0000000000000000000000000000000000000000"

    // Read user's QTT balance
    const { data: balance = BigInt(0), refetch: refetchBalance } = useReadContract({
        address: QTT_TOKEN_ADDRESS as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        args: address ? [address] : undefined
    })

    // Read faucet balance
    const { data: faucetBalance = BigInt(0), refetch: refetchFaucetBalance } = useReadContract({
        address: QTT_FAUCET_ADDRESS as `0x${string}`,
        abi: FAUCET_ABI,
        functionName: 'getFaucetBalance'
    })

    // Check if user can claim
    const { data: canClaim = false, refetch: refetchCanClaim } = useReadContract({
        address: QTT_FAUCET_ADDRESS as `0x${string}`,
        abi: FAUCET_ABI,
        functionName: 'canClaim',
        args: address ? [address] : undefined
    })

    // Get time until next claim
    const { data: timeUntilClaim = BigInt(0), refetch: refetchTimeUntilClaim } = useReadContract({
        address: QTT_FAUCET_ADDRESS as `0x${string}`,
        abi: FAUCET_ABI,
        functionName: 'timeUntilNextClaim',
        args: address ? [address] : undefined
    })

    // Write contract for claiming
    const { data: hash, isPending, writeContract } = useWriteContract()

    // Wait for transaction confirmation
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    })

    const [isRefreshing, setIsRefreshing] = useState(false)

    // Auto-refresh data every 10 seconds
    useEffect(() => {
        if (!address || !contractsDeployed || chainId !== QIE_TESTNET_CHAIN_ID) return

        const interval = setInterval(() => {
            refetchBalance()
            refetchFaucetBalance()
            refetchCanClaim()
            refetchTimeUntilClaim()
        }, 10000)

        return () => clearInterval(interval)
    }, [address, chainId, contractsDeployed])

    // Handle successful claim
    useEffect(() => {
        if (isSuccess) {
            showNotification('Successfully claimed 100 QTT! 🎉', 'success')
            // Refresh all data
            refetchBalance()
            refetchFaucetBalance()
            refetchCanClaim()
            refetchTimeUntilClaim()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess])

    const handleRefresh = async () => {
        setIsRefreshing(true)
        await Promise.all([
            refetchBalance(),
            refetchFaucetBalance(),
            refetchCanClaim(),
            refetchTimeUntilClaim()
        ])
        setTimeout(() => setIsRefreshing(false), 500)
    }

    const handleClaim = async () => {
        if (!address || !canClaim) return

        try {
            writeContract({
                address: QTT_FAUCET_ADDRESS as `0x${string}`,
                abi: FAUCET_ABI,
                functionName: 'claimTokens',
            })
            showNotification('Transaction submitted! Waiting for confirmation...', 'info')
        } catch (error: any) {
            console.error('Claim error:', error)
            if (error.message?.includes('user rejected')) {
                showNotification('Transaction cancelled', 'info')
            } else {
                showNotification('Failed to claim tokens. Please try again.', 'error')
            }
        }
    }

    // Don't show if not on QIE testnet
    if (chainId !== QIE_TESTNET_CHAIN_ID) {
        return null
    }

    // Show message if contracts not deployed yet
    if (!contractsDeployed) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl"
            >
                <div className="flex items-start gap-3">
                    <AlertCircle size={20} className="text-yellow-400 mt-0.5" />
                    <div>
                        <h3 className="text-white font-semibold mb-1">QTT Faucet Not Deployed</h3>
                        <p className="text-sm text-gray-400">
                            The QTT token faucet hasn't been deployed yet. Please deploy the contracts first.
                        </p>
                    </div>
                </div>
            </motion.div>
        )
    }


    const formattedBalance = formatBalance(balance)
    const formattedFaucetBalance = formatBalance(faucetBalance)
    const claimsRemaining = Number(faucetBalance) / Number(BigInt(100) * BigInt(10 ** 18))

    // Format time remaining
    const formatTimeRemaining = (seconds: bigint | number) => {
        const secs = typeof seconds === 'bigint' ? Number(seconds) : seconds
        if (secs === 0) return "Ready to claim!"
        const hours = Math.floor(secs / 3600)
        const minutes = Math.floor((secs % 3600) / 60)
        return `${hours}h ${minutes}m remaining`
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl space-y-4"
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Droplet size={20} className="text-green-400" />
                    <h3 className="text-white font-semibold">QTT Test Tokens</h3>
                </div>
                <button
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
                    title="Refresh"
                >
                    <RefreshCw
                        size={16}
                        className={`text-gray-400 ${isRefreshing ? 'animate-spin' : ''}`}
                    />
                </button>
            </div>

            {/* Balance Display */}
            <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-white/5 rounded-lg">
                    <p className="text-xs text-gray-400 mb-1">Your Balance</p>
                    <p className="text-xl font-bold gradient-text">{formattedBalance}</p>
                    <p className="text-xs text-gray-500">QTT</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                    <p className="text-xs text-gray-400 mb-1">Faucet Balance</p>
                    <p className="text-xl font-bold text-green-400">{formattedFaucetBalance}</p>
                    <p className="text-xs text-gray-500">{Math.floor(claimsRemaining)} claims left</p>
                </div>
            </div>

            {/* Status */}
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${canClaim
                ? 'bg-green-500/10 border border-green-500/30'
                : 'bg-orange-500/10 border border-orange-500/30'
                }`}>
                {canClaim ? (
                    <>
                        <CheckCircle size={16} className="text-green-400" />
                        <span className="text-sm text-green-400 font-medium">
                            Ready to claim 100 QTT!
                        </span>
                    </>
                ) : (
                    <>
                        <Clock size={16} className="text-orange-400" />
                        <span className="text-sm text-orange-400 font-medium">
                            {formatTimeRemaining(timeUntilClaim)}
                        </span>
                    </>
                )}
            </div>

            {/* Claim Button */}
            <button
                onClick={handleClaim}
                disabled={!canClaim || isPending || isConfirming}
                className="w-full flex items-center justify-center gap-2 px-4 py-3
          bg-gradient-to-r from-green-600 to-emerald-600
          hover:from-green-700 hover:to-emerald-700
          text-white font-semibold rounded-lg
          transition-all duration-300
          disabled:opacity-50 disabled:cursor-not-allowed
          shadow-lg hover:shadow-xl"
            >
                {(isPending || isConfirming) ? (
                    <>
                        <RefreshCw size={18} className="animate-spin" />
                        {isPending ? 'Confirm in Wallet...' : 'Claiming...'}
                    </>
                ) : (
                    <>
                        <Droplet size={18} />
                        Claim 100 QTT Tokens
                    </>
                )}
            </button>

            {/* Add to Wallet */}
            <TokenImporter
                tokenAddress={QTT_TOKEN_ADDRESS}
                tokenSymbol="QTT"
                tokenDecimals={18}
                tokenName="QuickTestToken"
            />

            {/* Info */}
            <div className="text-xs text-gray-400 space-y-1">
                <p>• Get 100 QTT tokens per claim</p>
                <p>• 24-hour cooldown between claims</p>
                <p>• Use QTT for testing trades on TokeDex</p>
            </div>

            {/* Explorer Link */}
            <a
                href={`https://testnet.qie.digital/address/${QTT_TOKEN_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors"
            >
                View QTT Token on Explorer
                <ExternalLink size={12} />
            </a>
        </motion.div>
    )
}
