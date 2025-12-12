# 🔑 Etherscan API V2 Setup Guide

## ❌ Problema Actual
Las API keys de **BSCScan** (bscscan.com) **NO funcionan** con Etherscan API V2.

El endpoint `https://api.etherscan.io/v2/api` rechaza API keys de BSCScan con el error:
```
"You are using a deprecated V1 endpoint, switch to Etherscan API V2"
```

## ✅ Solución: Obtener API Key de Etherscan.io

### Paso 1: Crear Cuenta en Etherscan
1. Ve a: **https://etherscan.io/register**
2. Crea una cuenta (necesitas email válido)
3. Verifica tu email

### Paso 2: Generar API Key
1. Inicia sesión en Etherscan.io
2. Ve a: **https://etherscan.io/myapikey**
3. Click en **"+ Add"** para crear una nueva API key
4. Dale un nombre (ejemplo: "Web3 Wallet Dashboard")
5. Copia tu API key (formato: `XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`)

### Paso 3: Verificar API Key con BSC (Chain ID 56)
Prueba con este URL (reemplaza `YOUR_API_KEY`):
```
https://api.etherscan.io/v2/api?chainid=56&module=account&action=tokentx&contractaddress=0x5cFC37a4AE6108E146f2Bbed702c4AcaBB5a149a&address=0xb9707c6e18417fa88c0f99c39e02b93cd3b6a156&page=1&offset=10&sort=desc&apikey=YOUR_API_KEY
```

## 📝 Características de Etherscan API V2

### 🌐 Unificada Multi-Chain
Una sola API key funciona para **todas las chains**:
- Ethereum (chainid=1)
- **BSC (chainid=56)** ← Lo que necesitamos
- Polygon (chainid=137)
- Arbitrum (chainid=42161)
- Base (chainid=8453)
- Y más de 60+ chains

### 🔗 Endpoint Universal
```
https://api.etherscan.io/v2/api?chainid={CHAIN_ID}&...
```

### 📊 Rate Limits (Free Tier)
- **5 requests/second**
- **100,000 requests/day**

## 🎯 Integración en Dashboard

Una vez que tengas tu API key de Etherscan, reemplazar en `dashboard_investor_cloud.html`:

```javascript
// ❌ ANTES (BSCScan API key - no funciona con V2)
const BSCSCAN_API_KEY = '1SBKZNRWAU5MS3Q2VQXFMUZWMGKJRSGF5M';

// ✅ DESPUÉS (Etherscan API key - funciona con V2)
const ETHERSCAN_V2_API_KEY = 'TU_API_KEY_DE_ETHERSCAN';
```

## 🔍 Testing
Usa `test_etherscan_v2_bsc.html` para verificar que funciona:
1. Ingresa tu nueva API key de Etherscan
2. Click "Test Method 1" 
3. Deberías ver transacciones de XTOO ✅

## 📚 Documentación Oficial
- **Etherscan API V2 Docs**: https://docs.etherscan.io/
- **Supported Chains**: https://docs.etherscan.io/supported-chains
- **Migration Guide**: https://docs.etherscan.io/v2-migration
- **Get API Key**: https://etherscan.io/myapikey

## ⚠️ Importante
- Las API keys de **BSCScan** solo funcionan con el endpoint V1 (deprecated)
- Las API keys de **Etherscan** funcionan con todos los endpoints V2 (incluyendo BSC)
- V2 es el futuro - V1 será completamente desactivado pronto

## 🎁 Beneficio Extra
Con Etherscan API V2, el dashboard podría soportar múltiples chains en el futuro:
- XTOO en BSC (actual)
- Tokens en Ethereum
- Tokens en Polygon
- Tokens en Arbitrum
- Y más...

Todo con la misma API key! 🚀
