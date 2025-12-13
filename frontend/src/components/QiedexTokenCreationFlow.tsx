import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, ArrowRight, AlertCircle } from 'lucide-react'
import { redirectToQiedexTokenCreator, getQiedexInstructions } from '../utils/qiedexLinks'
import { TokenImporter } from './TokenImporter'
import { showNotification } from '../utils/walletUtils'

interface QiedexTokenCreationFlowProps {
    onTokenCreated?: (tokenData: { address: string; name: string; symbol: string; decimals: number }) => void
}

export function QiedexTokenCreationFlow({ onTokenCreated }: QiedexTokenCreationFlowProps) {
    const [step, setStep] = React.useState<'collect' | 'instructions' | 'import'>('collect')
    const [tokenCreationData, setTokenCreationData] = React.useState({
        name: '',
        symbol: '',
        initialSupply: '1000000',
        decimals: 18,
        description: '',
    })
    const [importedTokenAddress, setImportedTokenAddress] = React.useState('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setTokenCreationData((prev) => ({
            ...prev,
            [name]: name === 'decimals' ? parseInt(value) || 0 : value,
        }))
    }

    const handleRedirectToQiedex = () => {
        if (!tokenCreationData.name.trim()) {
            showNotification('Please enter a token name', 'error')
            return
        }
        if (!tokenCreationData.symbol.trim()) {
            showNotification('Please enter a token symbol', 'error')
            return
        }

        // Redirect to Qiedex
        redirectToQiedexTokenCreator(tokenCreationData)
        setStep('instructions')
        showNotification('Redirecting to Qiedex token creator...', 'info')
    }

    const handleTokenImported = (tokenData: {
        address: string
        name: string
        symbol: string
        decimals: number
    }) => {
        onTokenCreated?.(tokenData)
        setImportedTokenAddress(tokenData.address)
        showNotification(`Token ${tokenData.symbol} successfully imported!`, 'success')
        // Reset flow
        setTimeout(() => {
            setStep('collect')
            setTokenCreationData({
                name: '',
                symbol: '',
                initialSupply: '1000000',
                decimals: 18,
                description: '',
            })
            setImportedTokenAddress('')
        }, 2000)
    }

    return (
        <div className="w-full max-w-2xl mx-auto p-6">
            {/* Step 1: Collect Token Data */}
            {step === 'collect' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6 bg-gray-900/50 rounded-xl border border-purple-500/20 p-6"
                >
                    <h2 className="text-2xl font-bold text-white mb-4">Create a Custom Token</h2>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Token Name *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={tokenCreationData.name}
                            onChange={handleInputChange}
                            placeholder="e.g., My Business Token"
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg
                    text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Token Symbol (Ticker) *
                        </label>
                        <input
                            type="text"
                            name="symbol"
                            value={tokenCreationData.symbol}
                            onChange={handleInputChange}
                            placeholder="e.g., MBT"
                            maxLength={6}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg
                    text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Initial Supply
                            </label>
                            <input
                                type="number"
                                name="initialSupply"
                                value={tokenCreationData.initialSupply}
                                onChange={handleInputChange}
                                placeholder="1000000"
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg
                        text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Decimals
                            </label>
                            <input
                                type="number"
                                name="decimals"
                                value={tokenCreationData.decimals}
                                onChange={handleInputChange}
                                min="0"
                                max="18"
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg
                        text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Description (Optional)
                        </label>
                        <textarea
                            name="description"
                            value={tokenCreationData.description}
                            onChange={handleInputChange}
                            placeholder="Describe your token..."
                            rows={3}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg
                    text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
                        />
                    </div>

                    <motion.button
                        onClick={handleRedirectToQiedex}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600
                    hover:from-purple-500 hover:to-blue-500
                    text-white font-semibold rounded-lg transition-all duration-300
                    flex items-center justify-center gap-2"
                    >
                        Create Token on Qiedex
                        <ExternalLink size={18} />
                    </motion.button>

                    <p className="text-xs text-gray-400 text-center">
                        You will be redirected to Qiedex to complete token creation. Return here to import your
                        token.
                    </p>
                </motion.div>
            )}

            {/* Step 2: Instructions */}
            {step === 'instructions' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4 bg-blue-900/20 rounded-xl border border-blue-500/30 p-6"
                >
                    <div className="flex gap-3">
                        <AlertCircle className="text-blue-400 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="text-lg font-semibold text-blue-400 mb-3">
                                Next Steps: Create Your Token on Qiedex
                            </h3>
                            <pre className="text-sm text-gray-300 whitespace-pre-wrap bg-gray-900/50 p-4 rounded-lg overflow-auto max-h-64">
                                {getQiedexInstructions()}
                            </pre>
                        </div>
                    </div>

                    <motion.button
                        onClick={() => setStep('import')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600
                    hover:from-green-500 hover:to-emerald-500
                    text-white font-semibold rounded-lg transition-all duration-300
                    flex items-center justify-center gap-2 mt-6"
                    >
                        I've Created My Token, Let Me Import It
                        <ArrowRight size={18} />
                    </motion.button>
                </motion.div>
            )}

            {/* Step 3: Import Token */}
            {step === 'import' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6 bg-gray-900/50 rounded-xl border border-green-500/20 p-6"
                >
                    <h2 className="text-2xl font-bold text-white">Import Your Created Token</h2>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Token Contract Address *
                        </label>
                        <input
                            type="text"
                            value={importedTokenAddress}
                            onChange={(e) => setImportedTokenAddress(e.target.value)}
                            placeholder="0x..."
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg
                    text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
                        />
                        <p className="text-xs text-gray-400 mt-2">
                            Paste the contract address from Qiedex token creation confirmation
                        </p>
                    </div>

                    {importedTokenAddress && importedTokenAddress.startsWith('0x') && (
                        <TokenImporter
                            tokenAddress={importedTokenAddress}
                            onTokenImported={handleTokenImported}
                        />
                    )}

                    <motion.button
                        onClick={() => setStep('collect')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 bg-gray-700 hover:bg-gray-600
                    text-white font-semibold rounded-lg transition-all duration-300"
                    >
                        Create Another Token
                    </motion.button>
                </motion.div>
            )}
        </div>
    )
}
