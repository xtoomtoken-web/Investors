# Web3 Wallet Dashboard - Servidor HTTP Local
# Soluciona problemas de MetaMask con archivos file://

Write-Host "=== Web3 Wallet Dashboard - Servidor HTTP ===" -ForegroundColor Cyan
Write-Host "Resolviendo problemas de MetaMask con archivos locales..." -ForegroundColor Yellow

# Verificar si Python está disponible
$pythonCommands = @("python", "py", "python3")
$pythonFound = $false
$pythonCmd = ""

foreach ($cmd in $pythonCommands) {
    try {
        & $cmd --version 2>$null | Out-Null
        if ($LASTEXITCODE -eq 0) {
            $pythonFound = $true
            $pythonCmd = $cmd
            $version = & $cmd --version 2>$null
            Write-Host "Python encontrado: $version" -ForegroundColor Green
            break
        }
    } catch {
        continue
    }
}

if (-not $pythonFound) {
    Write-Host "Python no encontrado. Instalando desde Microsoft Store..." -ForegroundColor Yellow
    try {
        # Intentar abrir Microsoft Store para instalar Python
        start ms-windows-store://pdp/?productid=9NRWMJP3717K
        Write-Host "Se abrió Microsoft Store. Instala Python y ejecuta este script nuevamente." -ForegroundColor Cyan
        pause
        exit 1
    } catch {
        Write-Host "No se pudo abrir Microsoft Store. Descarga Python desde python.org" -ForegroundColor Red
        Start-Process "https://www.python.org/downloads/"
        pause
        exit 1
    }
}

# Ejecutar servidor
Write-Host "Iniciando servidor HTTP local..." -ForegroundColor Green
Write-Host "El navegador se abrirá automáticamente" -ForegroundColor Gray
Write-Host "Presiona Ctrl+C para detener el servidor" -ForegroundColor Gray
Write-Host ""

try {
    & $pythonCmd servidor_local.py
} catch {
    Write-Host "Error ejecutando el servidor: $_" -ForegroundColor Red
    Write-Host "Verifica que el archivo servidor_local.py existe en este directorio" -ForegroundColor Yellow
    pause
}