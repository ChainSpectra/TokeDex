import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseUnits, formatUnits } from 'viem'
import { SIMPLE_DEX_ADDRESS } from '../config/networkConstants'
import { Check, X, AlertCircle, Loader2 } from 'lucide-react'

const ERC20_ABI = [
  {
    "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }],
    "name": "approve",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }],
    "name": "allowance",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  }
] as const

interface TokenApprovalHelperProps {
  tokenAddress: string
  amount: string
  tokenSymbol?: string
}

export default function TokenApprovalHelper({ tokenAddress, amount, tokenSymbol = 'Token' }: TokenApprovalHelperProps) {
  const { address } = useAccount()

  // Check current allowance
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: ERC20_ABI,
    functionName: 'allowance',
    args: address ? [address, SIMPLE_DEX_ADDRESS] : undefined
  })

  // Check balance
  const { data: balance } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined
  })

  const { data: hash, isPending, writeContract } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash
  })

  // Refetch allowance when transaction succeeds
  if (isSuccess) {
    refetchAllowance()
  }

  const amountBigInt = amount ? parseUnits(amount, 18) : 0n
  const isApproved = allowance ? allowance >= amountBigInt : false
  const hasBalance = balance ? balance >= amountBigInt : false

  const handleApprove = async () => {
    try {
      writeContract({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [SIMPLE_DEX_ADDRESS, parseUnits(amount, 18)]
      })
    } catch (error) {
      console.error('Approval error:', error)
    }
  }

  return (
    <div className="bg-gray-900 rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{tokenSymbol}</span>
        {isApproved ? (
          <span className="flex items-center gap-1 text-green-400 text-xs">
            <Check className="w-4 h-4" /> Approved
          </span>
        ) : (
          <span className="flex items-center gap-1 text-red-400 text-xs">
            <X className="w-4 h-4" /> Not Approved
          </span>
        )}
      </div>

      <div className="space-y-2 text-xs text-gray-400">
        <div className="flex justify-between">
          <span>Balance:</span>
          <span>{balance ? formatUnits(balance, 18) : '0'}</span>
        </div>
        <div className="flex justify-between">
          <span>Required:</span>
          <span>{amount}</span>
        </div>
        <div className="flex justify-between">
          <span>Allowance:</span>
          <span>{allowance ? formatUnits(allowance, 18) : '0'}</span>
        </div>
      </div>

      {!hasBalance && (
        <div className="bg-red-500/10 border border-red-500/50 rounded p-2">
          <AlertCircle className="w-4 h-4 text-red-500 inline mr-1" />
          <span className="text-red-400 text-xs">Insufficient balance!</span>
        </div>
      )}

      {!isApproved && hasBalance && (
        <button
          onClick={handleApprove}
          disabled={isPending || isConfirming}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isPending || isConfirming ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {isPending ? 'Confirm in Wallet...' : 'Approving...'}
            </>
          ) : (
            `Approve ${tokenSymbol}`
          )}
        </button>
      )}

      {isSuccess && (
        <div className="bg-green-500/10 border border-green-500/50 rounded p-2 text-xs text-green-400">
          ✓ Approved successfully!
        </div>
      )}
    </div>
  )
}
