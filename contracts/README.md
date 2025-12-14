# TokeDex Smart Contracts

Solidity smart contracts for token creation and decentralized exchange on QIE Blockchain.

---

## 📋 Contracts

### TokenFactory.sol
**Address**: `0xfa1a836DB0307bd214E8f3b3672b47d53491a29C`

Factory contract for deploying custom ERC20 tokens.

**Key Functions**:
```solidity
function createToken(
    string memory name,
    string memory symbol,
    uint256 initialSupply,
    uint8 decimals
) external returns (address)
```

**Features**:
- Deploys separate ERC20 contract for each token
- Customizable name, symbol, supply, and decimals
- Emits `TokenCreated` event with new token address
- Gas-efficient deployment

### SimpleDEX.sol
**Address**: `0xe6E42ee1E5e8BB0dc947fC40079ae22370200048`

Automated Market Maker (AMM) decentralized exchange.

**Key Functions**:
```solidity
// Pool Management
function createPool(address tokenA, address tokenB, uint256 amountA, uint256 amountB) external
function addLiquidity(bytes32 poolId, uint256 amountADesired, uint256 amountBDesired, ...) external
function removeLiquidity(bytes32 poolId, uint256 liquidity, ...) external

// Trading
function swap(bytes32 poolId, address tokenIn, uint256 amountIn, uint256 amountOutMin) external

// Pool Discovery
function getAllPoolIds() external view returns (bytes32[] memory)
function getPoolInfo(bytes32 poolId) external view returns (...)
function getPoolCount() external view returns (uint256)
```

**Features**:
- Constant product AMM (x * y = k)
- 0.3% trading fee
- Liquidity provider tokens (LP tokens)
- Pool enumeration for discovery
- Slippage protection

### TokenFaucet.sol
Test token faucet for development.

**Features**:
- Dispenses test tokens
- Rate limiting per address
- Configurable amounts

---

## 🛠️ Development

### Prerequisites
- Node.js v18+
- Hardhat 3

### Installation
```bash
npm install
```

### Compile Contracts
```bash
npx hardhat compile
```

### Run Tests
```bash
npx hardhat test
```

### Deploy to QIE Testnet

1. **Create `.env` file**:
```env
PRIVATE_KEY=your_wallet_private_key
QIE_TESTNET_RPC_URL=https://rpc1testnet.qie.digital
```

2. **Deploy SimpleDEX**:
```bash
npx hardhat run scripts/deploySimpleDEX.js --network qieTestnet
```

3. **Deploy TokenFactory**:
```bash
npx hardhat run scripts/deployTokenFactory.js --network qieTestnet
```

---

## 📁 Project Structure

```
contracts/
├── contracts/
│   ├── TokenFactory.sol        # Token creation factory
│   ├── SimpleDEX.sol           # DEX implementation
│   ├── TokenFaucet.sol         # Test token faucet
│   └── Test_Token.sol          # Sample ERC20
├── scripts/
│   ├── deploySimpleDEX.js      # Deployment script
│   └── deployTokenFactory.js   # Factory deployment
├── test/
│   └── SimpleDEX.test.ts       # Contract tests
├── hardhat.config.ts           # Hardhat configuration
└── package.json
```

---

## ⚙️ Configuration

### hardhat.config.ts
```typescript
networks: {
  qieTestnet: {
    url: process.env.QIE_TESTNET_RPC_URL || "https://rpc1testnet.qie.digital",
    accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    chainId: 1983
  }
}
```

---

## 🧪 Testing

### Run All Tests
```bash
npx hardhat test
```

### Run Specific Test
```bash
npx hardhat test test/SimpleDEX.test.ts
```

### Test Coverage
```bash
npx hardhat coverage
```

---

## 📊 Contract Specifications

### TokenFactory
- **Solidity Version**: ^0.8.30
- **License**: MIT
- **Dependencies**: OpenZeppelin ERC20
- **Gas Cost**: ~1,500,000 per token deployment

### SimpleDEX
- **Solidity Version**: ^0.8.30
- **License**: MIT
- **AMM Formula**: x * y = k
- **Trading Fee**: 0.3%
- **Gas Cost**: 
  - Create Pool: ~200,000
  - Swap: ~100,000
  - Add Liquidity: ~150,000

---

## 🔐 Security

### Audits
- OpenZeppelin contracts used for ERC20 implementation
- Standard AMM formula (battle-tested)
- Reentrancy guards on critical functions

### Best Practices
- Use SafeMath for arithmetic (Solidity 0.8+)
- Checks-Effects-Interactions pattern
- Access control where needed
- Event emission for all state changes

---

## 📝 Deployment Addresses

### QIE Testnet
- **TokenFactory**: `0xfa1a836DB0307bd214E8f3b3672b47d53491a29C`
- **SimpleDEX**: `0xe6E42ee1E5e8BB0dc947fC40079ae22370200048`
- **Network**: QIE Testnet
- **Chain ID**: 1983
- **Explorer**: https://testnet.qie.digital

---

## 🔗 Verification

### Verify on Explorer
```bash
npx hardhat verify --network qieTestnet DEPLOYED_CONTRACT_ADDRESS
```

### Example
```bash
npx hardhat verify --network qieTestnet 0xe6E42ee1E5e8BB0dc947fC40079ae22370200048
```

---

## 📚 Documentation

- [Main README](../README.md)
- [Token Creation Guide](../DIRECT_TOKEN_CREATION.md)
- [SimpleDEX Usage](../HOW_TO_USE_TOKEDEX.md)

---

## 🤝 Contributing

1. Write tests for new features
2. Follow Solidity style guide
3. Document all public functions
4. Run tests before committing

---

Built with Hardhat + OpenZeppelin
