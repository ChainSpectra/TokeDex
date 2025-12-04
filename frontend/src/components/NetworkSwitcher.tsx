import { useState } from 'react'
import { useChainId, useSwitchChain } from 'wagmi'
import { AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { QIE_TESTNET_CHAIN_ID } from '../config/networkConstants'
import { getNetworkName, switchToQIENetwork, showNotification } from '../utils/walletUtils'

export function NetworkSwitcher() {
    const chainId = useChainId()
    const { switchChain } = useSwitchChain()
    const [isSwitching, setIsSwitching] = useState(false)

    const isWrongNetwork = chainId !== QIE_TESTNET_CHAIN_ID
    const currentNetworkName = getNetworkName(chainId)

    const handleSwitchNetwork = async () => {
        setIsSwitching(true)
        try {
            // Try using wagmi's switchChain first
            if (switchChain) {
                await switchChain({ chainId: QIE_TESTNET_CHAIN_ID })
            } else {
                // Fallback to direct wallet interaction
                await switchToQIENetwork()
            }
            showNotification('Successfully switched to QIE Testnet!', 'success')
        } catch (error: any) {
            console.error('Network switch error:', error)
            if (error.message?.includes('rejected')) {
                showNotification('Network switch cancelled', 'info')
            } else {
                showNotification('Failed to switch network. Please try manually.', 'error')
            }
        } finally {
            setIsSwitching(false)
        }
    }

    // Don't show anything if on correct network
    if (!isWrongNetwork) {
        return (
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-lg"
            >
                <CheckCircle size={18} className="text-green-400" />
                <span className="text-sm text-green-400 font-medium">
                    Connected to QIE Testnet
                </span>
            </motion.div>
        )
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl"
            >
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                        <AlertTriangle size={24} className="text-orange-400" />
                    </div>

                    <div className="flex-1 space-y-3">
                        <div>
                            <h3 className="text-white font-semibold text-base mb-1">
                                Wrong Network Detected
                            </h3>
                            <p className="text-gray-400 text-sm">
                                You're currently connected to <span className="text-orange-400 font-medium">{currentNetworkName}</span>.
                                Please switch to <span className="text-green-400 font-medium">QIE Testnet</span> to use TokeDex.
                            </p>
                        </div>

                        <button
                            onClick={handleSwitchNetwork}
                            disabled={isSwitching}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 
                bg-gradient-to-r from-primary-cyan to-primary-purple
                hover:from-primary-cyan/90 hover:to-primary-purple/90
                text-white font-semibold rounded-lg
                transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed
                shadow-lg hover:shadow-xl"
                        >
                            {isSwitching ? (
                                <>
                                    <RefreshCw size={18} className="animate-spin" />
                                    Switching Network...
                                </>
                            ) : (
                                <>
                                    <RefreshCw size={18} />
                                    Switch to QIE Testnet
                                </>
                            )}
                        </button>

                        <p className="text-xs text-gray-500 text-center">
                            If QIE Testnet is not in your wallet, it will be added automatically
                        </p>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
