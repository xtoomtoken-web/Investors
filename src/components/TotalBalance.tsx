'use client'

interface TotalBalanceProps {
  total: number
  loading: boolean
}

export function TotalBalance({ total, loading }: TotalBalanceProps) {
  const formatTotal = (value: number) => {
    if (value === 0) return '$0.00'
    if (value < 0.01) return '<$0.01'
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  return (
    <div className="bg-gradient-to-r from-primary-600/20 to-primary-800/20 rounded-2xl p-8 backdrop-blur-sm border border-primary-500/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-400/10 rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">
            Balance Total del Portfolio
          </h2>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm font-medium">En vivo</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {loading ? (
            <div className="w-48 h-12 bg-primary-600/30 animate-pulse rounded-lg"></div>
          ) : (
            <div className="text-5xl font-bold text-primary-400">
              {formatTotal(total)}
            </div>
          )}
          
          {!loading && (
            <div className="flex flex-col">
              <div className="flex items-center space-x-1 text-green-400">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 14l5-5 5 5z"/>
                </svg>
                <span className="text-sm font-semibold">+0.00%</span>
              </div>
              <span className="text-gray-400 text-xs">24h</span>
            </div>
          )}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Red</p>
            <p className="text-white font-semibold">Binance Smart Chain</p>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Tokens Monitoreados</p>
            <p className="text-white font-semibold">1</p>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Última Actualización</p>
            <p className="text-white font-semibold">{new Date().toLocaleTimeString('es-ES')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}