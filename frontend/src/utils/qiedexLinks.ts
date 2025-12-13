/**
 * Qiedex Deep-Link Utility
 * Generates URLs to redirect users to Qiedex token creator with pre-filled parameters
 */

import { QIEDEX_URL } from '../config/networkConstants'

export interface TokenCreationParams {
    name: string
    symbol: string
    initialSupply?: string
    decimals?: number
    description?: string
}

/**
 * Generates a deep-link to Qiedex token creator
 * Note: Adjust query params based on actual Qiedex API/routing once documented
 */
export const generateQiedexTokenLink = (params: TokenCreationParams): string => {
    const queryParams = new URLSearchParams()

    if (params.name) queryParams.append('name', params.name)
    if (params.symbol) queryParams.append('symbol', params.symbol)
    if (params.initialSupply) queryParams.append('supply', params.initialSupply)
    if (params.decimals) queryParams.append('decimals', params.decimals.toString())
    if (params.description) queryParams.append('description', params.description)

    // Construct the full URL
    // Adjust path based on actual Qiedex routing
    const baseUrl = `${QIEDEX_URL}/token-creator`
    const queryString = queryParams.toString()

    return queryString ? `${baseUrl}?${queryString}` : baseUrl
}

/**
 * Opens Qiedex token creator in a new tab with pre-filled params
 */
export const redirectToQiedexTokenCreator = (params: TokenCreationParams): void => {
    const url = generateQiedexTokenLink(params)
    window.open(url, '_blank', 'width=800,height=600')
}

/**
 * Generates a message with instructions for users after redirecting to Qiedex
 */
export const getQiedexInstructions = (): string => {
    return `
You are being redirected to Qiedex token creator. Please follow these steps:

1. Review the pre-filled token details (name, symbol, supply)
2. Click "Create Token" on Qiedex
3. Approve the transaction in your wallet
4. Wait for confirmation (usually takes a few seconds)
5. Copy the new token address from Qiedex
6. Return to TokeDex and paste the token address to import it
7. Your token will be ready to use!

Note: Keep this window open or remember to return here after creating your token on Qiedex.
    `.trim()
}
