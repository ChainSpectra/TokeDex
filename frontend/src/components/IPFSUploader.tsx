import { useState } from 'react'
import { Upload, X, Loader2, CheckCircle, AlertCircle, Image as ImageIcon } from 'lucide-react'
import { uploadFileToIPFS, getIPFSUrl, type IPFSUploadResult } from '../utils/ipfsClient'

interface IPFSUploaderProps {
    onUpload: (result: IPFSUploadResult) => void
    accept?: string
    maxSize?: number // in MB
    label?: string
}

export default function IPFSUploader({
    onUpload,
    accept = 'image/*',
    maxSize = 10,
    label = 'Upload Image'
}: IPFSUploaderProps) {
    const [uploading, setUploading] = useState(false)
    const [preview, setPreview] = useState<string>()
    const [error, setError] = useState<string>()
    const [uploadedHash, setUploadedHash] = useState<string>()

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validate file size
        if (file.size > maxSize * 1024 * 1024) {
            setError(`File size must be less than ${maxSize}MB`)
            return
        }

        setError(undefined)
        setUploading(true)

        try {
            // Create preview for images
            if (file.type.startsWith('image/')) {
                const reader = new FileReader()
                reader.onload = (e) => setPreview(e.target?.result as string)
                reader.readAsDataURL(file)
            }

            // Upload to IPFS
            const result = await uploadFileToIPFS(file)
            setUploadedHash(result.hash)
            onUpload(result)
        } catch (err) {
            console.error('Upload error:', err)
            setError(err instanceof Error ? err.message : 'Upload failed')
        } finally {
            setUploading(false)
        }
    }

    const clearUpload = () => {
        setPreview(undefined)
        setUploadedHash(undefined)
        setError(undefined)
    }

    return (
        <div className="space-y-3">
            {/* Upload Button */}
            {!uploadedHash && (
                <label className="block">
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 hover:border-purple-500 transition-colors cursor-pointer">
                        <input
                            type="file"
                            className="hidden"
                            accept={accept}
                            onChange={handleFileSelect}
                            disabled={uploading}
                        />

                        <div className="text-center">
                            {uploading ? (
                                <>
                                    <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-3" />
                                    <p className="text-sm text-gray-400">Uploading to IPFS...</p>
                                </>
                            ) : (
                                <>
                                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                    <p className="text-sm font-semibold mb-1">{label}</p>
                                    <p className="text-xs text-gray-400">
                                        Click to upload (max {maxSize}MB)
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </label>
            )}

            {/* Preview */}
            {preview && (
                <div className="relative rounded-lg overflow-hidden border border-gray-700">
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-48 object-cover"
                    />
                    {uploadedHash && (
                        <div className="absolute top-2 right-2 bg-green-500/90 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Uploaded
                        </div>
                    )}
                </div>
            )}

            {/* Upload Success */}
            {uploadedHash && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                                <p className="text-sm font-semibold text-green-400">
                                    Uploaded to IPFS
                                </p>
                            </div>
                            <p className="text-xs text-gray-400 font-mono break-all">
                                {uploadedHash}
                            </p>
                            <a
                                href={getIPFSUrl(uploadedHash)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-purple-400 hover:text-purple-300 mt-1 inline-block"
                            >
                                View on IPFS →
                            </a>
                        </div>
                        <button
                            onClick={clearUpload}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-semibold text-red-400 mb-1">Upload Failed</p>
                        <p className="text-xs text-gray-400">{error}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

// Multi-file uploader component
interface MultiIPFSUploaderProps {
    onUpload: (results: IPFSUploadResult[]) => void
    maxFiles?: number
    accept?: string
    maxSize?: number
    label?: string
}

export function MultiIPFSUploader({
    onUpload,
    maxFiles = 5,
    accept = 'image/*',
    maxSize = 10,
    label = 'Upload Images'
}: MultiIPFSUploaderProps) {
    const [uploads, setUploads] = useState<IPFSUploadResult[]>([])
    const [uploading, setUploading] = useState(false)

    const handleUpload = (result: IPFSUploadResult) => {
        const newUploads = [...uploads, result]
        setUploads(newUploads)
        onUpload(newUploads)
    }

    const removeUpload = (hash: string) => {
        const newUploads = uploads.filter(u => u.hash !== hash)
        setUploads(newUploads)
        onUpload(newUploads)
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">{label}</p>
                <p className="text-xs text-gray-400">
                    {uploads.length} / {maxFiles} uploaded
                </p>
            </div>

            {uploads.length < maxFiles && (
                <IPFSUploader
                    onUpload={handleUpload}
                    accept={accept}
                    maxSize={maxSize}
                    label={`Upload ${uploads.length === 0 ? 'First' : 'Another'} Image`}
                />
            )}

            {/* Uploaded Images Grid */}
            {uploads.length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                    {uploads.map((upload) => (
                        <div
                            key={upload.hash}
                            className="relative group rounded-lg overflow-hidden border border-gray-700"
                        >
                            <img
                                src={upload.url}
                                alt="Uploaded"
                                className="w-full h-32 object-cover"
                            />
                            <button
                                onClick={() => removeUpload(upload.hash)}
                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="w-4 h-4" />
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                                <p className="text-xs text-white font-mono truncate">
                                    {upload.hash.slice(0, 12)}...
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
