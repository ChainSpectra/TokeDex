const hre = require("hardhat");

async function main() {
    console.log("Deploying FractionalVault contract to QIE Testnet...");

    // Deploy FractionalVault
    const FractionalVault = await hre.ethers.getContractFactory("FractionalVault");
    const vault = await FractionalVault.deploy();

    await vault.waitForDeployment();

    const address = await vault.getAddress();

    console.log("\n✅ FractionalVault deployed successfully!");
    console.log("📍 Contract Address:", address);
    console.log("\n🔗 View on Explorer:");
    console.log(`https://testnet.qie.digital/address/${address}`);

    console.log("\n📋 Next Steps:");
    console.log("1. Update frontend/src/config/networkConstants.ts:");
    console.log(`   FRACTIONAL_VAULT_ADDRESS = '${address}'`);
    console.log("2. Add FractionalVault ABI to networkConstants.ts");
    console.log("3. Test fractionalizing an NFT");

    return address;
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
