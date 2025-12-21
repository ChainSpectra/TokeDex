import { useState } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseUnits } from 'viem'
import {
    Coins,
    Lock,
    CheckCircle,
    Loader2,
    ExternalLink,
    AlertCircle,
    ArrowRight,
    ArrowLeft
} from 'lucide-react'
import { ASSET_NFT_ADDRESS, FRACTIONAL_VAULT_ADDRESS } from '../config/networkConstants'
import { ASSET_NFT_ABI } from '../config/assetNFT_ABI'
import { FRACTIONAL_VAULT_ABI } from '../config/fractionalVault_ABI'
import { getIPFSUrl } from '../utils/ipfsClient'

interface NFTSelectProps {
    onSelect: (tokenId: number) => void
    selectedTokenId: number | null
}

function NFTSelector({ onSelect, selectedTokenId }: NFTSelectProps) {
    const { address } = useAccount()

    // Fetch total supply
    const { data: totalSupply } = useReadContract({
        address: ASSET_NFT_ADDRESS,
        abi: ASSET_NFT_ABI,
        functionName: 'totalSupply'
    })

    const supply = totalSupply ? Number(totalSupply) : 0
    const tokenIds = Array.from({ length: supply }, (_, i) => i)

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {tokenIds.map((tokenId) => (
                <NFTCard
                    key={tokenId}
                    tokenId={tokenId}
                    isSelected={selectedTokenId === tokenId}
                    onSelect={() => onSelect(tokenId)}
                    userAddress={address}
                />
            ))}
        </div>
    )
}

interface NFTCardProps {
    tokenId: number
    isSelected: boolean
    onSelect: () => void
    userAddress?: string
}

