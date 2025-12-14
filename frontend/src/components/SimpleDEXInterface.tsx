import { useState, useEffect } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { parseUnits, formatUnits } from 'viem'
import { SIMPLE_DEX_ADDRESS, SIMPLE_DEX_ABI, QIE_TESTNET_EXPLORER } from '../config/networkConstants'
import { ArrowDownUp, Plus, Loader2, CheckCircle, AlertCircle, ExternalLink, Droplet } from 'lucide-react'
import TokenApprovalHelper from './TokenApprovalHelper'

interface SimpleDEXProps {
  defaultTokenAddress?: string
}

type Tab = 'swap' | 'liquidity'

export default function SimpleDEXInterface({ defaultTokenAddress }: SimpleDEXProps) {
  const { isConnected } = useAccount()

  const [activeTab, setActiveTab] = useState<Tab>('swap')
  const [tokenA, setTokenA] = useState(defaultTokenAddress || '')
  const [tokenB, setTokenB] = useState('') // Will use WETH or another token
  const [amountA, setAmountA] = useState('')
  const [amountB, setAmountB] = useState('')
  const [slippage, setSlippage] = useState('0.5')

  const [error, setError] = useState('')

  const { data: hash, isPending, writeContract } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  // Validate addresses
  const isValidAddress = (addr: string) => /^0x[a-fA-F0-9]{40}$/.test(addr)
  const tokenAValid = isValidAddress(tokenA)
  const tokenBValid = isValidAddress(tokenB)

  // Check if pool exists
  const { data: poolId } = useReadContract({
    address: SIMPLE_DEX_ADDRESS,
    abi: SIMPLE_DEX_ABI,
    functionName: 'getPoolId',
    args: tokenAValid && tokenBValid ? [tokenA as `0x${string}`, tokenB as `0x${string}`] : undefined
  })

  // Get pool reserves
  const { data: reserves } = useReadContract({
    address: SIMPLE_DEX_ADDRESS,
    abi: SIMPLE_DEX_ABI,
    functionName: 'getReserves',
    args: poolId ? [poolId] : undefined
  })

  const handleCreatePool = async () => {
    if (!isConnected || !tokenA || !tokenB || !amountA || !amountB) {
      setError('Please fill in all fields')
      return
    }

    try {
      setError('')
      const decimalsA = 18 // Simplified - fetch from token in production
      const decimalsB = 18

      writeContract({
        address: SIMPLE_DEX_ADDRESS,
        abi: SIMPLE_DEX_ABI,
        functionName: 'createPool',
        args: [
          tokenA as `0x${string}`,
          tokenB as `0x${string}`,
          parseUnits(amountA, decimalsA),
          parseUnits(amountB, decimalsB)
        ]
      })
    } catch (err: any) {
      setError(err.message || 'Failed to create pool')
    }
  }

  const handleSwap = async () => {
    if (!isConnected || !tokenA || !tokenB || !amountA) {
      setError('Please fill in all fields')
      return
    }

    if (!poolId || !reserves) {
      setError('No liquidity pool exists. Create one in the Liquidity tab first.')
      return
    }

    if (!amountB || parseFloat(amountB) === 0) {
      setError('Invalid output amount. Pool may have insufficient liquidity.')
      return
    }

    try {
      setError('')
      const decimals = 18
      const minOut = (parseFloat(amountB) * (1 - parseFloat(slippage) / 100)).toString()

      writeContract({
        address: SIMPLE_DEX_ADDRESS,
        abi: SIMPLE_DEX_ABI,
        functionName: 'swap',
        args: [
          poolId as `0x${string}`,
          tokenA as `0x${string}`,
          parseUnits(amountA, decimals),
          parseUnits(minOut, decimals)
        ]
      })
    } catch (err: any) {
      setError(err.message || 'Failed to swap')
    }
  }

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Connect Your Wallet</h3>
        <p className="text-gray-400">Connect your wallet to use the DEX</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-center">SimpleDEX</h2>
      <p className="text-gray-400 mb-6 text-center">
        Trade your tokens on QIE Testnet with 0.3% fee
      </p>

      {/* Tab Switcher */}
      <div className="flex gap-2 mb-6 bg-gray-800/50 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('swap')}
          className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${activeTab === 'swap'
            ? 'bg-gradient-to-r from-purple-600 to-pink-600'
            : 'hover:bg-gray-700/50'
            }`}
        >
          <ArrowDownUp className="w-5 h-5 inline mr-2" />
          Swap
        </button>
        <button
          onClick={() => setActiveTab('liquidity')}
          className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${activeTab === 'liquidity'
            ? 'bg-gradient-to-r from-purple-600 to-pink-600'
            : 'hover:bg-gray-700/50'
            }`}
        >
          <Droplet className="w-5 h-5 inline mr-2" />
          Liquidity
        </button>
      </div>

      <div className="bg-gray-800/50 rounded-lg p-6">
        {activeTab === 'swap' ? (
          <SwapInterface
            tokenA={tokenA}
            tokenB={tokenB}
            amountA={amountA}
            amountB={amountB}
            slippage={slippage}
            poolId={poolId}
            reserves={reserves}
            setTokenA={setTokenA}
            setTokenB={setTokenB}
            setAmountA={setAmountA}
            setAmountB={setAmountB}
            setSlippage={setSlippage}
            onSwap={handleSwap}
            isPending={isPending}
            isConfirming={isConfirming}
            error={error}
            hash={hash}
          />
        ) : (
          <LiquidityInterface
            tokenA={tokenA}
            tokenB={tokenB}
            amountA={amountA}
            amountB={amountB}
            poolId={poolId}
            reserves={reserves}
            setTokenA={setTokenA}
            setTokenB={setTokenB}
            setAmountA={setAmountA}
            setAmountB={setAmountB}
            onCreatePool={handleCreatePool}
            isPending={isPending}
            isConfirming={isConfirming}
            error={error}
            hash={hash}
          />
        )}
      </div>

      {isSuccess && (
        <div className="mt-4 bg-green-500/10 border border-green-500/50 rounded-lg p-4">
          <CheckCircle className="w-5 h-5 text-green-500 inline mr-2" />
          <span className="text-green-400">Transaction successful!</span>
        </div>
      )}
    </div>
  )
}

