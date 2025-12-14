import os
import time
import threading

def monitor_carpeta():
    carpeta = "sistemas"
    archivos_anterior = set()
    
    archivos_actual = set(os.listdir(carpeta))
    for archivo in sorted(archivos_actual):
        print(f"  - {archivo}")
    archivos_anterior = archivos_actual
    
    while True:
        time.sleep(1)
        archivos_actual = set(os.listdir(carpeta))
        nuevos = archivos_actual - archivos_anterior
        for archivo in nuevos:
            print(f"[NUEVO] {archivo}")
        eliminados = archivos_anterior - archivos_actual
        for archivo in eliminados:
            print(f"[ELIMINADO] {archivo}")
        
        archivos_anterior = archivos_actual

hilo = threading.Thread(target=monitor_carpeta, daemon=True)
hilo.start()

try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    print("\finalizado.")

