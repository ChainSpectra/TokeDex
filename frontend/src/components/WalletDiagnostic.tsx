import React from 'react'
import { useAccount, useBalance, useChainId } from 'wagmi'
import { QIE_TESTNET_CHAIN_ID, QIE_TESTNET_RPC, QIE_TESTNET_EXPLORER } from '../config/networkConstants'
import { addQIENetwork, switchToQIENetwork } from '../utils/walletUtils'

/**
 * Diagnostic tool to troubleshoot wallet and QIE token issues
 */
export function WalletDiagnostic() {
    const { address, isConnected } = useAccount()
    const chainId = useChainId()
    const { data: balance, refetch } = useBalance({
        address,
        chainId: QIE_TESTNET_CHAIN_ID,
    })

    const [diagnostics, setDiagnostics] = React.useState<Record<string, boolean | string>>({})

    React.useEffect(() => {
        const runDiagnostics = async () => {
            const results: Record<string, boolean | string> = {}

            // Check 1: Wallet connected
            results['Wallet Connected'] = isConnected
            results['Current Chain ID'] = chainId?.toString() || 'Unknown'
            results['Correct Chain (1983)'] = chainId === QIE_TESTNET_CHAIN_ID

            // Check 2: Address
            results['Wallet Address'] = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not connected'

            // Check 3: Balance
            if (balance?.value) {
                const balanceNum = parseFloat((balance.value / BigInt(10 ** 18)).toString())
                results['QIE Balance'] = `${balanceNum.toFixed(4)} QIE`
                results['Has QIE'] = balanceNum > 0
            } else {
                results['QIE Balance'] = 'No balance or loading...'
                results['Has QIE'] = false
            }

            // Check 4: RPC
            try {
                const response = await fetch(QIE_TESTNET_RPC, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ jsonrpc: '2.0', method: 'eth_chainId', params: [], id: 1 }),
                })
                results['RPC Working'] = response.ok
            } catch (e) {
                results['RPC Working'] = false
                results['RPC Error'] = (e as Error).message
            }

            setDiagnostics(results)
        }

        runDiagnostics()
    }, [isConnected, chainId, address, balance])

    const handleAddNetwork = async () => {
        try {
            await addQIENetwork()
            alert('✅ QIE Testnet added to wallet!')
        } catch (error) {
            alert(`❌ Error: ${(error as Error).message}`)
        }
    }

    const handleSwitchNetwork = async () => {
        try {
            await switchToQIENetwork()
            alert('✅ Switched to QIE Testnet!')
        } catch (error) {
            alert(`❌ Error: ${(error as Error).message}`)
        }
    }

    return (
        <div className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 max-w-xl mx-auto my-8">
            <h2 className="text-2xl font-bold text-white mb-4">🔧 Wallet Diagnostic</h2>

            {/* Diagnostics */}
            <div className="space-y-2 mb-6 bg-gray-800/50 rounded-lg p-4">
                {Object.entries(diagnostics).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center text-sm">
                        <span className="text-gray-300">{key}:</span>
                        <span
                            className={`font-semibold ${
                                value === true
                                    ? 'text-green-400'
                                    : value === false
                                      ? 'text-red-400'
                                      : 'text-yellow-400'
                            }`}
                        >
                            {String(value)}
                        </span>
                    </div>
                ))}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
                <button
                    onClick={handleAddNetwork}
                    className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
                >
                    ➕ Add QIE Testnet
                </button>

                <button
                    onClick={handleSwitchNetwork}
                    className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition"
                >
                    🔄 Switch to QIE Testnet
                </button>

                <button
                    onClick={() => refetch()}
                    className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition"
                >
                    🔄 Refresh Balance
                </button>

                <a
                    href={QIE_TESTNET_EXPLORER}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block text-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition"
                >
                    🔗 View on Explorer
                </a>
            </div>

            {/* Instructions */}
            <div className="mt-6 pt-6 border-t border-gray-700 text-sm text-gray-400 space-y-2">
                <p className="font-semibold text-white">Troubleshooting Steps:</p>
                <ol className="list-decimal list-inside space-y-1">
                    <li>Click "Add QIE Testnet" button above</li>
                    <li>Approve the network addition in MetaMask</li>
                    <li>Click "Switch to QIE Testnet" to ensure you're on it</li>
                    <li>Click "Refresh Balance" to load QIE balance</li>
                    <li>If still empty, claim from faucet at {QIE_TESTNET_EXPLORER}</li>
                </ol>
            </div>
        </div>
    )
}
