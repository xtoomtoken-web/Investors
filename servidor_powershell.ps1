# Servidor HTTP simple en PowerShell para Web3 Wallet Dashboard
# Resuelve problemas de MetaMask con archivos file://

param(
    [int]$Port = 8000,
    [string]$File = "demo_v2.html"
)

Write-Host "=== Web3 Wallet Dashboard - Servidor PowerShell ===" -ForegroundColor Cyan
Write-Host "Resolviendo problemas de MetaMask con protocolo file://" -ForegroundColor Yellow

# Verificar que el archivo existe
if (!(Test-Path $File)) {
    Write-Host "Error: No se encontro $File" -ForegroundColor Red
    Write-Host "Archivos disponibles:" -ForegroundColor Yellow
    Get-ChildItem *.html | ForEach-Object { Write-Host "  - $($_.Name)" -ForegroundColor Gray }
    exit 1
}

Write-Host "Archivo encontrado: $File" -ForegroundColor Green
Write-Host "Iniciando servidor en puerto $Port..." -ForegroundColor Yellow

try {
    # Crear listener HTTP
    $listener = New-Object System.Net.HttpListener
    $prefix = "http://localhost:$Port/"
    $listener.Prefixes.Add($prefix)
    $listener.Start()
    
    Write-Host ""
    Write-Host "✅ Servidor HTTP corriendo!" -ForegroundColor Green
    Write-Host "📡 URL: ${prefix}${File}" -ForegroundColor Cyan
    Write-Host "📁 Sirviendo desde: $PWD" -ForegroundColor Gray
    Write-Host ""
    Write-Host "🔗 Abriendo navegador..." -ForegroundColor Yellow
    
    # Abrir navegador
    Start-Process "${prefix}${File}"
    
    Write-Host ""
    Write-Host "💡 Instrucciones:" -ForegroundColor Cyan
    Write-Host "1. El navegador debería abrir automáticamente" -ForegroundColor White
    Write-Host "2. MetaMask ahora debería funcionar correctamente" -ForegroundColor White
    Write-Host "3. Si no funciona, verifica que MetaMask esté desbloqueado" -ForegroundColor White
    Write-Host ""
    Write-Host "🛑 Presiona Ctrl+C para detener el servidor" -ForegroundColor Gray
    Write-Host "================================================" -ForegroundColor Cyan
    
    # Bucle principal del servidor
    while ($listener.IsListening) {
        try {
            $context = $listener.GetContext()
            $request = $context.Request
            $response = $context.Response
            
            $requestedPath = $request.Url.LocalPath.TrimStart('/')
            if ($requestedPath -eq '' -or $requestedPath -eq '/') {
                $requestedPath = $File
            }
            
            Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Solicitado: $requestedPath" -ForegroundColor DarkGray
            
            if (Test-Path $requestedPath) {
                $content = Get-Content $requestedPath -Raw -Encoding UTF8
                $buffer = [System.Text.Encoding]::UTF8.GetBytes($content)
                
                # Headers para MetaMask
                $response.Headers.Add("Access-Control-Allow-Origin", "*")
                $response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
                $response.Headers.Add("Access-Control-Allow-Headers", "Content-Type")
                $response.Headers.Add("Cache-Control", "no-cache, no-store, must-revalidate")
                $response.Headers.Add("Pragma", "no-cache")
                $response.Headers.Add("Expires", "0")
                
                # Content-Type
                if ($requestedPath.EndsWith('.html')) {
                    $response.ContentType = 'text/html; charset=utf-8'
                } elseif ($requestedPath.EndsWith('.js')) {
                    $response.ContentType = 'application/javascript'
                } elseif ($requestedPath.EndsWith('.css')) {
                    $response.ContentType = 'text/css'
                }
                
                $response.ContentLength64 = $buffer.Length
                $response.StatusCode = 200
                $response.OutputStream.Write($buffer, 0, $buffer.Length)
            } else {
                $response.StatusCode = 404
                $buffer = [System.Text.Encoding]::UTF8.GetBytes("404 - File Not Found: $requestedPath")
                $response.ContentLength64 = $buffer.Length
                $response.OutputStream.Write($buffer, 0, $buffer.Length)
                Write-Host "[$(Get-Date -Format 'HH:mm:ss')] 404: $requestedPath" -ForegroundColor Red
            }
            
            $response.OutputStream.Close()
            
        } catch [System.Net.HttpListenerException] {
            # Cliente desconectó, ignorar
            continue
        } catch {
            Write-Host "Error procesando solicitud: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
    
} catch [System.Net.HttpListenerException] {
    if ($_.Exception.ErrorCode -eq 5) {
        Write-Host ""
        Write-Host "❌ Error de permisos. Ejecuta PowerShell como Administrador" -ForegroundColor Red
        Write-Host "O prueba con otro puerto:" -ForegroundColor Yellow
        Write-Host "  .\servidor_powershell.ps1 -Port 3000" -ForegroundColor Gray
    } elseif ($_.Exception.ErrorCode -eq 183) {
        Write-Host ""
        Write-Host "❌ Puerto $Port ya está en uso" -ForegroundColor Red
        Write-Host "Prueba con otro puerto:" -ForegroundColor Yellow
        Write-Host "  .\servidor_powershell.ps1 -Port 3000" -ForegroundColor Gray
    } else {
        Write-Host "❌ Error del servidor HTTP: $($_.Exception.Message)" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Error inesperado: $($_.Exception.Message)" -ForegroundColor Red
} finally {
    if ($listener -and $listener.IsListening) {
        $listener.Stop()
        Write-Host ""
        Write-Host "Servidor detenido" -ForegroundColor Yellow
    }
}