// contracts/scripts/deployTest.js
const hre = require("hardhat");

async function main() {
    console.log("Starting quick deployment test...");
    
    // 1. Get the compiled contract factory
    const TestToken = await hre.ethers.getContractFactory("TestToken");
    
    // 2. Deploy without arguments
    const token = await TestToken.deploy();
    
    // 3. Wait for the transaction to be confirmed
    await token.waitForDeployment(); 

    const address = await token.getAddress();

    console.log("✅ SUCCESS: TestToken deployed to QIE Testnet!");
    console.log(`Contract Address: ${address}`);
    console.log("-----------------------------------------------------");
}

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});