// Swap Interface Component
function SwapInterface({ tokenA, tokenB, amountA, amountB, slippage, poolId, reserves, setTokenA, setTokenB, setAmountA, setAmountB, setSlippage, onSwap, isPending, isConfirming, error, hash }: any) {
  const { address } = useAccount()
  const poolExists = !!poolId && !!reserves

  // Validate token address
  const isValidAddress = (addr: string) => /^0x[a-fA-F0-9]{40}$/.test(addr)
  const tokenAValid = isValidAddress(tokenA)

  // Check token approval for swap
  const { data: allowance } = useReadContract({
    address: tokenA as `0x${string}`,
    abi: [{
      "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }],
      "name": "allowance",
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "stateMutability": "view",
      "type": "function"
    }],
    functionName: 'allowance',
    args: address && tokenAValid ? [address, SIMPLE_DEX_ADDRESS] : undefined
  })

  // Safe approval check
  let isApproved = false
  try {
    isApproved = allowance && amountA && parseFloat(amountA) > 0 ? allowance >= parseUnits(amountA, 18) : false
  } catch (err) {
    console.error('Approval check error:', err)
  }

  // Auto-calculate output amount when input changes
  useEffect(() => {
    console.log('=== SWAP CALCULATION DEBUG ===')
    console.log('poolExists:', poolExists)
    console.log('reserves:', reserves)
    console.log('amountA:', amountA)
    console.log('tokenA:', tokenA)
    console.log('tokenB:', tokenB)

    // Early return if prerequisites not met
    if (!amountA || parseFloat(amountA) <= 0) {
      console.log('No amount entered')
      setAmountB('0.0')
      return
    }

    if (!poolExists || !reserves) {
      console.log('Pool does not exist or no reserves')
      setAmountB('0.0')
      return
    }

    if (!tokenA || !tokenB) {
      console.log('Missing token addresses')
      setAmountB('0.0')
      return
    }

    try {
      const amountIn = parseUnits(amountA, 18)
      console.log('amountIn (parsed):', amountIn.toString())

      // Determine if tokenA is the first token in the sorted pair
      const isTokenAFirst = tokenA.toLowerCase() < tokenB.toLowerCase()
      console.log('Token order - isTokenAFirst:', isTokenAFirst)

      // Extract reserves - handle both array and object format
      let reserveIn, reserveOut

      if (Array.isArray(reserves)) {
        console.log('Reserves is array')
        reserveIn = isTokenAFirst ? reserves[0] : reserves[1]
        reserveOut = isTokenAFirst ? reserves[1] : reserves[0]
      } else {
        console.log('Reserves is object:', Object.keys(reserves))
        reserveIn = isTokenAFirst ? reserves.reserveA : reserves.reserveB
        reserveOut = isTokenAFirst ? reserves.reserveB : reserves.reserveA
      }

      console.log('reserveIn:', reserveIn?.toString())
      console.log('reserveOut:', reserveOut?.toString())

      if (!reserveIn || !reserveOut || reserveIn === 0n || reserveOut === 0n) {
        console.error('Invalid reserves:', { reserveIn, reserveOut })
        setAmountB('0.0')
        return
      }

      // AMM formula: (amountIn * 997 * reserveOut) / (reserveIn * 1000 + amountIn * 997)
      const amountInWithFee = amountIn * 997n
      const numerator = amountInWithFee * reserveOut
      const denominator = (reserveIn * 1000n) + amountInWithFee
      const amountOut = numerator / denominator

      const outputAmount = formatUnits(amountOut, 18)
      console.log('✅ Calculated output:', outputAmount)

      setAmountB(outputAmount)
    } catch (err) {
      console.error('❌ Calculation error:', err)
      setAmountB('0.0')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountA, poolId, reserves, poolExists, tokenA, tokenB])

  return (
    <div className="space-y-4">
      {/* Pool Status Banner */}
      {tokenA && tokenB && !poolExists && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
          <AlertCircle className="w-5 h-5 text-red-500 inline mr-2" />
          <span className="text-red-400 text-sm font-semibold">No Pool Found</span>
          <p className="text-red-300/80 text-xs mt-2">
            No liquidity pool exists for this token pair. Switch to the <strong>Liquidity</strong> tab to create one first.
          </p>
        </div>
      )}

      {poolExists && reserves && (
        <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4">
          <CheckCircle className="w-5 h-5 text-green-500 inline mr-2" />
          <span className="text-green-400 text-sm font-semibold">Pool Found</span>
          <p className="text-green-300/80 text-xs mt-1">
            Reserves: {formatUnits((Array.isArray(reserves) ? reserves[0] : reserves.reserveA) || 0n, 18)} / {formatUnits((Array.isArray(reserves) ? reserves[1] : reserves.reserveB) || 0n, 18)}
          </p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">From</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={tokenA}
            onChange={(e) => setTokenA(e.target.value)}
            placeholder="Token A address"
            className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-sm"
          />
        </div>
        <input
          type="number"
          value={amountA}
          onChange={(e) => setAmountA(e.target.value)}
          placeholder="0.0"
          className="w-full mt-2 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3"
        />
      </div>

      <div className="flex justify-center">
        <div className="bg-gray-700 p-2 rounded-lg">
          <ArrowDownUp className="w-5 h-5" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">To (Estimated Output)</label>
        <input
          type="text"
          value={tokenB}
          onChange={(e) => setTokenB(e.target.value)}
          placeholder="Token B address"
          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-sm mb-2"
        />
        <div className="relative">
          <input
            type="text"
            value={amountB || '0.0'}
            readOnly
            placeholder="0.0"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-400 cursor-not-allowed"
          />
          {amountB && parseFloat(amountB) > 0 && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-green-400 font-semibold">
              {parseFloat(amountB).toFixed(6)}
            </div>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-1">Amount is automatically calculated</p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Slippage Tolerance (%)</label>
        <input
          type="number"
          value={slippage}
          onChange={(e) => setSlippage(e.target.value)}
          placeholder="0.5"
          step="0.1"
          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3"
        />
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
          <AlertCircle className="w-5 h-5 text-red-500 inline mr-2" />
          <span className="text-red-400 text-sm">{error}</span>
        </div>
      )}

      {hash && (
        <div className="bg-blue-500/10 border border-blue-500/50 rounded-lg p-4">
          <a
            href={`${QIE_TESTNET_EXPLORER}/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 text-sm inline-flex items-center gap-1"
          >
            View transaction <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}

      {/* Approval Check */}
      {poolExists && tokenA && amountA && parseFloat(amountA) > 0 && !isApproved && (
        <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4">
          <AlertCircle className="w-5 h-5 text-yellow-500 inline mr-2" />
          <span className="text-yellow-400 text-sm font-semibold">Approval Required</span>
          <p className="text-yellow-300/80 text-xs mt-2">
            You need to approve the token before swapping.
          </p>
          <TokenApprovalHelper
            tokenAddress={tokenA}
            amount={amountA}
            tokenSymbol="Token A"
          />
        </div>
      )}

      <button
        onClick={onSwap}
        disabled={isPending || isConfirming || !poolId || !amountA || parseFloat(amountA) === 0 || !isApproved || !amountB || parseFloat(amountB) === 0}
        className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isPending || isConfirming ? (
          <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
        ) : !poolId ? (
          '⚠️ Create Pool First'
        ) : !isApproved && amountA && parseFloat(amountA) > 0 ? (
          '⚠️ Approve Token First'
        ) : !amountB || parseFloat(amountB) === 0 ? (
          '⚠️ Enter Amount'
        ) : (
          'Swap'
        )}
      </button>

      {!poolId && tokenA && tokenB && (
        <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-3">
          <p className="text-yellow-300 text-sm">
            💡 <strong>Next Step:</strong> Switch to the <strong>Liquidity</strong> tab above to create a pool for these tokens.
          </p>
        </div>
      )}
    </div>
  )
}

// Liquidity Interface Component
function LiquidityInterface({ tokenA, tokenB, amountA, amountB, poolId, reserves, setTokenA, setTokenB, setAmountA, setAmountB, onCreatePool, isPending, isConfirming, error, hash }: any) {
  return (
    <div className="space-y-4">
      {/* Important Instructions */}
      {!poolId && tokenA && tokenB && amountA && amountB && (
        <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4">
          <h3 className="text-yellow-300 font-semibold mb-2">⚠️ Before Creating Pool:</h3>
          <ol className="text-yellow-200 text-sm space-y-1 list-decimal list-inside">
            <li>Approve both tokens for SimpleDEX (check approvals below)</li>
            <li>Ensure you have enough balance of both tokens</li>
            <li>The ratio of amounts sets the initial price</li>
          </ol>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">Token A</label>
        <input
          type="text"
          value={tokenA}
          onChange={(e) => setTokenA(e.target.value)}
          placeholder="Token A address (e.g., your TDX token)"
          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-sm mb-2"
        />
        <input
          type="number"
          value={amountA}
          onChange={(e) => setAmountA(e.target.value)}
          placeholder="Amount"
          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3"
        />
      </div>

      <div className="flex justify-center">
        <Plus className="w-6 h-6 text-gray-500" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Token B</label>
        <input
          type="text"
          value={tokenB}
          onChange={(e) => setTokenB(e.target.value)}
          placeholder="Token B address (another token or wrapped QIE)"
          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-sm mb-2"
        />
        <input
          type="number"
          value={amountB}
          onChange={(e) => setAmountB(e.target.value)}
          placeholder="Amount"
          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3"
        />
      </div>

      {/* Approval Status Checkers */}
      {tokenA && amountA && parseFloat(amountA) > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-2">Token Approvals</h3>
          <div className="space-y-2">
            <TokenApprovalHelper
              tokenAddress={tokenA}
              amount={amountA}
              tokenSymbol="Token A"
            />
            {tokenB && amountB && parseFloat(amountB) > 0 && (
              <TokenApprovalHelper
                tokenAddress={tokenB}
                amount={amountB}
                tokenSymbol="Token B"
              />
            )}
          </div>
        </div>
      )}

      {poolId && reserves && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <p className="text-blue-300 text-sm mb-2">✓ Pool Exists</p>
          <p className="text-xs text-gray-400">
            Reserves: {formatUnits(reserves[0], 18)} / {formatUnits(reserves[1], 18)}
          </p>
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
          <AlertCircle className="w-5 h-5 text-red-500 inline mr-2" />
          <span className="text-red-400 text-sm">{error}</span>
        </div>
      )}

      {hash && (
        <div className="bg-blue-500/10 border border-blue-500/50 rounded-lg p-4">
          <a
            href={`${QIE_TESTNET_EXPLORER}/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 text-sm inline-flex items-center gap-1"
          >
            View transaction <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}

      <button
        onClick={onCreatePool}
        disabled={isPending || isConfirming}
        className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isPending || isConfirming ? (
          <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
        ) : poolId ? (
          'Add Liquidity'
        ) : (
          'Create Pool'
        )}
      </button>

      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
        <p className="text-yellow-300 text-sm">
          <strong>Important:</strong> You must approve both tokens before creating/adding liquidity. The initial ratio you set determines the starting price.
        </p>
      </div>
    </div>
  )
}
