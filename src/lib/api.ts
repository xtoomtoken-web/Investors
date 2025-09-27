import axios from 'axios'

// API para obtener precio del token desde GeckoTerminal
export async function getTokenPrice(): Promise<number> {
  try {
    const response = await axios.get(
      'https://api.geckoterminal.com/api/v2/networks/bsc/pools/0x934a02c24699598daef464cd0fbc81c57f262fa0',
      {
        headers: {
          'Accept': 'application/json'
        }
      }
    )
    
    const poolData = response.data?.data
    if (poolData && poolData.attributes && poolData.attributes.base_token_price_usd) {
      return parseFloat(poolData.attributes.base_token_price_usd)
    }
    
    return 0
  } catch (error) {
    console.error('Error obteniendo precio del token:', error)
    return 0
  }
}

// Información básica del token (simulada - en producción usar BSC API)
export async function getTokenInfo(tokenAddress: string): Promise<{name: string, symbol: string}> {
  try {
    // En una implementación real, consultarías la blockchain o una API
    // Por ahora retornamos información simulada
    return {
      name: 'Custom Token',
      symbol: 'CUSTOM'
    }
  } catch (error) {
    console.error('Error obteniendo información del token:', error)
    return {
      name: 'Unknown Token',
      symbol: 'UNK'
    }
  }
}

// API alternativa para obtener datos de CoinGecko (si es necesario)
export async function getCoinGeckoPrice(coinId: string): Promise<number> {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`
    )
    
    return response.data[coinId]?.usd || 0
  } catch (error) {
    console.error('Error obteniendo precio de CoinGecko:', error)
    return 0
  }
}