const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying SimpleDEX to QIE Testnet...");

  // Deploy SimpleDEX
  const SimpleDEX = await ethers.getContractFactory("SimpleDEX");
  console.log("Deploying contract...");

  const simpleDEX = await SimpleDEX.deploy();

  await simpleDEX.waitForDeployment();

  const dexAddress = await simpleDEX.getAddress();
  console.log("\n✅ SimpleDEX deployed to:", dexAddress);
  console.log("\n📋 Next Steps:");
  console.log("1. Update SIMPLE_DEX_ADDRESS in frontend/src/config/networkConstants.ts");
  console.log(`   SIMPLE_DEX_ADDRESS = '${dexAddress}'`);
  console.log("\n2. Update the ABI in networkConstants.ts");
  console.log("\n3. Verify on explorer:");
  console.log(`   https://testnet.qie.digital/address/${dexAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
