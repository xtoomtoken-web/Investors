# Servidor HTTP simple para Web3 Dashboard
param([int]$Port = 8000, [string]$File = "test_simple.html")

Write-Host "Servidor Web3 Dashboard" -ForegroundColor Green
Write-Host "Puerto: $Port" -ForegroundColor Yellow
Write-Host "Archivo: $File" -ForegroundColor Yellow

if (!(Test-Path $File)) {
    Write-Host "Error: Archivo no encontrado - $File" -ForegroundColor Red
    exit 1
}

try {
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://localhost:$Port/")
    $listener.Start()
    
    $url = "http://localhost:$Port/$File"
    Write-Host "Servidor iniciado: $url" -ForegroundColor Green
    Start-Process $url
    
    Write-Host "Presiona Ctrl+C para detener..." -ForegroundColor Gray
    
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $path = $request.Url.LocalPath.TrimStart('/')
        if ($path -eq '') { $path = $File }
        
        if (Test-Path $path) {
            $content = Get-Content $path -Raw -Encoding UTF8
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($content)
            
            $response.Headers.Add("Access-Control-Allow-Origin", "*")
            $response.Headers.Add("Cache-Control", "no-cache")
            
            if ($path.EndsWith('.html')) {
                $response.ContentType = 'text/html; charset=utf-8'
            }
            
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            Write-Host "Served: $path" -ForegroundColor DarkGray
        } else {
            $response.StatusCode = 404
            Write-Host "404: $path" -ForegroundColor Red
        }
        
        $response.OutputStream.Close()
    }
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
} finally {
    if ($listener) { $listener.Stop() }
    Write-Host "Servidor detenido" -ForegroundColor Yellow
}