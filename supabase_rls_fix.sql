-- ========================================
-- FIX: Enable RLS for investors table
-- ========================================

-- Step 1: Enable RLS on the table
ALTER TABLE public.investors ENABLE ROW LEVEL SECURITY;

-- Step 2: Allow anyone to read (SELECT) all data
CREATE POLICY "Public read access" 
ON public.investors 
FOR SELECT 
USING (true);

-- Step 3: Allow anyone to insert new records
CREATE POLICY "Public insert access" 
ON public.investors 
FOR INSERT 
WITH CHECK (true);

-- Step 4: Allow updates only to the wallet owner's own data
-- (This requires authentication, for now we allow all)
CREATE POLICY "Public update access" 
ON public.investors 
FOR UPDATE 
USING (true)
WITH CHECK (true);

-- Step 5: Prevent deletions (only admins via dashboard)
-- No policy = no one can delete via API

-- ========================================
-- Alternative: More secure policies
-- (Uncomment if you want stricter control)
-- ========================================

-- Only allow wallet owner to update their own data:
-- CREATE POLICY "Users can update own data" 
-- ON public.investors 
-- FOR UPDATE 
-- USING (wallet_address = current_setting('request.jwt.claims', true)::json->>'wallet_address')
-- WITH CHECK (wallet_address = current_setting('request.jwt.claims', true)::json->>'wallet_address');

-- ========================================
-- Verification query
-- ========================================
-- Run this to check RLS status:
-- SELECT schemaname, tablename, rowsecurity 
-- FROM pg_tables 
-- WHERE tablename = 'investors';
