# TokeDex Frontend

Modern React application for creating and trading ERC20 tokens on QIE Blockchain.

---

## 🚀 Tech Stack

- **React 19** - UI library with latest features
- **TypeScript** - Type-safe development
- **Vite 7** - Lightning-fast build tool
- **wagmi 3** - React hooks for Ethereum
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons

---

## 📁 Project Structure

```
src/
├── components/
│   ├── DirectTokenCreator.tsx      # Token creation interface
│   ├── MyTokensDashboard.tsx       # User's tokens dashboard
│   ├── SimpleDEXInterface.tsx      # DEX trading interface
│   ├── PoolsExplorer.tsx           # Pool discovery
│   ├── PoolCard.tsx                # Individual pool display
│   ├── TokenImporter.tsx           # Import existing tokens
│   ├── WalletConnector.tsx         # Wallet connection
│   ├── NetworkSwitcher.tsx         # Network switching
│   ├── QIEFaucet.tsx               # Faucet integration
│   ├── layout/                     # Layout components
│   ├── modals/                     # Modal dialogs
│   ├── sections/                   # Page sections
│   └── ui/                         # Reusable UI components
├── config/
│   ├── wagmi.ts                    # wagmi configuration
│   └── networkConstants.ts         # Contract addresses & ABIs
├── utils/
│   └── walletUtils.ts              # Wallet helper functions
├── App.tsx                         # Main application
└── main.tsx                        # Entry point
```

---

## 🛠️ Development

### Prerequisites
- Node.js v18+
- npm or yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Opens at `http://localhost:5173`

### Build for Production
```bash
npm run build
```
Output in `dist/` folder

### Preview Production Build
```bash
npm run preview
```

---

## 🎯 Key Features

### Token Management
- Create custom ERC20 tokens
- View all your created tokens
- Import existing tokens
- Add tokens to wallet

### Decentralized Exchange
- **Swap**: Trade tokens with AMM pricing
- **Liquidity**: Create and manage pools
- **Pools Explorer**: Discover all trading pairs

### User Experience
- Wallet connection (MetaMask, injected providers)
- Network switching to QIE Testnet
- Real-time transaction tracking
- Beautiful animations and transitions

---

## ⚙️ Configuration

### Environment Variables
Create `.env` file (optional):
```env
VITE_WALLET_CONNECT_PROJECT_ID=your_project_id
```

### Network Constants
Edit `src/config/networkConstants.ts`:
```typescript
export const QIE_TESTNET_CHAIN_ID = 1983
export const QIE_TESTNET_RPC = 'https://rpc1testnet.qie.digital'
export const TOKEN_FACTORY_ADDRESS = '0xfa1a836DB0307bd214E8f3b3672b47d53491a29C'
export const SIMPLE_DEX_ADDRESS = '0xe6E42ee1E5e8BB0dc947fC40079ae22370200048'
```

---

## 🎨 Styling

### Tailwind CSS
Custom configuration in `tailwind.config.js`:
- Custom colors for QIE branding
- Gradient utilities
- Animation classes

### Framer Motion
Smooth animations for:
- Page transitions
- Component mounting
- Hover effects
- Loading states

---

## 🔌 Web3 Integration

### wagmi Configuration
```typescript
// src/config/wagmi.ts
import { createConfig, http } from 'wagmi'
import { qieTestnet } from './chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [qieTestnet],
  connectors: [injected()],
  transports: {
    [qieTestnet.id]: http()
  }
})
```

### Contract Interactions
Using wagmi hooks:
- `useWriteContract` - Write operations (create token, swap, etc.)
- `useReadContract` - Read operations (get reserves, pool info, etc.)
- `useWaitForTransactionReceipt` - Transaction confirmation
- `useAccount` - Wallet connection state

---

## 📦 Key Dependencies

```json
{
  "react": "^19.0.0",
  "vite": "^7.2.4",
  "wagmi": "^3.0.0",
  "viem": "^2.0.0",
  "framer-motion": "^12.0.0",
  "lucide-react": "^0.469.0",
  "tailwindcss": "^4.0.0"
}
```

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] Wallet connection works
- [ ] Network switching to QIE Testnet
- [ ] Token creation and deployment
- [ ] Token appears in dashboard
- [ ] SimpleDEX swap functionality
- [ ] Liquidity pool creation
- [ ] Pools Explorer displays pools
- [ ] Navigation between tabs works

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Build Settings
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

---

## 🐛 Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Wallet not connecting
- Check MetaMask is installed
- Verify you're on QIE Testnet
- Try refreshing the page

### Build errors
```bash
npm run build
# Check console for specific errors
```

---

## 📚 Documentation

- [Main README](../README.md)
- [How to Use TokeDex](../HOW_TO_USE_TOKEDEX.md)
- [Pools Explorer Guide](../POOLS_EXPLORER.md)

---

Built with ❤️ using React + Vite + wagmi
