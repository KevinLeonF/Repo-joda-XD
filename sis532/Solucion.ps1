#Escribir un script de PwSH para:
#1: Crear 10 carpetas
#2: Dentro de cada carpeta crea un un archivo con procesos como contendo(procesos.txt)
#3: Crear un segundo archivo dentro de cada carpeta, eliminar las primeras 10 líneas de código (p2.txt)

for ($i=1;$i -le 10; $i++) {
    mkdir carpeta$i
    Get-Process > carpeta$i/procesos.txt
    Get-Content carpeta$i/procesos.txt | Select-Object -Skip 10 > carpeta$i/p2.txt
}
