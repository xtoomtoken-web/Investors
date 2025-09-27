# Web3 Wallet Dashboard (Investors) - Project Rules

## Project Overview
This is an advanced Web3 wallet dashboard for cryptocurrency investors with ROI/APY tracking, investor level system, and cloud database synchronization. The dashboard displays real-time token balances, calculates investment returns, tracks dividend distributions, and provides trading integration - all with multi-device sync capabilities.

## Current Status: Production Ready & Enhanced ✅
- **Live URL**: `https://xtoomtoken-web.github.io/Investors/dashboard_investor_cloud.html`
- **Main File**: `dashboard_investor_cloud.html` (cloud database version)
- **Backup File**: `dashboard_local.html` (localStorage fallback)
- **Cloud Database**: Supabase PostgreSQL (fully configured)
- **Deployment**: GitHub Pages (active and tested)
- **Mobile Optimized**: Responsive design verified
- **Performance Enhancement**: API Cache System implemented ⚡

## Core Architecture Patterns

### 🌐 Cloud Database Integration (Supabase)
- **Database**: PostgreSQL with `investors` table
- **Sync Strategy**: Cloud-first with localStorage fallback
- **User Recognition**: Wallet address-based identification
- **Multi-device Access**: Seamless sync across all devices
- **Credentials**: Configured and working in production

### ⚡ API Cache System - PERFORMANCE ENHANCEMENT
- **Implementation**: Smart caching with TTL (Time To Live) management
- **Cache Types**: Different TTL for different data types
  - Token Prices: 2 minutes TTL
  - Token Balances: 3 minutes TTL
  - Contract Calls: 5 minutes TTL
  - Transaction History: 10 minutes TTL
  - User Data: 15 minutes TTL
- **Features**: 
  - Fallback to expired cache on API failures
  - Ctrl+Click refresh button to clear cache
  - Cache statistics for debugging
  - 95%+ performance improvement for repeat calls

### 📊 ROI/APY Calculation System - CORRECTED FORMULAS

#### **ROI Calculation** (Value Ratio Method)
```javascript
ROI = (currentTotalValue / initialInvestment) × 100
```
- **Key Change**: Uses VALUE RATIO instead of traditional ROI
- **Interpretation**: 
  - 100% = Break-even (current value = initial investment)
  - >100% = Profit (investment worth more than original)
  - <100% = Loss (investment worth less than original)
- **Always Positive**: Eliminates confusion with negative percentages

#### **APY Calculation** (Compound Annual Growth Rate)
```javascript
APY = (currentValue / initialInvestment)^(365/daysPassed) - 1
```
- **Mathematically Correct**: Uses proper compound growth formula
- **Safeguards**: Conservative projection for periods <7 days
- **Validation**: Checks for division by zero and negative values

#### **CRITICAL: Current Value Definition**
```javascript
currentTotalValue = totalHistoricalXtoo × currentXtooPrice
```
- **NOT current wallet balance** - this would be incorrect
- **MUST BE total XTOO received throughout history** × current price
- **Rationale**: ROI should reflect total return on investment, not just current holdings

### 🏆 Investor Level System
```javascript
INVESTOR_LEVELS = {
    FAN: { min: 0, max: 2499, name: 'Fan Investor', emoji: '🌟' },
    PRO: { min: 2500, max: 4999, name: 'Pro Investor', emoji: '⚡' }, 
    VIP: { min: 5000, max: Infinity, name: 'VIP Investor', emoji: '👑' }
}
```
- **Benefits**: Pro = Enhanced crypto opportunities, VIP = ADA dividend eligibility
- **Visual**: Animated progress bars with color-coded levels
- **Status Messages**: Context-aware annotations for each level

### 💰 ADA Dividend Tracker System
- **Contract**: Monitors XTOO balance at `0x5cFC37a4AE6108E146f2Bbed702c4AcaBB5a149a`
- **Trigger**: 1,000 XTOO in contract → dividend distribution
- **Eligibility**: Requires 5,000+ XTOO to receive ADA dividends
- **Progress Tracking**: Real-time bar showing 0-1000 XTOO progress
- **User Status**: Shows eligibility based on user's XTOO holdings

## Token Configuration (Updated)

