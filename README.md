# 🚀 Web3 Investor Dashboard

Advanced Web3 wallet dashboard with ROI/APY tracking and cloud database synchronization.

## 🌟 Features

### 📊 Core Analytics
- **ROI/APY Tracking**: Real-time return calculations based on initial investment
- **Portfolio Analytics**: Comprehensive portfolio performance analysis
- **Performance Timeline**: 7d, 30d, and all-time performance tracking
- **Best/Worst Performers**: Automated performance comparison

### 💼 Portfolio Management
- **Token Allocation Chart**: Visual portfolio distribution
- **Diversification Score**: Risk assessment with HHI calculation
- **Risk Analysis**: Concentration risk and volatility metrics
- **Historical Performance**: Multi-timeframe performance tracking

### ☁️ Data & Sync
- **Cloud Database**: Multi-device sync with Supabase
- **Real-time Prices**: Live price feeds from multiple APIs
- **Multi-Token Support**: BNB, XTOO, ADA, WLF, XRP tracking

### 🏆 Investor System
- **Investor Levels**: Fan/Pro/VIP system based on XTOO holdings  
- **ADA Dividend Tracker**: Monitor dividend distribution progress
- **Level Progress**: Visual progress indicators with rewards

### 🎯 Trading & Charts
- **Trading Integration**: Centered popup for Matcha.xyz trading
- **Price Charts**: Enhanced modal with amber-themed design
- **Direct Links**: Quick access to GeckoTerminal charts

### 📱 User Experience
- **Mobile Optimized**: Responsive design for all devices
- **Dark Theme**: Professional dark gradient design
- **Smooth Animations**: 1-second transitions for all elements

## 🔗 Live Demo

