# TokeDex - Decentralized Token Platform on QIE Blockchain

A full-stack Web3 application for creating, managing, and trading ERC20 tokens on the QIE Testnet. TokeDex provides an intuitive interface for businesses and individuals to launch their own tokens and participate in decentralized finance.

---
Demo VideoLink as requested by QIE Blockchain Hackathon : https://youtu.be/3n-PIS4Vhdk

## Features

### Token Creation & Management
- **Direct Token Creation**: Deploy custom ERC20 tokens instantly using our TokenFactory contract
- **Token Dashboard**: View and manage all your created tokens in one place
- **Wallet Integration**: Seamless MetaMask and Web3 wallet support
- **Token Import**: Import existing tokens by contract address

### Decentralized Exchange (SimpleDEX)
- **Token Swapping**: Trade tokens using an automated market maker (AMM) with 0.3% fees
- **Liquidity Pools**: Create and manage liquidity pools for token pairs
- **Pools Explorer**: Discover all available trading pools with reserves and price information
- **Real-time Pricing**: Live price calculations based on pool reserves

### User Experience
- **Beautiful UI**: Modern, responsive design with smooth animations
- **Network Switching**: Easy QIE Testnet configuration
- **QIE Faucet**: Integrated faucet for obtaining test tokens
- **Transaction Tracking**: Real-time transaction status and confirmations

---

## Tech Stack

### Smart Contracts (`/contracts`)
- **Solidity** `^0.8.30`
- **Hardhat 3** for development and testing
- **OpenZeppelin** contracts for security
- **Deployed Contracts**:
  - TokenFactory: `0xfa1a836DB0307bd214E8f3b3672b47d53491a29C`
  - SimpleDEX: `0xe6E42ee1E5e8BB0dc947fC40079ae22370200048`

### Frontend (`/frontend`)
- **React** `^19` with TypeScript
- **Vite** `^7` for fast development
- **wagmi** `^3` for Web3 interactions
- **Framer Motion** for animations
- **Tailwind CSS** for styling
- **Lucide React** for icons

---

## Project Structure

```
TokeDex/
├── contracts/                  # Smart contract development
│   ├── contracts/
│   │   ├── TokenFactory.sol   # ERC20 token factory
│   │   ├── SimpleDEX.sol      # Decentralized exchange
│   │   └── TokenFaucet.sol    # Test token faucet
│   ├── scripts/
│   │   └── deploySimpleDEX.js
│   ├── test/
│   └── hardhat.config.ts
│
├── frontend/                   # React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── DirectTokenCreator.tsx
│   │   │   ├── MyTokensDashboard.tsx
│   │   │   ├── SimpleDEXInterface.tsx
│   │   │   ├── PoolsExplorer.tsx
│   │   │   ├── PoolCard.tsx
│   │   │   └── ...
│   │   ├── config/
│   │   │   ├── wagmi.ts
│   │   │   └── networkConstants.ts
│   │   └── App.tsx
│   └── package.json
│
├── README.md
├── HOW_TO_USE_TOKEDEX.md
└── DIRECT_TOKEN_CREATION.md
```

---

## Quick Start

### Prerequisites
- Node.js v18+ and npm
- MetaMask or compatible Web3 wallet
- QIE Testnet configuration

### 1. Clone Repository
```bash
git clone https://github.com/ChainSpectra/TokeDex.git
cd TokeDex
```

### 2. Smart Contracts Setup
```bash
cd contracts
npm install

# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Deploy to QIE Testnet (requires .env with PRIVATE_KEY)
npx hardhat run scripts/deploySimpleDEX.js --network qieTestnet
```

### 3. Frontend Setup
```bash
cd frontend
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### 4. Configure Wallet
Add QIE Testnet to MetaMask:
- **Network Name**: QIE Testnet
- **RPC URL**: `https://rpc1testnet.qie.digital`
- **Chain ID**: `1983`
- **Currency Symbol**: QIE
- **Block Explorer**: `https://testnet.qie.digital`

### 5. Get Test Tokens
Visit the QIE Faucet: https://www.qie.digital/faucet

---

## Usage

### Creating a Token
1. Connect your wallet to QIE Testnet
2. Click "Create Token" in the navigation
3. Fill in token details (name, symbol, supply, decimals)
4. Confirm transaction and pay gas fees
5. Your token is deployed! Add it to your wallet

### Trading on SimpleDEX
1. Navigate to "My Tokens" → Click "Trade"
2. **Swap Tab**: Exchange tokens instantly
3. **Liquidity Tab**: Create pools or add liquidity
4. **Pools Tab**: Explore all available trading pairs

### Managing Liquidity
1. Select token pair (e.g., YourToken/WQIE)
2. Enter amounts for both tokens
3. Create pool or add to existing pool
4. Receive LP tokens representing your share

---

## Documentation

- **[How to Use TokeDex](./HOW_TO_USE_TOKEDEX.md)** - Complete user guide
- **[Direct Token Creation](./DIRECT_TOKEN_CREATION.md)** - Token creation details
- **[Pools Explorer](./POOLS_EXPLORER.md)** - Pools feature documentation

---

## Important Links

- **Live App**: https://tokedex.vercel.app (or your deployment)
- **QIE Testnet Explorer**: https://testnet.qie.digital
- **QIE Faucet**: https://www.qie.digital/faucet
- **TokenFactory Contract**: [0xfa1a836DB0307bd214E8f3b3672b47d53491a29C](https://testnet.qie.digital/address/0xfa1a836DB0307bd214E8f3b3672b47d53491a29C)
- **SimpleDEX Contract**: [0xe6E42ee1E5e8BB0dc947fC40079ae22370200048](https://testnet.qie.digital/address/0xe6E42ee1E5e8BB0dc947fC40079ae22370200048)

---

## Development

### Environment Variables

**Contracts** (`contracts/.env`):
```env
PRIVATE_KEY=your_wallet_private_key
QIE_TESTNET_RPC_URL=https://rpc1testnet.qie.digital
```

**Frontend** (optional):
```env
VITE_WALLET_CONNECT_PROJECT_ID=your_project_id
```

### Running Tests
```bash
# Smart contract tests
cd contracts
npx hardhat test

# Frontend build test
cd frontend
npm run build
```

---

## Key Features Explained

### TokenFactory
- Deploys separate ERC20 contracts for each token
- Customizable name, symbol, supply, and decimals
- Instant deployment with gas-efficient contracts
- Full ERC20 standard compliance

### SimpleDEX
- Automated Market Maker (AMM) with constant product formula (x * y = k)
- 0.3% trading fee
- Slippage protection
- Pool enumeration for discovery
- Future-ready for advanced analytics

### Pools Explorer
- View all available liquidity pools
- See reserves and current prices
- Navigate directly to swap or add liquidity
- Real-time data from blockchain

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## Acknowledgments

- Built on QIE Blockchain
- Powered by OpenZeppelin contracts
- UI components from Lucide React
- Animations by Framer Motion

---

## Team

| Name | GitHub |
|------|--------|
| Aadhesh N| [@a-anuj](https://github.com/Aadesh1106Aadesh1106) |
| Karthik Mallareddy | [@harish1604](https://github.com/KarthikMallareddy) |
| Hari Prasath K | [@hariPrasathK-Dev](https://github.com/hariPrasathK-Dev) |

**Ready to tokenize your business? Start creating tokens on TokeDex!**

