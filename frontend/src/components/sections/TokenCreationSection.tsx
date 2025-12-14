
import { motion } from 'framer-motion'
import DirectTokenCreator from '../DirectTokenCreator'

export default function TokenCreationSection() {
    return (
        <section className="relative py-20 bg-gradient-to-b from-gray-900 to-gray-800">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 right-0 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 left-0 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                        Create Your Custom Token
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Launch your business token on QIE Testnet with zero code.
                        Deploy ERC20 tokens instantly using our TokenFactory.
                    </p>
                </motion.div>

                {/* Token creation flow component */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <DirectTokenCreator />
                </motion.div>

                {/* Info cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="mt-16 grid md:grid-cols-3 gap-6"
                >
                    {[
                        {
                            title: 'No Code Required',
                            description: 'Create tokens without writing a single line of Solidity',
                            icon: '✨',
                        },
                        {
                            title: 'ERC20 Compliant',
                            description: 'All tokens are fully ERC20-compliant using OpenZeppelin',
                            icon: '✅',
                        },
                        {
                            title: 'Instant Trading',
                            description: 'Created tokens can be traded immediately on SimpleDEX',
                            icon: '⚡',
                        },
                    ].map((card, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50
                        border border-gray-700 rounded-lg p-6
                        hover:border-purple-500/50 transition-colors duration-300"
                        >
                            <div className="text-4xl mb-3">{card.icon}</div>
                            <h3 className="text-lg font-semibold text-white mb-2">{card.title}</h3>
                            <p className="text-gray-400 text-sm">{card.description}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