**[🚀 Launch Dashboard](https://your-username.github.io/web3-investor-dashboard/)**

## 📊 Dashboard Versions

- **🌟 Main**: [`dashboard_investor_cloud.html`](dashboard_investor_cloud.html) - Cloud database version
- **💾 Local**: [`dashboard_local.html`](dashboard_local.html) - localStorage only version

## 🪙 Monitored Tokens

| Token | Address | Features |
|-------|---------|----------|
| **XTOO** | `0x5cFC37a4AE6108E146f2Bbed702c4AcaBB5a149a` | ROI tracking, Investor levels |
| **ADA** | `0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47` | Real price from CoinGecko |
| **WLF** | `0x47474747477b199288bF72a1D702f7Fe0Fb1DEeA` | Real price from Binance API |
| **XRP** | `0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE` | Real price from CoinGecko |

## 🏆 Investor Level System

| Level | XTOO Required | Benefits |
|-------|---------------|----------|
| 🌟 **Fan** | 0 - 2,499 | Basic tracking |
| ⚡ **Pro** | 2,500 - 4,999 | Enhanced crypto opportunities |
| 👑 **VIP** | 5,000+ | ADA dividend eligibility + Max rewards |

## 💰 ADA Dividend System

- **Threshold**: 1,000 XTOO in contract triggers dividend payment
- **Eligibility**: Requires 5,000+ XTOO to receive dividends
- **Token**: Dividends paid in ADA (Cardano)
- **Tracking**: Real-time progress monitoring

## 📊 Portfolio Analytics Features

### Performance Summary Cards
- **💎 Total Portfolio Value**: Real-time portfolio valuation with 24h changes
- **⚡ Best Performer**: Top performing token with percentage gains
- **📉 Worst Performer**: Underperforming token identification
- **🎯 Diversification Score**: Risk assessment using HHI methodology

### Token Allocation Analysis
- **🥧 Visual Allocation Chart**: Horizontal bar chart showing token distribution
- **Percentage Breakdown**: Precise allocation percentages for each holding
- **Color-Coded Display**: Gradient bars for easy visual identification
- **Automatic Sorting**: Tokens ordered by portfolio weight

### Historical Performance Tracking  
- **📈 Performance Timeline**: Multi-timeframe analysis (7d, 30d, all-time)
- **Color-Coded Results**: Green/red indicators for gains/losses
- **Percentage Display**: Clear performance metrics with trend indicators

### Risk Analysis Dashboard
- **⚠️ Concentration Risk**: Individual token risk assessment
- **📊 Volatility Metrics**: Portfolio Beta, Sharpe Ratio calculations  
- **Max Drawdown Tracking**: Historical loss analysis
- **Risk Level Indicators**: High/Medium/Low risk classifications

### Interactive Features
- **🔄 Refresh Analytics**: Manual data refresh capability
- **Real-time Updates**: Automatic updates with wallet data refresh
- **Mobile Responsive**: Optimized grid layouts for all screen sizes

## ⚙️ Setup & Installation

### 🚀 Quick Start (GitHub Pages)

1. Fork this repository
2. Go to Settings → Pages
3. Select "Deploy from branch" → main
4. Access at: `https://your-username.github.io/web3-investor-dashboard/`

### 🔧 Local Development

1. **Clone repository**:
   ```bash
   git clone https://github.com/your-username/web3-investor-dashboard.git
   cd web3-investor-dashboard
   ```

2. **Start local server**:
   ```powershell
   .\simple_server.ps1 -File dashboard_investor_cloud.html -Port 8080
   ```

3. **Open browser**: http://localhost:8080/

### ☁️ Cloud Database Setup

Follow the complete guide: [`SUPABASE_SETUP.md`](SUPABASE_SETUP.md)

**Quick Setup**:
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Run SQL commands from setup guide
4. Update credentials in `dashboard_investor_cloud.html`

## 🎯 Key Functionalities

### 📈 ROI/APY Calculations
- **ROI**: `((Current Value - Initial Investment) / Initial Investment) × 100`
- **APY**: Advanced compounding formula with period adjustments
- **Real-time**: Updates with current XTOO prices

### 🔄 Multi-Device Sync
- **Cloud Storage**: Investor data synced via Supabase
- **Automatic Recognition**: Wallet address-based identification  
- **Fallback**: localStorage backup when offline

### 📱 Mobile Optimization
- **Responsive Grid**: 1→2→4 columns based on screen size
- **Touch Optimized**: Proper button sizing and spacing
- **Mobile Modals**: Optimized popup experiences

## 🔧 Technical Stack

- **Frontend**: Vanilla JavaScript + Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Blockchain**: BSC RPC + MetaMask integration
- **APIs**: CoinGecko, Binance, GeckoTerminal, BSCScan

## 📁 File Structure

```
📁 web3-investor-dashboard/
├── 🌟 index.html                     # Auto-redirect to main dashboard
├── 🚀 dashboard_investor_cloud.html  # Main dashboard (cloud DB)  
├── 💾 dashboard_local.html           # Backup version (localStorage)
├── 🔧 simple_server.ps1             # Local development server
├── 📖 SUPABASE_SETUP.md             # Database setup guide
├── 📝 README.md                     # This file
└── ⚙️ .github/workflows/            # GitHub Actions (optional)
```

## 🛠️ Development

### 🧪 Testing
```powershell
# Test cloud version
.\simple_server.ps1 -File dashboard_investor_cloud.html -Port 8080

# Test local version  
.\simple_server.ps1 -File dashboard_local.html -Port 8081
```

### 🔧 Customization
- **Add tokens**: Update `SPECIFIC_TOKENS` array
- **Modify levels**: Adjust `INVESTOR_LEVELS` constants
- **Update styling**: Modify Tailwind classes

## 🚨 Security

- ✅ **Read-only**: No private keys stored or transmitted
- ✅ **Public data**: Only wallet addresses and investment amounts
- ✅ **Client-side**: All processing happens in browser
- ✅ **HTTPS required**: For MetaMask compatibility

## 📞 Support

- 📧 **Issues**: [GitHub Issues](https://github.com/your-username/web3-investor-dashboard/issues)
- 📖 **Setup Help**: [`SUPABASE_SETUP.md`](SUPABASE_SETUP.md)
- 🔧 **Local Server**: [`simple_server.ps1`](simple_server.ps1)

## 📄 License

Open source project. Feel free to fork and modify.

---

**Generated with [Memex](https://memex.tech)**  
**Co-Authored-By: Memex <noreply@memex.tech>**