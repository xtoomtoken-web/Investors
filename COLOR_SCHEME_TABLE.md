# Dashboard Color Scheme Table

## Cuadros Principales

| Cuadro | Gradiente Background | Border | Texto Principal | Texto Secundario | Icono | Botón |
|--------|---------------------|--------|----------------|------------------|-------|-------|
| **ROI Card** | `from-rose-600/20 to-rose-800/20` | `border-rose-500/30` | `text-rose-400` | `text-gray-400` | Line chart icon (rose) | N/A |
| **APY Card** | `from-cyan-600/20 to-cyan-800/20` | `border-cyan-500/30` | `text-cyan-400` | `text-cyan-300` | Clock icon (cyan) | N/A |
| **Current XTOO Balance** | `from-purple-600/20 to-purple-800/20` | `border-purple-500/30` | `text-purple-400` | `text-purple-300` | Wallet icon (purple) | Purple gradient |
| **Total XTOO Received** | `from-amber-600/20 to-amber-800/20` | `border-amber-500/30` | `text-amber-400` | `text-amber-300` | Bar chart icon (amber) | Amber gradient |

## Cuadros de Progreso

| Cuadro | Gradiente Background | Border | Texto Principal | Progress Bar |
|--------|---------------------|--------|----------------|--------------|
| **Investor Level Panel** | `from-blue-600/20 to-blue-800/20` | `border-blue-500/30` | `text-blue-400` | `from-blue-500 to-purple-600` |
| **ADA Dividend Tracker** | `from-emerald-600/20 to-emerald-800/20` | `border-emerald-500/30` | `text-emerald-400` | `from-emerald-500 to-green-600` |

## Botones de Acción

| Botón | Gradiente | Hover State | Texto |
|-------|-----------|-------------|-------|
| **Buy/Sell (en card)** | `from-purple-600 to-purple-700` | `hover:from-purple-700 hover:to-purple-800` | `text-white` |
| **XTOO History (en card)** | `from-amber-600 to-amber-700` | `hover:from-amber-700 hover:to-amber-800` | `text-white` |
| **View Chart** | `from-green-600 to-green-700` | `hover:from-green-700 hover:to-green-800` | `text-white` | Bar chart icon (green-300) |

## Colores Dinámicos (ROI Performance)

### ROI Card - Estados del Performance
| Estado ROI | Color Principal | Color Secundario | Emoji | Condición |
|------------|----------------|------------------|-------|-----------|
| **Profit** | `text-emerald-400` | `text-emerald-300` | 📈 | ROI > 100% |
| **Recovery** | `text-yellow-400` | `text-yellow-300` | 📊 | ROI 50-100% |
| **Loss** | `text-red-400` | `text-red-300` | 📉 | ROI < 50% |

### APY Card - Estados
| Estado | Color Principal | Emoji | Condición |
|--------|----------------|-------|-----------|
| **Positive** | `text-indigo-400` | 🚀 | APY > 0 |
| **Neutral/Negative** | `text-indigo-300` | ⏳ | APY ≤ 0 |

## Colores Base del Sistema

| Elemento | Color |
|----------|-------|
| **Background Principal** | `bg-slate-900` |
| **Cards Background** | `backdrop-blur-sm` (transparente) |
| **Texto Principal** | `text-white` |
| **Texto Secundario** | `text-gray-300` |
| **Texto Explicativo** | `text-gray-400` |
| **Texto Pequeño** | `text-gray-500` |

## Tokens con Colores Específicos

| Token | Background | Border | Texto | Badge |
|-------|------------|--------|-------|-------|
| **BNB** | `from-yellow-600/20 to-yellow-800/20` | `border-yellow-500/30` | `text-yellow-400` | 🟨 Native Coin |
| **XTOO** | `from-purple-600/20 to-purple-800/20` | `border-purple-500/30` | `text-purple-400` | ⭐ Principal Token |
| **ADA** | `from-blue-600/20 to-blue-800/20` | `border-blue-500/30` | `text-blue-400` | 🔸 Cardano Token |
| **WLF** | `from-orange-600/20 to-orange-800/20` | `border-orange-500/30` | `text-orange-400` | 📍 World Liberty |
| **XRP** | `from-gray-600/20 to-gray-800/20` | `border-gray-500/30` | `text-gray-400` | 💎 XRP Token |

## Modales

| Modal | Background | Border | Header |
|-------|------------|--------|--------|
| **Buy/Sell Modal** | `bg-slate-800` | `border-purple-500/50` | `from-purple-600/10 to-purple-800/10` |
| **History Modal** | `bg-slate-800` | `border-purple-500/50` | `from-purple-600/10 to-purple-800/10` |
| **Chart Modal** | `bg-slate-800` | `border-purple-500/50` | `from-purple-600/10 to-purple-800/10` |

## Notación de Colores
- `/20` = 20% opacity para backgrounds
- `/30` = 30% opacity para borders  
- `/50` = 50% opacity para modales
- Sin suffix = color sólido (100% opacity)