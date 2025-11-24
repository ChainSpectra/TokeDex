const hre = require("hardhat");

async function main() {
    // ⚠️ IMPORTANT: YOU MUST REPLACE THESE WITH REAL QIE TESTNET ADDRESSES
    const TESTNET_USDC_ADDRESS = "0xYourTestnetUSDCAddressHere";
    const QIEDEX_CREATOR_ADDRESS = "0xYourQIEDEXCreatorAddressHere";

    console.log("Starting deployment of TokenFactory to QIE Testnet...");
    
    // 1. Get the compiled contract factory
    const TokenFactory = await hre.ethers.getContractFactory("TokenFactory");
    
    // 2. Deploy the contract, passing the constructor arguments (addresses)
    // The order here MUST match the order in your Solidity constructor:
    // constructor(address _usdcAddress, address _qiedexCreatorAddress)
    const factory = await TokenFactory.deploy(
        TESTNET_USDC_ADDRESS, 
        QIEDEX_CREATOR_ADDRESS
    );
    
    // 3. Wait for the transaction to be confirmed on the network
    await factory.waitForDeployment(); 

    const address = await factory.getAddress();

    console.log("✅ TokenFactory successfully deployed!");
    console.log(`Contract Address: ${address}`);
    console.log("-----------------------------------------------------");
    console.log(`USDC Address used in constructor: ${TESTNET_USDC_ADDRESS}`);
    console.log(`QIEDEX Address used in constructor: ${QIEDEX_CREATOR_ADDRESS}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});