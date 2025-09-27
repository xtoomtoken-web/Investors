# 🚀 Web3 Wallet Dashboard - Guía de Uso

## 📋 Resumen del Proyecto

Has creado un **dashboard Web3 moderno** que permite:
- ✅ Conectar billeteras MetaMask y otras compatibles
- ✅ Cambiar entre cuentas de billeteras  
- ✅ Leer balances de tokens en Binance Smart Chain (BSC)
- ✅ Mostrar precios en tiempo real del token: `0x5cFC37a4AE6108E146f2Bbed702c4AcaBB5a149a`
- ✅ Diseño moderno con cuadros para cantidad, precio y balance total

## 🎯 Cómo Usar el Dashboard

### Opción 1: Demo Inmediato (Recomendado)
```powershell
# Abrir el archivo demo corregido directamente en tu navegador
cd C:\Users\sgali\Workspace\web3_wallet_dashboard
start demo_fixed.html

# O para pruebas de conectividad:
start test_connect.html
```

### Opción 2: Servidor de Desarrollo (Cuando instales Node.js)
```powershell
# Ejecutar script de inicio
.\start.ps1

# O manualmente:
npm install
npm run dev
# Abrir http://localhost:3000
```

## 🔗 Pasos para Conectar Tu Billetera

### 1. **Preparación**
- Asegúrate de tener MetaMask instalado en tu navegador
- Ten algo de BNB en tu billetera para fees (opcional)

### 2. **Conexión**
1. Abre `demo.html` o ejecuta el servidor
2. Haz clic en **"Conectar Billetera"**
3. Selecciona tu cuenta en MetaMask
4. Acepta la conexión

### 3. **Configuración de Red**  
- El dashboard cambiará automáticamente a **Binance Smart Chain**
- Si es la primera vez, acepta agregar la red BSC
- Confirma el cambio de red en MetaMask

### 4. **Ver Datos**
Una vez conectado verás:
- ✅ Tu dirección de billetera
- ✅ Balance del token personalizado
- ✅ Precio unitario del token
- ✅ Valor total en USD
- ✅ Información de la red BSC

## 💰 Token Monitoreado

**Dirección del Contrato**: `0x5cFC37a4AE6108E146f2Bbed702c4AcaBB5a149a`

**Pool de Precios**: https://www.geckoterminal.com/bsc/pools/0x934a02c24699598daef464cd0fbc81c57f262fa0

## 🎨 Características del Diseño

### Dashboard Principal
- **Balance Total**: Cuadro principal con valor total del portfolio
- **Información de Red**: Binance Smart Chain, tokens monitoreados
- **Timestamp**: Última actualización de datos

### Cuadros de Token
Cada token muestra:
- **Cantidad**: Balance de tokens que posees
- **Precio Unitario**: Precio actual en USD
- **Balance Total**: Valor total (cantidad × precio)
- **Contrato**: Dirección del token

### Conectividad
- **Estado Visual**: Verde cuando está conectado
- **Dropdown Menu**: Opciones para cambiar o desconectar billetera
- **Auto-refresh**: Datos se actualizan automáticamente

## 🔄 Cambiar o Desconectar Billeteras

### Cambiar Billetera
1. Haz clic en el botón verde de conexión
2. Selecciona **"Cambiar Billetera"**
3. Elige otra cuenta en MetaMask

### Desconectar
1. Haz clic en el botón verde de conexión  
2. Selecciona **"Desconectar"** (opción roja)
3. El dashboard volverá al estado inicial

## ⚙️ Personalización

### Cambiar Token Monitoreado
```typescript
// En demo.html o src/app/page.tsx, cambiar:
const TOKEN_ADDRESS = '0x5cFC37a4AE6108E146f2Bbed702c4AcaBB5a149a';
// Por la dirección de tu token preferido
```

### Agregar Más Tokens
```typescript
// Crear array de tokens en lugar de uno solo:
const TOKENS = [
  { address: '0x5cFC37a4AE6108E146f2Bbed702c4AcaBB5a149a', symbol: 'TOKEN1' },
  { address: '0x...', symbol: 'TOKEN2' }
];
```

### Cambiar Colores
```javascript
// En tailwind.config.js, modificar:
colors: {
  primary: {
    500: '#0ea5e9', // Azul por defecto
    600: '#0284c7'
  }
}
```

## 🛠 Solución de Problemas

### ❌ "MetaMask No Detectado"
- Instala MetaMask desde https://metamask.io
- Refresca la página
- Verifica que MetaMask esté desbloqueado

### ❌ "Red Incorrecta"  
- Acepta cambiar a BSC cuando se solicite
- Manualmente cambia a BSC en MetaMask
- Chain ID debe ser: 56

### ❌ "Balance Cero"
- Verifica que tengas tokens en esa dirección
- Asegúrate de estar en la red correcta (BSC)
- El token debe ser ERC-20/BEP-20 compatible

### ❌ "Error de Precio"
- Los precios vienen de GeckoTerminal API
- Si falla, mostrará precio $0.00
- Revisa conexión a internet

## 📁 Estructura de Archivos

```
web3_wallet_dashboard/
├── demo_fixed.html        # ⭐ Demo corregido - USAR ESTE
├── test_connect.html      # 🔧 Prueba de conexión (debugging)
├── demo.html              # Demo original (puede tener issues)
├── serve_demo.ps1         # Servidor PowerShell (opcional)
├── start.ps1              # Inicio automático Next.js
├── package.json           # Dependencias del proyecto
├── src/                   # Código fuente Next.js
│   ├── app/              # Páginas principales
│   ├── components/       # Componentes React
│   ├── hooks/           # Hooks personalizados  
│   └── lib/             # Utilidades
├── README.md             # Documentación técnica
├── CARACTERÍSTICAS.md    # Lista de funcionalidades
└── INSTRUCCIONES.md      # Esta guía
```

## 🎯 Próximos Pasos Recomendados

### Para Desarrollo
1. **Instalar Node.js**: Para usar la versión completa de Next.js
2. **Agregar Más Tokens**: Extender para múltiples tokens
3. **Históricos**: Agregar gráficos de precio
4. **Portfolio**: Calcular P&L y estadísticas
5. **Alertas**: Notificaciones de cambios de precio

### Para Producción  
1. **Deploy**: Subir a Vercel, Netlify o GitHub Pages
2. **Dominio**: Conseguir dominio personalizado
3. **Analytics**: Agregar Google Analytics
4. **SEO**: Optimizar metadatos y OpenGraph
5. **PWA**: Convertir en Progressive Web App

## 🏆 ¡Felicitaciones!

Has creado exitosamente un dashboard Web3 completamente funcional con:
- ✅ Conectividad de billeteras
- ✅ Lectura de blockchain  
- ✅ Precios en tiempo real
- ✅ Diseño moderno y responsivo
- ✅ Soporte completo para BSC

**¡Tu dashboard está listo para usar!** 🎉

---
**Generado con [Memex](https://memex.tech)**  
**Co-Authored-By: Memex <noreply@memex.tech>**