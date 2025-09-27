'use client'

import { useContext } from 'react'
import { WalletContext } from '@/components/WalletProvider'

// Re-export the context for convenience
export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}