# How to Use TokeDex - Quick Start Guide

## 🚀 Creating Your First Token

### Step 1: Connect Your Wallet
1. Visit http://localhost:5173 (or your deployed URL)
2. Click **"Connect Wallet"** button in the top right
3. Approve the connection in MetaMask
4. Make sure you're on **QIE Testnet** (Chain ID: 1983)

### Step 2: Get QIE Tokens for Gas
1. You need QIE tokens to pay for transaction gas fees
2. Visit the QIE Faucet: https://testnet.qie.digital/
3. Request tokens (you'll get ~2 QIE per day)
4. Wait for the transaction to confirm

### Step 3: Create Your Token
1. Click **"Create Token"** button in the navbar
2. Fill in the token details:
   - **Token Name**: Full name (e.g., "My Business Rewards")
   - **Token Symbol**: Short code (e.g., "MBR") - 3-5 characters
   - **Initial Supply**: Number of tokens to create (e.g., 1000000)
   - **Decimals**: Choose 18 (standard) or customize
3. Click **"Create Token"** button
4. **Confirm the transaction** in MetaMask popup
5. Wait for blockchain confirmation (~5-10 seconds)

### Step 4: Import Your Token to Wallet
**IMPORTANT**: Custom tokens don't automatically appear in MetaMask!

After creation succeeds:
1. You'll see a success screen with your token details
2. Click the green **"Add to Wallet"** button
3. Approve in MetaMask
4. Your tokens will now appear in MetaMask's token list! 🎉

**Alternative Manual Import**:
1. Open MetaMask
2. Scroll down and click "Import tokens"
3. Paste your token contract address (shown on success screen)
4. Token symbol and decimals auto-fill
5. Click "Add custom token"

---

## 👀 Viewing Your Created Tokens

### Option 1: My Tokens Dashboard (Recommended)
1. Visit http://localhost:5173
2. Click **"My Tokens"** in the navigation menu
3. You'll see all tokens you've created displayed as cards
4. Each card shows:
   - Token name and symbol
   - Total supply
   - Contract address
   - Quick action buttons

### Option 2: MetaMask Wallet
After importing (Step 4 above):
1. Open MetaMask
2. Select "Assets" tab
3. Scroll down to see your custom tokens
4. You'll see your token symbol (e.g., TDX) with full balance

### Option 3: Blockchain Explorer
1. Go to https://testnet.qie.digital/
2. Paste your token contract address in search
3. View all transactions, holders, and supply
4. This is the official source of truth

---

## 🎯 Managing Your Tokens (My Tokens Dashboard)

Once you're on the "My Tokens" page, you can:

### View Token Details
- See total supply in circulation
- Check contract address
- Monitor active status

### Quick Actions Available:

#### 1️⃣ **Add to Wallet**
- Click the green "Add to Wallet" button
- Imports token to MetaMask instantly
- Only needed once per token

#### 2️⃣ **View on Explorer**
- Click "Explorer" button
- Opens QIE Testnet block explorer
- See full contract details, transactions, holders

#### 3️⃣ **Trade on Qiedex**
- Click "Trade" button
- Opens Qiedex DEX with your token pre-filled
- You'll need to create a liquidity pool first (see below)

---

## 💰 Trading Your Token (Next Steps)

### Create Liquidity Pool
After creating a token, it's not tradeable until you add liquidity:

1. Click **"Trade"** button from My Tokens dashboard
2. You'll be redirected to Qiedex (https://www.dex.qie.digital)
3. Navigate to **"Pool"** or **"Add Liquidity"** section
4. Create a trading pair:
   - Your Token (e.g., TDX)
   - Paired with QIE or wUSDC
5. Add initial liquidity (e.g., 100,000 TDX + 10 QIE)
6. Now anyone can trade your token!

### Swap/Trade Tokens
Once liquidity exists:
- Use the "Swap" feature on Qiedex
- Exchange your token for QIE, wUSDC, or other tokens
- Prices determined by AMM algorithm (supply/demand)

---

## 🔧 Troubleshooting

### "Token Not Showing in MetaMask"
✅ **Solution**: You need to manually import it using "Add to Wallet" button

### "Insufficient Funds for Gas"
✅ **Solution**: Get more QIE from faucet: https://testnet.qie.digital/

### "Wrong Network"
✅ **Solution**: Switch to QIE Testnet (Chain ID 1983) in MetaMask

### "Transaction Failed"
✅ **Check**:
- Wallet has enough QIE for gas (at least 0.001 QIE)
- Connected to correct network
- Token name/symbol not empty
- Initial supply > 0

### "I See 100 QieTestnet Tokens, Not My TDX Token"
✅ **Explanation**: 
- "QieTestnet" = Native QIE tokens (gas currency) - shows automatically
- "TDX" or your custom token = Must be imported manually (see Step 4 above)

---

## 📊 Understanding Token Types

### QIE Tokens (Native)
- Native blockchain currency (like ETH on Ethereum)
- Used for gas fees
- Shows automatically in wallet
- Get from faucet

### Custom Tokens (Your Tokens)
- ERC20 tokens you create (TDX, MBR, etc.)
- Used for business rewards, loyalty programs, etc.
- Must be imported to wallet manually
- Can be traded on Qiedex DEX

---

## ✨ Key Features Summary

| Feature | Location | What It Does |
|---------|----------|--------------|
| **Create Token** | Navbar → "Create Token" button | Deploy new ERC20 token |
| **My Tokens** | Navbar → "My Tokens" link | View all your created tokens |
| **Add to Wallet** | My Tokens → Green button | Import token to MetaMask |
| **Explorer** | My Tokens → "Explorer" button | View on blockchain |
| **Trade** | My Tokens → "Trade" button | Open Qiedex DEX |

---

## 🎓 Example Walkthrough

**Scenario**: Create a "Coffee Shop Rewards" token

1. **Connect Wallet** ✅
2. **Get 2 QIE** from faucet ✅
3. **Click "Create Token"** ✅
4. **Fill Details**:
   - Name: "Coffee Shop Rewards"
   - Symbol: "CSR"
   - Supply: 100000
   - Decimals: 18
5. **Confirm in MetaMask** ✅
6. **Wait 10 seconds** for confirmation ✅
7. **Click "Add to Wallet"** ✅
8. **Check MetaMask** → See 100,000 CSR tokens ✅
9. **Go to "My Tokens"** → See CSR card ✅
10. **Create liquidity pool** on Qiedex (100,000 CSR + 5 QIE) ✅
11. **Start trading!** 🎉

---

## 📞 Need Help?

- Check the blockchain explorer: https://testnet.qie.digital/
- View your token contract address from "My Tokens" page
- Make sure you've imported token to MetaMask
- Ensure you're on QIE Testnet (Chain ID 1983)

---

## 🔗 Important Links

- **TokeDex App**: http://localhost:5173 (dev) or your deployment URL
- **QIE Faucet**: https://testnet.qie.digital/
- **Block Explorer**: https://testnet.qie.digital/
- **Qiedex DEX**: https://www.dex.qie.digital/
- **TokenFactory Contract**: 0xfa1a836DB0307bd214E8f3b3672b47d53491a29C

---

**Ready to tokenize your business? Start creating! 🚀**
