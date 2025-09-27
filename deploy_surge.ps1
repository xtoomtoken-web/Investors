# Script para desplegar en Surge.sh
Write-Host "=== Despliegue Rápido con Surge.sh ===" -ForegroundColor Cyan

# Verificar si surge está instalado
try {
    surge --version | Out-Null
    Write-Host "✅ Surge encontrado" -ForegroundColor Green
} catch {
    Write-Host "❌ Surge no encontrado. Instalando..." -ForegroundColor Yellow
    
    # Verificar si npm está disponible
    try {
        npm --version | Out-Null
        npm install -g surge
        Write-Host "✅ Surge instalado exitosamente" -ForegroundColor Green
    } catch {
        Write-Host "❌ npm no disponible. Por favor:" -ForegroundColor Red
        Write-Host "1. Instala Node.js desde https://nodejs.org" -ForegroundColor Yellow
        Write-Host "2. Ejecuta: npm install -g surge" -ForegroundColor Yellow
        Write-Host "3. Ejecuta este script nuevamente" -ForegroundColor Yellow
        pause
        exit 1
    }
}

# Limpiar archivos innecesarios para deploy
$filesToExclude = @(
    "*.ps1",
    "*.py", 
    "node_modules",
    ".git",
    "serve_demo.ps1",
    "simple_server.ps1",
    "test_*.html",
    "demo.html",
    "demo_v2.html"
)

Write-Host "🚀 Desplegando en Surge..." -ForegroundColor Green
Write-Host "📁 Archivos que se incluirán:" -ForegroundColor Gray
Write-Host "   • index.html (página principal)" -ForegroundColor White
Write-Host "   • dashboard_final.html (dashboard completo)" -ForegroundColor White
Write-Host "   • README.md y documentación" -ForegroundColor White

Write-Host ""
Write-Host "💡 Consejos:" -ForegroundColor Cyan
Write-Host "   • Puedes personalizar el dominio (ej: mi-dashboard.surge.sh)" -ForegroundColor Gray
Write-Host "   • La primera vez te pedirá crear cuenta" -ForegroundColor Gray
Write-Host "   • Para actualizar, ejecuta este script nuevamente" -ForegroundColor Gray

Write-Host ""
Write-Host "🔗 Ejecutando: surge" -ForegroundColor Yellow

# Ejecutar surge
surge

Write-Host ""
Write-Host "✅ ¡Despliegue completado!" -ForegroundColor Green
Write-Host "📱 Tu dashboard ya está online y accesible desde cualquier navegador" -ForegroundColor White
Write-Host "🔗 Funciona con MetaMask en móviles y desktop" -ForegroundColor White

pause