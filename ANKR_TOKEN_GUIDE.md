# 🔑 Cómo Obtener tu Ankr API Token - Guía Visual

## 📍 Ubicación de Elementos Clave

Cuando estés en el sitio de Ankr, busca estos elementos:

---

## 🔐 PASO 1: Crear Cuenta / Iniciar Sesión

### Si NO tienes cuenta:
1. Busca botón en la esquina superior derecha:
   - **"Sign Up"** o 
   - **"Get Started"** o
   - **"Start Building"**

2. Opciones de registro:
   - 📧 Email + Password
   - 🔵 Continue with Google
   - 🐙 Continue with GitHub

3. Verifica tu email si registraste con email

### Si YA tienes cuenta:
- Click **"Sign In"** o **"Login"**
- Usa tus credenciales

---

## 📁 PASO 2: Crear Proyecto

Una vez dentro del dashboard:

### Opción A: Primera vez (sin proyectos)
Verás una pantalla de bienvenida:
1. Click **"Create New Project"** (botón grande)
2. O click **"Get Started"**

### Opción B: Ya tienes proyectos
1. Busca en el menú lateral izquierdo o arriba:
   - **"Projects"**
2. Click botón **"+ Create Project"** o **"New Project"**

### Configuración del Proyecto:
```
┌─────────────────────────────────────┐
│  Project Name: Web3 Dashboard       │
│  Description: (opcional)             │
│  Plan: ⚪ Freemium (FREE)  👈 ESTO  │
│       ⚪ Premium                     │
│       ⚪ Enterprise                  │
└─────────────────────────────────────┘
```

3. Click **"Create"** o **"Confirm"**

---

## 🔑 PASO 3: Obtener API Token

Ahora estás dentro de tu proyecto. Busca el **API Token**:

### Método 1: Menú Lateral
Busca en el menú de la izquierda:
```
📊 Dashboard
🔗 Endpoints
🔑 API Keys        👈 AQUÍ
⚙️  Settings
📈 Usage
```

### Método 2: Tabs Superiores
Busca pestañas arriba:
```
Overview | Endpoints | API Keys 👈 AQUÍ | Settings | Usage
```

### Método 3: Direct Link
Si ves un "endpoint" mostrado, como:
```
https://rpc.ankr.com/multichain/YOUR_TOKEN_HERE
                                 ^^^^^^^^^^^^
```
- El token está después de `/multichain/`
- Cópialo desde ahí

---

## 📋 Generación del Token

Una vez en la sección de API Keys:

### Si NO hay token:
1. Verás mensaje: "No API keys yet"
2. Click botón **"Create API Key"** o **"Generate Key"**
3. Puede pedir:
   - Nombre del key (ej: "Dashboard Key")
   - Permisos (deja por defecto: Read)
4. Click **"Create"** o **"Generate"**

### Si YA hay token:
- Verás el token mostrado (parcialmente oculto)
- Click **"Show"** o ícono de ojo 👁️
- Click **"Copy"** o ícono de copiar 📋

---

## 🎯 Identificar el Token Correcto

### El token se ve así:
```
Formato: Largo string alfanumérico
Ejemplo: 
abc123def456ghi789jkl012mno345pqr678stu901vwx234yz

O puede tener guiones:
abc123de-f456-4ghi-789j-kl012mno345p
```

### NO confundir con:
- ❌ Project ID (más corto, a veces números)
- ❌ User ID (tu identificador de usuario)
- ❌ Endpoint URL completo

### Verificación:
El endpoint completo se ve así:
```
https://rpc.ankr.com/multichain/[TU_TOKEN_AQUI]
                                  ^^^^^^^^^^^^^^^^
```

---

## 🔍 Dónde Buscar si No lo Encuentras

### Alternativa 1: RPC Endpoints
1. Menú: **"RPC"** o **"Endpoints"**
2. Selecciona: **"Advanced API"**
3. Verás el endpoint completo con tu token

### Alternativa 2: Dashboard Principal
1. En la página principal del proyecto
2. Busca sección: **"Quick Start"** o **"Getting Started"**
3. Verás código de ejemplo con tu token

### Alternativa 3: Advanced API Section
1. Busca: **"Advanced API"** en el menú
2. Puede estar bajo:
   - "Products"
   - "Services"
   - "APIs"

---

## 📸 Elementos Visuales Clave

### Busca estos iconos/textos:

```
🔑 "API Keys"
🔗 "Credentials"  
🎯 "Advanced API"
⚡ "RPC Endpoints"
📋 "Copy" button
👁️  "Show/Hide" toggle
```

### Estructura típica del dashboard:

```
┌─────────────────────────────────────────────────┐
│  Ankr Dashboard                    👤 User Menu │
├──────────┬──────────────────────────────────────┤
│          │  📊 Project: Web3 Dashboard          │
│  MENU    │  ────────────────────────────────    │
│  ────    │                                       │
│ Dashboard│  Your Advanced API Endpoint:          │
│ Endpoints│  ┌──────────────────────────────┐   │
│ API Keys │  │ https://rpc.ankr.com/...     │   │
│ Settings │  │ [Copy Button] 📋            │   │
│ Usage    │  └──────────────────────────────┘   │
│          │                                       │
│          │  API Token: abc123...xyz             │
│          │  [Show] 👁️  [Copy] 📋              │
└──────────┴──────────────────────────────────────┘
```

---

## ⚠️ Troubleshooting

### "No veo API Keys"
- Verifica que estés en un **proyecto** (no en la página de inicio)
- Busca en: Settings → API Keys
- Prueba: Products → Advanced API

### "Solo veo Public RPC"
- Eso es diferente (endpoint público sin autenticación)
- Necesitas: **Advanced API** (con token)
- Busca: "Advanced API" específicamente

### "Me pide plan de pago"
- Asegúrate de seleccionar **Freemium** (gratis)
- No selecciones Premium/Enterprise
- Freemium incluye Advanced API gratis

### "El token no funciona"
- Verifica que copiaste el token completo
- No incluyas el URL, solo el token
- No dejes espacios al inicio/final

---

## ✅ Validación Final

Una vez que tengas el token, debería:
- ✅ Tener al menos 30-40 caracteres
- ✅ Ser alfanumérico (letras y números)
- ✅ Puede tener guiones: `-`
- ✅ NO tiene espacios
- ✅ NO es una URL completa

### Formato correcto:
```
✅ abc123def456ghi789jkl012mno345pqr678
✅ abc-123-def-456-ghi-789
```

### Formato incorrecto:
```
❌ https://rpc.ankr.com/multichain/abc123...  (URL completa)
❌ 12345  (muy corto)
❌ ProjectID_67890  (Project ID, no token)
```

---

## 🎯 Cuando lo Tengas

**Escribe aquí:**
```
"ankr token: TU_TOKEN_AQUI"
```

Y lo integraré inmediatamente al dashboard.

---

## 📞 Si Sigues Atascado

Dime exactamente lo que ves:
- ¿Qué página estás viendo?
- ¿Qué opciones de menú ves?
- ¿Ya creaste proyecto?
- ¿Qué plan seleccionaste?

O mejor: toma un screenshot y descríbeme lo que ves.

---

**Tiempo estimado: 2-3 minutos una vez que encuentres la sección correcta** ⏱️
