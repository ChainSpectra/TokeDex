/**
 * IPFS Client for TokeDex RWA Platform
 * Uses Pinata for reliable, production-ready IPFS storage
 */

// For now, we'll use a simple fetch-based approach to Pinata's API
// This avoids SDK complexity and works directly in the browser

const PINATA_API_KEY = import.meta.env.VITE_PINATA_API_KEY || ''
const PINATA_SECRET_KEY = import.meta.env.VITE_PINATA_SECRET_KEY || ''
const PINATA_JWT = import.meta.env.VITE_PINATA_JWT || ''

// Pinata endpoints
const PINATA_PIN_FILE_URL = 'https://api.pinata.cloud/pinning/pinFileToIPFS'
const PINATA_PIN_JSON_URL = 'https://api.pinata.cloud/pinning/pinJSONToIPFS'
const PINATA_GATEWAY = 'https://gateway.pinata.cloud/ipfs/'

export interface IPFSUploadResult {
    hash: string
    url: string
    size: number
}

/**
 * Upload a file to IPFS via Pinata
 */
export async function uploadFileToIPFS(file: File): Promise<IPFSUploadResult> {
    const formData = new FormData()
    formData.append('file', file)

    // Optional: Add metadata
    const metadata = JSON.stringify({
        name: file.name,
        keyvalues: {
            uploadedBy: 'TokeDex',
            timestamp: Date.now().toString()
        }
    })
    formData.append('pinataMetadata', metadata)

    const response = await fetch(PINATA_PIN_FILE_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${PINATA_JWT}`,
            // Note: Don't set Content-Type, let browser set it with boundary
        },
        body: formData
    })

    if (!response.ok) {
        const error = await response.text()
        throw new Error(`IPFS upload failed: ${error}`)
    }

    const data = await response.json()

    return {
        hash: data.IpfsHash,
        url: getIPFSUrl(data.IpfsHash),
        size: data.PinSize
    }
}

/**
 * Upload JSON metadata to IPFS via Pinata
 */
export async function uploadJSONToIPFS(json: object): Promise<IPFSUploadResult> {
    const response = await fetch(PINATA_PIN_JSON_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${PINATA_JWT}`
        },
        body: JSON.stringify({
            pinataContent: json,
            pinataMetadata: {
                name: 'TokeDex Asset Metadata',
                keyvalues: {
                    uploadedBy: 'TokeDex',
                    timestamp: Date.now().toString()
                }
            }
        })
    })

    if (!response.ok) {
        const error = await response.text()
        throw new Error(`JSON upload failed: ${error}`)
    }

    const data = await response.json()

    return {
        hash: data.IpfsHash,
        url: getIPFSUrl(data.IpfsHash),
        size: data.PinSize
    }
}

/**
 * Get IPFS URL from hash
 */
export function getIPFSUrl(hash: string): string {
    return `${PINATA_GATEWAY}${hash}`
}

/**
 * Upload multiple files to IPFS
 */
export async function uploadMultipleFiles(files: File[]): Promise<IPFSUploadResult[]> {
    const results: IPFSUploadResult[] = []

    for (const file of files) {
        const result = await uploadFileToIPFS(file)
        results.push(result)
    }

    return results
}

/**
 * Create and upload complete NFT metadata
 */
export interface NFTMetadata {
    name: string
    description: string
    image: string // IPFS hash
    attributes?: Array<{
        trait_type: string
        value: string | number
    }>
    properties?: {
        assetType?: string
        custodian?: string
        appraisalValue?: string
        documents?: string[] // IPFS hashes
    }
}

export async function uploadNFTMetadata(metadata: NFTMetadata): Promise<IPFSUploadResult> {
    return uploadJSONToIPFS(metadata)
}

/**
 * Check if IPFS is configured
 */
export function isIPFSConfigured(): boolean {
    return !!PINATA_JWT || (!!PINATA_API_KEY && !!PINATA_SECRET_KEY)
}

/**
 * Get configuration status message
 */
export function getIPFSConfigMessage(): string {
    if (!isIPFSConfigured()) {
        return 'IPFS not configured. Please add VITE_PINATA_JWT to your .env file.'
    }
    return 'IPFS configured and ready!'
}
