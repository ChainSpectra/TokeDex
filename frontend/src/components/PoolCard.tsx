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
            className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 hover:border-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/10"
        >
            {/* Pool Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-4">
                        <Coins className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold">
                            {isLoading ? (
                                <Loader2 className="w-6 h-6 animate-spin inline" />
                            ) : (
                                `${symbolA || 'Token A'} / ${symbolB || 'Token B'}`
                            )}
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">Liquidity Pool</p>
                    </div>
                </div>
                <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1.5 rounded-full font-medium">
                    Active
                </span>
            </div>

            {/* Reserves */}
            <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="bg-gray-900/50 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-2">Reserve {symbolA || 'A'}</p>
                    <p className="text-xl font-bold">
                        {Number(formatUnits(reserveA, decimals)).toLocaleString(undefined, {
                            maximumFractionDigits: 2
                        })}
                    </p>
                </div>
                <div className="bg-gray-900/50 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-2">Reserve {symbolB || 'B'}</p>
                    <p className="text-xl font-bold">
                        {Number(formatUnits(reserveB, decimals)).toLocaleString(undefined, {
                            maximumFractionDigits: 2
                        })}
                    </p>
                </div>
            </div>

            {/* Price Ratio */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-5">
                <p className="text-xs text-gray-400 mb-1.5">Current Price</p>
                <p className="text-base font-bold text-blue-400">
                    1 {symbolA || 'A'} = {priceRatio} {symbolB || 'B'}
                </p>
            </div>

            {/* Total Liquidity */}
            <div className="mb-5">
                <p className="text-xs text-gray-400 mb-1.5">Total Liquidity</p>
                <p className="text-base font-semibold">
                    {Number(formatUnits(totalLiquidity, decimals)).toLocaleString(undefined, {
                        maximumFractionDigits: 2
                    })} LP
                </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
                <button
                    onClick={onTrade}
                    className="py-3 bg-purple-600 hover:bg-purple-700 rounded-xl text-sm font-bold transition-all hover:scale-105 inline-flex items-center justify-center gap-2"
                >
                    <TrendingUp className="w-4 h-4" />
                    Trade
                </button>
                <button
                    onClick={onAddLiquidity}
                    className="py-3 bg-green-600 hover:bg-green-700 rounded-xl text-sm font-bold transition-all hover:scale-105 inline-flex items-center justify-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add Liquidity
                </button>
            </div>
        </motion.div>
    )
}
