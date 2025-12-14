import { useState } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { Image as ImageIcon, Loader2, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react'
import { ASSET_NFT_ADDRESS } from '../config/networkConstants'
import { ASSET_NFT_ABI } from '../config/assetNFT_ABI'
import { getIPFSUrl } from '../utils/ipfsClient'
import { formatUnits } from 'viem'

interface AssetNFTCardProps {
    tokenId: number
}

function AssetNFTCard({ tokenId }: AssetNFTCardProps) {
    const { address } = useAccount()

    // Fetch asset metadata
    const { data: metadata, isLoading } = useReadContract({
        address: ASSET_NFT_ADDRESS,
        abi: ASSET_NFT_ABI,
        functionName: 'getAssetMetadata',
        args: [BigInt(tokenId)]
    })

    // Fetch owner
    const { data: owner } = useReadContract({
        address: ASSET_NFT_ADDRESS,
        abi: ASSET_NFT_ABI,
        functionName: 'ownerOf',
        args: [BigInt(tokenId)]
    })

    if (isLoading) {
        return (
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
            </div>
        )
    }

    if (!metadata) return null

    const [name, description, assetType, imageHashes, , , appraisalValue, , isVerified] = metadata as any[]
    const firstImageHash = imageHashes[0]
    const isOwner = owner?.toLowerCase() === address?.toLowerCase()

    return (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/10">
            {/* Image */}
            <div className="relative h-64 bg-gray-900">
                {firstImageHash ? (
                    <img
                        src={getIPFSUrl(firstImageHash)}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-16 h-16 text-gray-600" />
                    </div>
                )}

                {/* Badges */}
                <div className="absolute top-3 right-3 flex gap-2">
                    {isVerified && (
                        <div className="bg-green-500/90 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Verified
                        </div>
                    )}
                    {isOwner && (
                        <div className="bg-purple-500/90 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            You Own This
                        </div>
                    )}
                </div>

                {/* Asset Type Badge */}
                <div className="absolute bottom-3 left-3">
                    <div className="bg-black/70 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {assetType}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                    <div>
                        <h3 className="text-xl font-bold mb-1">{name}</h3>
                        <p className="text-sm text-gray-400">Token ID: #{tokenId}</p>
                    </div>
                </div>

                <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                    {description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-900/50 rounded-lg p-3">
                        <p className="text-xs text-gray-400 mb-1">Appraisal Value</p>
                        <p className="text-lg font-bold">
                            ${Number(formatUnits(appraisalValue, 18)).toLocaleString()}
                        </p>
                    </div>
                    <div className="bg-gray-900/50 rounded-lg p-3">
                        <p className="text-xs text-gray-400 mb-1">Images</p>
                        <p className="text-lg font-bold">{imageHashes.length}</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <a
                        href={`https://testnet.qie.digital/token/${ASSET_NFT_ADDRESS}?a=${tokenId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2"
                    >
                        <ExternalLink className="w-4 h-4" />
                        View on Explorer
                    </a>
                    {isOwner && (
                        <button className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-semibold transition-all">
                            Manage
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default function MyAssets() {
    const { address, isConnected } = useAccount()
    const [filter, setFilter] = useState<'all' | 'owned'>('all')

    // Fetch total supply
    const { data: totalSupply, isLoading: isLoadingSupply } = useReadContract({
        address: ASSET_NFT_ADDRESS,
        abi: ASSET_NFT_ABI,
        functionName: 'totalSupply'
    })

    if (!isConnected) {
        return (
            <div className="max-w-6xl mx-auto p-6">
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-8 text-center">
                    <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Wallet Not Connected</h3>
                    <p className="text-gray-400">
                        Please connect your wallet to view asset NFTs
                    </p>
                </div>
            </div>
        )
    }

    const supply = totalSupply ? Number(totalSupply) : 0

    if (isLoadingSupply) {
        return (
            <div className="max-w-6xl mx-auto p-6">
                <div className="flex items-center justify-center min-h-[400px]">
                    <Loader2 className="w-12 h-12 animate-spin text-purple-400" />
                </div>
            </div>
        )
    }

    if (supply === 0) {
        return (
            <div className="max-w-6xl mx-auto p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">My Asset NFTs</h1>
                    <p className="text-gray-400">Your real-world asset portfolio</p>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-12 text-center">
                    <ImageIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">No Assets Yet</h3>
                    <p className="text-gray-400 mb-6">
                        Start by minting your first asset NFT
                    </p>
                    <a
                        href="#mint-nft"
                        className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-all"
                    >
                        Mint Your First Asset
                    </a>
                </div>
            </div>
        )
    }

    // Generate array of token IDs
    const tokenIds = Array.from({ length: supply }, (_, i) => i)

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">My Asset NFTs</h1>
                <p className="text-gray-400">Your real-world asset portfolio</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6">
                    <p className="text-sm text-gray-400 mb-1">Total Assets</p>
                    <p className="text-3xl font-bold">{supply}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-6">
                    <p className="text-sm text-gray-400 mb-1">Verified Assets</p>
                    <p className="text-3xl font-bold">-</p>
                </div>
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6">
                    <p className="text-sm text-gray-400 mb-1">Total Value</p>
                    <p className="text-3xl font-bold">-</p>
                </div>
            </div>

            {/* Filter */}
            <div className="flex gap-3 mb-6">
                <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${filter === 'all'
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        }`}
                >
                    All Assets ({supply})
                </button>
                <button
                    onClick={() => setFilter('owned')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${filter === 'owned'
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        }`}
                >
                    My Assets
                </button>
            </div>

            {/* NFT Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tokenIds.map((tokenId) => (
                    <AssetNFTCard key={tokenId} tokenId={tokenId} />
                ))}
            </div>
        </div>
    )
}
