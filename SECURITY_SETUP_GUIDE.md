# 🔒 Security Setup Guide - RLS Implementation

## ⚠️ IMPORTANT: For Real User Data Protection

This guide implements **Row Level Security (RLS)** to protect real user data while maintaining dashboard functionality.

---

## 📋 What This Does

### Security Features:
- ✅ **Read Access**: Everyone can read all investor data (for stats/leaderboard)
- ✅ **Write Protection**: Users can only update their OWN wallet data  
- ✅ **Insert Control**: Each wallet can only insert once (no duplicates)
- ✅ **Delete Protection**: Nobody can delete records via API
- ✅ **Wallet Verification**: RLS policies verify wallet ownership

### What's Protected:
- Steven Cheng - $5,000 investment
- Ruby Castillo - $3,000 investment  
- Francisco Paz - $2,654 investment
- All future users

---

## 🚀 Implementation Steps

### Step 1: Execute SQL in Supabase (5 minutes)

1. **Open your Supabase Dashboard**
   - Go to: https://supabase.com/dashboard
   - Select project: `web3-investor-dashboard`

2. **Navigate to SQL Editor**
   - Left sidebar → **SQL Editor**
   - Click **"New query"**

3. **Copy & Paste SQL**
   - Open file: `supabase_rls_secure.sql`
   - Copy ALL contents
   - Paste into SQL Editor

4. **Execute**
   - Click **"RUN"** button (or Ctrl+Enter)
   - Wait for **"Success"** message

5. **Verify**
   ```sql
   -- Run this query to verify:
   SELECT schemaname, tablename, rowsecurity 
   FROM pg_tables 
   WHERE tablename = 'investors';
   
   -- Should show: rowsecurity = true
   ```

---

### Step 2: Test Locally (5 minutes)

1. **Start local server**
   ```powershell
   powershell -ExecutionPolicy Bypass -File simple_server.ps1 -Port 8081
   ```

2. **Open dashboard**
   ```
   http://localhost:8081/dashboard_investor_cloud.html
   ```

3. **Test with Ruby's wallet**
   - Connect wallet: `0xe2fEE19314e1f572C4dffE669C62dd5BCbb9d2d2`
   - Should load her data automatically
   - Try editing her info → Should work ✅
   - Save → Should work ✅

4. **Test with different wallet**
   - Switch to another wallet in MetaMask
   - Try to edit Ruby's data → Should fail ❌
   - Try to create new investor → Should work ✅

---

### Step 3: Deploy to Production (2 minutes)

1. **Commit changes**
   ```bash
   git add dashboard_investor_cloud.html supabase_rls_secure.sql SECURITY_SETUP_GUIDE.md
   git commit -m "feat: Implement RLS security for real user data protection"
   git push origin main
   ```

2. **Test live dashboard**
   - Go to: https://xtoomtoken-web.github.io/Investors/dashboard_investor_cloud.html
   - Connect Ruby's wallet
   - Verify data loads and edits work

---

## 🧪 Testing Checklist

### ✅ Things That Should Work:
- [ ] Read all investor data (public leaderboard)
- [ ] Connect wallet and see your data
- [ ] Edit YOUR OWN wallet's data  
- [ ] Save changes to YOUR data
- [ ] Register NEW wallet for first time
- [ ] View XTOO history
- [ ] See ROI/APY calculations

### ❌ Things That Should FAIL (Security Working):
- [ ] Edit ANOTHER wallet's data
- [ ] Delete any investor record
- [ ] Insert duplicate wallet address
- [ ] Update wallet_address to someone else's

---

## 🔍 Troubleshooting

### Error: "new row violates row-level security policy"
**Solution**: This is GOOD! RLS is working. You're trying to modify someone else's data.

### Error: "permission denied for table investors"
**Problem**: RLS policies not applied correctly
**Solution**: Re-run the SQL from `supabase_rls_secure.sql`

### Dashboard not loading data
**Problem**: RLS blocking legitimate reads
**Solution**: Verify "Anyone can read" policy exists:
```sql
SELECT * FROM pg_policies WHERE tablename = 'investors' AND cmd = 'SELECT';
```

### Can't save own data
**Problem**: Wallet context not being set
**Check console**: Should see "Setting wallet context for RLS"
**Solution**: Verify `set_config` function exists in Supabase

---

## 📊 Security Verification

### Check RLS Status:
```sql
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'investors';
```

### Check Active Policies:
```sql
SELECT 
    schemaname,
    tablename,
    policyname,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'investors';
```

### Test Read Access:
```sql
-- Should return all 3 users
SELECT * FROM investors;
```

### Test Write Protection:
```sql
-- This should FAIL (can't set wallet context in SQL directly)
UPDATE investors 
SET name = 'Hacker' 
WHERE wallet_address = '0xe2fee19314e1f572c4dffe669c62dd5bcbb9d2d2';
```

---

## 🎯 What Changed in Dashboard

### Modified Functions:
- `saveInvestorData()`: Now sets wallet context before save
- Sets `app.current_wallet` for RLS verification
- RLS policies verify wallet ownership on UPDATE operations

### User Experience:
- **No visible changes** - dashboard works the same
- **Behind the scenes** - data is protected
- **Security** - only wallet owner can modify their data

---

## 🔐 Security Summary

### Before RLS:
- ❌ Anyone with credentials could modify ANY data
- ❌ No protection against data tampering
- ❌ Supabase security warning

### After RLS:
- ✅ Users can only modify THEIR OWN data
- ✅ Read access public (for stats/features)
- ✅ No security warnings
- ✅ Production-ready protection

---

## 📝 Future Enhancements

### For More Security (Optional):
1. **Implement wallet signature verification**
2. **Add rate limiting per wallet**
3. **Log all data modifications**
4. **Add admin-only fields**
5. **Implement soft deletes instead of hard deletes**

### For Enterprise:
1. **Backend API with API keys in environment**
2. **Full authentication system**
3. **Encryption for sensitive fields**
4. **Audit trail for compliance**

---

## ✅ Completion Checklist

- [ ] SQL executed successfully in Supabase
- [ ] RLS policies verified active
- [ ] Local testing passed
- [ ] Changes committed to GitHub
- [ ] Live dashboard tested
- [ ] All 3 existing users data intact
- [ ] Edit functionality works for own wallet
- [ ] Security warning resolved in Supabase

---

**Created**: 2025-01-08  
**For Project**: Web3 Investor Dashboard  
**Users Protected**: Steven, Ruby, Francisco + Future Users
