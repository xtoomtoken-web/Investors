# Web3 Wallet Dashboard - Script de Inicio
Write-Host "=== Web3 Wallet Dashboard ===" -ForegroundColor Cyan
Write-Host "Iniciando aplicacion..." -ForegroundColor Yellow

# Verificar si Node.js está instalado
try {
    $nodeVersion = node --version
    Write-Host "Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "Error: Node.js no está instalado. Por favor instala Node.js desde https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Verificar si npm está disponible
try {
    $npmVersion = npm --version
    Write-Host "npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "Error: npm no está disponible" -ForegroundColor Red
    exit 1
}

# Instalar dependencias si no existen
if (!(Test-Path "node_modules")) {
    Write-Host "Instalando dependencias..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error instalando dependencias" -ForegroundColor Red
        exit 1
    }
}

# Iniciar servidor de desarrollo
Write-Host "Iniciando servidor de desarrollo en http://localhost:3000" -ForegroundColor Green
Write-Host "Presiona Ctrl+C para detener el servidor" -ForegroundColor Gray

npm run dev