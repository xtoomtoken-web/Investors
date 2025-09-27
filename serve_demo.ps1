# Web3 Wallet Dashboard - PowerShell Demo Server
param(
    [int]$Port = 3000,
    [string]$File = "demo.html"
)

Write-Host "=== Web3 Wallet Dashboard - Demo Server ===" -ForegroundColor Cyan
Write-Host "Iniciando servidor HTTP en puerto $Port..." -ForegroundColor Yellow

# Verificar que el archivo demo existe
if (!(Test-Path $File)) {
    Write-Host "Error: No se encontro $File" -ForegroundColor Red
    exit 1
}

# Crear servidor HTTP básico
Add-Type -AssemblyName System.Net.HttpListener

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")

try {
    $listener.Start()
    Write-Host "Servidor corriendo en: http://localhost:$Port" -ForegroundColor Green
    Write-Host "Archivo demo: $File" -ForegroundColor Green
    Write-Host "Abriendo navegador..." -ForegroundColor Yellow
    
    # Abrir navegador
    Start-Process "http://localhost:$Port/$File"
    
    Write-Host ""
    Write-Host "Instrucciones:" -ForegroundColor Cyan
    Write-Host "1. Asegurate de tener MetaMask instalado" -ForegroundColor White
    Write-Host "2. Haz clic en 'Conectar Billetera'" -ForegroundColor White  
    Write-Host "3. Acepta cambiar a Binance Smart Chain si se solicita" -ForegroundColor White
    Write-Host ""
    Write-Host "Presiona Ctrl+C para detener el servidor" -ForegroundColor Gray
    Write-Host "===============================================" -ForegroundColor Cyan
    
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $requestedFile = $request.Url.LocalPath.TrimStart('/')
        if ($requestedFile -eq '' -or $requestedFile -eq '/') {
            $requestedFile = $File
        }
        
        if (Test-Path $requestedFile) {
            $content = Get-Content $requestedFile -Raw -Encoding UTF8
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($content)
            
            if ($requestedFile.EndsWith('.html')) {
                $response.ContentType = 'text/html; charset=utf-8'
            } elseif ($requestedFile.EndsWith('.js')) {
                $response.ContentType = 'application/javascript'
            } elseif ($requestedFile.EndsWith('.css')) {
                $response.ContentType = 'text/css'
            }
            
            $response.ContentLength64 = $buffer.Length
            $response.Headers.Add("Cache-Control", "no-cache")
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        } else {
            $response.StatusCode = 404
            $buffer = [System.Text.Encoding]::UTF8.GetBytes("404 - File Not Found")
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        }
        
        $response.OutputStream.Close()
    }
} catch {
    Write-Host "Error iniciando servidor: $_" -ForegroundColor Red
} finally {
    if ($listener.IsListening) {
        $listener.Stop()
    }
    Write-Host "Servidor detenido" -ForegroundColor Yellow
}