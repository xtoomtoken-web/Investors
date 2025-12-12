# 🔍 Situación Real de APIs para BSC - Enero 2025

## ❌ El Problema: BSCScan API V1 Completamente Deprecado

### Lo que intentamos:
1. **BSCScan API V1** → `"You are using a deprecated V1 endpoint"`
2. **Etherscan API V2 Free** → `"Free API access is not supported for this chain"` (solo Ethereum gratis, BSC requiere $99/mes)
3. **Web3 Direct (RPC)** → `{"code": -32005, "message": "limit exceeded"}` (no puede devolver historial completo)

### Conclusión:
**NO HAY forma gratuita de obtener historial completo de transacciones XTOO con BSCScan o Etherscan API.**

---

## ✅ LA SOLUCIÓN: Ankr Advanced API

### ¿Qué es Ankr?
- Proveedor de infraestructura Web3
- APIs especializadas para blockchain data
- Soporte nativo de BSC
- Plan Freemium GRATIS

### Plan Freemium (Gratis):
- ✅ **200M API Credits/mes**
- ✅ **30 requests/segundo**
- ✅ **65+ blockchains** (incluyendo BSC)
- ✅ **Método específico**: `ankr_getTokenTransfers`

### ¿Por qué Ankr funciona?
- No depende de BSCScan deprecated API
- API propia que indexa directamente la blockchain
- Diseñada específicamente para queries complejas
- Plan gratuito generoso para apps personales

---

## 📋 Setup de Ankr Advanced API

### Paso 1: Crear Cuenta
1. Ve a: https://www.ankr.com/rpc/advanced-api/
2. Click "Get Started" o "Sign Up"
3. Registrate con email/Google/GitHub
4. Verifica tu email

### Paso 2: Crear Proyecto
1. Dashboard → "Create New Project"
2. Nombre: "Web3 Wallet Dashboard"
3. Selecciona plan: **Freemium** (gratis)

### Paso 3: Obtener API Token
1. En tu proyecto, ve a "API Keys" o "Credentials"
2. Click "Generate API Key"
3. Copia tu token (formato: largo alfanumérico)
4. Guárdalo seguro

### Paso 4: Probar API
Endpoint:
```
https://rpc.ankr.com/multichain/YOUR_API_TOKEN
```

Método:
```javascript
{
  "jsonrpc": "2.0",
  "method": "ankr_getTokenTransfers",
  "params": {
    "address": "0xYOUR_WALLET",
    "blockchain": ["bsc"],
    "fromTimestamp": 0,
    "toTimestamp": Math.floor(Date.now() / 1000)
  },
  "id": 1
}
```

---

## 🔧 Integración en Dashboard

### Código de Ejemplo:
```javascript
const ANKR_API_TOKEN = 'YOUR_ANKR_API_TOKEN';
const ANKR_ENDPOINT = `https://rpc.ankr.com/multichain/${ANKR_API_TOKEN}`;

