#!/usr/bin/env python3
"""
Simple HTTP server to serve the Web3 Wallet Dashboard demo
"""
import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

PORT = 3000
DEMO_FILE = "demo.html"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=Path(__file__).parent, **kwargs)
    
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def main():
    # Cambiar al directorio del script
    os.chdir(Path(__file__).parent)
    
    # Verificar que existe el archivo demo
    if not Path(DEMO_FILE).exists():
        print(f"❌ Error: No se encontró {DEMO_FILE}")
        sys.exit(1)
    
    # Iniciar servidor
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print("🚀 Web3 Wallet Dashboard - Demo Server")
        print("=" * 50)
        print(f"📡 Servidor corriendo en: http://localhost:{PORT}")
        print(f"📄 Archivo demo: {DEMO_FILE}")
        print("🔗 Abriendo navegador...")
        print("\n💡 Instrucciones:")
        print("   1. Asegúrate de tener MetaMask instalado")
        print("   2. Haz clic en 'Conectar Billetera'")
        print("   3. Acepta cambiar a Binance Smart Chain si se solicita")
        print("\n🛑 Presiona Ctrl+C para detener el servidor")
        print("=" * 50)
        
        # Abrir navegador
        webbrowser.open(f"http://localhost:{PORT}/{DEMO_FILE}")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n🛑 Servidor detenido")
            print("¡Gracias por usar Web3 Wallet Dashboard!")

if __name__ == "__main__":
    main()