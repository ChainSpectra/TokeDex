import React from 'react'
import { ChevronDown } from 'lucide-react'
import { WalletDiagnostic } from './WalletDiagnostic'

/**
 * Debug panel that can be toggled to show wallet diagnostics
 * Only visible in development - remove for production
 */
export function DebugPanel() {
    const [isOpen, setIsOpen] = React.useState(false)

    // Only show in development
    if (process.env.NODE_ENV !== 'development') {
        return null
    }

    return (
        <div className="fixed bottom-4 right-4 z-40">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-purple-500/50 text-purple-400 rounded-lg hover:bg-gray-700 transition"
            >
                🔧 Debug
                <ChevronDown size={18} className={`transition ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute bottom-16 right-0 w-80 max-h-96 overflow-y-auto">
                    <WalletDiagnostic />
                </div>
            )}
        </div>
    )
}
