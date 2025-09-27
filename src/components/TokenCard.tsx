'use client'

interface TokenData {
  address: string
  name: string
  symbol: string
  balance: string
  price: number
  value: number
}

interface TokenCardProps {
  token: TokenData
  loading: boolean
}

export function TokenCard({ token, loading }: TokenCardProps) {
  const formatBalance = (balance: string) => {
    const num = parseFloat(balance)
    if (num === 0) return '0.00'
    if (num < 0.001) return '<0.001'
    if (num < 1) return num.toFixed(6)
    if (num < 1000) return num.toFixed(3)
    if (num < 1000000) return `${(num / 1000).toFixed(2)}K`
    return `${(num / 1000000).toFixed(2)}M`
  }

  const formatPrice = (price: number) => {
    if (price === 0) return '$0.00'
    if (price < 0.01) return `$${price.toFixed(6)}`
    return `$${price.toFixed(4)}`
  }

  const formatValue = (value: number) => {
    if (value === 0) return '$0.00'
    if (value < 0.01) return '<$0.01'
    return `$${value.toFixed(2)}`
  }

  return (
    <div className="bg-background-800/50 rounded-2xl p-6 backdrop-blur-sm border border-white/10 hover:border-primary-500/30 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-white group-hover:text-primary-400 transition-colors">
            {token.name}
          </h3>
          <p className="text-gray-400 text-sm font-mono">
            {token.symbol}
          </p>
        </div>
        <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-primary-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.41 15.09L7 13.5l1.41-1.41L10 13.67l5.59-5.59L17 9.5l-6.41 7.59z"/>
          </svg>
        </div>
      </div>

      <div className="space-y-4">
        {/* Balance */}
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Cantidad</span>
          {loading ? (
            <div className="w-20 h-6 bg-gray-600 animate-pulse rounded"></div>
          ) : (
            <span className="text-white font-semibold">
              {formatBalance(token.balance)} {token.symbol}
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Precio Unitario</span>
          {loading ? (
            <div className="w-16 h-6 bg-gray-600 animate-pulse rounded"></div>
          ) : (
            <span className="text-white font-semibold">
              {formatPrice(token.price)}
            </span>
          )}
        </div>

        {/* Value */}
        <div className="flex justify-between items-center pt-2 border-t border-white/10">
          <span className="text-gray-400">Balance Total</span>
          {loading ? (
            <div className="w-24 h-6 bg-gray-600 animate-pulse rounded"></div>
          ) : (
            <span className="text-primary-400 font-bold text-lg">
              {formatValue(token.value)}
            </span>
          )}
        </div>
      </div>

      {/* Token Address */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <p className="text-gray-500 text-xs">Contrato:</p>
        <p className="text-gray-400 font-mono text-xs break-all">
          {token.address}
        </p>
      </div>
    </div>
  )
}