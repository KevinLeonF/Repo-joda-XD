# IMPORTS (Traer herramientas que necesitamos)
import threading  # Herramienta para crear múltiples hilos (procesos paralelos)

# FUNCIÓN 1 (Bloque de código reutilizable)
def es_primo(n):  # Definir función que verifica si un número es primo
    # CONDICIONES (Casos especiales)
    if n < 2: return False  # Si es menor a 2, no es primo (salir y devolver False = falso)
    if n == 2: return True  # Si es exactamente 2, es primo (salir y devolver True = verdadero)
    if n % 2 == 0: return False  # Si es divisible entre 2 (par), no es primo (% = resto de división)
    
    # BUCLE (Verificar divisores)
    for i in range(3, int(n**0.5) + 1, 2):  # Recorrer números desde 3 hasta raíz cuadrada, de 2 en 2 (solo impares)
        if n % i == 0: return False  # Si encuentra un divisor, no es primo
    
    return True  # Si no encuentra divisores, es primo

# FUNCIÓN 2 (Bloque de código que ejecuta cada hilo)
def buscar_primos(id_hilo, inicio, fin):  # Definir función con 3 parámetros (id, inicio, fin)
    for numero in range(inicio, fin + 1):  # Recorrer números desde inicio hasta fin
        if es_primo(numero):  # Si el número es primo
            print(f"[HILO-{id_hilo}] {numero}")  # Mostrar el número con su ID de hilo

# VARIABLES (Espacios para guardar información)
maximo = 800  # Número que guarda hasta dónde buscar primos
hilos_count = 5  # Número que guarda cuántos hilos crear

# MENSAJE INICIAL
print(f"Numeros primos del 2 al {maximo} con {hilos_count} hilos\n")  # Mostrar instrucción inicial

# CREAR ESTRUCTURA PARA HILOS
hilos = []  # Lista vacía que guardará todos los hilos
rango = maximo // hilos_count  # Dividir el rango entre cantidad de hilos (// = división entera, sin decimales)

# BUCLE 1 (Crear cada hilo)
for i in range(hilos_count):  # Repetir 5 veces (i valdrá 0, 1, 2, 3, 4)
    inicio = 2 if i == 0 else (i * rango) + 2  # Si es el primero empezar en 2, si no calcular
    fin = ((i + 1) * rango) if i < hilos_count - 1 else maximo  # Calcular fin del rango
    
    hilo = threading.Thread(target=buscar_primos, args=(i + 1, inicio, fin))  # Crear hilo con función y parámetros
    hilos.append(hilo)  # Agregar hilo a la lista (append = añadir al final)
    hilo.start()  # Iniciar ejecución del hilo

# BUCLE 2 (Esperar a que terminen todos)
for hilo in hilos:  # Recorrer cada hilo que creamos
    hilo.join()  # Esperar a que este hilo termine (join = unirse, esperar)

# MENSAJE FINAL
print("\n✓ Completado")  # Mostrar que todo terminó
