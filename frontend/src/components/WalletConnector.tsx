import { useConnect, useAccount, useDisconnect } from 'wagmi'
import { Wallet } from 'lucide-react'

export function WalletConnector() {
  const { connectors, connect, status, error } = useConnect()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <div className="flex items-center gap-3">
        <div className="text-sm">
          <div className="text-gray-300">Connected:</div>
          <div className="font-mono text-xs text-blue-400">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </div>
        </div>
        <button
          onClick={() => disconnect()}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors"
        >
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          onClick={() => connect({ connector })}
          disabled={status === 'pending'}
          className="flex items-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50"
        >
          <Wallet className="w-5 h-5" />
          Connect {connector.name}
          {status === 'pending' && ' (connecting...)'}
        </button>
      ))}
      {error && (
        <div className="text-red-400 text-sm mt-2">
          Error: {error.message}
        </div>
      )}
    </div>
  )
}