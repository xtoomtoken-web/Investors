import { ethers } from 'ethers'

// ABI mínimo para tokens ERC-20
const ERC20_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function balanceOf(address owner) view returns (uint256)',
  'function totalSupply() view returns (uint256)'
]

// Proveedor RPC para BSC
const BSC_RPC = 'https://bsc-dataseed.binance.org/'
const provider = new ethers.JsonRpcProvider(BSC_RPC)

export async function getTokenBalance(tokenAddress: string, walletAddress: string): Promise<string> {
  try {
    const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider)
    
    const [balance, decimals] = await Promise.all([
      contract.balanceOf(walletAddress),
      contract.decimals()
    ])
    
    return ethers.formatUnits(balance, decimals)
  } catch (error) {
    console.error('Error obteniendo balance del token:', error)
    return '0'
  }
}

export async function getTokenInfo(tokenAddress: string): Promise<{
  name: string
  symbol: string
  decimals: number
  totalSupply: string
}> {
  try {
    const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider)
    
    const [name, symbol, decimals, totalSupply] = await Promise.all([
      contract.name(),
      contract.symbol(),
      contract.decimals(),
      contract.totalSupply()
    ])
    
    return {
      name,
      symbol,
      decimals: Number(decimals),
      totalSupply: ethers.formatUnits(totalSupply, decimals)
    }
  } catch (error) {
    console.error('Error obteniendo información del token:', error)
    return {
      name: 'Unknown Token',
      symbol: 'UNK',
      decimals: 18,
      totalSupply: '0'
    }
  }
}

export async function getBNBBalance(walletAddress: string): Promise<string> {
  try {
    const balance = await provider.getBalance(walletAddress)
    return ethers.formatEther(balance)
  } catch (error) {
    console.error('Error obteniendo balance BNB:', error)
    return '0'
  }
}

export async function getNetworkInfo() {
  try {
    const network = await provider.getNetwork()
    return {
      chainId: Number(network.chainId),
      name: network.name
    }
  } catch (error) {
    console.error('Error obteniendo información de la red:', error)
    return {
      chainId: 56,
      name: 'BSC'
    }
  }
}