'use client'

import { useState, useEffect } from 'react'
import { useWallet } from '@/hooks/useWallet'
import { WalletConnector } from '@/components/WalletConnector'
import { TokenCard } from '@/components/TokenCard'
import { TotalBalance } from '@/components/TotalBalance'
import { getTokenPrice, getTokenInfo } from '@/lib/api'
import { getTokenBalance } from '@/lib/blockchain'

const TARGET_TOKEN = '0x5cFC37a4AE6108E146f2Bbed702c4AcaBB5a149a'

interface TokenData {
  address: string
  name: string
  symbol: string
  balance: string
  price: number
  value: number
}

export default function Home() {
  const { address, isConnected } = useWallet()
  const [tokens, setTokens] = useState<TokenData[]>([])
  const [loading, setLoading] = useState(false)
  const [totalValue, setTotalValue] = useState(0)

  useEffect(() => {
    if (isConnected && address) {
      loadTokenData()
    }
  }, [isConnected, address])

  const loadTokenData = async () => {
    if (!address) return

    setLoading(true)
    try {
      // Obtener información del token
      const tokenInfo = await getTokenInfo(TARGET_TOKEN)
      
      // Obtener balance del token
      const balance = await getTokenBalance(TARGET_TOKEN, address)
      
      // Obtener precio del token
      const price = await getTokenPrice()

      const tokenData: TokenData = {
        address: TARGET_TOKEN,
        name: tokenInfo.name,
        symbol: tokenInfo.symbol,
        balance: balance,
        price: price,
        value: parseFloat(balance) * price
      }

      setTokens([tokenData])
      setTotalValue(tokenData.value)
    } catch (error) {
      console.error('Error cargando datos del token:', error)
      // Datos de ejemplo en caso de error
      const fallbackData: TokenData = {
        address: TARGET_TOKEN,
        name: 'Token Personalizado',
        symbol: 'CUSTOM',
        balance: '0',
        price: 0,
        value: 0
      }
      setTokens([fallbackData])
      setTotalValue(0)
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background-900 via-background-800 to-background-700">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            Web3 Wallet Dashboard
          </h1>
          <WalletConnector />
        </div>

        {/* Main Content */}
        {!isConnected ? (
          <div className="text-center py-20">
            <div className="bg-background-800/50 rounded-2xl p-12 backdrop-blur-sm border border-white/10">
              <h2 className="text-3xl font-semibold text-white mb-4">
                Conecta tu Billetera
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Conecta tu billetera Metamask u otra compatible para ver tu balance
              </p>
              <div className="w-32 h-32 mx-auto mb-6 bg-primary-500/20 rounded-full flex items-center justify-center">
                <svg className="w-16 h-16 text-primary-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Total Balance Card */}
            <TotalBalance total={totalValue} loading={loading} />

            {/* Address Display */}
            <div className="bg-background-800/50 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-2">Dirección Conectada</h3>
              <p className="text-gray-300 font-mono text-sm break-all">
                {address}
              </p>
            </div>

            {/* Tokens Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tokens.map((token) => (
                <TokenCard 
                  key={token.address} 
                  token={token} 
                  loading={loading}
                />
              ))}
            </div>

            {/* Refresh Button */}
            <div className="text-center">
              <button
                onClick={loadTokenData}
                disabled={loading}
                className="bg-primary-600 hover:bg-primary-700 disabled:bg-primary-800 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-200"
              >
                {loading ? 'Actualizando...' : 'Actualizar Datos'}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}