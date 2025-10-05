# Web3 Wallet Dashboard (Investors) - Project Rules

## Project Overview
This is an advanced Web3 wallet dashboard for cryptocurrency investors with ROI/APY tracking, investor level system, and cloud database synchronization. The dashboard displays real-time token balances, calculates investment returns, tracks dividend distributions, and provides trading integration - all with multi-device sync capabilities.

## Current Status: Production Ready & Enhanced ✅
- **Live URL**: `https://xtoomtoken-web.github.io/Investors/dashboard_investor_cloud.html`
- **Repository**: `https://github.com/xtoomtoken-web/Investors`
- **Main File**: `dashboard_investor_cloud.html` (cloud database version)
- **Backup File**: `dashboard_local.html` (localStorage fallback)
- **Cloud Database**: Supabase PostgreSQL (fully configured)
- **Deployment**: GitHub Pages (active and tested)
- **Mobile Optimized**: Responsive design verified
- **Performance Enhancement**: API Cache System implemented ⚡
- **Multi-Wallet Support**: Smart wallet switching without page reloads ⭐

## Critical Bug Fixes Implemented

### 🔧 **Hardcoded Wallet Address Bug (FIXED)**
- **Problem**: Dashboard was using hardcoded address `0xe2fEE19314e1f572C4dffE669C62dd5BCbb9d2d2`
- **Solution**: Now uses actual connected wallet address `userAddress = accounts[0]`
- **Impact**: Dashboard now works with any wallet, not just the hardcoded one

### 🔄 **Wallet Switching Enhancement**
- **Before**: Used `location.reload()` causing poor UX
- **After**: Implemented `handleAccountSwitch()` for seamless transitions
- **Features**: Loading states, cache clearing, data persistence
- **Event Handling**: MetaMask `accountsChanged` event properly managed

## Core Architecture Patterns

### 🌐 Cloud Database Integration (Supabase)
- **Database**: PostgreSQL with `investors` table
- **Sync Strategy**: Cloud-first with localStorage fallback
- **User Recognition**: Wallet address-based identification
- **Multi-device Access**: Seamless sync across all devices
- **Data Verification**: Automatic verification after save operations
- **Enhanced Logging**: Detailed operation logs for debugging

### ⚡ API Cache System - PERFORMANCE ENHANCEMENT
- **Implementation**: Smart caching with TTL (Time To Live) management
- **Cache Clearing**: Automatic cache invalidation on wallet switches
- **Cache Types**: Different TTL for different data types
  - Token Prices: 2 minutes TTL
  - Token Balances: 3 minutes TTL
  - Contract Calls: 5 minutes TTL
  - Transaction History: 10 minutes TTL
  - User Data: 15 minutes TTL

### 🔄 **Multi-Wallet Management System**

#### **Wallet Connection Functions:**
- `handleAccountSwitch(newAddress)`: Seamless account switching
- `handleWalletDisconnect()`: Clean state reset on disconnect
- `updateConnectionStatus(connected)`: UI state management

#### **Event Handling Pattern:**
```javascript
window.ethereum.on('accountsChanged', function(accounts) {
    if (accounts.length === 0) {
        handleWalletDisconnect();
    } else if (accounts[0] !== userAddress) {
        handleAccountSwitch(accounts[0]);
    }
});
```

### 💾 **Enhanced Database Operations**

#### **Save Pattern with Verification:**
```javascript
async function saveInvestorData(walletAddress, userData) {
    // 1. Save to Supabase with detailed logging
    // 2. Verify save operation immediately
    // 3. Fallback to localStorage if cloud fails
    // 4. Update UI status indicators
}
```

#### **Data Reload After Edit:**
```javascript
// CRITICAL: Always reload from database after edits
await saveInvestorData(userAddress, currentUserData);
const reloadedData = await getInvestorData(userAddress);
currentUserData = reloadedData; // Use verified data
```

## Design System - Unified 3-Color Scheme

### 🎨 **Color Consistency (CRITICAL)**
- **Blue (Blue)**: ROI Card + Investor Level Panel
- **Purple (Purple)**: Current XTOO Balance + Total XTOO Received  
- **Cyan**: APY Card + ADA Dividend Tracker + View Chart Button

### 🖼️ **Icon System - Line SVG Only**
- **NO EMOJIS**: All emojis replaced with Line SVG icons
- **Color Matching**: Icons use their parent card's color scheme
- **Consistent Sizing**: w-6 h-6 for inline, w-8 h-8 for accent icons

### 📱 **Button Integration Pattern**
- **Buy/Sell Button**: Integrated within Current XTOO Balance card
- **History Button**: Integrated within Total XTOO Received card  
- **Central Actions**: Only View Chart button remains in action area
- **Color Coordination**: Buttons match their parent card colors

## ROI/APY Calculation System - CORRECTED

