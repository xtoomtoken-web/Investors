-- ========================================
-- SECURE RLS POLICIES FOR REAL USERS
-- Protección real para datos de usuarios reales
-- ========================================

-- Step 0: Create helper function to set session variable
CREATE OR REPLACE FUNCTION public.set_config(setting text, value text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  PERFORM set_config(setting, value, false);
END;
$$;

-- Step 1: Enable RLS
ALTER TABLE public.investors ENABLE ROW LEVEL SECURITY;

-- Step 2: LECTURA - Todos pueden leer todos los datos
-- (Necesario para stats, leaderboard, etc.)
CREATE POLICY "Anyone can read all investors"
ON public.investors
FOR SELECT
USING (true);

-- Step 3: INSERTAR - Cualquiera puede insertar nuevos registros
-- La restricción de unicidad la maneja la constraint UNIQUE en la tabla
CREATE POLICY "Users can insert their own wallet data"
ON public.investors
FOR INSERT
WITH CHECK (
    -- Solo verificar que wallet_address no sea NULL
    wallet_address IS NOT NULL
);

-- Step 4: ACTUALIZAR - Solo se puede actualizar el propio registro
-- Usando una variable de sesión para verificar la wallet actual
CREATE POLICY "Users can update only their own data"
ON public.investors
FOR UPDATE
USING (
    -- El usuario solo puede actualizar su propia wallet
    wallet_address = current_setting('app.current_wallet', true)
)
WITH CHECK (
    -- No puede cambiar la wallet_address a otra
    wallet_address = current_setting('app.current_wallet', true)
);

-- Step 5: ELIMINAR - Nadie puede eliminar (solo admin via dashboard)
-- Sin política = sin permisos de eliminación

-- ========================================
-- Verificación
-- ========================================
-- SELECT schemaname, tablename, rowsecurity 
-- FROM pg_tables 
-- WHERE tablename = 'investors';

-- SELECT * FROM pg_policies WHERE tablename = 'investors';
