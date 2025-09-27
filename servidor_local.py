#!/usr/bin/env python3
"""
Servidor HTTP local para el Web3 Wallet Dashboard
Resuelve problemas de CORS y file:// protocol con MetaMask
"""
import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

PORT = 8000

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Headers para permitir MetaMask
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()
    
    def log_message(self, format, *args):
        # Silenciar logs del servidor
        return

def main():
    # Cambiar al directorio del proyecto
    project_dir = Path(__file__).parent
    os.chdir(project_dir)
    
    # Verificar que existan los archivos demo
    demo_files = ['demo_v2.html', 'test_simple.html']
    available_files = [f for f in demo_files if Path(f).exists()]
    
    if not available_files:
        print("❌ No se encontraron archivos demo")
        print("Archivos esperados:", demo_files)
        return
    
    print("🚀 Iniciando servidor HTTP local...")
    print("=" * 50)
    print(f"📡 Servidor: http://localhost:{PORT}")
    print(f"📁 Directorio: {project_dir}")
    print("📄 Archivos disponibles:")
    
    for file in available_files:
        print(f"   • http://localhost:{PORT}/{file}")
    
    print("\n💡 Instrucciones:")
    print("1. El navegador se abrirá automáticamente")
    print("2. MetaMask debería funcionar correctamente")
    print("3. Usa Ctrl+C para detener el servidor")
    print("=" * 50)
    
    # Configurar servidor
    handler = CustomHandler
    
    try:
        with socketserver.TCPServer(("", PORT), handler) as httpd:
            # Abrir navegador automáticamente
            main_file = available_files[0]  # Usar el primer archivo disponible
            url = f"http://localhost:{PORT}/{main_file}"
            
            print(f"\n🔗 Abriendo: {url}")
            webbrowser.open(url)
            
            print(f"\n✅ Servidor corriendo...")
            print("🛑 Presiona Ctrl+C para detener")
            
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n\n🛑 Servidor detenido por el usuario")
        print("¡Gracias por usar Web3 Wallet Dashboard!")
    except OSError as e:
        if e.errno == 10048:  # Puerto en uso
            print(f"❌ Error: Puerto {PORT} ya está en uso")
            print("Prueba cerrar otras aplicaciones o usar otro puerto")
        else:
            print(f"❌ Error del servidor: {e}")
    except Exception as e:
        print(f"❌ Error inesperado: {e}")

if __name__ == "__main__":
    main()