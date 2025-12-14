import shutil
from datetime import datetime, timedelta
from pathlib import Path

carpeta_origen = r"C:\Users\cruzc\OneDrive\Escritorio\PROYECTO_DE_VENTA_DE_MUEBLES"
archivo_destino = "resultado.txt"
dias = 7

fecha_limite = datetime.now() - timedelta(days=dias)
carpetas_encontradas = []

print(f"\nBuscando carpetas modificadas en los últimos {dias} días...\n")

for carpeta in Path(carpeta_origen).rglob("*"):
    if carpeta.is_dir() and datetime.fromtimestamp(carpeta.stat().st_mtime) > fecha_limite:
        ruta_relativa = str(carpeta.relative_to(carpeta_origen))
        
        for archivo in carpeta.glob("*"):
            if archivo.is_file():
                carpetas_encontradas.append(f"{ruta_relativa} - {archivo.name}")
        
        print(f"✓ {ruta_relativa}")

with open(archivo_destino, 'w', encoding='utf-8') as f:
    f.write(f"REPORTE DE CARPETAS MODIFICADAS\n")
    f.write(f"Fecha de búsqueda: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
    f.write(f"Últimos días: {dias}\n")
    f.write(f"Total encontrado: {len(carpetas_encontradas)}\n")
    f.write("LISTADO:\n\n")
    
    for item in carpetas_encontradas:
        f.write(f"✓ {item}\n")

print(f"\nguardado en: {archivo_destino}")
