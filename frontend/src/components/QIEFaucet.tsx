import { ExternalLink, Droplet } from 'lucide-react'
import { motion } from 'framer-motion'
import { useChainId } from 'wagmi'
import { QIE_TESTNET_CHAIN_ID } from '../config/networkConstants'

const QIE_FAUCET_URL = 'https://www.qie.digital/faucet'

export function QIEFaucet() {
    const chainId = useChainId()

    // Only show on QIE Testnet
    if (chainId !== QIE_TESTNET_CHAIN_ID) {
        return null
    }

    const handleOpenFaucet = () => {
        window.open(QIE_FAUCET_URL, '_blank', 'noopener,noreferrer')
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl"
        >
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
                <Droplet size={20} className="text-blue-400" />
                <h3 className="text-white font-semibold">Get QIE Test Tokens</h3>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-400 mb-4">
                You need QIE tokens to pay for gas fees when creating tokens and trading on the DEX.
            </p>

            {/* Faucet Button */}
            <button
                onClick={handleOpenFaucet}
                className="w-full flex items-center justify-center gap-2 px-4 py-3
                    bg-gradient-to-r from-blue-600 to-cyan-600
                    hover:from-blue-700 hover:to-cyan-700
                    text-white font-semibold rounded-lg
                    transition-all duration-300
                    shadow-lg hover:shadow-xl"
            >
                <Droplet size={18} />
                Get QIE Test Tokens
                <ExternalLink size={16} />
            </button>

            {/* Info */}
            <div className="mt-4 text-xs text-gray-400 space-y-1">
                <p>• Free QIE tokens for testing</p>
                <p>• Use for gas fees on QIE Testnet</p>
                <p>• Required for token creation and trading</p>
            </div>
        </motion.div>
    )
}