function NFTCard({ tokenId, isSelected, onSelect, userAddress }: NFTCardProps) {
    const { data: metadata } = useReadContract({
        address: ASSET_NFT_ADDRESS,
        abi: ASSET_NFT_ABI,
        functionName: 'getAssetMetadata',
        args: [BigInt(tokenId)]
    })

    const { data: owner } = useReadContract({
        address: ASSET_NFT_ADDRESS,
        abi: ASSET_NFT_ABI,
        functionName: 'ownerOf',
        args: [BigInt(tokenId)]
    })

    // Check if already fractionalized
    const { data: vaultId } = useReadContract({
        address: FRACTIONAL_VAULT_ADDRESS,
        abi: FRACTIONAL_VAULT_ABI,
        functionName: 'getVaultByNFT',
        args: [ASSET_NFT_ADDRESS, BigInt(tokenId)]
    })

    if (!metadata || !Array.isArray(metadata)) return null

    const [name, , assetType, imageHashes] = metadata
    const isOwner = owner?.toLowerCase() === userAddress?.toLowerCase()
    const isFractionalized = vaultId && Number(vaultId) > 0

    if (!isOwner || isFractionalized) return null

    return (
        <button
            onClick={onSelect}
            disabled={isFractionalized}
            className={`relative rounded-lg overflow-hidden border-2 transition-all ${isSelected
                ? 'border-purple-500 shadow-lg shadow-purple-500/50'
                : 'border-gray-700 hover:border-gray-600'
                } ${isFractionalized ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            <div className="aspect-square bg-gray-900">
                {imageHashes?.[0] ? (
                    <img
                        src={getIPFSUrl(imageHashes[0])}
                        alt={name || 'Asset'}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <Coins className="w-12 h-12 text-gray-600" />
                    </div>
                )}
            </div>
            <div className="p-3 bg-gray-800">
                <p className="font-semibold text-sm truncate">{name || 'Unnamed'}</p>
                <p className="text-xs text-gray-400">{assetType || 'Asset'}</p>
                <p className="text-xs text-gray-500">ID: #{tokenId}</p>
            </div>
            {isFractionalized && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                    <p className="text-sm font-semibold">Fractionalized</p>
                </div>
            )}
        </button>
    )
}

export default function FractionalizationUI() {
    const { address } = useAccount()
    const [step, setStep] = useState(1)
    const [selectedTokenId, setSelectedTokenId] = useState<number | null>(null)
    const [formData, setFormData] = useState({
        fractionName: '',
        fractionSymbol: '',
        totalSupply: '100000',
        buyoutPrice: ''
    })

    const { writeContract, data: hash, isPending } = useWriteContract()
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

    // Fetch selected NFT metadata
    const { data: nftMetadata } = useReadContract({
        address: ASSET_NFT_ADDRESS,
        abi: ASSET_NFT_ABI,
        functionName: 'getAssetMetadata',
        args: selectedTokenId !== null ? [BigInt(selectedTokenId)] : undefined,
        query: { enabled: selectedTokenId !== null }
    })

    const handleFractionalize = async () => {
        if (selectedTokenId === null || !address) return

        try {
            await writeContract({
                address: FRACTIONAL_VAULT_ADDRESS,
                abi: FRACTIONAL_VAULT_ABI,
                functionName: 'fractionalizeNFT',
                args: [
                    ASSET_NFT_ADDRESS,
                    BigInt(selectedTokenId),
                    formData.fractionName,
                    formData.fractionSymbol,
                    BigInt(formData.totalSupply),
                    parseUnits(formData.buyoutPrice, 18)
                ]
            })
        } catch (error) {
            console.error('Fractionalization failed:', error)
        }
    }

    const canProceedToStep2 = selectedTokenId !== null
    const canFractionalize = formData.fractionName && formData.fractionSymbol &&
        formData.totalSupply && formData.buyoutPrice

    if (!address) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-8 text-center">
                    <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Wallet Not Connected</h3>
                    <p className="text-gray-400">
                        Please connect your wallet to fractionalize NFTs
                    </p>
                </div>
            </div>
        )
    }

    if (isSuccess) {
        return (
            <div className="max-w-2xl mx-auto p-8 text-center">
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-8">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">NFT Fractionalized Successfully!</h2>
                    <p className="text-gray-400 mb-6">
                        Your NFT has been locked and fraction tokens have been minted
                    </p>
                    <div className="space-y-3">
                        <a
                            href={`https://testnet.qie.digital/tx/${hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300"
                        >
                            View Transaction <ExternalLink className="w-4 h-4" />
                        </a>
                        <div>
                            <button
                                onClick={() => {
                                    setStep(1)
                                    setSelectedTokenId(null)
                                    setFormData({
                                        fractionName: '',
                                        fractionSymbol: '',
                                        totalSupply: '100000',
                                        buyoutPrice: ''
                                    })
                                }}
                                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-all"
                            >
                                Fractionalize Another NFT
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Safely extract NFT metadata
    const nftName = (nftMetadata && Array.isArray(nftMetadata)) ? nftMetadata[0] : ''
    const appraisalValue = (nftMetadata && Array.isArray(nftMetadata)) ? nftMetadata[6] : 0

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Fractionalize Asset NFT</h1>
                <p className="text-gray-400">
                    Convert your NFT into tradeable fraction tokens
                </p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
                {[1, 2].map((s) => (
                    <div key={s} className="flex items-center flex-1">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${step >= s
                            ? 'border-purple-500 bg-purple-500/20 text-purple-400'
                            : 'border-gray-600 text-gray-600'
                            }`}>
                            {s}
                        </div>
                        {s < 2 && (
                            <div className={`flex-1 h-0.5 mx-2 ${step > s ? 'bg-purple-500' : 'bg-gray-700'
                                }`} />
                        )}
                    </div>
                ))}
            </div>

            {/* Step 1: Select NFT */}
            {step === 1 && (
                <div className="space-y-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Coins className="w-6 h-6 text-purple-400" />
                        Select NFT to Fractionalize
                    </h2>

                    <NFTSelector
                        onSelect={setSelectedTokenId}
                        selectedTokenId={selectedTokenId}
                    />

                    {selectedTokenId === null && (
                        <p className="text-sm text-gray-400 text-center py-8">
                            Select an NFT from your collection to fractionalize
                        </p>
                    )}

                    <button
                        onClick={() => setStep(2)}
                        disabled={!canProceedToStep2}
                        className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                    >
                        Next: Configure Fractions <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            )}

            {/* Step 2: Configure Fractions */}
            {step === 2 && (
                <div className="space-y-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Lock className="w-6 h-6 text-purple-400" />
                        Configure Fraction Tokens
                    </h2>

                    {/* Selected NFT Preview */}
                    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                        <p className="text-sm text-gray-400 mb-2">Selected Asset:</p>
                        <p className="font-semibold">{nftName || 'Asset'}</p>
                        <p className="text-sm text-gray-400">
                            Appraisal: ${appraisalValue ? Number(parseUnits(String(appraisalValue), -18)).toLocaleString() : '0'}
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Fraction Token Name *
                        </label>
                        <input
                            type="text"
                            value={formData.fractionName}
                            onChange={(e) => setFormData(prev => ({ ...prev, fractionName: e.target.value }))}
                            placeholder="e.g., Property Shares"
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Fraction Token Symbol *
                        </label>
                        <input
                            type="text"
                            value={formData.fractionSymbol}
                            onChange={(e) => setFormData(prev => ({ ...prev, fractionSymbol: e.target.value.toUpperCase() }))}
                            placeholder="e.g., PROP"
                            maxLength={10}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none uppercase"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Total Supply (Number of Tokens) *
                        </label>
                        <input
                            type="number"
                            value={formData.totalSupply}
                            onChange={(e) => setFormData(prev => ({ ...prev, totalSupply: e.target.value }))}
                            placeholder="100000"
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Recommended: 100,000 - 1,000,000 tokens for better divisibility
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Buyout Price (USD) *
                        </label>
                        <input
                            type="number"
                            value={formData.buyoutPrice}
                            onChange={(e) => setFormData(prev => ({ ...prev, buyoutPrice: e.target.value }))}
                            placeholder="120000"
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Price to buyout all fractions and unlock the NFT
                        </p>
                    </div>

                    {/* Summary */}
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                        <p className="text-sm font-semibold mb-2">Summary:</p>
                        <ul className="text-sm text-gray-300 space-y-1">
                            <li>• You will receive {formData.totalSupply || '0'} {formData.fractionSymbol || 'tokens'}</li>
                            <li>• NFT will be locked in vault</li>
                            <li>• Tokens can be traded on SimpleDEX</li>
                            <li>• Redeem by owning 100% of tokens</li>
                        </ul>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setStep(1)}
                            disabled={isPending || isConfirming}
                            className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                        >
                            <ArrowLeft className="w-5 h-5" /> Back
                        </button>
                        <button
                            onClick={handleFractionalize}
                            disabled={!canFractionalize || isPending || isConfirming}
                            className="flex-1 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                        >
                            {isPending || isConfirming ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    {isPending ? 'Confirm in Wallet...' : 'Fractionalizing...'}
                                </>
                            ) : (
                                <>
                                    <Lock className="w-5 h-5" />
                                    Fractionalize NFT
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
