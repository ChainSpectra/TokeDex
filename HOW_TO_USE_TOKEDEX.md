# How to Use TokeDex - Complete Guide

Welcome to TokeDex! This guide will walk you through creating tokens, trading on SimpleDEX, and exploring liquidity pools.

---

## 🚀 Getting Started

### Step 1: Connect Your Wallet
1. Visit your TokeDex deployment (e.g., http://localhost:5173)
2. Click **"Connect Wallet"** button in the top right
3. Approve the connection in MetaMask
4. Ensure you're on **QIE Testnet** (Chain ID: 1983)

### Step 2: Get QIE Tokens for Gas
1. You need QIE tokens to pay for transaction gas fees
2. Visit the QIE Faucet: https://www.qie.digital/faucet
3. Request tokens (you'll get test QIE)
4. Wait for the transaction to confirm (~5-10 seconds)

---

## 💎 Creating Your First Token

### Step 1: Open Token Creator
1. Click **"Create Token"** button in the navbar
2. The DirectTokenCreator interface will open

### Step 2: Fill in Token Details
- **Token Name**: Full name (e.g., "Coffee Shop Rewards")
- **Token Symbol**: Short code (e.g., "CSR") - 3-5 characters recommended
- **Initial Supply**: Number of tokens to create (e.g., 1000000)
- **Decimals**: Choose 18 (standard) or customize (0-18)

### Step 3: Deploy Your Token
1. Click **"Create Token"** button
2. **Confirm the transaction** in MetaMask popup
3. Wait for blockchain confirmation (~5-10 seconds)
4. Success! Your token contract address will be displayed

### Step 4: Add Token to Wallet
**IMPORTANT**: Custom tokens don't automatically appear in MetaMask!

After creation succeeds:
1. Copy the token contract address
2. Open MetaMask
3. Click "Import tokens" → "Custom token"
4. Paste your token contract address
5. Token symbol and decimals auto-fill
6. Click "Add custom token"
7. Your tokens will now appear in MetaMask! 🎉

---

## 📊 Viewing Your Tokens

### My Tokens Dashboard
1. Click **"My Tokens"** in the navigation menu
2. You'll see all tokens you've created displayed as cards
3. Each card shows:
   - Token name and symbol
   - Total supply
   - Contract address
   - Quick action buttons

### Quick Actions Available:

#### 🔗 **View on Explorer**
- Click "Explorer" button
- Opens QIE Testnet block explorer
- See full contract details, transactions, holders

#### 💱 **Trade**
- Click "Trade" button
- Opens SimpleDEX interface with your token pre-filled
- Ready to swap or add liquidity

---

## 💱 Trading on SimpleDEX

SimpleDEX is TokeDex's built-in decentralized exchange with three main features:

### 1. Swap Tokens

**How to Swap:**
1. Go to "My Tokens" → Click "Trade" on any token
2. Select the **"Swap"** tab
3. Choose tokens:
   - **Token A**: Token you want to sell
   - **Token B**: Token you want to buy
4. Enter amount to swap
5. Review the calculated output amount
6. Set slippage tolerance (default: 0.5%)
7. Click **"Approve"** (first time only for each token)
8. Click **"Swap"**
9. Confirm transaction in MetaMask

**Important Notes:**
- A liquidity pool must exist for the token pair
- Prices are determined by pool reserves (AMM formula)
- 0.3% fee is charged on each swap

### 2. Add Liquidity

**Creating a New Pool:**
1. Select the **"Liquidity"** tab
2. Choose two tokens (e.g., YourToken / WQIE)
3. Enter amounts for both tokens
4. Click **"Approve"** for both tokens
5. Click **"Create Pool"**
6. Confirm transaction
7. You'll receive LP (Liquidity Provider) tokens

**Adding to Existing Pool:**
1. Select the **"Liquidity"** tab
2. Choose the token pair
3. Enter amount for one token
4. The other amount is calculated automatically (maintains ratio)
5. Click **"Add Liquidity"**
6. Receive additional LP tokens

**Benefits of Providing Liquidity:**
- Earn 0.3% of all trading fees
- LP tokens represent your share of the pool
- Can remove liquidity anytime

### 3. Pools Explorer ✨ NEW!

**Discovering Pools:**
1. Select the **"Pools"** tab
2. View all available liquidity pools
3. Each pool card shows:
   - Token pair names (e.g., "MBT / ATT")
   - Reserve amounts for both tokens
   - Current price ratio
   - Total liquidity
   - Action buttons

**Pool Actions:**
- **Trade**: Navigate to Swap tab with tokens pre-filled
- **Add Liquidity**: Navigate to Liquidity tab with tokens pre-filled

**Pool Information:**
- **Reserves**: Amount of each token in the pool
- **Price**: Current exchange rate (1 TokenA = X TokenB)
- **Liquidity**: Total value locked in the pool

---

## 🔄 Complete Trading Workflow Example

**Scenario**: Create a "Coffee Rewards" token and enable trading

### Phase 1: Token Creation
1. ✅ Connect wallet
2. ✅ Get 2 QIE from faucet
3. ✅ Click "Create Token"
4. ✅ Fill details:
   - Name: "Coffee Shop Rewards"
   - Symbol: "CSR"
   - Supply: 100000
   - Decimals: 18
5. ✅ Confirm transaction
6. ✅ Add token to MetaMask

### Phase 2: Create Liquidity Pool
1. ✅ Go to "My Tokens" → Click "Trade" on CSR
2. ✅ Select "Liquidity" tab
3. ✅ Choose tokens: CSR / WQIE
4. ✅ Enter amounts: 50,000 CSR + 5 QIE
5. ✅ Approve both tokens
6. ✅ Click "Create Pool"
7. ✅ Receive LP tokens

### Phase 3: Trading is Live!
1. ✅ Go to "Pools" tab → See your CSR/WQIE pool
2. ✅ Others can now swap CSR ↔ WQIE
3. ✅ You earn 0.3% of all trades
4. ✅ Pool appears in Pools Explorer for discovery

---

## 🔧 Troubleshooting

### "Token Not Showing in MetaMask"
✅ **Solution**: You need to manually import it:
- MetaMask → Import tokens → Custom token
- Paste contract address
- Click "Add custom token"

### "Insufficient Funds for Gas"
✅ **Solution**: Get more QIE from faucet:
- Visit: https://www.qie.digital/faucet
- Request test QIE
- Wait for confirmation

### "Wrong Network"
✅ **Solution**: Switch to QIE Testnet:
- Open MetaMask
- Click network dropdown
- Select "QIE Testnet" or add it manually:
  - RPC: `https://rpc1testnet.qie.digital`
  - Chain ID: `1983`

### "Pool Does Not Exist"
✅ **Solution**: Create a liquidity pool first:
- Go to "Liquidity" tab
- Create pool with your token + another token (WQIE recommended)
- Add initial liquidity

### "Transaction Failed"
✅ **Check**:
- Wallet has enough QIE for gas (at least 0.01 QIE)
- Connected to correct network (Chain ID 1983)
- Token approvals are confirmed
- Slippage tolerance is appropriate (try 1-2% for volatile pairs)

### "Swap Output Too Low"
✅ **Reasons**:
- Low liquidity in pool (add more liquidity)
- High slippage (increase tolerance or reduce swap amount)
- Price impact too high (swap smaller amounts)

---

## 📖 Understanding Key Concepts

### What is a Liquidity Pool?
A liquidity pool is a smart contract that holds two tokens and enables trading between them. When you add liquidity, you deposit both tokens in equal value, and traders can swap between them.

### What are LP Tokens?
LP (Liquidity Provider) tokens represent your share of a liquidity pool. They entitle you to:
- Your proportional share of the pool
- Your share of trading fees (0.3%)
- Ability to remove liquidity anytime

### How is Price Determined?
SimpleDEX uses an Automated Market Maker (AMM) with the constant product formula:
```
x * y = k
```
Where:
- x = Reserve of Token A
- y = Reserve of Token B
- k = Constant

Price adjusts automatically based on supply and demand.

### What is Slippage?
Slippage is the difference between expected and actual trade price. It occurs when:
- Pool liquidity is low
- Trade size is large relative to pool
- Other trades happen before yours

**Recommended slippage**: 0.5% for stable pairs, 1-2% for volatile pairs

---

## ✨ Pro Tips

### For Token Creators:
1. **Start with good liquidity**: Add at least 10-20% of total supply to initial pool
2. **Choose the right pair**: Pair with WQIE for maximum accessibility
3. **Monitor your pool**: Check reserves and trading volume regularly
4. **Provide ongoing liquidity**: Add more as trading volume grows

### For Traders:
1. **Check pool liquidity**: Larger pools = better prices
2. **Use appropriate slippage**: Start with 0.5%, increase if needed
3. **Split large trades**: Multiple smaller swaps may get better prices
4. **Verify token addresses**: Always double-check before trading

### For Liquidity Providers:
1. **Understand impermanent loss**: Price changes can affect your returns
2. **Diversify**: Provide liquidity to multiple pools
3. **Monitor fees earned**: Track your LP token value over time
4. **Remove liquidity carefully**: Consider gas costs vs. value

---

## 🔗 Important Links

- **TokeDex App**: http://localhost:5173 (dev) or your deployment URL
- **QIE Faucet**: https://www.qie.digital/faucet
- **Block Explorer**: https://testnet.qie.digital
- **TokenFactory Contract**: [0xfa1a836DB0307bd214E8f3b3672b47d53491a29C](https://testnet.qie.digital/address/0xfa1a836DB0307bd214E8f3b3672b47d53491a29C)
- **SimpleDEX Contract**: [0xe6E42ee1E5e8BB0dc947fC40079ae22370200048](https://testnet.qie.digital/address/0xe6E42ee1E5e8BB0dc947fC40079ae22370200048)

---

## 📞 Need Help?

- Check the blockchain explorer for transaction details
- View your token contract address from "My Tokens" page
- Ensure you're on QIE Testnet (Chain ID 1983)
- Make sure you have enough QIE for gas fees

---

**Ready to start? Create your first token and join the TokeDex ecosystem!** 🚀
