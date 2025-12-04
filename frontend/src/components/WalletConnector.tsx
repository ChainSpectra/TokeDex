import { useConnect, useAccount, useDisconnect, useBalance, useChainId } from 'wagmi'
import { Wallet, Copy, CheckCircle, LogOut } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { QIE_TESTNET_CHAIN_ID, NETWORK_COLORS } from '../config/networkConstants'
import { formatBalance, shortenAddress, getNetworkName, copyToClipboard, showNotification } from '../utils/walletUtils'

export function WalletConnector() {
  const { connectors, connect, status, error } = useConnect()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const chainId = useChainId()
  const { data: balance } = useBalance({ address })

  const [copied, setCopied] = useState(false)

  const handleCopyAddress = async () => {
    if (!address) return
    try {
      await copyToClipboard(address)
      setCopied(true)
      showNotification('Address copied to clipboard!', 'success', 2000)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      showNotification('Failed to copy address', 'error')
    }
  }

  if (isConnected && address) {
    const networkName = getNetworkName(chainId)
    const isCorrectNetwork = chainId === QIE_TESTNET_CHAIN_ID
    const networkColor = NETWORK_COLORS[chainId as keyof typeof NETWORK_COLORS] || {
      bg: 'bg-gray-500/20',
      text: 'text-gray-400',
      border: 'border-gray-500/30',
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        {/* Network Badge */}
        <div className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg border ${networkColor.bg} ${networkColor.border}`}>
          <div className={`w-2 h-2 rounded-full ${isCorrectNetwork ? 'bg-green-400' : 'bg-orange-400'} animate-pulse`} />
          <span className={`text-sm font-medium ${networkColor.text}`}>
            {networkName}
          </span>
        </div>

        {/* Balance Display */}
        {isCorrectNetwork && balance && (
          <div className="p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-1">Balance</p>
              <p className="text-3xl font-bold gradient-text">
                {formatBalance(balance.value)}
              </p>
              <p className="text-gray-400 text-sm mt-1">QIE</p>
            </div>
          </div>
        )}

        {/* Address Display */}
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-xs mb-1">Connected Address</p>
              <p className="text-white font-mono text-sm">
                {shortenAddress(address, 6)}
              </p>
            </div>
            <button
              onClick={handleCopyAddress}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Copy address"
            >
              {copied ? (
                <CheckCircle size={18} className="text-green-400" />
              ) : (
                <Copy size={18} className="text-gray-400" />
              )}
            </button>
          </div>

          {/* Disconnect Button */}
          <button
            onClick={() => disconnect()}
            className="w-full flex items-center justify-center gap-2 px-4 py-3
              bg-red-600/20 hover:bg-red-600/30 border border-red-600/30
              text-red-400 font-semibold rounded-lg
              transition-all duration-300"
          >
            <LogOut size={18} />
            Disconnect Wallet
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-white mb-2">
          Choose Your Wallet
        </h3>
        <p className="text-sm text-gray-400">
          Connect with one of our available wallet providers
        </p>
      </div>

      {connectors.map((connector) => (
        <motion.button
          key={connector.uid}
          onClick={() => connect({ connector })}
          disabled={status === 'pending'}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 w-full px-5 py-4 
            bg-gradient-to-r from-blue-600/20 to-purple-600/20
            hover:from-blue-600/30 hover:to-purple-600/30
            border border-blue-500/30 hover:border-blue-500/50
            text-white rounded-xl font-semibold 
            transition-all duration-300 
            disabled:opacity-50 disabled:cursor-not-allowed
            shadow-lg hover:shadow-xl"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <Wallet className="w-5 h-5" />
          </div>
          <div className="flex-1 text-left">
            <div className="font-semibold">Connect {connector.name}</div>
            {status === 'pending' && (
              <div className="text-xs text-gray-400">Connecting...</div>
            )}
          </div>
          {status === 'pending' && (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
          )}
        </motion.button>
      ))}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-sm text-center bg-red-400/10 border border-red-400/20 rounded-lg p-3"
        >
          <p className="font-medium mb-1">Connection Error</p>
          <p className="text-xs text-gray-400">{error.message}</p>
        </motion.div>
      )}

      <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <p className="text-xs text-gray-400 text-center">
          💡 <span className="text-blue-400 font-medium">Tip:</span> Make sure you have MetaMask or another Web3 wallet installed
        </p>
      </div>
    </div>
  )
}