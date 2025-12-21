// FractionalVault ABI - Essential functions for NFT fractionalization
export const FRACTIONAL_VAULT_ABI = [
    {
        "inputs": [
            { "internalType": "address", "name": "nftContract", "type": "address" },
            { "internalType": "uint256", "name": "tokenId", "type": "uint256" },
            { "internalType": "string", "name": "fractionName", "type": "string" },
            { "internalType": "string", "name": "fractionSymbol", "type": "string" },
            { "internalType": "uint256", "name": "totalSupply", "type": "uint256" },
            { "internalType": "uint256", "name": "buyoutPrice", "type": "uint256" }
        ],
        "name": "fractionalizeNFT",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "vaultId", "type": "uint256" }],
        "name": "redeemNFT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "vaultId", "type": "uint256" },
            { "internalType": "uint256", "name": "newPrice", "type": "uint256" }
        ],
        "name": "updateBuyoutPrice",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "vaultId", "type": "uint256" }],
        "name": "getVault",
        "outputs": [
            {
                "components": [
                    { "internalType": "uint256", "name": "vaultId", "type": "uint256" },
                    { "internalType": "address", "name": "nftContract", "type": "address" },
                    { "internalType": "uint256", "name": "tokenId", "type": "uint256" },
                    { "internalType": "address", "name": "fractionToken", "type": "address" },
                    { "internalType": "address", "name": "curator", "type": "address" },
                    { "internalType": "uint256", "name": "totalSupply", "type": "uint256" },
                    { "internalType": "uint256", "name": "buyoutPrice", "type": "uint256" },
                    { "internalType": "bool", "name": "isLocked", "type": "bool" },
                    { "internalType": "uint256", "name": "createdAt", "type": "uint256" }
                ],
                "internalType": "struct FractionalVault.Vault",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalVaults",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "nftContract", "type": "address" },
            { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
        ],
        "name": "getVaultByNFT",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": "uint256", "name": "vaultId", "type": "uint256" },
            { "indexed": true, "internalType": "address", "name": "curator", "type": "address" },
            { "indexed": false, "internalType": "address", "name": "nftContract", "type": "address" },
            { "indexed": false, "internalType": "uint256", "name": "tokenId", "type": "uint256" },
            { "indexed": false, "internalType": "address", "name": "fractionToken", "type": "address" },
            { "indexed": false, "internalType": "uint256", "name": "totalSupply", "type": "uint256" }
        ],
        "name": "VaultCreated",
        "type": "event"
    }
] as const
