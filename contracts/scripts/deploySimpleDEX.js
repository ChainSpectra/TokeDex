const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying SimpleDEX to QIE Testnet...");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "QIE");

  // Deploy SimpleDEX
  const SimpleDEX = await ethers.getContractFactory("SimpleDEX");
  const simpleDEX = await SimpleDEX.deploy();

  await simpleDEX.waitForDeployment();

  const dexAddress = await simpleDEX.getAddress();
  console.log("SimpleDEX deployed to:", dexAddress);
  console.log("\n✅ Deployment successful!");
  console.log("\nAdd this address to your frontend config:");
  console.log(`SIMPLE_DEX_ADDRESS: "${dexAddress}"`);
  console.log("\nYou can now:");
  console.log("- Create liquidity pools for your tokens");
  console.log("- Add/remove liquidity");
  console.log("- Swap tokens with 0.3% fee");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
