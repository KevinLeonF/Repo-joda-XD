
$carpeta = "sistemas"
if (!(Test-Path $carpeta)) {
    New-Item -ItemType Directory -Name $carpeta | Out-Null
}

$rutaBase = "C:\"
$carpetaSistemas = $carpeta

$subcarpetas = Get-ChildItem -Path $rutaBase -Directory -ErrorAction SilentlyContinue

foreach ($subcarpeta in $subcarpetas) {
    $nombre = $subcarpeta.Name
    $ruta = $subcarpeta.FullName
    $archivoTxt = "$carpetaSistemas\$nombre.txt"
    $archivos = Get-ChildItem -Path $ruta -ErrorAction SilentlyContinue
    $contenido = "Subcarpeta: $nombre`n"
    $contenido += "Ruta: $ruta`n`n"
    $contenido += "Contenido:`n"
    $contenido += ($archivos | ForEach-Object { $_.Name } | Out-String)
    $contenido | Out-File -FilePath $archivoTxt -Encoding UTF8 -Force
}
