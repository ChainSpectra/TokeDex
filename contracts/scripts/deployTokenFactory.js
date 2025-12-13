const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying TokenFactory to QIE Testnet...");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  // Get deployer balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "QIE");

  // Deploy TokenFactory
  const TokenFactory = await ethers.getContractFactory("TokenFactory");
  const tokenFactory = await TokenFactory.deploy();

  await tokenFactory.waitForDeployment();

  const factoryAddress = await tokenFactory.getAddress();
  console.log("TokenFactory deployed to:", factoryAddress);
  console.log("\n✅ Deployment successful!");
  console.log("\nAdd this address to your frontend config:");
  console.log(`TOKEN_FACTORY_ADDRESS: "${factoryAddress}"`);
  
  // Test creating a token
  console.log("\nTesting token creation...");
  const tx = await tokenFactory.createToken(
    "Test Business Token",
    "TBT",
    1000000,
    18
  );
  
  const receipt = await tx.wait();
  console.log("Test token created in transaction:", receipt.hash);
  
  // Get the created token address from event
  const event = receipt.logs.find(log => {
    try {
      return tokenFactory.interface.parseLog(log).name === "TokenCreated";
    } catch {
      return false;
    }
  });
  
  if (event) {
    const parsedEvent = tokenFactory.interface.parseLog(event);
    console.log("Test token address:", parsedEvent.args.tokenAddress);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
