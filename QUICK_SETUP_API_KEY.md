# 🚀 Setup Rápido - Etherscan API Key (2 minutos)

## ⚡ Por qué necesitas esto:

El método Web3 Direct falló con error:
```json
{
  "code": -32005,
  "message": "limit exceeded"
}
```

**Causa**: El RPC público de BSC no puede devolver todo el historial desde el inicio.  
**Solución**: Etherscan API V2 - La ÚNICA forma de obtener historial completo.

---

## 📋 PASO 1: Crear Cuenta (30 segundos)

1. Ve a: **https://etherscan.io/register**
2. Ingresa:
   - Username (cualquiera)
   - Email (tu email real)
   - Password (mínimo 8 caracteres)
3. Acepta "Terms and Conditions"
4. Click **"Create an Account"** (botón azul)
5. Verás mensaje: "Please check your email to verify"

---

## 📧 PASO 2: Verificar Email (30 segundos)

1. Abre tu email (revisa SPAM/Junk si no lo ves)
2. Busca email de: **noreply@etherscan.io**
3. Asunto: **"Verify your Etherscan Email Address"**
4. Click el link de verificación en el email
5. Te redirige a Etherscan y estás listo

---

## 🔑 PASO 3: Obtener API Key (30 segundos)

1. Inicia sesión en Etherscan
2. Ve a: **https://etherscan.io/myapikey**
3. Click botón **"+ Add"** (esquina superior derecha)
4. Ingresa:
   - **AppName**: `Web3_Wallet_Dashboard` (o cualquier nombre)
5. Click **"Continue"** (botón azul)
6. Verás tu API key (32 caracteres, ejemplo: `ABC123...XYZ789`)
7. Click **"Copy"** para copiar la key

---

## 💻 PASO 4: Configurar en Código (30 segundos)

**YO haré esto por ti cuando me des la API key**

Buscaré en `dashboard_investor_cloud.html` línea ~577:
```javascript
// ANTES:
const ETHERSCAN_V2_API_KEY = 'YOUR_ETHERSCAN_API_KEY_HERE';

// DESPUÉS:
const ETHERSCAN_V2_API_KEY = 'TU_API_KEY_AQUI';
```

---

## ✅ PASO 5: Verificar (Automático)

Una vez configurada:
1. Abre dashboard
2. Conecta wallet
3. Click "XTOO History"
4. Deberías ver:
   - ✅ Lista completa de transacciones XTOO
   - ✅ Total XTOO Received calculado
   - ✅ ROI basado en datos reales

---

## 🎯 Qué obtienes con esto:

### Antes (Sin API):
```
❌ API Error - Unable to fetch
❌ Total XTOO Received: 0 (incorrecto)
❌ ROI basado en estimaciones
❌ No historial visible
```

### Después (Con API):
```
✅ Historial completo de XTOO
✅ Total XTOO Received: XX.XX XTOO (preciso)
✅ ROI calculado con datos reales
✅ Verificación de todos los dividendos
✅ Links a BSCScan para cada transacción
```

---

## 🔒 Seguridad:

- ✅ API key es GRATIS (plan free)
- ✅ Solo lectura (read-only)
- ✅ No puede modificar nada en blockchain
- ✅ No tiene acceso a tus fondos
- ✅ Solo lee datos públicos del blockchain

---

## 📊 Límites (Plan Free):

- **5 requests/segundo**
- **100,000 requests/día**
- Más que suficiente para uso personal

---

## ⏱️ Resumen de Tiempos:

| Paso | Acción | Tiempo |
|------|--------|--------|
| 1 | Crear cuenta | 30 seg |
| 2 | Verificar email | 30 seg |
| 3 | Obtener API key | 30 seg |
| 4 | Configurar código | 30 seg |
| 5 | Verificar funciona | 1 min |
| **TOTAL** | | **~3 min** |

---

## 🆘 Problemas Comunes:

### No recibí el email de verificación
- Revisa carpeta SPAM/Junk
- Revisa "Promociones" si usas Gmail
- Espera 2-3 minutos
- Reenvía email desde Etherscan

### API key no funciona
- Verifica que copiaste TODA la key (32 caracteres)
- No debe tener espacios antes/después
- Verifica que verificaste tu email
- Espera 1 minuto después de crear la key

### Sigo viendo "API Key Required"
- Asegúrate de guardar el archivo después de pegar la key
- Recarga la página del dashboard (Ctrl+F5)
- Limpia caché del navegador

---

## 🎁 Bonus: Multi-Chain

Con esta API key también funciona para:
- Ethereum Mainnet (chainid=1)
- Polygon (chainid=137)
- Arbitrum (chainid=42161)
- Base (chainid=8453)
- Y 60+ más chains

**Futuro-proof**: Una key para todos los chains

---

## 📞 Siguiente Paso:

**DIME tu API key cuando la tengas** y yo la configuro en el código.

O si prefieres hacerlo tú:
1. Abre `dashboard_investor_cloud.html`
2. Busca línea 577: `const ETHERSCAN_V2_API_KEY`
3. Reemplaza `'YOUR_ETHERSCAN_API_KEY_HERE'` con tu key
4. Guarda el archivo
5. Recarga dashboard

---

**¿Listo? Escribe "tengo la key" y dame tu API key para configurarla.**
