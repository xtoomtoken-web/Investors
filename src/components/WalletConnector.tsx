'use client'

import { useState } from 'react'
import { useWallet } from '@/hooks/useWallet'

export function WalletConnector() {
  const { address, isConnected, connectWallet, disconnectWallet, switchWallet } = useWallet()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  if (!isConnected) {
    return (
      <button
        onClick={connectWallet}
        className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200 flex items-center space-x-2"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
        </svg>
        <span>Conectar Billetera</span>
      </button>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200 flex items-center space-x-2"
      >
        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
        <span>{formatAddress(address!)}</span>
        <svg className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 10l5 5 5-5z"/>
        </svg>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-background-800 rounded-xl shadow-lg border border-white/10 z-50">
          <div className="p-4 border-b border-white/10">
            <p className="text-sm text-gray-300">Conectado como:</p>
            <p className="text-white font-mono text-xs break-all mt-1">{address}</p>
          </div>
          
          <div className="p-2">
            <button
              onClick={() => {
                switchWallet()
                setIsDropdownOpen(false)
              }}
              className="w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
              <span>Cambiar Billetera</span>
            </button>
            
            <button
              onClick={() => {
                disconnectWallet()
                setIsDropdownOpen(false)
              }}
              className="w-full text-left px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
              </svg>
              <span>Desconectar</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}