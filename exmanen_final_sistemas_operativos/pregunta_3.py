import threading

def es_primo(n):
    if n < 2: return False
    if n == 2: return True
    if n % 2 == 0: return False
    
    for i in range(3, int(n**0.5) + 1, 2):
        if n % i == 0: return False
    
    return True

def buscar_primos(id_hilo, inicio, fin):
    for numero in range(inicio, fin + 1):
        if es_primo(numero):
            print(f"[HILO-{id_hilo}] {numero}")

maximo = 100
hilos_count = 5

print(f"Numeros primos del 2 al {maximo} con {hilos_count} hilos\n")

hilos = []
rango = maximo // hilos_count

for i in range(hilos_count):
    inicio = 2 if i == 0 else (i * rango) + 2
    fin = ((i + 1) * rango) if i < hilos_count - 1 else maximo
    
    hilo = threading.Thread(target=buscar_primos, args=(i + 1, inicio, fin))
    hilos.append(hilo)
    hilo.start()

for hilo in hilos:
    hilo.join()

print("\n✓ Completado")

