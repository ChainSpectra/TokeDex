# Direct Token Creation on TokeDex

## Problem Solved

**Issue**: Qiedex (www.dex.qie.digital) is a DEX for trading tokens, NOT a token creation platform. Users cannot create tokens there.

**Solution**: Deployed our own TokenFactory contract directly on QIE Testnet, enabling users to create tokens within TokeDex without leaving the app.

---

## Deployed Contract

### TokenFactory
- **Address**: `0xfa1a836DB0307bd214E8f3b3672b47d53491a29C`
- **Network**: QIE Testnet (Chain ID: 1983)
- **Explorer**: https://testnet.qie.digital/address/0xfa1a836DB0307bd214E8f3b3672b47d53491a29C

### Test Token (Verification)
- **Address**: `0x1a4C71eAcbd927A48ce88B6bAaEE75579aD479B7`
- **Name**: Test Business Token
- **Symbol**: TBT
- **Supply**: 1,000,000

---

## How It Works

### 1. **TokenFactory Contract**
Located at `contracts/contracts/TokenFactory.sol`

The factory deploys separate ERC20 token contracts on-demand:
```solidity
function createToken(
    string memory name,
    string memory symbol,
    uint256 initialSupply,
    uint8 decimals
) external returns (address)
```

### 2. **Frontend Integration**
Component: `frontend/src/components/DirectTokenCreator.tsx`

Features:
- ✅ Direct contract interaction (no external redirects)
- ✅ Real-time transaction tracking
- ✅ Automatic token address extraction from events
- ✅ Explorer links for verification
- ✅ Full error handling

### 3. **User Flow**
1. User clicks "Create Token" button
2. Fills in token details (name, symbol, supply, decimals)
3. Confirms transaction in wallet (pays gas in QIE)
4. Transaction is mined on QIE Testnet
5. Token address is extracted and displayed
6. User can view token on explorer

---

## Key Features

### Separate Contract Per Business ✅
Each token creation deploys a NEW contract, ensuring:
- Independent token economics
- Separate ownership
- Custom supply management
- Isolated contract state

### QIE20 Standard (ERC20 Compatible) ✅
All tokens are fully compatible with:
- Qiedex DEX trading
- Standard wallets (MetaMask, etc.)
- Block explorers
- Other DeFi protocols on QIE

### Gas Efficient
- Optimized contract deployment
- Minimal transaction overhead
- Standard OpenZeppelin ERC20 base

---

## Configuration Files Updated

### 1. `frontend/src/config/networkConstants.ts`
```typescript
export const TOKEN_FACTORY_ADDRESS = '0xfa1a836DB0307bd214E8f3b3672b47d53491a29C'
export const TOKEN_FACTORY_ABI = [...]
```

### 2. `contracts/.env`
```bash
QIE_TESTNET_RPC_URL="https://rpc1testnet.qie.digital"  # Fixed from old RPC
```

### 3. `frontend/src/components/modals/TokenCreationModal.tsx`
- Replaced QiedexTokenCreationFlow with DirectTokenCreator
- Removed external redirect logic

---

## Testing Instructions

### 1. Prerequisites
- Wallet connected to QIE Testnet (Chain ID 1983)
- At least 0.1 QIE for gas fees (get from faucet: https://testnet.qie.digital/)

### 2. Steps
1. Run frontend: `cd frontend && npm run dev`
2. Open http://localhost:5173
3. Click "Create Token" button (in navbar or landing page)
4. Fill in token details:
   - Name: Your Business Name Token
   - Symbol: YBNT (3-5 characters)
   - Initial Supply: 1000000 (any amount)
   - Decimals: 18 (standard)
5. Click "Create Token"
6. Confirm transaction in MetaMask
7. Wait for confirmation (~5-10 seconds)
8. Copy token contract address
9. View on explorer

### 3. Verify Token
- Visit: `https://testnet.qie.digital/address/[YOUR_TOKEN_ADDRESS]`
- Check token holders (you should have 100% supply)
- Try importing to MetaMask: Add Token → Custom → Paste address

---

## Architecture

```
User Wallet
    ↓ (calls createToken)
TokenFactory Contract (0xfa1a836DB0307bd214E8f3b3672b47d53491a29C)
    ↓ (deploys)
CustomToken Contract (new address each time)
    ↓ (mints to)
User Wallet (receives all initial supply)
```

---

## Next Steps

### Phase 1: Token Management ✅ COMPLETE
- [x] Deploy TokenFactory
- [x] Build direct creation UI
- [x] Test token creation

### Phase 2: Trading Integration (Next)
- [ ] Add "Trade on Qiedex" button after token creation
- [ ] Deep-link to Qiedex with token address pre-filled
- [ ] Guide users to create liquidity pools

### Phase 3: Token Dashboard (Future)
- [ ] Show all tokens created by user
- [ ] Display token holders count
- [ ] Show current trading volume on Qiedex
- [ ] Add liquidity management UI

### Phase 4: Advanced Features (Optional)
- [ ] Token vesting schedules
- [ ] Governance features (voting)
- [ ] Staking mechanisms
- [ ] NFT integration (QIE721)

---

## Troubleshooting

### "Wallet Not Connected"
→ Click "Connect Wallet" and approve connection

### "Please switch to QIE Testnet"
→ Click network switcher or manually change network in MetaMask

### "Insufficient funds for gas"
→ Visit https://testnet.qie.digital/ and claim QIE from faucet

### "Transaction Failed"
→ Check:
- Wallet has enough QIE
- Connected to correct network (1983)
- Token name/symbol not empty
- Initial supply > 0

### Token not showing in wallet
→ Use "Import Token" in MetaMask with the contract address

---

## Gas Costs (Estimated)

- **Token Creation**: ~0.001-0.003 QIE
- **Token Transfer**: ~0.0001 QIE
- **Approve/Allowance**: ~0.0001 QIE

Make sure to keep at least 0.01 QIE in wallet for operations.

---

## Contract Source Verification

To verify the TokenFactory contract on QIE explorer:
```bash
cd contracts
npx hardhat verify --network qieTestnet 0xfa1a836DB0307bd214E8f3b3672b47d53491a29C
```

---

## Summary

✅ **Problem**: Qiedex doesn't support token creation  
✅ **Solution**: Direct TokenFactory deployment on TokeDex  
✅ **Status**: Fully functional and tested  
✅ **Live**: http://localhost:5173 (dev) | Ready for production  

Users can now create unlimited tokens without leaving TokeDex!
