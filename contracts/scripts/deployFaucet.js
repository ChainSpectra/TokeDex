const hre = require("hardhat");

async function main() {
    console.log("🚀 Starting deployment to QIE Testnet...\n");

    // Get deployer account
    const [deployer] = await hre.ethers.getSigners();
    console.log("📝 Deploying contracts with account:", deployer.address);

    // Check deployer balance
    const balance = await hre.ethers.provider.getBalance(deployer.address);
    console.log("💰 Account balance:", hre.ethers.formatEther(balance), "QIE\n");

    if (balance < hre.ethers.parseEther("0.1")) {
        console.log("⚠️  WARNING: Low balance! You may need more QIE for gas fees.");
        console.log("   Get test QIE from: https://testnet.qie.digital/\n");
    }

    // Step 1: Deploy QuickTestToken
    console.log("📦 Step 1: Deploying QuickTestToken (QTT)...");
    const QuickTestToken = await hre.ethers.getContractFactory("QuickTestToken");
    const qttToken = await QuickTestToken.deploy();
    await qttToken.waitForDeployment();
    const qttAddress = await qttToken.getAddress();

    console.log("✅ QuickTestToken deployed to:", qttAddress);
    console.log("   Total Supply: 10,000 QTT\n");

    // Step 2: Deploy TokenFaucet
    console.log("📦 Step 2: Deploying TokenFaucet...");
    const TokenFaucet = await hre.ethers.getContractFactory("TokenFaucet");
    const faucet = await TokenFaucet.deploy(qttAddress);
    await faucet.waitForDeployment();
    const faucetAddress = await faucet.getAddress();

    console.log("✅ TokenFaucet deployed to:", faucetAddress);
    console.log("   Claim Amount: 100 QTT");
    console.log("   Cooldown: 24 hours\n");

    // Step 3: Transfer tokens to faucet
    console.log("📦 Step 3: Transferring QTT tokens to faucet...");
    const transferAmount = hre.ethers.parseEther("10000"); // All 10,000 QTT
    const transferTx = await qttToken.transfer(faucetAddress, transferAmount);
    await transferTx.wait();

    console.log("✅ Transferred 10,000 QTT to faucet");
    console.log("   This allows for 100 claims (100 QTT each)\n");

    // Verify faucet balance
    const faucetBalance = await qttToken.balanceOf(faucetAddress);
    console.log("📊 Faucet Balance:", hre.ethers.formatEther(faucetBalance), "QTT");
    console.log("   Claims Available:", (Number(faucetBalance) / Number(hre.ethers.parseEther("100"))).toString(), "\n");

    // Summary
    console.log("=".repeat(60));
    console.log("🎉 DEPLOYMENT SUCCESSFUL!");
    console.log("=".repeat(60));
    console.log("\n📋 Contract Addresses:");
    console.log("   QuickTestToken (QTT):", qttAddress);
    console.log("   TokenFaucet:         ", faucetAddress);
    console.log("\n🔗 Add to frontend:");
    console.log("   Update frontend/src/config/networkConstants.ts with:");
    console.log(`   export const QTT_TOKEN_ADDRESS = "${qttAddress}"`);
    console.log(`   export const QTT_FAUCET_ADDRESS = "${faucetAddress}"`);
    console.log("\n🌐 View on Explorer:");
    console.log(`   Token:  https://testnet.qie.digital/address/${qttAddress}`);
    console.log(`   Faucet: https://testnet.qie.digital/address/${faucetAddress}`);
    console.log("\n✨ Next Steps:");
    console.log("   1. Copy the contract addresses above");
    console.log("   2. Add them to your frontend configuration");
    console.log("   3. Test claiming tokens from the faucet");
    console.log("=".repeat(60) + "\n");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("❌ Deployment failed:", error);
        process.exit(1);
    });
