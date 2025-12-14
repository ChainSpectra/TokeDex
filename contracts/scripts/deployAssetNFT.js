const hre = require("hardhat");

async function main() {
    console.log("Deploying AssetNFT contract to QIE Testnet...");

    // Deploy AssetNFT
    const AssetNFT = await hre.ethers.getContractFactory("AssetNFT");
    const assetNFT = await AssetNFT.deploy();

    await assetNFT.waitForDeployment();

    const address = await assetNFT.getAddress();

    console.log("\n✅ AssetNFT deployed successfully!");
    console.log("📍 Contract Address:", address);
    console.log("\n🔗 View on Explorer:");
    console.log(`https://testnet.qie.digital/address/${address}`);

    console.log("\n📋 Next Steps:");
    console.log("1. Update frontend/src/config/networkConstants.ts:");
    console.log(`   ASSET_NFT_ADDRESS = '${address}'`);
    console.log("2. Add AssetNFT ABI to networkConstants.ts");
    console.log("3. Test minting an NFT from the frontend");

    return address;
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