### Monitored Tokens List
1. **XTOO (Target Token)**: `0x5cFC37a4AE6108E146f2Bbed702c4AcaBB5a149a`
   - Role: ROI tracking, investor levels, dividend eligibility
   - Price: GeckoTerminal API (real-time)
   - Badge: "⭐ Principal Token (ROI Tracking)"

2. **ADA (Cardano)**: `0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47`
   - Role: Dividend payment token
   - Price: CoinGecko API (cardano)
   - Badge: "🔸 Cardano Token"

3. **WLF**: `0x47474747477b199288bF72a1D702f7Fe0Fb1DEeA`
   - Price: Binance API (WLFIUSDT) with CoinGecko fallback
   - Badge: "📍 World Liberty Financial"

4. **XRP**: `0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE`
   - Price: CoinGecko API (ripple)
   - Badge: "💎 XRP Token"

5. **BNB**: Native token (always first)
   - Price: CoinGecko API (binancecoin)
   - Badge: "🟨 Native Coin"

### Token Override System
```javascript
TOKEN_NAME_OVERRIDES = {
    'Unknown Token': { name: 'World Liberty Financial', symbol: 'WLF' },
    'Unknown': { name: 'World Liberty Financial', symbol: 'WLF' }
}
```

## UI/UX Design Patterns - Production Ready

### XTOO Balance Cards Display Format
- **Current XTOO Balance**: XTOO amount in large text, USD equivalent below
- **Total XTOO Received**: **USD equivalent in large text, XTOO amount below**
  - This emphasizes the investment value over token quantity
  - Uses: `totalHistoricalXtoo × currentXtooPrice` for USD calculation

### ROI/APY Cards Behavior
- **Colors**:
  - Green (📈): ROI > 100% (profit)
  - Yellow (📊): ROI 50-100% (partial loss but recovering)
  - Red (📉): ROI < 50% (significant loss)
- **Descriptions**: 
  - ROI: "Value ratio: Current XTOO value vs initial investment"
  - APY: "Annualized return on total XTOO received"

### Color-Coded System
- **Investor Level Panel**: Blue/Yellow/Purple (matches levels)
- **ADA Dividend Tracker**: Emerald/Green with progress states
- **ROI Card**: Green/Yellow/Red based on value ratio thresholds
- **APY Card**: Blue with calculation method display
- **Token Cards**: Unique gradient for each token type

### Responsive Grid System
- **Mobile**: Single column stack (< 640px)
- **Tablet**: 2 columns (640px - 768px)
- **Desktop**: 4 columns for tokens, 2 for progress bars (768px+)
- **Action Buttons**: Stack on mobile, side-by-side on desktop

### Progress Bar Design
- **Height**: 32px (h-8) for better visibility
- **Border Radius**: Minimal (`rounded`) not fully rounded
- **Animation**: 1-second smooth transitions
- **States**: Dark gray (no balance) → Colored gradients (with balance)

## Trading Integration

### Buy/Sell Integration
- **Platform**: Matcha.xyz DEX
- **URL**: `https://matcha.xyz/tokens/bsc/0x5cfc37a4ae6108e146f2bbed702c4acabb5a149a`
- **Implementation**: Opens in new window (1200x800 popup)
- **Button**: Blue gradient, full-width on mobile

### Chart Integration  
- **Platform**: GeckoTerminal
- **URL**: `https://www.geckoterminal.com/bsc/pools/0x934a02c24699598daef464cd0fbc81c57f262fa0`
- **Implementation**: Modal with responsive iframe
- **Features**: Full-screen chart, mobile-optimized, close on outside click

## Development Patterns & Conventions

### Function Naming & Organization
- **ROI/APY Functions**: Always pass `totalHistoricalXtoo`, not current balance
- **Price Functions**: Use cached fetch with 'token_prices' cache type
- **Balance Functions**: Use cached fetch with 'token_balances' cache type
- **Debug Functions**: Always include comprehensive logging for complex calculations

### Cache Integration Pattern
```javascript
// Always use cachedFetch instead of raw fetch
const data = await cachedFetch(url, options, cacheType);
```
- **Cache Types**: Use appropriate cache type for TTL management
- **Fallbacks**: Cached functions should handle failures gracefully
- **Debug**: Include cache hit/miss logging in development

