import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseUnits } from 'viem'
import {
    Image as ImageIcon,
    FileText,
    Building2,
    CheckCircle,
    ArrowRight,
    ArrowLeft,
    Loader2,
    ExternalLink
} from 'lucide-react'
import { MultiIPFSUploader } from './IPFSUploader'
import { ASSET_NFT_ADDRESS } from '../config/networkConstants'
import { ASSET_NFT_ABI } from '../config/assetNFT_ABI'
import type { IPFSUploadResult } from '../utils/ipfsClient'

interface AssetFormData {
    name: string
    description: string
    assetType: string
    imageHashes: string[]
    documentHashes: string[]
    custodian: string
    appraisalValue: string
}

const ASSET_TYPES = [
    { value: 'Real Estate', icon: '🏠', description: 'Property, land, buildings' },
    { value: 'Art', icon: '🎨', description: 'Paintings, sculptures, collectibles' },
    { value: 'Gold', icon: '💰', description: 'Precious metals, commodities' },
    { value: 'Invoice', icon: '📄', description: 'Business invoices, receivables' },
    { value: 'Vehicle', icon: '🚗', description: 'Cars, boats, aircraft' },
    { value: 'Other', icon: '📦', description: 'Other physical assets' }
]

export default function AssetNFTCreator() {
    const { address } = useAccount()
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState<AssetFormData>({
        name: '',
        description: '',
        assetType: '',
        imageHashes: [],
        documentHashes: [],
        custodian: '',
        appraisalValue: ''
    })

    const { writeContract, data: hash, isPending } = useWriteContract()
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

    const handleImageUploads = (results: IPFSUploadResult[]) => {
        setFormData(prev => ({
            ...prev,
            imageHashes: results.map(r => r.hash)
        }))
    }

    const handleDocumentUploads = (results: IPFSUploadResult[]) => {
        setFormData(prev => ({
            ...prev,
            documentHashes: results.map(r => r.hash)
        }))
    }

    const handleMint = async () => {
        if (!address) return

        try {
            await writeContract({
                address: ASSET_NFT_ADDRESS,
                abi: ASSET_NFT_ABI,
                functionName: 'mintAsset',
                args: [
                    formData.name,
                    formData.description,
                    formData.assetType,
                    formData.imageHashes,
                    formData.documentHashes,
                    (formData.custodian || address) as `0x${string}`,
                    parseUnits(formData.appraisalValue, 18)
                ]
            })
        } catch (error) {
            console.error('Minting failed:', error)
        }
    }

    const canProceedToStep2 = formData.name && formData.assetType && formData.description
    const canProceedToStep3 = formData.imageHashes.length > 0
    const canMint = formData.appraisalValue && parseFloat(formData.appraisalValue) > 0

    if (isSuccess) {
        return (
            <div className="max-w-2xl mx-auto p-8 text-center">
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-8">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Asset NFT Minted Successfully!</h2>
                    <p className="text-gray-400 mb-6">
                        Your real-world asset has been tokenized on the blockchain
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
                                    setFormData({
                                        name: '',
                                        description: '',
                                        assetType: '',
                                        imageHashes: [],
                                        documentHashes: [],
                                        custodian: '',
                                        appraisalValue: ''
                                    })
                                }}
                                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-all"
                            >
                                Mint Another Asset
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Mint Asset NFT</h1>
                <p className="text-gray-400">
                    Tokenize your real-world assets on the blockchain
                </p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
                {[1, 2, 3, 4].map((s) => (
                    <div key={s} className="flex items-center flex-1">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${step >= s
                                ? 'border-purple-500 bg-purple-500/20 text-purple-400'
                                : 'border-gray-600 text-gray-600'
                            }`}>
                            {s}
                        </div>
                        {s < 4 && (
                            <div className={`flex-1 h-0.5 mx-2 ${step > s ? 'bg-purple-500' : 'bg-gray-700'
                                }`} />
                        )}
                    </div>
                ))}
            </div>

            {/* Step 1: Asset Details */}
            {step === 1 && (
                <div className="space-y-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Building2 className="w-6 h-6 text-purple-400" />
                        Asset Details
                    </h2>

                    <div>
                        <label className="block text-sm font-semibold mb-2">Asset Name *</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="e.g., Downtown Property #123"
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">Asset Type *</label>
                        <div className="grid grid-cols-2 gap-3">
                            {ASSET_TYPES.map((type) => (
                                <button
                                    key={type.value}
                                    onClick={() => setFormData(prev => ({ ...prev, assetType: type.value }))}
                                    className={`p-4 rounded-lg border-2 transition-all text-left ${formData.assetType === type.value
                                            ? 'border-purple-500 bg-purple-500/10'
                                            : 'border-gray-700 hover:border-gray-600'
                                        }`}
                                >
                                    <div className="text-2xl mb-1">{type.icon}</div>
                                    <div className="font-semibold">{type.value}</div>
                                    <div className="text-xs text-gray-400">{type.description}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">Description *</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Detailed description of the asset..."
                            rows={4}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none resize-none"
                        />
                    </div>

                    <button
                        onClick={() => setStep(2)}
                        disabled={!canProceedToStep2}
                        className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                    >
                        Next: Upload Images <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            )}

            {/* Step 2: Image Upload */}
            {step === 2 && (
                <div className="space-y-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <ImageIcon className="w-6 h-6 text-purple-400" />
                        Upload Asset Images
                    </h2>

                    <MultiIPFSUploader
                        onUpload={handleImageUploads}
                        maxFiles={5}
                        label="Upload Images (Required)"
                    />

                    <div className="flex gap-3">
                        <button
                            onClick={() => setStep(1)}
                            className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                        >
                            <ArrowLeft className="w-5 h-5" /> Back
                        </button>
                        <button
                            onClick={() => setStep(3)}
                            disabled={!canProceedToStep3}
                            className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                        >
                            Next: Documents <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}

            {/* Step 3: Document Upload (Optional) */}
            {step === 3 && (
                <div className="space-y-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <FileText className="w-6 h-6 text-purple-400" />
                        Upload Documents (Optional)
                    </h2>

                    <p className="text-sm text-gray-400">
                        Upload legal documents, certificates, appraisals, or other supporting files
                    </p>

                    <MultiIPFSUploader
                        onUpload={handleDocumentUploads}
                        maxFiles={5}
                        accept=".pdf,.doc,.docx,.txt"
                        label="Upload Documents"
                    />

                    <div className="flex gap-3">
                        <button
                            onClick={() => setStep(2)}
                            className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                        >
                            <ArrowLeft className="w-5 h-5" /> Back
                        </button>
                        <button
                            onClick={() => setStep(4)}
                            className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                        >
                            Next: Review <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}

            {/* Step 4: Review & Mint */}
            {step === 4 && (
                <div className="space-y-6">
                    <h2 className="text-xl font-bold">Review & Mint</h2>

                    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 space-y-4">
                        <div>
                            <p className="text-sm text-gray-400">Asset Name</p>
                            <p className="font-semibold">{formData.name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Type</p>
                            <p className="font-semibold">{formData.assetType}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Description</p>
                            <p className="text-gray-300">{formData.description}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Images</p>
                            <p className="font-semibold">{formData.imageHashes.length} uploaded</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Documents</p>
                            <p className="font-semibold">{formData.documentHashes.length} uploaded</p>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Appraisal Value (USD) *
                        </label>
                        <input
                            type="number"
                            value={formData.appraisalValue}
                            onChange={(e) => setFormData(prev => ({ ...prev, appraisalValue: e.target.value }))}
                            placeholder="e.g., 100000"
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Custodian Address (Optional)
                        </label>
                        <input
                            type="text"
                            value={formData.custodian}
                            onChange={(e) => setFormData(prev => ({ ...prev, custodian: e.target.value }))}
                            placeholder={address || '0x...'}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none font-mono text-sm"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Leave empty to use your wallet address
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setStep(3)}
                            disabled={isPending || isConfirming}
                            className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                        >
                            <ArrowLeft className="w-5 h-5" /> Back
                        </button>
                        <button
                            onClick={handleMint}
                            disabled={!canMint || isPending || isConfirming}
                            className="flex-1 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                        >
                            {isPending || isConfirming ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    {isPending ? 'Confirm in Wallet...' : 'Minting...'}
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="w-5 h-5" />
                                    Mint Asset NFT
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
