import React from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { addTokenToWallet, showNotification } from '../utils/walletUtils'

interface TokenImporterProps {
    tokenAddress: string
    tokenSymbol: string
    tokenDecimals?: number
    tokenImage?: string
    tokenName?: string
}

export function TokenImporter({
    tokenAddress,
    tokenSymbol,
    tokenDecimals = 18,
    tokenImage,
    tokenName,
}: TokenImporterProps) {
    const [isAdding, setIsAdding] = React.useState(false)

    const handleAddToken = async () => {
        setIsAdding(true)
        try {
            await addTokenToWallet(tokenAddress, tokenSymbol, tokenDecimals, tokenImage)
            showNotification(`${tokenSymbol} added to wallet successfully!`, 'success')
        } catch (error: any) {
            console.error('Error adding token:', error)
            if (error.message?.includes('rejected')) {
                showNotification('Token addition cancelled', 'info')
            } else {
                showNotification(`Failed to add ${tokenSymbol} to wallet`, 'error')
            }
        } finally {
            setIsAdding(false)
        }
    }

    return (
        <motion.button
            onClick={handleAddToken}
            disabled={isAdding}
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
            <Plus size={16} />
            {isAdding ? 'Adding...' : `Add ${tokenName || tokenSymbol} to Wallet`}
        </motion.button>
    )
}
