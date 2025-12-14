# IMPORTS (Traer herramientas que necesitamos)
import shutil  # Herramienta para copiar archivos y carpetas
from datetime import datetime, timedelta  # Herramienta para trabajar con fechas y horas
from pathlib import Path  # Herramienta para manejar rutas de archivos (carpetas)

# VARIABLES (Espacios para guardar información)
carpeta_origen = r"C:/"  # Texto que guarda la ruta de donde buscar. La "r" significa "ruta literal"
archivo_destino = "resultado.txt"  # Texto que guarda el nombre del archivo TXT donde guardaremos resultados
dias = 7  # Número que guarda cuántos días atrás buscar

# CALCULOS (Hacer operaciones matemáticas o de fechas)
fecha_limite = datetime.now() - timedelta(days=dias)  # Restar 7 días a hoy para saber qué fecha límite usar
carpetas_encontradas = []  # Lista vacía (como un cuaderno) donde guardaremos lo que encontremos

# MENSAJE INICIAL (Mostrar en pantalla)
print(f"\nBuscando carpetas modificadas en los últimos {dias} días...\n")  # "\n" = salto de línea. "f" al inicio = poder poner variables con {}

# BUCLE 1 (Repetir algo muchas veces - Buscar carpetas)
for carpeta in Path(carpeta_origen).rglob("*"):  # Recorrer TODAS las carpetas desde el origen (rglob = recursivo)
    # CONDICION (Solo hacer esto SI se cumple la condición)
    if carpeta.is_dir() and datetime.fromtimestamp(carpeta.stat().st_mtime) > fecha_limite:  # Si es carpeta Y fue modificada después del límite
        ruta_relativa = str(carpeta.relative_to(carpeta_origen))  # Convertir ruta a texto quitando la parte de origen
        
        # BUCLE 2 (Repetir algo muchas veces - Buscar archivos dentro de cada carpeta)
        for archivo in carpeta.glob("*"):  # Recorrer archivos en esta carpeta
            # CONDICION (Solo hacer esto SI es un archivo)
            if archivo.is_file():  # Si es un archivo (no una carpeta)
                carpetas_encontradas.append(f"{ruta_relativa} - {archivo.name}")  # Agregar a la lista (append = añadir al final)
        
        # MOSTRAR EN PANTALLA
        print(f"✓ {ruta_relativa}")  # Mostrar carpeta encontrada con un check

# CREAR Y ESCRIBIR ARCHIVO TXT
with open(archivo_destino, 'w', encoding='utf-8') as f:  # Abrir (crear) archivo TXT. "w" = write (escribir). "as f" = llamarlo "f" por ahora
    f.write(f"REPORTE DE CARPETAS MODIFICADAS\n")  # Escribir en el archivo. "\n" = nueva línea
    f.write(f"Fecha de búsqueda: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")  # Escribir fecha actual formateada
    f.write(f"Últimos días: {dias}\n")  # Escribir número de días buscados
    f.write(f"Total encontrado: {len(carpetas_encontradas)}\n")  # Escribir cuántos elementos hay en la lista (len = length = largo)
    f.write(f"\n{'='*50}\n")  # Escribir 50 signos iguales (*50 = repetir 50 veces)
    f.write("LISTADO DE ARCHIVOS:\n\n")  # Escribir subtítulo
    
    # BUCLE 3 (Repetir para cada elemento de la lista)
    for item in carpetas_encontradas:  # Recorrer cada elemento guardado en la lista
        f.write(f"✓ {item}\n")  # Escribir cada archivo encontrado

# MENSAJE FINAL (Mostrar resultado)
print(f"\n✓ Reporte guardado en: {archivo_destino}")  # Mostrar dónde se guardó el archivo
