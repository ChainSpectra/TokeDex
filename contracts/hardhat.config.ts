import "@nomicfoundation/hardhat-toolbox";
import { configVariable, defineConfig } from "hardhat/config";

// NOTE: Hardhat automatically reads these variables from your shell environment 
// (or your .env file if properly set up) when using configVariable.

export default defineConfig({
  // 1. Plugins: Includes Ethers.js, Mocha, and common tools
  plugins: [],

  // 2. Solidity Compiler Configuration
  solidity: {
    profiles: {
      default: {
        // Use a current, stable version (e.g., 0.8.30)
        version: "0.8.30", 
      },
      // Essential production profile for optimizing the final contract size
      production: {
        version: "0.8.30",
        settings: {
          optimizer: {
            enabled: true, // CRUCIAL for reducing deployment and execution gas costs
            runs: 200,      // Standard run count, balancing deployment cost vs execution cost
          },
        },
      },
    },
  },

  // 3. Network Configurations
  networks: {
    // --- YOUR EXISTING NETWORKS ---
    hardhatMainnet: {
      type: "edr-simulated",
      chainType: "l1",
    },
    hardhatOp: {
      type: "edr-simulated",
      chainType: "op",
    },
    sepolia: {
      type: "http",
      chainType: "l1",
      url: configVariable("SEPOLIA_RPC_URL"),
      accounts: [configVariable("SEPOLIA_PRIVATE_KEY")],
    },

    // --- ADD THE QIE TESTNET CONFIGURATION ---
    qieTestnet: {
      type: "http",
      // Use 'generic' for custom EVM chains outside of the standard L1/L2
      chainType: "generic", 
      // Mandatory: Hardhat reads the URL from the environment variable
      url: configVariable("QIE_TESTNET_RPC_URL"), 
      // Mandatory: Hardhat reads the private key from the environment variable
      accounts: [configVariable("PRIVATE_KEY")], 
      // Optional: Set the Chain ID for validation
      chainId: 35443, 
    },
  },
});