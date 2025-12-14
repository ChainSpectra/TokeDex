// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title AssetNFT
 * @dev NFT contract for tokenizing real-world assets with IPFS metadata
 */
contract AssetNFT is ERC721, ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;

    struct AssetMetadata {
        string name;                // Asset name (e.g., "Downtown Property")
        string description;         // Detailed description
        string assetType;           // "Real Estate", "Art", "Gold", "Invoice", etc.
        string[] imageHashes;       // IPFS hashes for images
        string[] documentHashes;    // IPFS hashes for legal documents
        address custodian;          // Entity holding the physical asset
        uint256 appraisalValue;     // Value in USD (scaled by 1e18)
        uint256 appraisalDate;      // Timestamp of appraisal
        bool isVerified;            // Admin verification status
        address verifier;           // Who verified the asset
    }

    // Mapping from token ID to asset metadata
    mapping(uint256 => AssetMetadata) public assetMetadata;
    
    // Mapping of authorized verifiers
    mapping(address => bool) public verifiers;
    
    // Events
    event AssetMinted(
        uint256 indexed tokenId,
        address indexed owner,
        string assetType,
        uint256 appraisalValue
    );
    
    event AssetVerified(
        uint256 indexed tokenId,
        address indexed verifier,
        uint256 timestamp
    );
    
    event VerifierAdded(address indexed verifier);
    event VerifierRemoved(address indexed verifier);

    constructor() ERC721("TokeDex Asset NFT", "TDXNFT") Ownable(msg.sender) {
        // Owner is automatically a verifier
        verifiers[msg.sender] = true;
    }

    /**
     * @dev Mint a new asset NFT
     * @param name Asset name
     * @param description Asset description
     * @param assetType Type of asset
     * @param imageHashes Array of IPFS hashes for images
     * @param documentHashes Array of IPFS hashes for documents
     * @param custodian Address of custodian holding physical asset
     * @param appraisalValue Appraised value in USD (scaled by 1e18)
     * @return tokenId The ID of the newly minted NFT
     */
    function mintAsset(
        string memory name,
        string memory description,
        string memory assetType,
        string[] memory imageHashes,
        string[] memory documentHashes,
        address custodian,
        uint256 appraisalValue
    ) external returns (uint256) {
        require(bytes(name).length > 0, "Name cannot be empty");
        require(imageHashes.length > 0, "At least one image required");
        require(custodian != address(0), "Invalid custodian address");
        require(appraisalValue > 0, "Appraisal value must be > 0");

        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;

        _safeMint(msg.sender, tokenId);

        // Store metadata
        assetMetadata[tokenId] = AssetMetadata({
            name: name,
            description: description,
            assetType: assetType,
            imageHashes: imageHashes,
            documentHashes: documentHashes,
            custodian: custodian,
            appraisalValue: appraisalValue,
            appraisalDate: block.timestamp,
            isVerified: false,
            verifier: address(0)
        });

        // Set token URI to first image
        string memory uri = string(abi.encodePacked("ipfs://", imageHashes[0]));
        _setTokenURI(tokenId, uri);

        emit AssetMinted(tokenId, msg.sender, assetType, appraisalValue);

        return tokenId;
    }

    /**
     * @dev Verify an asset (only authorized verifiers)
     * @param tokenId ID of the asset to verify
     */
    function verifyAsset(uint256 tokenId) external {
        require(verifiers[msg.sender], "Not authorized verifier");
        require(_ownerOf(tokenId) != address(0), "Asset does not exist");
        require(!assetMetadata[tokenId].isVerified, "Already verified");

        assetMetadata[tokenId].isVerified = true;
        assetMetadata[tokenId].verifier = msg.sender;

        emit AssetVerified(tokenId, msg.sender, block.timestamp);
    }

    /**
     * @dev Add a new verifier (only owner)
     * @param verifier Address to add as verifier
     */
    function addVerifier(address verifier) external onlyOwner {
        require(verifier != address(0), "Invalid address");
        require(!verifiers[verifier], "Already a verifier");
        
        verifiers[verifier] = true;
        emit VerifierAdded(verifier);
    }

    /**
     * @dev Remove a verifier (only owner)
     * @param verifier Address to remove as verifier
     */
    function removeVerifier(address verifier) external onlyOwner {
        require(verifiers[verifier], "Not a verifier");
        
        verifiers[verifier] = false;
        emit VerifierRemoved(verifier);
    }

    /**
     * @dev Get complete asset metadata
     * @param tokenId ID of the asset
     * @return metadata Complete asset metadata struct
     */
    function getAssetMetadata(uint256 tokenId) external view returns (AssetMetadata memory) {
        require(_ownerOf(tokenId) != address(0), "Asset does not exist");
        return assetMetadata[tokenId];
    }

    /**
     * @dev Get all image hashes for an asset
     * @param tokenId ID of the asset
     * @return Array of IPFS image hashes
     */
    function getImageHashes(uint256 tokenId) external view returns (string[] memory) {
        require(_ownerOf(tokenId) != address(0), "Asset does not exist");
        return assetMetadata[tokenId].imageHashes;
    }

    /**
     * @dev Get all document hashes for an asset
     * @param tokenId ID of the asset
     * @return Array of IPFS document hashes
     */
    function getDocumentHashes(uint256 tokenId) external view returns (string[] memory) {
        require(_ownerOf(tokenId) != address(0), "Asset does not exist");
        return assetMetadata[tokenId].documentHashes;
    }

    /**
     * @dev Get total number of minted assets
     * @return Total supply of NFTs
     */
    function totalSupply() external view returns (uint256) {
        return _tokenIdCounter;
    }

    /**
     * @dev Check if an asset is verified
     * @param tokenId ID of the asset
     * @return True if verified
     */
    function isAssetVerified(uint256 tokenId) external view returns (bool) {
        require(_ownerOf(tokenId) != address(0), "Asset does not exist");
        return assetMetadata[tokenId].isVerified;
    }

    // Override required functions
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return ERC721URIStorage.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
