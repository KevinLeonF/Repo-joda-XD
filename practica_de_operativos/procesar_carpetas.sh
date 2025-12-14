
carpetas=(uno dos tres cuatro cinco seis siete ocho nueve diez)

for d in "${carpetas[@]}"; do
  # Crear carpeta si no existe
  mkdir -p "$d"

  echo "Procesando carpeta: $d"

  # Generar lista completa de procesos
  tasklist > "$d/procesos.txt"

  # Extraer encabezado (primeras 3 líneas de tasklist)
  head -n 3 "$d/procesos.txt" > "$d/procesos_sin10.txt"

  # Agregar el resto (omitiendo las 10 primeras líneas de datos)
  tail -n +14 "$d/procesos.txt" >> "$d/procesos_sin10.txt"

  echo "→ Archivos generados en $d"
  echo "----------------------------------"
done

echo "✅ Proceso completado para todas las carpetas."