### 📊 **ROI Display Pattern**
- **Main Value**: ROI percentage (value ratio method)
- **Secondary Info**: "Profit/Loss: $X.XX" (shows USD value of Total XTOO Received)
- **Formula**: `(currentTotalValue / initialInvestment) × 100`
- **Interpretation**: >100% = profit, <100% = loss

### 📈 **APY Calculation - SIMPLIFIED**
- **Formula**: `APY = (ROI ÷ days elapsed) × 365`
- **Display**: Shows investment period in days
- **Method Description**: "Formula: (ROI ÷ days) × 365"

### 💰 **Balance Card Layout (CORRECTED)**
#### **Current XTOO Balance Card:**
- **Top (Large)**: USD equivalent value
- **Bottom (Small)**: "XTOO Tokens: X.XX XTOO"
- **Button**: Buy/Sell with purple gradient

#### **Total XTOO Received Card:**
- **Top (Large)**: USD equivalent of total received
- **Bottom (Small)**: "XTOO Tokens: X.XX XTOO"  
- **Button**: History with purple gradient (matching Current Balance)

## Token Configuration (Updated)

### Monitored Tokens List
1. **XTOO (Target Token)**: `0x5cFC37a4AE6108E146f2Bbed702c4AcaBB5a149a`
2. **ADA (Cardano)**: `0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D37`
3. **WLF**: `0x47474747477b199288bF72a1D702f7Fe0Fb1DEeA`
4. **XRP**: `0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE`
5. **BNB**: Native token (always first)

## Development & Debugging Patterns

### 🔍 **Debug Functions (Available in Console):**
- `debugInvestorData()`: Compares current vs fresh database data
- `testAccountSwitch()`: Verifies wallet switching functionality
- `diagnoseROICalculation()`: Checks ROI calculation values
- `apiCache.getStats()`: Shows cache performance metrics

### 📝 **Logging Conventions:**
- Use emoji prefixes: 🔄 (processing), ✅ (success), ❌ (error)
- Include detailed object logging for complex operations
- Always log wallet switches and database operations
- Verification logs after save operations

### 🧪 **Testing Patterns:**
- **Wallet Switching**: Test account changes in MetaMask
- **Data Persistence**: Edit info, reload page, verify changes persist
- **Multi-device**: Same wallet on different devices should sync
- **Error Handling**: Test with network issues, database failures

## Security & Error Handling

### 🔐 **Security Principles:**
- No private keys handled (read-only operations)
- Public data only (wallet addresses, investment amounts, dates)
- Client-side processing only
- Row Level Security (RLS) enabled on Supabase

### 🚨 **Error Handling Patterns:**
- **Database Errors**: Automatic fallback to localStorage
- **Network Issues**: Show cached data with warnings
- **Wallet Errors**: Clear error messages with recovery options
- **API Failures**: Graceful degradation with user feedback

## File Structure (Production)
```
📁 Repository: xtoomtoken-web/Investors
├── 🌟 index.html (auto-redirect)
├── 🚀 dashboard_investor_cloud.html (MAIN - cloud + multi-wallet)
├── 💾 dashboard_local.html (backup - localStorage only)
├── 📖 SUPABASE_SETUP.md (database setup guide)
├── 🔧 simple_server.ps1 (local development server)
├── 📝 README.md (comprehensive documentation)
├── 📋 Design summaries and changelogs
└── 🧪 Test files for development
```

## Performance Optimizations
- ✅ **API Response Caching**: 95%+ improvement for repeat calls
- ✅ **Smart Cache Invalidation**: Clears on wallet switches
- ✅ **Lazy Loading**: Heavy components load only when needed
- ✅ **Efficient APIs**: Parallel API calls where possible
- ✅ **Minimal Dependencies**: Vanilla JS + Tailwind CSS only

## Key Project Principles (UPDATED)
1. **Multi-Wallet First**: Support seamless wallet switching
2. **Data Integrity**: Always verify saves with database reloads
3. **User-Centric Design**: Calculations should make intuitive sense
4. **Performance Matters**: Smart caching and optimization
5. **Visual Consistency**: 3-color system with Line icons only
6. **Robust Error Handling**: Multiple fallbacks and clear feedback
7. **Mobile-First**: Responsive design is mandatory
8. **Debug-Friendly**: Comprehensive logging and console tools

## Console Commands for Development/Debugging
```javascript
// Test wallet switching functionality
testAccountSwitch()

// Debug data synchronization
debugInvestorData()

// Check cache performance
apiCache.getStats()

// Clear cache manually
apiCache.clear()

// Diagnose ROI calculation issues
diagnoseROICalculation()

// Force refresh with cache clear
handleRefreshClick({ctrlKey: true})
```

## Deployment & Updates
- **GitHub Repository**: `xtoomtoken-web/Investors`
- **Live URL**: Auto-deploys from main branch
- **Update Process**: git add, commit, push to main
- **Authentication**: Uses GitHub Personal Access Token
- **Verification**: Always test locally before pushing