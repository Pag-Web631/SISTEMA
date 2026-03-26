#!/bin/bash
# Script de instalación rápida para compilar Cursos Virtual a APK
# Autor: José Augusto

echo "╔════════════════════════════════════════════════════════╗"
echo "║    Compilador APK - Cursos Virtual 2.0              ║"
echo "║    Desarrollador: José Augusto                       ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Verificar si Node.js está instalado
echo "🔍 Verificando Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado"
    echo "📥 Descárgalo en: https://nodejs.org/"
    exit 1
fi
echo "✅ Node.js encontrado: $(node -v)"
echo ""

# Verificar si Cordova está instalado
echo "🔍 Verificando Cordova..."
if ! command -v cordova &> /dev/null; then
    echo "📥 Instalando Cordova globalmente..."
    npm install -g cordova
    echo "✅ Cordova instalado"
else
    echo "✅ Cordova encontrado: $(cordova -v)"
fi
echo ""

# Crear proyecto Cordova
echo "📁 Creando proyecto Cordova..."
PROJECT_NAME="CursosVirtualAPK"
PACKAGE_NAME="com.cursosvirtual.app"

if [ -d "$PROJECT_NAME" ]; then
    echo "⚠️  La carpeta ya existe. Usando la existente..."
else
    cordova create $PROJECT_NAME $PACKAGE_NAME "Cursos Virtual"
    echo "✅ Proyecto creado"
fi
echo ""

# Entrar al directorio del proyecto
cd $PROJECT_NAME
echo "📂 Trabajando en: $(pwd)"
echo ""

# Agregar plataforma Android
echo "🔧 Configurando plataforma Android..."
cordova platform add android 2>/dev/null || echo "✅ Android ya agregado"
echo ""

# Copiar archivos
echo "📋 Copiando archivos del proyecto..."
cp ../index.html www/index.html
cp ../estudiante-nuevo.html www/estudiante.html
cp ../profesor-nuevo.html www/profesor.html
cp ../login.js www/js/login.js
cp ../estudiante.js www/js/estudiante.js
cp ../profesor.js www/js/profesor.js
cp ../login.css www/css/login.css
cp ../index.css www/css/index.css
cp ../profesor.css www/css/profesor.css
echo "✅ Archivos copiados"
echo ""

# Compilar APK
echo "🏗️  Compilando APK (esto puede tomar varios minutos)..."
cordova build android
echo ""

# Mostrar rutas
if [ -f "platforms/android/app/build/outputs/apk/debug/app-debug.apk" ]; then
    echo "╔════════════════════════════════════════════════════════╗"
    echo "║              ✅ ¡APK COMPILADO CON ÉXITO!            ║"
    echo "╠════════════════════════════════════════════════════════╣"
    echo "║ Ubicación:                                             ║"
    echo "║ 📱 $PROJECT_NAME/platforms/android/app/build/outputs/apk/debug/app-debug.apk"
    echo "║                                                        ║"
    echo "║ Próximos pasos:                                        ║"
    echo "║ 1. Conecta tu dispositivo Android por USB             ║"
    echo "║ 2. Copia el APK al dispositivo                        ║"
    echo "║ 3. Instala y ejecuta la app                           ║"
    echo "║                                                        ║"
    echo "║ O instala directamente con:                           ║"
    echo "║ cordova run android                                   ║"
    echo "╚════════════════════════════════════════════════════════╝"
else
    echo "❌ Error: No se pudo compilar el APK"
    echo "📝 Verifica que Android Studio esté instalado"
    echo "📝 Y que tengas el Android SDK configurado"
fi