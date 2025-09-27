'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { ethers } from 'ethers'

interface WalletContextType {
  address: string | null
  isConnected: boolean
  provider: ethers.BrowserProvider | null
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  switchWallet: () => Promise<void>
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export { WalletContext }

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null)
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    checkConnection()
    setupEventListeners()
  }, [])

  const checkConnection = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const accounts = await provider.send('eth_accounts', [])
        
        if (accounts.length > 0) {
          setProvider(provider)
          setAddress(accounts[0])
          setIsConnected(true)
          await ensureBSCNetwork(provider)
        }
      } catch (error) {
        console.error('Error checking connection:', error)
      }
    }
  }

  const setupEventListeners = () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet()
        } else {
          setAddress(accounts[0])
        }
      })

      window.ethereum.on('chainChanged', () => {
        window.location.reload()
      })
    }
  }

  const ensureBSCNetwork = async (provider: ethers.BrowserProvider) => {
    const network = await provider.getNetwork()
    const bscChainId = '0x38' // 56 in hexadecimal (BSC Mainnet)
    
    if (network.chainId !== 56n) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: bscChainId }],
        })
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: bscChainId,
                chainName: 'Binance Smart Chain',
                nativeCurrency: {
                  name: 'BNB',
                  symbol: 'BNB',
                  decimals: 18
                },
                rpcUrls: ['https://bsc-dataseed.binance.org/'],
                blockExplorerUrls: ['https://bscscan.com/']
              }]
            })
          } catch (addError) {
            console.error('Error adding BSC network:', addError)
          }
        }
      }
    }
  }

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const accounts = await provider.send('eth_requestAccounts', [])
        
        setProvider(provider)
        setAddress(accounts[0])
        setIsConnected(true)
        
        await ensureBSCNetwork(provider)
      } catch (error) {
        console.error('Error connecting wallet:', error)
      }
    } else {
      alert('Por favor instala MetaMask u otra billetera compatible')
    }
  }

  const disconnectWallet = () => {
    setProvider(null)
    setAddress(null)
    setIsConnected(false)
  }

  const switchWallet = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        await window.ethereum.request({
          method: 'wallet_requestPermissions',
          params: [{ eth_accounts: {} }]
        })
      } catch (error) {
        console.error('Error switching wallet:', error)
      }
    }
  }

  const value: WalletContextType = {
    address,
    isConnected,
    provider,
    connectWallet,
    disconnectWallet,
    switchWallet
  }

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}