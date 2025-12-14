import { useState, useEffect } from 'react'
import { useAccount, usePublicClient, useReadContract } from 'wagmi'
import { TOKEN_FACTORY_ADDRESS, TOKEN_FACTORY_ABI, QIE_TESTNET_EXPLORER } from '../config/networkConstants'
import { Coins, ExternalLink, Loader2, Plus, TrendingUp, AlertCircle, Copy, Check } from 'lucide-react'
import { formatUnits } from 'viem'
import SimpleDEXInterface from './SimpleDEXInterface'

interface TokenData {
    address: string
    name: string
    symbol: string
    decimals: number
    totalSupply: string
    loading: boolean
}

const ERC20_ABI = [
    {
        "inputs": [],
        "name": "name",
        "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    }
] as const

export default function MyTokensDashboard() {
    const { address, isConnected } = useAccount()
    const publicClient = usePublicClient()
    const [tokens, setTokens] = useState<TokenData[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [selectedToken, setSelectedToken] = useState<string | null>(null)
    const [copiedAddress, setCopiedAddress] = useState<string | null>(null)

    // Fetch token addresses created by user
    const { data: tokenAddresses, isLoading: isLoadingAddresses } = useReadContract({
        address: TOKEN_FACTORY_ADDRESS,
        abi: TOKEN_FACTORY_ABI,
        functionName: 'getTokensByCreator',
        args: address ? [address] : undefined,
        query: {
            enabled: !!address
        }
    })

    // Fetch metadata for each token
    useEffect(() => {
        const fetchTokensMetadata = async () => {
            if (!tokenAddresses || !publicClient || tokenAddresses.length === 0) {
                setTokens([])
                return
            }

            setIsLoading(true)
            const tokensData: TokenData[] = []

            for (const tokenAddress of tokenAddresses) {
                try {
                    const [name, symbol, decimals, totalSupply] = await Promise.all([
                        publicClient.readContract({
                            address: tokenAddress as `0x${string}`,
                            abi: ERC20_ABI,
                            functionName: 'name'
                        }),
                        publicClient.readContract({
                            address: tokenAddress as `0x${string}`,
                            abi: ERC20_ABI,
                            functionName: 'symbol'
                        }),
                        publicClient.readContract({
                            address: tokenAddress as `0x${string}`,
                            abi: ERC20_ABI,
                            functionName: 'decimals'
                        }),
                        publicClient.readContract({
                            address: tokenAddress as `0x${string}`,
                            abi: ERC20_ABI,
                            functionName: 'totalSupply'
                        })
                    ])

                    tokensData.push({
                        address: tokenAddress as string,
                        name: name as string,
                        symbol: symbol as string,
                        decimals: decimals as number,
                        totalSupply: formatUnits(totalSupply as bigint, decimals as number),
                        loading: false
                    })
                } catch (error) {
                    console.error(`Error fetching metadata for ${tokenAddress}:`, error)
                }
            }

            setTokens(tokensData)
            setIsLoading(false)
        }

        fetchTokensMetadata()
    }, [tokenAddresses, publicClient])

    const handleAddToWallet = async (token: TokenData) => {
        try {
            await window.ethereum?.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20',
                    options: {
                        address: token.address,
                        symbol: token.symbol,
                        decimals: token.decimals,
                    },
                },
            })
        } catch (error) {
            console.error('Error adding token to wallet:', error)
        }
    }

    const handleTradeOnQiedex = (tokenAddress: string) => {
        setSelectedToken(tokenAddress)
    }
    
    const handleCopyAddress = (address: string) => {
        navigator.clipboard.writeText(address)
        setCopiedAddress(address)
        setTimeout(() => setCopiedAddress(null), 2000)
    }
    
    if (selectedToken) {
        return (
            <div className="space-y-4">
                <button
                    onClick={() => setSelectedToken(null)}
                    className="sticky top-0 z-50 mb-6 px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 rounded-lg inline-flex items-center gap-2 font-semibold shadow-lg transition-all"
                >
                    ← Back to My Tokens
                </button>
                <SimpleDEXInterface defaultTokenAddress={selectedToken} />
            </div>
        )
    }

    if (!isConnected) {
        return (
            <div className="text-center py-20">
                <Coins className="w-20 h-20 text-gray-600 mx-auto mb-6" />
                <h2 className="text-2xl font-bold mb-3">Connect Your Wallet</h2>
                <p className="text-gray-400">
                    Connect your wallet to view your created tokens
                </p>
            </div>
        )
    }

    if (isLoadingAddresses || isLoading) {
        return (
            <div className="text-center py-20">
                <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
                <p className="text-gray-400">Loading your tokens...</p>
            </div>
        )
    }

    if (!tokens || tokens.length === 0) {
        return (
            <div className="text-center py-20">
                <AlertCircle className="w-20 h-20 text-gray-600 mx-auto mb-6" />
                <h2 className="text-2xl font-bold mb-3">No Tokens Yet</h2>
                <p className="text-gray-400 mb-6">
                    You haven't created any tokens yet. Get started by creating your first token!
                </p>
                <button
                    onClick={() => {
                        const event = new CustomEvent('openTokenCreation')
                        window.dispatchEvent(event)
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-semibold inline-flex items-center gap-2 transition-all"
                >
                    <Plus className="w-5 h-5" />
                    Create Your First Token
                </button>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-bold mb-2">My Tokens</h1>
                    <p className="text-gray-400">
                        Manage all your created tokens in one place
                    </p>
                </div>
                <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg px-4 py-2">
                    <p className="text-sm text-gray-400">Total Tokens</p>
                    <p className="text-2xl font-bold text-purple-400">{tokens.length}</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {tokens.map((token) => (
                    <div
                        key={token.address}
                        className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-purple-500/50 transition-all"
                    >
                        {/* Token Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg p-3">
                                <Coins className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                                Active
                            </span>
                        </div>

                        {/* Token Info */}
                        <h3 className="text-xl font-bold mb-1">{token.symbol}</h3>
                        <p className="text-sm text-gray-400 mb-4">{token.name}</p>

                        {/* Total Supply */}
                        <div className="bg-gray-900/50 rounded-lg p-3 mb-4">
                            <p className="text-xs text-gray-400 mb-1">Total Supply</p>
                            <p className="text-lg font-semibold">
                                {parseFloat(token.totalSupply).toLocaleString()} {token.symbol}
                            </p>
                        </div>

                        {/* Contract Address */}
                        <div className="mb-4">
                            <p className="text-xs text-gray-400 mb-1">Contract Address</p>
                            <div className="flex items-center gap-2">
                                <p className="text-xs font-mono bg-gray-900 p-2 rounded break-all flex-1">
                                    {token.address.slice(0, 10)}...{token.address.slice(-8)}
                                </p>
                                <button
                                    onClick={() => handleCopyAddress(token.address)}
                                    className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex-shrink-0"
                                    title="Copy full address"
                                >
                                    {copiedAddress === token.address ? (
                                        <Check className="w-4 h-4 text-green-400" />
                                    ) : (
                                        <Copy className="w-4 h-4 text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-2">
                            <button
                                onClick={() => handleAddToWallet(token)}
                                className="w-full py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-semibold transition-colors inline-flex items-center justify-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                Add to Wallet
                            </button>
                            
                            <div className="grid grid-cols-2 gap-2">
                                <a
                                    href={`${QIE_TESTNET_EXPLORER}/address/${token.address}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-semibold transition-colors inline-flex items-center justify-center gap-1"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    Explorer
                                </a>
                                
                                <button
                                    onClick={() => handleTradeOnQiedex(token.address)}
                                    className="py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-semibold transition-colors inline-flex items-center justify-center gap-1"
                                >
                                    <TrendingUp className="w-4 h-4" />
                                    Trade
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
