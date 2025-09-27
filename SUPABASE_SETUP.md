# 🚀 Supabase Cloud Database Setup

## 📋 Pasos para Configurar Base de Datos Cloud

### 1. **Crear Cuenta Supabase** (2 minutos)
1. Ve a [supabase.com](https://supabase.com/)
2. Click "Start your project" 
3. Registrarse con GitHub/Google (recomendado)

### 2. **Crear Nuevo Proyecto** (1 minuto)
1. Click "New Project"
2. **Nombre**: `investor-tracking-db` (o el que prefieras)
3. **Password**: Crea una contraseña fuerte (guárdala)
4. **Región**: Selecciona la más cercana
5. Click "Create new project"
6. ⏱️ **Esperar 2-3 minutos** mientras Supabase configura la base de datos

### 3. **Crear Tabla de Inversores** (3 minutos)

#### **Opción A: SQL Editor (Rápido)**
1. En el panel Supabase, ve a **SQL Editor**
2. Copia y pega este código:

```sql
-- Crear tabla investors
CREATE TABLE public.investors (
    id SERIAL PRIMARY KEY,
    wallet_address TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    initial_investment NUMERIC NOT NULL,
    initial_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security) para seguridad
ALTER TABLE public.investors ENABLE ROW LEVEL SECURITY;

-- Crear políticas de acceso público (para demo)
CREATE POLICY "Anyone can read investors" ON public.investors
    FOR SELECT USING (true);

CREATE POLICY "Anyone can insert investors" ON public.investors
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update investors" ON public.investors
    FOR UPDATE USING (true);

-- Crear índice por wallet_address para búsquedas rápidas
CREATE INDEX idx_investors_wallet_address ON public.investors(wallet_address);
```

3. Click **"Run"** para ejecutar

#### **Opción B: Table Editor (Visual)**
1. Ve a **Table Editor**
2. Click **"Create a new table"**
3. **Nombre**: `investors`
4. Agregar columnas:
   - `wallet_address` (text, unique, not null)
   - `name` (text, not null)
   - `initial_investment` (numeric, not null)
   - `initial_date` (date, not null)
5. Click **"Save"**

### 4. **Obtener Credenciales** (1 minuto)
1. Ve a **Settings** → **API**
2. Copia estas dos claves:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **Anon public key**: `eyJhbGciOiJIUzI1NiIs...` (clave larga)

### 5. **Configurar en el Dashboard** (30 segundos)
1. Abre `dashboard_investor_cloud.html` en un editor
2. Busca estas líneas (cerca del inicio del script):

```javascript
// ⚠️ IMPORTANTE: Reemplaza con tus credenciales de Supabase
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';
```

3. **Reemplaza con tus datos reales**:

```javascript
const SUPABASE_URL = 'https://xxxxx.supabase.co'; // Tu Project URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIs...'; // Tu Anon key
```

4. **Guarda el archivo**

## ✅ **Probar la Configuración**

### **Iniciar Servidor Local**
```bash
powershell -ExecutionPolicy Bypass -File simple_server.ps1 -File dashboard_investor_cloud.html -Port 8080
```

### **Abrir Dashboard**
- Ve a: `http://localhost:8080/dashboard_investor_cloud.html`
- Conecta tu MetaMask
- Ingresa datos de prueba en el modal
- Verifica en Supabase que los datos se guardaron

### **Verificar en Supabase**
1. Ve a **Table Editor** → **investors**
2. Deberías ver tu registro guardado
3. El indicador en la app dirá "✅ Synced"

## 🔄 **Sistema Híbrido (Cloud + Local)**

### **Funciones del Sistema**:
- **✅ Cloud disponible**: Guarda/lee de Supabase
- **⚠️ Cloud no disponible**: Usa localStorage como fallback
- **🔄 Indicador visual**: Muestra estado actual ("☁️ Cloud DB" o "💾 Local")

### **Ventajas**:
- **Acceso multi-dispositivo**: Conecta tu wallet desde cualquier PC
- **Persistencia real**: Los datos no se pierden
- **Fallback local**: Funciona sin internet
- **Sincronización**: Automática cuando hay conexión

## 🚨 **Seguridad y Consideraciones**

### **Datos Almacenados**:
- ✅ **Wallet address** (público)
- ✅ **Nombre del inversor** (público)
- ✅ **Monto inversión inicial** (público)  
- ✅ **Fecha de inversión** (público)
- ❌ **NO se guarda**: Claves privadas, semillas, etc.

### **Políticas de Acceso**:
- **Actual**: Acceso público total (para demo)
- **Producción**: Se puede restringir por wallet o roles

### **Escalabilidad**:
- **Tier Gratuito**: Hasta 500MB y 50,000 requests/mes
- **Más que suficiente** para uso personal/pequeño

## 🎯 **Resultado Final**

### **Experiencia de Usuario**:
1. **Primera vez**: Conecta wallet → Modal aparece → Datos se guardan en cloud
2. **Siguientes veces**: Conecta desde CUALQUIER PC → Datos aparecen automáticamente
3. **Sin conexión**: Funciona con localStorage local

### **Indicadores Visuales**:
- **☁️ Cloud DB**: Conectado a Supabase
- **✅ Synced**: Datos sincronizados correctamente
- **💾 Local**: Usando fallback local

¡Listo! Ahora tienes una base de datos cloud real para tu dashboard de inversores. 🚀