### ROI/APY Update Pattern
```javascript
function updateROIAPYDisplay(totalHistoricalXtoo, xtooPrice, userData) {
    const currentTotalValue = totalHistoricalXtoo * xtooPrice;
    const roi = calculateROI(currentTotalValue, initialInvestment);
    const apy = calculateAPY(currentTotalValue, initialInvestment, daysPassed);
}
```
- **NEVER use current wallet balance for ROI calculation**
- **ALWAYS use total historical XTOO received**
- **ALWAYS validate price availability before calculation**

### Debugging & Diagnostics
- **Global Debug Function**: `diagnoseROICalculation()` available in console
- **Comprehensive Logging**: All major calculations should log intermediate values
- **User-Friendly Errors**: Graceful degradation with meaningful error messages

## File Structure (Production)
```
📁 Repository/
├── 🌟 index.html (auto-redirect with loading spinner)
├── 🚀 dashboard_investor_cloud.html (MAIN - cloud database + cache system)
├── 💾 dashboard_local.html (backup - localStorage only) 
├── 📖 SUPABASE_SETUP.md (complete database setup guide)
├── 🔧 simple_server.ps1 (local development server)
├── 📝 README.md (comprehensive documentation)
├── 📋 CACHE_SYSTEM_IMPLEMENTATION.md (performance enhancement docs)
└── 🧪 test_cache_system.html (cache testing page)
```

## Database Schema (Supabase)
```sql
Table: public.investors
- id: SERIAL PRIMARY KEY
- wallet_address: TEXT UNIQUE NOT NULL
- name: TEXT NOT NULL  
- initial_investment: NUMERIC NOT NULL
- initial_date: DATE NOT NULL
- created_at: TIMESTAMP WITH TIME ZONE DEFAULT NOW()
- updated_at: TIMESTAMP WITH TIME ZONE DEFAULT NOW()
```

## Security Considerations - Production Ready
- ✅ **Read-only Operations**: No private keys handled
- ✅ **Public Data Only**: Wallet addresses, investment amounts, dates
- ✅ **HTTPS Deployment**: GitHub Pages provides SSL
- ✅ **Client-side Processing**: All calculations in browser
- ✅ **Supabase RLS**: Row Level Security enabled with public policies
- ✅ **API Cache Security**: No sensitive data cached, TTL prevents stale security info

## Performance Optimizations
- ✅ **API Response Caching**: 95%+ improvement for repeat calls
- ✅ **Lazy Loading**: Heavy components load only when needed
- ✅ **Efficient APIs**: Parallel API calls where possible
- ✅ **Smart Cache Invalidation**: Ctrl+Click refresh for fresh data
- ✅ **Minimal Dependencies**: Vanilla JS + Tailwind CSS only

## Mobile Optimization Patterns
- **Header**: Stacked on mobile, horizontal on desktop
- **Connection Panel**: Vertical buttons on mobile, horizontal on desktop  
- **Progress Bars**: Full-width containers with responsive internal elements
- **Modals**: Reduced padding, optimized heights for mobile viewports
- **Touch Targets**: Minimum 44px tap areas for all interactive elements
- **Balance Cards**: Stack vertically on mobile, side-by-side on desktop

## Error Handling & Fallbacks
- **API Failures**: Fallback to cached data (even if expired)
- **Database Failures**: Automatic localStorage fallback
- **Network Issues**: Graceful degradation with user feedback
- **MetaMask Issues**: Clear error messages and troubleshooting
- **Calculation Errors**: Validation and fallback to safe defaults

## Key Project Principles
1. **Simplicity First**: Keep core functionality focused and clean
2. **Performance Matters**: Use caching and optimization where it makes sense
3. **User-Centric**: Calculations should make intuitive sense to investors
4. **Transparent**: Provide debugging tools and clear explanations
5. **Reliable**: Multiple fallbacks and error handling
6. **Mobile-First**: Responsive design is not optional
7. **Data Integrity**: ROI calculations must use correct historical data

## Console Commands for Development/Debugging
```javascript
// Check cache performance
apiCache.getStats()

// Clear cache manually
apiCache.clear()

// Diagnose ROI calculation issues
diagnoseROICalculation()

// Force refresh with cache clear
handleRefreshClick({ctrlKey: true})
```