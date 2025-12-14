import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt, usePublicClient } from 'wagmi'

import { TOKEN_FACTORY_ADDRESS, TOKEN_FACTORY_ABI, QIE_TESTNET_EXPLORER } from '../config/networkConstants'
import { CheckCircle, Loader2, AlertCircle, ExternalLink } from 'lucide-react'

interface TokenParams {
    name: string
    symbol: string
    initialSupply: string
    decimals: number
}

export default function DirectTokenCreator() {
    const { isConnected } = useAccount()
    const publicClient = usePublicClient()

    const [tokenParams, setTokenParams] = useState<TokenParams>({
        name: '',
        symbol: '',
        initialSupply: '1000000',
        decimals: 18
    })

    const [createdTokenAddress, setCreatedTokenAddress] = useState<string>('')
    const [error, setError] = useState<string>('')

    const { data: hash, isPending, writeContract, reset } = useWriteContract()

    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    })

    const handleCreateToken = async () => {
        if (!isConnected) {
            setError('Please connect your wallet first')
            return
        }

        if (!tokenParams.name || !tokenParams.symbol || !tokenParams.initialSupply) {
            setError('Please fill in all fields')
            return
        }

        try {
            setError('')
            writeContract({
                address: TOKEN_FACTORY_ADDRESS,
                abi: TOKEN_FACTORY_ABI,
                functionName: 'createToken',
                args: [
                    tokenParams.name,
                    tokenParams.symbol,
                    BigInt(tokenParams.initialSupply),
                    tokenParams.decimals
                ]
            })
        } catch (err: any) {
            setError(err.message || 'Failed to create token')
        }
    }

    // When transaction is confirmed, get the token address from event
    const getCreatedTokenAddress = async () => {
        if (!hash || !publicClient) return

        try {
            const receipt = await publicClient.getTransactionReceipt({ hash })

            // Find TokenCreated event
            const tokenCreatedLog = receipt.logs.find(log => {
                try {
                    // Check if this is our factory contract
                    return log.address.toLowerCase() === TOKEN_FACTORY_ADDRESS.toLowerCase()
                } catch {
                    return false
                }
            })

            if (tokenCreatedLog && tokenCreatedLog.topics[1]) {
                // The token address is the first indexed parameter (topics[1])
                const tokenAddress = '0x' + tokenCreatedLog.topics[1].slice(26)
                setCreatedTokenAddress(tokenAddress)
            }
        } catch (err) {
            console.error('Error getting token address:', err)
        }
    }

    // Auto-fetch token address when transaction succeeds
    if (isSuccess && hash && !createdTokenAddress) {
        getCreatedTokenAddress()
    }

    const handleReset = () => {
        reset()
        setCreatedTokenAddress('')
        setError('')
        setTokenParams({
            name: '',
            symbol: '',
            initialSupply: '1000000',
            decimals: 18
        })
    }

    if (!isConnected) {
        return (
            <div className="text-center py-12">
                <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Wallet Not Connected</h3>
                <p className="text-gray-400">Please connect your wallet to create tokens</p>
            </div>
        )
    }

    const handleAddToWallet = async () => {
        if (!createdTokenAddress) return

        try {
            const wasAdded = await window.ethereum?.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20',
                    options: {
                        address: createdTokenAddress,
                        symbol: tokenParams.symbol,
                        decimals: tokenParams.decimals,
                    },
                },
            })

            if (wasAdded) {
                console.log('Token added to wallet!')
            }
        } catch (error) {
            console.error('Error adding token to wallet:', error)
        }
    }

    if (isSuccess && createdTokenAddress) {
        return (
            <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Token Created Successfully!</h3>
                <p className="text-gray-400 mb-6">Your token has been deployed to QIE Testnet</p>

                <div className="bg-gray-800/50 rounded-lg p-6 mb-6 max-w-2xl mx-auto">
                    <div className="grid gap-4 text-left">
                        <div>
                            <label className="text-sm text-gray-400">Token Name</label>
                            <p className="text-lg font-semibold">{tokenParams.name}</p>
                        </div>
                        <div>
                            <label className="text-sm text-gray-400">Symbol</label>
                            <p className="text-lg font-semibold">{tokenParams.symbol}</p>
                        </div>
                        <div>
                            <label className="text-sm text-gray-400">Initial Supply</label>
                            <p className="text-lg font-semibold">{tokenParams.initialSupply} tokens</p>
                        </div>
                        <div>
                            <label className="text-sm text-gray-400">Token Contract Address</label>
                            <p className="text-sm font-mono bg-gray-900 p-2 rounded break-all">
                                {createdTokenAddress}
                            </p>
                            <a
                                href={`${QIE_TESTNET_EXPLORER}/address/${createdTokenAddress}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-400 hover:text-purple-300 text-sm inline-flex items-center gap-1 mt-2"
                            >
                                View on Explorer <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Important Notice */}
                    <div className="mt-4 bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4">
                        <p className="text-yellow-400 text-sm font-semibold mb-2">⚠️ Token Not Visible?</p>
                        <p className="text-yellow-300/80 text-xs">
                            Custom tokens don't automatically appear in your wallet. Click "Add to Wallet" below to import your {tokenParams.symbol} tokens.
                        </p>
                    </div>
                </div>

                <div className="flex gap-4 justify-center">
                    <button
                        onClick={handleAddToWallet}
                        className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
                    >
                        <span>➕</span> Add to Wallet
                    </button>
                    <button
                        onClick={handleReset}
                        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors"
                    >
                        Create Another Token
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-2 text-center">Create Your Token</h2>
            <p className="text-gray-400 mb-4 text-center">
                Deploy your own ERC20 token on QIE Testnet in seconds
            </p>

            {/* Info Banner */}
            <div className="mb-6 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-300 text-sm">
                    💡 <strong>Note:</strong> The "100 QieTestnet" tokens you see are QIE (gas tokens).
                    Your custom token (like TDX) will appear after you <strong>add it to your wallet</strong> using the button after creation.
                </p>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-6 space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-2">Token Name</label>
                    <input
                        type="text"
                        value={tokenParams.name}
                        onChange={(e) => setTokenParams({ ...tokenParams, name: e.target.value })}
                        placeholder="e.g., My Business Token"
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
                        disabled={isPending || isConfirming}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Token Symbol</label>
                    <input
                        type="text"
                        value={tokenParams.symbol}
                        onChange={(e) => setTokenParams({ ...tokenParams, symbol: e.target.value.toUpperCase() })}
                        placeholder="e.g., MBT"
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
                        disabled={isPending || isConfirming}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Initial Supply</label>
                    <input
                        type="number"
                        value={tokenParams.initialSupply}
                        onChange={(e) => setTokenParams({ ...tokenParams, initialSupply: e.target.value })}
                        placeholder="e.g., 1000000"
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
                        disabled={isPending || isConfirming}
                    />
                    <p className="text-sm text-gray-400 mt-1">
                        Total supply that will be minted to your wallet
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Decimals</label>
                    <select
                        value={tokenParams.decimals}
                        onChange={(e) => setTokenParams({ ...tokenParams, decimals: parseInt(e.target.value) })}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
                        disabled={isPending || isConfirming}
                    >
                        <option value={18}>18 (Standard)</option>
                        <option value={6}>6 (USDC-style)</option>
                        <option value={8}>8 (Bitcoin-style)</option>
                        <option value={0}>0 (Whole numbers only)</option>
                    </select>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <p className="text-red-400 text-sm">{error}</p>
                    </div>
                )}

                {hash && (
                    <div className="bg-blue-500/10 border border-blue-500/50 rounded-lg p-4">
                        <p className="text-sm text-gray-400 mb-2">Transaction Hash:</p>
                        <p className="text-xs font-mono break-all text-blue-400">{hash}</p>
                        <a
                            href={`${QIE_TESTNET_EXPLORER}/tx/${hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 text-sm inline-flex items-center gap-1 mt-2"
                        >
                            View on Explorer <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                )}

                <button
                    onClick={handleCreateToken}
                    disabled={isPending || isConfirming}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                    {isPending && (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Confirm in Wallet...
                        </>
                    )}
                    {isConfirming && (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Creating Token...
                        </>
                    )}
                    {!isPending && !isConfirming && 'Create Token'}
                </button>

                <p className="text-xs text-gray-500 text-center">
                    Gas fees will be paid in QIE. Make sure you have enough QIE in your wallet.
                </p>
            </div>
        </div>
    )
}
