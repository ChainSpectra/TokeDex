import { useReadContract } from 'wagmi'
import { SIMPLE_DEX_ADDRESS, SIMPLE_DEX_ABI } from '../config/networkConstants'
import { AlertCircle, Loader2, Database } from 'lucide-react'
import PoolCard from './PoolCard'

interface PoolsExplorerProps {
    onSelectPool: (tokenA: string, tokenB: string, tab: 'swap' | 'liquidity') => void
}

export default function PoolsExplorer({ onSelectPool }: PoolsExplorerProps) {

    // Fetch all pool IDs
    const { data: poolIds, isLoading, error } = useReadContract({
        address: SIMPLE_DEX_ADDRESS,
        abi: SIMPLE_DEX_ABI,
        functionName: 'getAllPoolIds'
    })

    // Fetch pool count for display
    const { data: poolCount } = useReadContract({
        address: SIMPLE_DEX_ADDRESS,
        abi: SIMPLE_DEX_ABI,
        functionName: 'getPoolCount'
    })

    if (isLoading) {
        return (
            <div className="text-center py-12">
                <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
                <p className="text-gray-400">Loading pools...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Error Loading Pools</h3>
                <p className="text-gray-400">{error.message}</p>
            </div>
        )
    }

    if (!poolIds || poolIds.length === 0) {
        return (
            <div className="text-center py-12">
                <Database className="w-20 h-20 text-gray-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-3">No Pools Yet</h3>
                <p className="text-gray-400 mb-6">
                    Be the first to create a liquidity pool!
                </p>
                <button
                    onClick={() => onSelectPool('', '', 'liquidity')}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-semibold inline-flex items-center gap-2 transition-all"
                >
                    Create First Pool
                </button>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold mb-2">Available Pools</h2>
                    <p className="text-gray-400">
                        Discover and trade on {poolCount?.toString() || poolIds.length} liquidity pools
                    </p>
                </div>
                <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg px-4 py-2">
                    <p className="text-sm text-gray-400">Total Pools</p>
                    <p className="text-2xl font-bold text-purple-400">{poolIds.length}</p>
                </div>
            </div>

            {/* Pool Grid */}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {poolIds.map((poolId) => (
                    <PoolInfo
                        key={poolId}
                        poolId={poolId}
                        onTrade={(tokenA, tokenB) => onSelectPool(tokenA, tokenB, 'swap')}
                        onAddLiquidity={(tokenA, tokenB) => onSelectPool(tokenA, tokenB, 'liquidity')}
                    />
                ))}
            </div>
        </div>
    )
}

// Sub-component to fetch and display individual pool info
function PoolInfo({
    poolId,
    onTrade,
    onAddLiquidity
}: {
    poolId: string
    onTrade: (tokenA: string, tokenB: string) => void
    onAddLiquidity: (tokenA: string, tokenB: string) => void
}) {
    const { data: poolInfo } = useReadContract({
        address: SIMPLE_DEX_ADDRESS,
        abi: SIMPLE_DEX_ABI,
        functionName: 'getPoolInfo',
        args: [poolId as `0x${string}`]
    })

    if (!poolInfo || !poolInfo[5]) {
        // Pool doesn't exist or data not loaded
        return null
    }

    const [tokenA, tokenB, reserveA, reserveB, totalLiquidity] = poolInfo

    return (
        <PoolCard
            poolId={poolId}
            tokenA={tokenA}
            tokenB={tokenB}
            reserveA={reserveA}
            reserveB={reserveB}
            totalLiquidity={totalLiquidity}
            onTrade={() => onTrade(tokenA, tokenB)}
            onAddLiquidity={() => onAddLiquidity(tokenA, tokenB)}
        />
    )
}
