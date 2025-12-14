// AssetNFT ABI - Essential functions for minting and viewing NFTs
export const ASSET_NFT_ABI = [
    {
        "inputs": [
            { "internalType": "string", "name": "name", "type": "string" },
            { "internalType": "string", "name": "description", "type": "string" },
            { "internalType": "string", "name": "assetType", "type": "string" },
            { "internalType": "string[]", "name": "imageHashes", "type": "string[]" },
            { "internalType": "string[]", "name": "documentHashes", "type": "string[]" },
            { "internalType": "address", "name": "custodian", "type": "address" },
            { "internalType": "uint256", "name": "appraisalValue", "type": "uint256" }
        ],
        "name": "mintAsset",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }],
        "name": "getAssetMetadata",
        "outputs": [
            {
                "components": [
                    { "internalType": "string", "name": "name", "type": "string" },
                    { "internalType": "string", "name": "description", "type": "string" },
                    { "internalType": "string", "name": "assetType", "type": "string" },
                    { "internalType": "string[]", "name": "imageHashes", "type": "string[]" },
                    { "internalType": "string[]", "name": "documentHashes", "type": "string[]" },
                    { "internalType": "address", "name": "custodian", "type": "address" },
                    { "internalType": "uint256", "name": "appraisalValue", "type": "uint256" },
                    { "internalType": "uint256", "name": "appraisalDate", "type": "uint256" },
                    { "internalType": "bool", "name": "isVerified", "type": "bool" },
                    { "internalType": "address", "name": "verifier", "type": "address" }
                ],
                "internalType": "struct AssetNFT.AssetMetadata",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }],
        "name": "ownerOf",
        "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }],
        "name": "tokenURI",
        "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }],
        "name": "isAssetVerified",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" },
            { "indexed": true, "internalType": "address", "name": "owner", "type": "address" },
            { "indexed": false, "internalType": "string", "name": "assetType", "type": "string" },
            { "indexed": false, "internalType": "uint256", "name": "appraisalValue", "type": "uint256" }
        ],
        "name": "AssetMinted",
        "type": "event"
    }
] as const
