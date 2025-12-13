# Qiedex Token Creation Integration - Option 1

## Overview

This integration allows users to create custom tokens on QIE Testnet using Qiedex's free token creator, then import those tokens back into TokeDex for management and tracking.

## Architecture

### Flow

```
User enters token details in TokeDex
    ↓
Generates deep-link to Qiedex with pre-filled params
    ↓
User redirected to Qiedex (www.dex.qie.digital)
    ↓
User creates token on Qiedex (approval required)
    ↓
User copies token address from Qiedex
    ↓
User returns to TokeDex and pastes token address
    ↓
TokenImporter fetches metadata from chain
    ↓
User adds token to wallet
    ↓
Token appears in user's wallet and is fully usable
```

## Components

### 1. **qiedexLinks.ts** (`frontend/src/utils/qiedexLinks.ts`)
Utility functions for generating and managing Qiedex deep-links:
- `generateQiedexTokenLink(params)` - Creates a URL with pre-filled token parameters
- `redirectToQiedexTokenCreator(params)` - Opens Qiedex in a new tab
- `getQiedexInstructions()` - Provides step-by-step guidance for users

### 2. **TokenImporter.tsx** (Enhanced)
Updated to fetch token metadata from the blockchain:
- Validates token address format
- Calls `publicClient.readContract()` to fetch name, symbol, decimals
- Displays fetched metadata
- Integrates with wallet to add token

### 3. **QiedexTokenCreationFlow.tsx** (`frontend/src/components/QiedexTokenCreationFlow.tsx`)
Three-step UI component:
1. **Collect** - Gather token name, symbol, supply, decimals, and description
2. **Instructions** - Display step-by-step guide after redirect
3. **Import** - Paste token address and import with metadata

### 4. **TokenCreationSection.tsx** (`frontend/src/components/sections/TokenCreationSection.tsx`)
Section component for adding to the main landing page with info cards.

## Usage

### In a Page/Component

```tsx
import { QiedexTokenCreationFlow } from '../components/QiedexTokenCreationFlow'

export function MyTokenCreationPage() {
  return (
    <QiedexTokenCreationFlow
      onTokenCreated={(tokenData) => {
        console.log('Token created:', tokenData)
        // Handle token creation side effects
      }}
    />
  )
}
```

### In App.tsx (To add the full section)

```tsx
import TokenCreationSection from './components/sections/TokenCreationSection'

function App() {
  return (
    <div>
      {/* ...other sections... */}
      <TokenCreationSection />
      {/* ...other sections... */}
    </div>
  )
}
```

## Configuration

Key environment/network config is in `frontend/src/config/networkConstants.ts`:

```typescript
export const QIEDEX_URL = 'https://www.dex.qie.digital'
export const QIEDEX_TOKEN_CREATOR_PATH = '/token-creator' // Adjust if needed
export const QIE_TESTNET_CHAIN_ID = 1983
export const QIE_TESTNET_RPC = 'https://rpc1testnet.qie.digital'
export const QIE_TESTNET_EXPLORER = 'https://testnet.qie.digital'
```

## Dependencies

- `wagmi` - For blockchain reads (token metadata)
- `framer-motion` - For UI animations
- `lucide-react` - For icons
- `viem` - (via wagmi) For contract interactions

## Testing on QIE Testnet

1. **Ensure wallet is configured:**
   - Network: QIE Testnet (1983)
   - RPC: `https://rpc1testnet.qie.digital`
   - Block Explorer: `https://testnet.qie.digital`

2. **Have test tokens:**
   - Use the QIE Faucet to claim test QIE for gas fees

3. **Test the flow:**
   - Click "Create Token on Qiedex"
   - Fill in token details (name, symbol, supply)
   - Click "Create Token on Qiedex" button
   - Approve transaction in wallet
   - Follow instructions on Qiedex
   - Copy token address from Qiedex
   - Return to TokeDex
   - Paste token address in import field
   - Click "Add to Wallet"
   - Verify token appears in wallet

4. **Verify on explorer:**
   - Check token on https://testnet.qie.digital
   - View token transfers and holders

## Future Enhancements (Option 2)

Once QIE provides the factory contract address and API:
1. Replace deep-link redirection with direct contract calls
2. Show token creation progress in real-time
3. Automatically add liquidity to Qiedex pair
4. Integrate with business metadata storage (if needed)

## Notes

- **No private keys exposed**: All operations are user-initiated through wallet approvals
- **Qiedex handles token deployment**: Our role is UX and metadata collection
- **One-way flow (for now)**: Token creation happens on Qiedex; we import the result
- **Mobile-friendly**: All components are responsive and work on mobile browsers with mobile wallets

## Troubleshooting

### Token address not found after import
- Ensure address is correct (starts with `0x`, 42 characters)
- Wait a few blocks for the token to propagate on the chain
- Verify on explorer: https://testnet.qie.digital

### Metadata not fetching
- Ensure RPC is reachable: `https://rpc1testnet.qie.digital`
- Token may not be a standard ERC20 (check implementation)
- Check browser console for detailed error logs

### Wallet not connecting
- Verify wallet is set to QIE Testnet (chainId 1983)
- Try switching networks in wallet settings
- Disconnect and reconnect wallet

## Security Considerations

- All token creation is validated through Qiedex's audited contracts
- User controls approval at every step
- No private keys or seed phrases are collected
- All metadata fetching is read-only (no state changes)
