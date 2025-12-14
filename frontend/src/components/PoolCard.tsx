import { formatUnits } from 'viem'
import { useReadContract } from 'wagmi'
import { Coins, TrendingUp, Plus, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

const ERC20_ABI = [
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
    }
] as const

interface PoolCardProps {
    poolId: string
    tokenA: string
    tokenB: string
    reserveA: bigint
    reserveB: bigint
    totalLiquidity: bigint
    onTrade: () => void
    onAddLiquidity: () => void
}

export default function PoolCard({
    tokenA,
    tokenB,
    reserveA,
    reserveB,
    totalLiquidity,
    onTrade,
    onAddLiquidity
}: PoolCardProps) {

    // Fetch token A symbol
    const { data: symbolA, isLoading: loadingSymbolA } = useReadContract({
        address: tokenA as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'symbol'
    })

    // Fetch token B symbol
    const { data: symbolB, isLoading: loadingSymbolB } = useReadContract({
        address: tokenB as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'symbol'
    })

    // Fetch decimals (assuming 18 for simplicity, can be fetched if needed)
    const decimals = 18

    // Calculate price ratio
    const priceRatio = reserveA > 0n && reserveB > 0n
        ? (Number(formatUnits(reserveB, decimals)) / Number(formatUnits(reserveA, decimals))).toFixed(4)
        : '0'

    const isLoading = loadingSymbolA || loadingSymbolB

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/10"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg p-3">
                        <Coins className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin inline" />
                            ) : (
                                `${symbolA || 'Token A'} / ${symbolB || 'Token B'}`
                            )}
                        </h3>
                        <p className="text-xs text-gray-400">Liquidity Pool</p>
                    </div>
                </div>
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                    Active
                </span>
            </div>

            {/* Reserves */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-900/50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-1">Reserve {symbolA || 'A'}</p>
                    <p className="text-lg font-bold">
                        {Number(formatUnits(reserveA, decimals)).toLocaleString(undefined, {
                            maximumFractionDigits: 2
                        })}
                    </p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-1">Reserve {symbolB || 'B'}</p>
                    <p className="text-lg font-bold">
                        {Number(formatUnits(reserveB, decimals)).toLocaleString(undefined, {
                            maximumFractionDigits: 2
                        })}
                    </p>
                </div>
            </div>

            {/* Price */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 mb-3">
                <p className="text-xs text-gray-400 mb-1">Current Price</p>
                <p className="text-sm font-semibold text-blue-400">
                    1 {symbolA || 'A'} = {priceRatio} {symbolB || 'B'}
                </p>
            </div>

            {/* Liquidity */}
            <div className="bg-gray-900/50 rounded-lg p-3 mb-4">
                <p className="text-xs text-gray-400 mb-1">Total Liquidity</p>
                <p className="text-sm font-semibold">
                    {Number(formatUnits(totalLiquidity, decimals)).toLocaleString(undefined, {
                        maximumFractionDigits: 2
                    })} LP
                </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
                <button
                    onClick={onTrade}
                    className="py-2.5 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-semibold transition-all hover:scale-105 inline-flex items-center justify-center gap-1"
                >
                    <TrendingUp className="w-4 h-4" />
                    Trade
                </button>
                <button
                    onClick={onAddLiquidity}
                    className="py-2.5 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-semibold transition-all hover:scale-105 inline-flex items-center justify-center gap-1"
                >
                    <Plus className="w-4 h-4" />
                    Add Liquidity
                </button>
            </div>
        </motion.div>
    )
}
