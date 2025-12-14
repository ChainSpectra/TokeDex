import { ethers } from 'ethers'

declare global {
    interface Window {
        ethereum?: ethers.Eip1193Provider & {
            request: (args: { method: string; params?: any[] }) => Promise<any>
            on: (event: string, callback: (...args: any[]) => void) => void
            removeListener: (event: string, callback: (...args: any[]) => void) => void
        }
    }
}

export { }
