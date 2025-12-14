# IMPORTS (Traer herramientas que necesitamos)
import csv  # Herramienta para leer archivos CSV (tipo Excel/tablas)

# VARIABLES (Espacios para guardar información)
archivo_csv = "ejemplo_datos.csv"  # Texto que guarda el nombre del archivo CSV a leer
columna = input("¿Qué columna deseas sumar? (nombre, edad, salario, años_experiencia): ")  # Pedir al usuario que escriba el nombre de la columna

# ABRIR ARCHIVO Y LEER
with open(archivo_csv, 'r', encoding='utf-8') as f:  # Abrir archivo. "r" = read (leer). "encoding='utf-8'" = usar caracteres especiales
    lector = csv.DictReader(f, skipinitialspace=False)  # Crear lector que interpreta encabezados como nombres de columnas. skipinitialspace=True elimina espacios después de las comas
    
    # VARIABLES PARA CALCULAR
    suma = 0  # Número que guarda el total acumulado (empieza en 0)
    cantidad = 0  # Número que guarda cuántos valores hemos sumado
    
    # MENSAJE INICIAL
    print(f"Leyendo '{archivo_csv}'...\n")  # Mostrar en pantalla que estamos leyendo
    
    # BUCLE (Repetir para cada fila del archivo)
    for fila in lector:  # Recorrer cada línea del archivo CSV
        try:  # Intentar hacer esto
            valor = float(fila[columna])  # Convertir texto a número decimal (float = número con decimales)
            suma += valor  # Sumar el valor a la suma (+=  significa sumarle lo que hay a la derecha)
            cantidad += 1  # Incrementar contador (sumarle 1)
        except:  # Si algo falla
            pass  # No hacer nada, ignorar el error

# MOSTRAR RESULTADOS
print(f"Columna: {columna}")  # Mostrar el nombre de la columna
print(f"Valores: {cantidad}")  # Mostrar cuántos números se sumaron
print(f"\n✓ SUMA: {suma}")  # Mostrar el total

# VALIDAR ANTES DE DIVIDIR (evitar división por cero)
if cantidad > 0:  # Si hay valores que sumar
    print(f"✓ Promedio: {suma / cantidad:.2f}")  # Mostrar el promedio dividiendo suma entre cantidad. ":. 2f" = mostrar 2 decimales
else:  # Si no hay valores
    print("No se encontraron valores para calcular promedio")  # Mostrar advertencia
