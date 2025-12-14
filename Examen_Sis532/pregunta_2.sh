
mkdir -p sistemas
RUTA="/c"

for subcarpeta in "$RUTA"/*; do
    if [ -d "$subcarpeta" ]; then
        nombre=$(basename "$subcarpeta")
        {
            echo "Subcarpeta: $nombre"
            echo "Ruta: $subcarpeta"
            echo ""
            echo "Contenido:"
            ls -la "$subcarpeta" 2>/dev/null || echo "Sin acceso"
        } > "sistemas/$nombre.txt"
    fi
done



