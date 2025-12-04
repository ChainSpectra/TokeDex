import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useAccount } from 'wagmi';
import { WalletConnector } from '../WalletConnector';
import { NetworkSwitcher } from '../NetworkSwitcher';
import { QIEFaucet } from '../QIEFaucet';

interface WalletModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// Helper component to conditionally show faucet
const QIEFaucetWrapper = () => {
    const { isConnected } = useAccount();
    if (!isConnected) return null;
    return <QIEFaucet />;
};

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-lg bg-dark-800 rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Animated Background Gradient */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-primary-cyan/10 via-primary-purple/10 to-primary-pink/10 opacity-50"
                                animate={{
                                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                }}
                                transition={{
                                    duration: 10,
                                    repeat: Infinity,
                                    ease: 'linear',
                                }}
                                style={{
                                    backgroundSize: '200% 200%',
                                }}
                            />

                            {/* Content */}
                            <div className="relative z-10 p-10">
                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors"
                                    aria-label="Close modal"
                                >
                                    <X size={24} className="text-gray-400" />
                                </button>

                                {/* Logo */}
                                <div className="flex justify-center mb-8">
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-cyan via-primary-purple to-primary-pink glow-gradient flex items-center justify-center">
                                        <span className="text-3xl font-bold">Q</span>
                                    </div>
                                </div>

                                {/* Title */}
                                <h2 className="text-4xl font-bold text-center mb-3">
                                    <span className="gradient-text">Connect Wallet</span>
                                </h2>
                                <p className="text-gray-400 text-center mb-10 text-base">
                                    Connect your wallet to start trading on TokeDex
                                </p>

                                {/* Main Content */}
                                <div className="space-y-5">
                                    {/* Network Status */}
                                    <NetworkSwitcher />

                                    {/* Wallet Connector */}
                                    <WalletConnector />

                                    {/* QIE Faucet - Shows after connection */}
                                    <QIEFaucetWrapper />
                                </div>

                                {/* Info Footer */}
                                <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                    <p className="text-xs text-gray-400 text-center">
                                        🔒 <span className="text-blue-400 font-medium">Secure & Decentralized</span>
                                        <br />
                                        Your wallet, your keys, your crypto. We never store your private keys.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default WalletModal;