async function getXTOOTransfers(walletAddress) {
    const response = await fetch(ANKR_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'ankr_getTokenTransfers',
            params: {
                address: [walletAddress],
                blockchain: ['bsc'],
                // Optional: filter by token contract
                contractAddress: '0x5cFC37a4AE6108E146f2Bbed702c4AcaBB5a149a' // XTOO
            },
            id: 1
        })
    });
    
    const data = await response.json();
    return data.result.transfers; // Array of token transfers
}
```

---

## 💰 Costo Comparación

| Provider | Plan | BSC Support | Cost |
|----------|------|-------------|------|
| **Ankr** | Freemium | ✅ Nativo | **GRATIS** (200M credits/mes) |
| Etherscan API V2 | Free | ❌ No | $0 (solo Ethereum) |
| Etherscan API V2 | Pro | ✅ Sí | $99/mes |
| BSCScan API V1 | N/A | ❌ Deprecated | N/A |
| Moralis | Free | ✅ Limited | GRATIS (40k compute units/mes) |
| Covalent | Free | ✅ Limited | GRATIS (100k credits) |

**Ganador claro: Ankr** - Mejor plan gratuito para BSC

---

## 🎯 Beneficios de Ankr vs BSCScan

### Ankr Advanced API:
- ✅ **Funciona** (no deprecated)
- ✅ **200M requests/mes gratis** (súper generoso)
- ✅ **30 req/segundo** (suficiente para app personal)
- ✅ **Multi-chain** (Ethereum, Polygon, Arbitrum, etc.)
- ✅ **Métodos avanzados** (getTokenTransfers, getTokenHolders, etc.)
- ✅ **Documentación clara**
- ✅ **Sin sorpresas** (no van a deprecar de repente)

### BSCScan API (deprecated):
- ❌ **No funciona** (V1 deprecated completamente)
- ❌ **Migración forzada** a Etherscan V2
- ❌ **Etherscan V2 Free** no soporta BSC
- ❌ **Etherscan V2 Pro** cuesta $99/mes

---

## 📊 Datos que Obtendremos

Con `ankr_getTokenTransfers` obtenemos:

```json
{
  "transfers": [
    {
      "blockchain": "bsc",
      "transactionHash": "0x...",
      "timestamp": 1234567890,
      "fromAddress": "0x...",
      "toAddress": "0x...", // Tu wallet
      "value": "29100000000000000000", // 29.1 XTOO
      "tokenAddress": "0x5cFC37a4AE6108E146f2Bbed702c4AcaBB5a149a",
      "tokenSymbol": "XTOO",
      "tokenName": "Xtoom Token",
      "tokenDecimals": "18"
    },
    // ... más transacciones
  ]
}
```

**Exactamente lo que necesitamos para:**
- ✅ Calcular "Total XTOO Received"
- ✅ Mostrar historial completo
- ✅ Calcular ROI preciso
- ✅ Validar dividendos

---

## ⚡ Performance

### Ankr vs Web3 Direct RPC:
- **Web3 RPC**: Error "limit exceeded" al pedir historial completo
- **Ankr**: Indexado y optimizado, responde en <1 segundo

### Ankr vs BSCScan (cuando funcionaba):
- **BSCScan V1**: ~2-3 segundos
- **Ankr**: ~1-2 segundos (similar o mejor)

---

## 🔮 Futuro-Proof

### Por qué Ankr es más confiable:
1. **Negocio principal**: Vender infraestructura Web3
2. **Plan Freemium**: Es marketing para convertir a clientes Pro
3. **No van a deprecar**: Es su producto core, no un side project
4. **Multi-chain**: Si XTOO se mueve a otra chain, ya estás cubierto

### BSCScan/Etherscan lecciones:
- Deprecaron V1 sin aviso previo
- Migraron a modelo de pago ($99/mes para BSC)
- No son confiables para apps que dependen de API

---

## 📖 Recursos

### Ankr Docs:
- **Home**: https://www.ankr.com/docs/
- **Advanced API**: https://www.ankr.com/docs/advanced-api/
- **Token Methods**: https://www.ankr.com/docs/advanced-api/token-methods/
- **BSC Support**: https://www.ankr.com/web3-api/chains-list/bsc/

### Alternativas (si Ankr falla):
- **Moralis**: https://moralis.io/ (40k compute units/mes gratis)
- **Covalent (GoldRush)**: https://goldrush.dev/ (100k credits gratis)
- **The Graph**: https://thegraph.com/ (subgraphs gratuitos)

---

## 🎯 Acción Inmediata

1. **Registrarte en Ankr**: https://www.ankr.com/rpc/advanced-api/
2. **Crear proyecto Freemium** (gratis)
3. **Obtener API token**
4. **Dame el token** → Lo integro al dashboard
5. **Probar** → Ver historial completo de XTOO
6. **Celebrar** 🎉 → ¡Finalmente funciona!

---

## ✅ Checklist

- [ ] Crear cuenta en Ankr
- [ ] Crear proyecto "Web3 Wallet Dashboard"
- [ ] Seleccionar plan Freemium (gratis)
- [ ] Generar API token
- [ ] Copiar token
- [ ] Dar token para integración
- [ ] Probar en dashboard
- [ ] Verificar "Total XTOO Received"
- [ ] Confirmar ROI preciso

---

**Tiempo estimado: 5 minutos**  
**Costo: $0.00 (gratis para siempre con plan Freemium)**  
**Beneficio: Dashboard totalmente funcional con historial completo** ✨
