import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import DirectTokenCreator from '../DirectTokenCreator'

interface TokenCreationModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function TokenCreationModal({ isOpen, onClose }: TokenCreationModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        className="relative max-h-[90vh] overflow-y-auto bg-gray-900 rounded-xl border border-purple-500/20 shadow-2xl max-w-2xl w-full"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-800 rounded-lg transition-colors"
                            aria-label="Close modal"
                        >
                            <X className="w-6 h-6 text-gray-400 hover:text-white" />
                        </button>

                        {/* Modal Body */}
                        <div className="p-8">
                            <DirectTokenCreator />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
