import { useState } from 'react'
import { useAccount, useBalance, useChainId } from 'wagmi'
import { ExternalLink, RefreshCw, Droplet, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { QIE_FAUCET_URL, QIE_TESTNET_CHAIN_ID } from '../config/networkConstants'
import { formatBalance, hasSufficientBalance } from '../utils/walletUtils'

export function QIEFaucet() {
    const { address } = useAccount()
    const chainId = useChainId()
    const { data: balance, refetch, isLoading } = useBalance({
        address,
        chainId: QIE_TESTNET_CHAIN_ID,
    })

    const [isRefreshing, setIsRefreshing] = useState(false)

    const handleRefresh = async () => {
        setIsRefreshing(true)
        await refetch()
        setTimeout(() => setIsRefreshing(false), 500)
    }

    const handleOpenFaucet = () => {
        // Open faucet in new tab, optionally with pre-filled address
        const faucetUrl = address
            ? `${QIE_FAUCET_URL}?address=${address}`
            : QIE_FAUCET_URL
        window.open(faucetUrl, '_blank', 'noopener,noreferrer')
    }

    // Don't show if not on QIE testnet
    if (chainId !== QIE_TESTNET_CHAIN_ID) {
        return null
    }

    const balanceValue = balance?.value
    const formattedBalance = formatBalance(balanceValue)
    const isSufficient = hasSufficientBalance(balanceValue, 0.1)
    const isLow = balanceValue && !isSufficient && parseFloat(formatBalance(balanceValue)) > 0

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl space-y-4"
        >
            {/* Balance Display */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Droplet size={20} className="text-purple-400" />
                        <h3 className="text-white font-semibold">QIE Balance</h3>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-3xl font-bold gradient-text">
                            {isLoading ? '...' : formattedBalance}
                        </span>
                        <span className="text-gray-400 text-sm">QIE</span>
                    </div>
                </div>

                <button
                    onClick={handleRefresh}
                    disabled={isRefreshing || isLoading}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
                    title="Refresh balance"
                >
                    <RefreshCw
                        size={20}
                        className={`text-gray-400 ${isRefreshing ? 'animate-spin' : ''}`}
                    />
                </button>
            </div>

            {/* Status Indicator */}
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isSufficient
                ? 'bg-green-500/10 border border-green-500/30'
                : isLow
                    ? 'bg-yellow-500/10 border border-yellow-500/30'
                    : 'bg-red-500/10 border border-red-500/30'
                }`}>
                {isSufficient ? (
                    <>
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-sm text-green-400 font-medium">
                            ✓ Sufficient for transactions
                        </span>
                    </>
                ) : isLow ? (
                    <>
                        <AlertCircle size={16} className="text-yellow-400" />
                        <span className="text-sm text-yellow-400 font-medium">
                            Low balance - Consider getting more QIE
                        </span>
                    </>
                ) : (
                    <>
                        <AlertCircle size={16} className="text-red-400" />
                        <span className="text-sm text-red-400 font-medium">
                            No QIE - Claim from faucet to start
                        </span>
                    </>
                )}
            </div>

            {/* Faucet Information */}
            <div className="space-y-3 pt-2">
                <div className="text-sm text-gray-400">
                    <p className="mb-2">Need QIE tokens for testing?</p>
                    <ul className="space-y-1 text-xs text-gray-500">
                        <li>• Get 2 QIE tokens per wallet</li>
                        <li>• 24-hour cooldown between claims</li>
                        <li>• Used for gas fees on QIE Testnet</li>
                    </ul>
                </div>

                <button
                    onClick={handleOpenFaucet}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3
            bg-gradient-to-r from-purple-600 to-blue-600
            hover:from-purple-700 hover:to-blue-700
            text-white font-semibold rounded-lg
            transition-all duration-300
            shadow-lg hover:shadow-xl"
                >
                    <Droplet size={18} />
                    Get Test QIE Tokens
                    <ExternalLink size={16} />
                </button>

                <p className="text-xs text-center text-gray-500">
                    Opens official QIE testnet faucet in new tab
                </p>
            </div>
        </motion.div>
    )
}
