import csv

archivo_csv = "ejemplo_datos.csv"
columna = input("(edad, salario, años_experiencia): ")

with open(archivo_csv, 'r', encoding='utf-8') as f:
    lector = csv.DictReader(f, skipinitialspace=True)
    
    suma = 0
    cantidad = 0
    
    print(f"Leyendo '{archivo_csv}'...\n")
    
    for fila in lector:
        try:
            valor = float(fila[columna])
            suma += valor
            cantidad += 1
        except:
            pass

print(f"Columna: {columna}")
print(f"Valores: {cantidad}")
print(f"\n✓ SUMA: {suma}")

if cantidad > 0:
    print(f"✓ Promedio: {suma / cantidad:.2f}")
else:
    print("No hay valores para calcular promedio")
