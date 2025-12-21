// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./FractionToken.sol";

/**
 * @title FractionalVault
 * @dev Lock NFTs and mint fractional ERC20 tokens
 */
contract FractionalVault is ReentrancyGuard, Ownable {
    uint256 private _vaultIdCounter;
    
    struct Vault {
        uint256 vaultId;
        address nftContract;
        uint256 tokenId;
        address fractionToken;
        address curator;
        uint256 totalSupply;
        uint256 buyoutPrice;
        bool isLocked;
        uint256 createdAt;
    }
    
    mapping(uint256 => Vault) public vaults;
    mapping(address => mapping(uint256 => uint256)) public nftToVault; // nftContract => tokenId => vaultId
    
    event VaultCreated(
        uint256 indexed vaultId,
        address indexed curator,
        address nftContract,
        uint256 tokenId,
        address fractionToken,
        uint256 totalSupply
    );
    
    event NFTLocked(uint256 indexed vaultId, address indexed nftContract, uint256 tokenId);
    event NFTUnlocked(uint256 indexed vaultId, address indexed recipient);
    event BuyoutPriceUpdated(uint256 indexed vaultId, uint256 newPrice);
    
    constructor() Ownable(msg.sender) {}
    
    /**
     * @dev Fractionalize an NFT
     * @param nftContract Address of NFT contract
     * @param tokenId NFT token ID
     * @param fractionName Name for fraction token
     * @param fractionSymbol Symbol for fraction token
     * @param totalSupply Total supply of fraction tokens
     * @param buyoutPrice Price to buyout the vault
     * @return vaultId The ID of the created vault
     */
    function fractionalizeNFT(
        address nftContract,
        uint256 tokenId,
        string memory fractionName,
        string memory fractionSymbol,
        uint256 totalSupply,
        uint256 buyoutPrice
    ) external nonReentrant returns (uint256) {
        require(nftContract != address(0), "Invalid NFT contract");
        require(totalSupply > 0, "Total supply must be > 0");
        require(buyoutPrice > 0, "Buyout price must be > 0");
        require(bytes(fractionName).length > 0, "Name cannot be empty");
        require(bytes(fractionSymbol).length > 0, "Symbol cannot be empty");
        
        // Verify ownership
        IERC721 nft = IERC721(nftContract);
        require(nft.ownerOf(tokenId) == msg.sender, "Not NFT owner");
        
        // Check if already fractionalized
        require(nftToVault[nftContract][tokenId] == 0, "NFT already fractionalized");
        
        uint256 vaultId = _vaultIdCounter;
        _vaultIdCounter++;
        
        // Transfer NFT to vault
        nft.transferFrom(msg.sender, address(this), tokenId);
        
        // Create fraction token
        FractionToken fractionToken = new FractionToken(
            fractionName,
            fractionSymbol,
            totalSupply,
            msg.sender,
            address(this),
            vaultId
        );
        
        // Store vault data
        vaults[vaultId] = Vault({
            vaultId: vaultId,
            nftContract: nftContract,
            tokenId: tokenId,
            fractionToken: address(fractionToken),
            curator: msg.sender,
            totalSupply: totalSupply * 10**18, // Store in wei
            buyoutPrice: buyoutPrice,
            isLocked: true,
            createdAt: block.timestamp
        });
        
        nftToVault[nftContract][tokenId] = vaultId;
        
        emit VaultCreated(
            vaultId,
            msg.sender,
            nftContract,
            tokenId,
            address(fractionToken),
            totalSupply
        );
        emit NFTLocked(vaultId, nftContract, tokenId);
        
        return vaultId;
    }
    
    /**
     * @dev Redeem all fractions to unlock NFT
     * @param vaultId ID of the vault
     */
    function redeemNFT(uint256 vaultId) external nonReentrant {
        Vault storage vault = vaults[vaultId];
        require(vault.isLocked, "Vault not locked");
        
        FractionToken fractionToken = FractionToken(vault.fractionToken);
        uint256 totalSupply = fractionToken.totalSupply();
        uint256 userBalance = fractionToken.balanceOf(msg.sender);
        
        require(userBalance == totalSupply, "Must own all fractions");
        
        // Burn all fraction tokens
        fractionToken.burnFrom(msg.sender, totalSupply);
        
        // Unlock vault
        vault.isLocked = false;
        
        // Transfer NFT to redeemer
        IERC721(vault.nftContract).transferFrom(
            address(this),
            msg.sender,
            vault.tokenId
        );
        
        emit NFTUnlocked(vaultId, msg.sender);
    }
    
    /**
     * @dev Update buyout price (curator only)
     * @param vaultId ID of the vault
     * @param newPrice New buyout price
     */
    function updateBuyoutPrice(uint256 vaultId, uint256 newPrice) external {
        Vault storage vault = vaults[vaultId];
        require(msg.sender == vault.curator, "Not curator");
        require(vault.isLocked, "Vault not locked");
        require(newPrice > 0, "Price must be > 0");
        
        vault.buyoutPrice = newPrice;
        emit BuyoutPriceUpdated(vaultId, newPrice);
    }
    
    /**
     * @dev Get vault details
     * @param vaultId ID of the vault
     * @return Vault struct
     */
    function getVault(uint256 vaultId) external view returns (Vault memory) {
        return vaults[vaultId];
    }
    
    /**
     * @dev Get total number of vaults
     * @return Total vault count
     */
    function totalVaults() external view returns (uint256) {
        return _vaultIdCounter;
    }
    
    /**
     * @dev Check if NFT is fractionalized
     * @param nftContract NFT contract address
     * @param tokenId NFT token ID
     * @return vaultId (0 if not fractionalized)
     */
    function getVaultByNFT(address nftContract, uint256 tokenId) external view returns (uint256) {
        return nftToVault[nftContract][tokenId];
    }
}
